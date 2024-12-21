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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { useForm } from "../../hooks/useForm";

import { FormPatient } from "../forms/FormPatient";
import { FormPrescriptions } from "../forms/FormPrescriptions";
import { Button } from "../ui/button"
import { Loading } from "../Loading";

import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoSaveOutline
} from "react-icons/io5";

import {
  and,
  collection,
  doc,
  getDocs,
  or,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useToast } from "../ui/use-toast";

interface UseFormProps {
  steps: JSX.Element[];
}

interface Patient {
  uid?: string;
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

export function DrawerNewPrescriptionAndPatient() {
  //Dados do paciente
  const [name, setName] = useState("");
  const [nameMom, setNameMom] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sus, setSus] = useState("");
  const [obs, setObs] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  //Dados do paciente

  const [data, setData] = useState<Patient>();
  const [loadingSaveData, setLoadingSaveData] = useState(false)
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [userExists, setUserExists] = useState(false);
  const [existingUserUid, setExistingUserUid] = useState("")

  const { toast } = useToast();

  const nameLowerCase = name.toLowerCase();

  const formComponents = [
    <FormPatient
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
    />,
    <FormPrescriptions
      userExists={userExists}
      name={name}
      nameMom={nameMom}
      dateOfBirth={dateOfBirth}
      sus={sus}
      obs={obs}
      cep={cep}
      address={address}
      city={city}
      state={state}
    />
  ];

  const formProps: UseFormProps = {
    steps: formComponents
  };

