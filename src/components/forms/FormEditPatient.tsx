"use client"

import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Loading } from "../Loading";

import { maskCEP } from "@/utils/maskCep";
import { Textarea } from "../ui/textarea";
import { maskSusCard } from "@/utils/maskSUS";
import { maskDate } from "@/utils/maskDate";

import axios from "axios";

interface FormEditPatientProps {
  name: string;
  setName: any;
  nameMom: string;
  setNameMom: any;
  dateOfBirth: string;
  setDateOfBirth: any;
  sus: string;
  setSus: any;
  obs: string;
  setObs: any;
  cep: string;
  setCep: any;
  address: string;
  setAddress: any;
  city: string;
  setCity: any;
  state: string;
  setState: any;
}

export function FormEditPatient({
  name,
  setName,
  nameMom,
  setNameMom,
  dateOfBirth,
  setDateOfBirth,
  sus,
  setSus,
  obs,
  setObs,
  cep,
  setCep,
  address,
  setAddress,
  city,
  state,
  setState,
  setCity,
}: FormEditPatientProps) {
  const [loadingCep, setLoadingCep] = useState(false);

  //Lógica idade atual 
  const currentYear = Number(new Date().getFullYear());
  const currentMonth = Number(new Date().getMonth()) + 1;
  const currentDay = Number(new Date().getDate());

  const birthYear = Number(dateOfBirth.slice(6));
  const birthMonth = Number(dateOfBirth.slice(3, 5));
  const birthDay = Number(dateOfBirth.slice(0, 2));

  let resultAge = currentYear - birthYear;

  if ((birthMonth > currentMonth) || (birthMonth === currentMonth && birthDay > currentDay)) {
    resultAge--;
  }
  //Lógica idade atual 

  async function consultingCEP() {
    try {
      setLoadingCep(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      setAddress(`${data.logradouro}, ${data.bairro}`);
      setCity(data.localidade);
      setState(data.uf);

      if (data.erro) {
        alert("CEP inválido");
      }

    } catch (error) {
      alert("Preencha o campo CEP para consultar");
    } finally {
      setLoadingCep(false);
    }
  };

  useEffect(() => {
    if (cep.length === 9) {
      consultingCEP();
    }
  }, [cep])


  return (
    <div className="w-full">
      <span className="flex gap-3 mb-3">
        <Input
          placeholder="Nome do paciente"
          className="capitalize"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Nome da mãe"
          className="capitalize"
          required
          type="text"
          value={nameMom}
          onChange={e => setNameMom(e.target.value)}
        />
      </span>
      <span className="flex gap-3 mb-3">
        <span className="flex gap-1 ">
          <Input
            placeholder="Data de nascimento"
            required
            type="text"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(maskDate(e.target.value))}
          />
          <Input
            placeholder="Idade"
            className="w-[35%]"
            type="text"
            value={dateOfBirth.length < 10 ? "" : resultAge}
          />
        </span>
        <Input
          placeholder="Cartão do SUS"
          required
          type="text"
          maxLength={18}
          minLength={18}
          value={sus}
          onChange={e => setSus(maskSusCard(e.target.value))}
        />
      </span>
      <Textarea
        placeholder="Observação"
        className="max-h-[100px]"
        value={obs}
        onChange={e => setObs(e.target.value)}
      />
      <span>
        <p className="text-sm text-zinc500 mb-2 mt-4">
          Endereço do paciente
        </p>
        <span className="flex gap-3 items-center">
          <Input
            placeholder="CEP"
            className="w-[49%] mb-3"
            value={cep}
            onChange={e => setCep(maskCEP(e.target.value))}
          />
          {loadingCep && <Loading />}
        </span>
        <span className="flex gap-3 mb-3">
          <Input
            placeholder="Endereço"
            className="w-[50%]"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <Input
            placeholder="Cidade"
            className="w-[38%]"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <Input
            placeholder="Estado"
            className="w-[12%]"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </span>
      </span>
    </div >
  )
}