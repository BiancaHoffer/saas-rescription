"use client"

import {
  Dispatch,
  SetStateAction,
  useState
} from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast";
import { Loading } from "../Loading";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";

interface ModalDeletePatientProps {
  name: string;
  uid: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalDeletePatient({ name, uid, setOpen }: ModalDeletePatientProps) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { toast } = useToast();

  async function handleDeletePatient() {
    try {
      setLoadingDelete(true);
      await deleteDoc(doc(db, "patient", uid));

      toast({
        title: "✅ Sucesso!",
        description: "Paciente excluído com sucesso!",
      });

      setLoadingDelete(false);
      setOpen(false);

    } catch {
      toast({
        title: "❌ Erro!",
        description: "Erro ao deletar paciente. Entre em contato com o administrador.",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="shadow-none border-none disabled:cursor-not-allowed flex gap-1 flex-row text-red-500 hover:text-red-600 disabled:text-red-500 disabled:opacity-45 disabled:bg-transparent hover:bg-transparent p-0"
        >
          Excluir paciente
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[99999]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir o paciente <span className="capitalize">{name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Após exclusão todos os dados do paciente serão apagados e não poderão ser recuperados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePatient}
            className="bg-red-500 hover:bg-red-600 transition-colors duration-500"
          >
            {loadingDelete
              ? <>
                <Loading />
                Carregando
              </>
              : "Excluir"
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}