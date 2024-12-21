import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { FormPrescriptions } from "../forms/FormPrescriptions";

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

interface DrawerNewPrescriptionProps {
  dataPatient: Patient;
}

export function DrawerNewPrescription({ dataPatient }: DrawerNewPrescriptionProps) {
  return (
    <Drawer>
      <DrawerTrigger className="text-zinc800 hover:text-blue500 font-medium">
        Nova receita
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] p-5 w-full max-w-[740px]">
        <DrawerHeader className="w-full max-w-[1320px] m-auto">
          <DrawerTitle className="text-start font-bold text-lg uppercase text-zinc800">
            Nova receita para o paciente: {dataPatient.name}
          </DrawerTitle>
          <DrawerDescription className="flex text-start">
            <p>
              Crie uma nova receita para o paciente
              <span className="capitalize"> {dataPatient.name}</span>.
              Selecione a opção desejada e preencha os dados solicitados.
            </p>
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-full flex justify-between items-end flex-col px-5 w-full overflow-auto">
          <FormPrescriptions
            name={dataPatient.name}
            nameMom={dataPatient.nameMom}
            dateOfBirth={dataPatient.dateOfBirth}
            sus={dataPatient.sus}
            obs={dataPatient.obs}
            cep={dataPatient.cep}
            address={dataPatient.address}
            city={dataPatient.city}
            state={dataPatient.state}
          />

          <DrawerFooter className="">
            <DrawerClose className="text-red-500 font-medium hover:text-red-600 transition-colors duration-500">
              Cancelar
            </DrawerClose>
          </DrawerFooter>
        </div >
      </DrawerContent >
    </Drawer >
  )
}