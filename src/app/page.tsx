"use client"

import { useState } from "react";

import { FormLogin } from "@/components/forms/FormLogin";
import { FormRecoverPassword } from "@/components/forms/FormRecoverPassword";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function redirectRecoverPassword() {
    setIsLogin(false);
  }

  function redirectLogin() {
    setIsLogin(true);
  }

  return (
    <main className="bg-zinc50 h-screen flex flex-col items-center justify-center p-5">
      {isLogin
        ? <FormLogin
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          redirectRecoverPassword={redirectRecoverPassword}
        />
        :
        <FormRecoverPassword
          email={email}
          setEmail={setEmail}
          redirectLogin={redirectLogin}
        />
      }
      <a
        href="https://biancahoffer.vercel.app/"
        target="_blank"
        className="text-zinc500 text-[12px] mt-8 hover:text-blue500 transition-all duration-500"
      >
        Desenvolvido por | Bianca Hoffer
      </a>
    </main>
  );
}
