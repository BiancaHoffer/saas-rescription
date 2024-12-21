"use client"

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState
} from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useAuth } from "@/hooks/useAuth";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

interface FormLoginProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  redirectRecoverPassword: () => void;
}

export function FormLogin({
  email,
  setEmail,
  password,
  setPassword,
  redirectRecoverPassword
}: FormLoginProps) {
  const [isVisible, setIsVisible] = useState(true);

  const { signIn, user } = useAuth();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    signIn(email, password);
  }

  console.log(user)

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[340px] max-w-[450px] flex flex-col justify-center gap-3 shadow-lg bg-white border-[1px] py-8 px-14 border-zinc-200 rounded-md"
    >
      <h1 className="text-lg text-blue500 font-medium mb-4">
        Olá, <br />
        Seja bem-vindo de volta!
      </h1>
      <Input
        placeholder="E-mail"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        type={isVisible ? "password" : "text"}
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="relative">
        <button
          className="absolute bottom-[21px] left-[300px] text-zinc500 hover:text-blue500 transition-all duration-500"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible
            ? <VscEye size={20} />
            : <VscEyeClosed size={20} />
          }
        </button>
      </div>
      <Button
        className="w-full mt-[-12px]"
        type="submit"
      >
        Acessar
      </Button>
      <Button
        className="flex items-center gap-1 font-medium text-sm shadow-none text-zinc500 hover:text-blue500 hover:bg-white"
        variant="ghost"
        type="button"
        onClick={redirectRecoverPassword}
      >
        Recuperar senha
        <IoArrowForwardCircleOutline size={20} />
      </Button>
    </form>
  )
}