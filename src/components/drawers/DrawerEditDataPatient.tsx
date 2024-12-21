"use client"

import {
  FormEvent,
  useEffect,
  useState
} from "react";

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
import { Loading } from "../Loading";
import { ModalDeletePatient } from "../modals/modalDeletePatient";
import { FormEditPatient } from "../forms/FormEditPatient";
import { IoSaveOutline } from "react-icons/io5";

import { useToast } from "../ui/use-toast";

import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/services/firebase";

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

export function DrawerEditDataPatient({ dataPatient }: DrawerEditDataPatientProps) {
  //Dados do paciente
  const [name, setName] = useState(dataPatient.name || "");
  const [nameMom, setNameMom] = useState(dataPatient.nameMom || "")
  const [dateOfBirth, setDateOfBirth] = useState(dataPatient.dateOfBirth || "");
  const [sus, setSus] = useState(dataPatient.sus || "");
  const [obs, setObs] = useState(dataPatient.obs || "");
  const [cep, setCep] = useState(dataPatient.cep || "");
  const [address, setAddress] = useState(dataPatient.address || "");
  const [city, setCity] = useState(dataPatient.city || "");
  const [state, setState] = useState(dataPatient.state || "");
  //Dados do paciente

  const [data, setData] = useState<Patient>();
  const [loadingSaveData, setLoadingSaveData] = useState(false)

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { toast } = useToast();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoadingSaveData(true);

      const nameLowerCase = name.toLowerCase();

      const dataForm = {
        uid: dataPatient.uid,
        name: nameLowerCase,
        nameMom,
        dateOfBirth,
        obs,
        sus,
        cep,
        address,
        city,
        state
      }

      setData(dataForm);

      const docRef = doc(db, "patient", dataPatient.uid);
      await updateDoc(docRef, dataForm);

      toast({
        title: "✅ Sucesso!",
        description: `Dados do paciente ${dataPatient.name} salvos com sucesso.`,
      })

      setOpen(false);

    } catch (error) {
      toast({
        title: "❌ Erro!",
        description: "Houve um erro ao editar os dados. Entre em contato com o administrador.",
      })
    } finally {
      setLoadingSaveData(false);
    }
  }

  useEffect(() => {
    if (
      dataPatient.name === name &&
      dataPatient.nameMom === nameMom &&
      dataPatient.dateOfBirth === dateOfBirth &&
      dataPatient.sus === sus &&
      dataPatient.obs === obs &&
      dataPatient.address === address &&
      dataPatient.cep === cep &&
      dataPatient.city === city &&
      dataPatient.state === state
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    dataPatient.name, name,
    dataPatient.nameMom, nameMom,
    dataPatient.dateOfBirth, dateOfBirth,
    dataPatient.sus, sus,
    dataPatient.obs, obs,
    dataPatient.address, address,
    dataPatient.cep, cep,
    dataPatient.city, city,
    dataPatient.state, state
  ])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="text-zinc800 hover:text-blue500 font-medium">
        Editar dados
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] p-5 w-full max-w-[740px]">
        <DrawerHeader>
          <DrawerTitle className="text-start font-bold text-lg uppercase text-zinc800">
            Editar dados de: {dataPatient?.name}
          </DrawerTitle>
          <DrawerDescription className="flex justify-start">
            <ModalDeletePatient
              setOpen={setOpen}
              name={dataPatient?.name}
              uid={dataPatient?.uid}
            />
          </DrawerDescription>
        </DrawerHeader>
        <form
          className="h-full w-full px-5 py-0 flex flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <FormEditPatient
            name={name}
            setName={setName}
            nameMom={nameMom}
            setNameMom={setNameMom}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            sus={sus}
            setSus={setSus}
            obs={obs}
            setObs={setObs}
            cep={cep}
            setCep={setCep}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
          />
          <DrawerFooter className="w-full p-5 flex gap-2 flex-row items-center justify-end">
            <DrawerClose className="text-red-500 font-medium hover:text-red-600 transition-colors duration-500">
              Cancelar
            </DrawerClose>
            <Button
              type="submit"
              disabled={
                loadingSaveData || disabled ? true : false
              }
              className="flex gap-1 disabled:opacity-45 disabled:cursor-not-allowed"
            >
              {loadingSaveData
                ? <>
                  <Loading sizee="sm" color="white" />
                  Carregando
                </>
                : <>
                  Editar e Salvar
                  <IoSaveOutline size={20} />
                </>}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}