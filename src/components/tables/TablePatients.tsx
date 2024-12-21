"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";

import { DrawerEditDataPatient } from "../drawers/DrawerEditDataPatient";
import { DrawerNewPrescription } from "../drawers/DrawerNewPrescription";
import { Button } from "@/components/ui/button";
import { Loading } from "../Loading";

import { TfiMoreAlt } from "react-icons/tfi";

import {
  collection,
  endBefore,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { DrawerDetailsPatient } from "../drawers/DrawerDetailsPatient";

interface Patient {
  uid: string;
  name: string;
  nameMom: string;
  dateOfBirth: string;
  sus: string;
  obs: string;
  cep: string;
  address: string;
  city: string;
  state: string;
}

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "sus",
    header: "Cartão do SUS",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("sus") === "" ? "-" : row.getValue("sus")}
      </div>
    ),
  },
  {
    accessorKey: "obs",
    header: "Observação",
    cell: ({ row }) => (
      <div className="obs">
        {row.getValue("obs") === "" ? "-" : row.getValue("obs")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original

      return (
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger className="text-zinc500 hover:text-blue500 text-xl">
              <TfiMoreAlt />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 bg-white shadow-md p-6 rounded-md border-[1px] border-zinc-100">
              <p className="font-bold text-zinc800 mb-1">
                Ações
              </p>
              <DrawerNewPrescription dataPatient={patient} />
              <DrawerEditDataPatient dataPatient={patient} />
              <DrawerDetailsPatient dataPatient={patient} />
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
]

export function TablePatients() {
  // dados tabela
  const [data, setData] = React.useState<Patient[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [page, setPage] = React.useState(1);
  // dados tabela

  //filtro
  const [filterName, setFilterName] = React.useState("");
  //filtro

  //lógica tabela
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  //lógica tabela

  const [totalItems, setTotalItems] = React.useState(0);

  async function getClients() {
    try {
      const firstQuery = query(collection(db, "patient"), orderBy("name", "asc"), limit(2));

      const firstDocumentSnapshots = await getDocs(firstQuery);

      const data = firstDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as Patient));

      onSnapshot(firstQuery, (snapshot) => {
        const newData = snapshot.docs.map(doc => doc.data() as Patient);
        setData(newData);
      });

    } finally {
      setLoadingData(false)
    }
  }

  async function getTotalPatients() {
    const querySnapshot = await getDocs(collection(db, 'patient'));
    setTotalItems(querySnapshot.size);
  }

  async function showNext({ item }: any) {
    try {
      setLoadingData(true);

      const next = query(collection(db, "patient"),
        orderBy("name", "asc"),
        limit(10),
        startAfter(item.name)
      );

      const nextDocumentSnapshots = await getDocs(next);

      const data = nextDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as Patient));
      setPage(page + 1);

      if (data.length === 0) {
        getClients();
      }
    } finally {
      setLoadingData(false);
    }
  };

  async function showPrevious({ item }: any) {
    try {
      setLoadingData(true);

      const next = query(collection(db, "patient"),
        orderBy("name", "asc"),
        limit(10),
        endBefore(item.name)
      );

      const nextDocumentSnapshots = await getDocs(next);

      const data = nextDocumentSnapshots.docs;
      setData(data.map(doc => doc.data() as Patient));
      setPage(page - 1);

      if (data.length === 0) {
        getClients();
      }
    } finally {
      setLoadingData(false);
    }
  };

  async function handleFilterNameChange(event: any) {
    const name = event.target.value;
    setFilterName(name);

    const patientRef = collection(db, "patient");

    const nameLowerCase = name.toLowerCase();

    const q = query(patientRef,
      where("name", ">=", nameLowerCase),
      where("name", "<=", nameLowerCase + "\uf8ff"),
      limit(10));

    const querySnapshot = await getDocs(q);

    let patients = [] as Patient[];

    querySnapshot.forEach((doc) => {
      patients.push(doc.data() as Patient);
      setData(patients);
    });
  }

  React.useEffect(() => {
    getClients();
    getTotalPatients();
  }, [])

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center py-4">
        <span className="flex gap-3 w-full">
          <Input
            placeholder="Filtrar por nome do paciente..."
            value={filterName}
            onChange={handleFilterNameChange}
            className="max-w-sm"
          />
        </span>
        <DropdownMenu>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-zinc800 font-semibold" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loadingData
                    ? <div className="flex items-center gap-2 justify-center">
                      <Loading />
                      Carregando dados
                    </div>
                    : <>Nenhum paciente encontrado.</>
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          {
            page === 1 ? '' :
              <Button
                variant="outline"
                size="sm"
                className="disabled:bg-white disabled:opacity-95"
                onClick={() => showPrevious({ item: data[0] })}
              >
                Voltar
              </Button>
          }
          {
            totalItems > 2 &&
            <Button
              variant="outline"
              size="sm"
              className={`disabled:bg-white ${data.length > 10 && "disabled:opacity-25"} disabled:opacity-95`}
              onClick={() => showNext({ item: data[data.length - 1] })}
            >
              Próximo
            </Button>
          }
        </div>
      </div>
    </div>
  )
}