  const {
    currentComponent,
    currentStep,
    changeStep,
    isFirstStep,
    isSecondStep,
  } = useForm(formProps);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    changeStep(currentStep + 1, event);
  }

  async function handleSavePatient() {
    try {
      setLoadingSaveData(true);

      const UIDClientGenerate = Math.floor(Date.now() * Math.random()).toString(32);

      const dataForm = {
        uid: UIDClientGenerate,
        name: nameLowerCase,
        nameMom,
        dateOfBirth,
        obs,
        sus,
        cep,
        address,
        city,
        state
      };

      setData(dataForm);

      if (userExists) {
        toast({
          title: "⚠️ Atenção!",
          description: "Já existe um paciente cadastrado com este cartão do SUS.",
        })
        return;
      } else {
        await setDoc(doc(db, "patient", UIDClientGenerate), dataForm);
        setDisabled(true);
        toast({
          title: "✅ Sucesso!",
          description: "Paciente salvo com sucesso.",
        });
      };

    } catch (error) {
      toast({
        title: "❌ Erro!",
        description: "Houve um erro ao salvar os dados. Entre em contato com o administrador.",
      });

    } finally {
      setLoadingSaveData(false);
    }
  }

  function cancel() {
    setOpen(false);
    setName("");
    setNameMom("");
    setDateOfBirth("");
    setSus("");
    setObs("");
    setCep("");
    setAddress("");
    setCity("");
    setState("");
  }

  async function EditDataUser() {
    const dataForm = {
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

    const collectionRef = doc(db, "patient", existingUserUid);
    await updateDoc(collectionRef, dataForm);

    toast({
      title: "✅ Sucesso!",
      description: `Dados do paciente editados com sucesso.`,
    })
  }

  async function checkUserExists() {
    const collectionRef = collection(db, "patient");
    const q = query(collectionRef,
      where("sus", "==", sus),
    );
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      setExistingUserUid(doc.id);
    });

    if (!snapshot.empty) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }

  useEffect(() => {
    setDisabled(false);
  }, [
    name,
    nameMom,
    dateOfBirth,
    sus,
    obs,
    address,
    cep,
    city,
    state])

  useEffect(() => {
    checkUserExists();
  }, [
    isFirstStep,
    isSecondStep
  ])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="shadow-lg h-10 px-6 py-2 bg-blue500 text-primary-foreground hover:bg-blue600 inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-zinc50 disabled:bg-blue200">
        Nova receita
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] p-5 w-full max-w-[740px]">
        <DrawerHeader className="w-full max-w-[1320px] m-auto">
          <DrawerTitle className="text-start font-bold text-lg uppercase text-zinc800">
            Nova receita
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-full w-full overflow-auto">
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex gap-3 items-center">
              <div className={`
              ${isFirstStep ? "border-blue500 text-blue500 font-bold" : "border-zinc500 text-zinc500 font-normal"}
              border-[1px] transition-colors duration-500 text-blue500  w-8 h-8 flex items-center justify-center rounded-full p-6
            `}>
                1
              </div>
              <p className={`
              ${isFirstStep ? "text-blue500 font-bold " : "text-zinc500 font-normal "} 
              transition-colors duration-500
            `}>
                Dados do paciente
              </p>
            </div>
            <span className="w-full max-w-[200px] h-[1px] border-[1px] border-zinc500" />
            <div className="flex gap-3 items-center">
              <div className={`
              ${!isFirstStep ? "border-blue500 text-blue500 font-bold" : "border-zinc500 text-zinc500 font-normal"}
              border-[1px]  transition-colors duration-500 w-8 h-8 flex items-center justify-center rounded-full p-6
            `}>
                2
              </div>
              <p className={` 
              ${!isFirstStep ? "text-blue500 font-bold" : "text-zinc500 font-normal"} 
              transition-colors duration-500
            `}>
                Imprimir receitas
              </p>
            </div>
          </div>

          {isFirstStep &&
            <div className="px-6 mt-4">
              <p className="text-sm text-gray-500">
                Comece preenchendo as informações principais do paciente.
              </p>
            </div>
          }

          {!isFirstStep &&
            <div className="px-6 mt-4">
              <p className="text-sm text-gray-500">
                Por fim, crie uma nova receita para o paciente ao selecionar a opção desejada e preencher os dados solicitados.
              </p>
            </div>
          }

          <form
            onSubmit={handleSubmit}
            className="h-full w-full flex flex-col p-5 justify-between "
          >
            <div>
              {currentComponent}
            </div>

            <DrawerFooter className="w-full m-auto flex flex-row items-center justify-end">
              <DrawerClose onClick={cancel} className="text-red-500 font-medium hover:text-red-600 transition-colors duration-500">
                Cancelar
              </DrawerClose>
              {isFirstStep && (
                <Button
                  type="submit"
                  className="flex gap-1"
                >
                  Imprimir receitas
                  <IoArrowForwardCircleOutline size={24} />
                </Button>
              )}
              {isSecondStep && (
                <>
                  <Button
                    type="button"
                    className="flex gap-1"
                    onClick={() => changeStep(currentStep - 1)}
                  >
                    <IoArrowBackCircleOutline size={24} />
                    Voltar
                  </Button>
                  {userExists &&
                    <div>
                      <Button
                        type="button"
                        disabled={loadingSaveData || disabled ? true : false}
                        className="flex gap-1 disabled:opacity-45 disabled:cursor-not-allowed"
                        onClick={EditDataUser}
                      >
                        {loadingSaveData
                          ? <>
                            <Loading sizee="sm" color="white" />
                            Carregando
                          </>
                          :
                          <>
                            Editar e salvar
                            <IoSaveOutline size={20} />
                          </>
                        }
                      </Button>
                    </div>
                  }
                  {!userExists &&
                    <Button
                      type="button"
                      disabled={loadingSaveData || disabled ? true : false}
                      className="flex gap-1 disabled:opacity-45 disabled:cursor-not-allowed"
                      onClick={handleSavePatient}
                    >
                      {loadingSaveData
                        ? <>
                          <Loading sizee="sm" color="white" />
                          Carregando
                        </>
                        :
                        <>
                          Salvar paciente
                          <IoSaveOutline size={20} />
                        </>
                      }
                    </Button>
                  }
                </>
              )}
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}