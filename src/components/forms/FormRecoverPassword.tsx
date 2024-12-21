import {
  Dispatch,
  FormEvent,
  SetStateAction
} from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useAuth } from "@/hooks/useAuth";

import { IoArrowBackCircleOutline } from "react-icons/io5";

interface FormRecoverPasswordProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  redirectLogin: () => void;
}

export function FormRecoverPassword({
  email,
  setEmail,
  redirectLogin
}: FormRecoverPasswordProps) {
  const { resetPassword } = useAuth();

  function handleRecoverPassword(event: FormEvent) {
    event.preventDefault();
    resetPassword(email)
  }

  return (
    <form
      onSubmit={handleRecoverPassword}
      className="w-full h-[340px] max-w-[450px] flex flex-col justify-center gap-3 shadow-lg bg-white border-[1px] py-8 px-14 border-zinc-200 rounded-md"
    >
      <h1 className="text-lg text-blue500 font-medium">
        Recuperar Senha
      </h1>
      <p className="text-sm text-zinc500 mb-4">
        Insira o e-mail que utilzia para efetuar o Login <br />
        Você receberá um e-mail para alterar a senha.
      </p>
      <Input
        placeholder="E-mail"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        className="w-full"
        type="submit"
      >
        Enivar
      </Button>
      <Button
        className="flex items-center gap-1 font-medium text-sm shadow-none text-zinc500 hover:text-blue500 hover:bg-white"
        variant="ghost"
        type="button"
        onClick={redirectLogin}
      >
        Voltar para Login
        <IoArrowBackCircleOutline size={20} />
      </Button>
    </form>
  )
}