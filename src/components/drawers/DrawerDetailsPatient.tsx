"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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

interface DrawerEditDataPatientProps {
  dataPatient: Patient;
}

export function DrawerDetailsPatient({ dataPatient }: DrawerEditDataPatientProps) {
  const title = [
    "Nome completo:",
    "Nome da mãe:",
    "Data de nascimento:",
    "Cartão do SUS:",
  ]
  const data = [
    dataPatient.name,
    dataPatient.nameMom,
    dataPatient.dateOfBirth,
    dataPatient.sus,
  ]

  return (
    <Drawer>
      <DrawerTrigger className="text-zinc800 hover:text-blue500 font-medium w-0">
        Detalhes
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] p-5 w-full max-w-[740px]">
        <DrawerHeader>
          <DrawerTitle className="mb-4 text-start font-bold text-lg uppercase text-zinc800">
            Detalhes do paciente: {dataPatient?.name}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-5 overflow-auto h-full">
          <div className="flex shadow-md rounded-md">
            <div className="w-[40%] sm:w-1/2 ">
              {title.map(title => {
                return (
                  <p key={title} className="rounded-t-md p-3 font-semibold text-zinc800  border-[1px]">
                    {title === "" ? "-" : title}
                  </p>
                )
              })}
            </div>
            <div className="w-full sm:w-1/2 ">
              {data.map(data => {
                return (
                  <p key={data} className="rounded-r-md p-3 text-zinc800 capitalize border-[1px]">
                    {data === "" ? "-" : data}
                  </p>
                )
              })}
            </div>
          </div>

          <div className="flex mt-4 shadow-md rounded-md">
            <p className="rounded-l-md w-[40%] sm:w-1/2 p-3 font-semibold text-zinc800 border-[1px]">
              Endereço:
            </p>
            <p className="rounded-r-md w-full sm:w-1/2 p-3 text-zinc800 capitalize border-[1px]">
              {dataPatient.address === "" ? "-" : dataPatient.address}, {dataPatient.cep === "" ? "-" : dataPatient.cep}, {dataPatient.city === "" ? "-" : dataPatient.city}, {dataPatient.state === "" ? "-" : dataPatient.state}
            </p>
          </div>

          <div className="flex mt-4 shadow-md rounded-md">
            <p className="rounded-l-md w-[40%] sm:w-1/2 p-3 font-semibold text-zinc800 border-[1px]">
              Observação:
            </p>
            <p className="rounded-r-md w-full sm:w-1/2 p-3 text-zinc800 border-[1px]">
              {dataPatient.obs === "" ? "-" : dataPatient.obs}
            </p>
          </div>
        </div>
        <DrawerFooter className="w-full p-5 flex gap-2 flex-row items-center justify-end">
          <DrawerClose className="text-red-500 font-medium hover:text-red-600 transition-colors duration-500">
            Fechar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}