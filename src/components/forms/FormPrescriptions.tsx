import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormMedicalCertificate } from "./FormMedicalCertificate";
import { FormCertificateofAttendance } from "./FormCertificateofAttendance";
import { FormMedicalReport } from "./FormMedicalReport";

interface FormPrescriptionsProps {
  name: string;
  nameMom: string;
  dateOfBirth: string;
  sus: string;
  obs: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  userExists?: boolean;
}

export function FormPrescriptions({
  name,
  nameMom,
  dateOfBirth,
  sus,
  obs,
  cep,
  address,
  city,
  state,
  userExists
}: FormPrescriptionsProps) {
  return (
    <div className="w-full max-w-[650px]">
      {userExists &&
        <div className="transition-all duration-500 mb-4 bg-orange-50 py-4 px-6 rounded-md text-sm text-orange-400 font-medium">
          ⚠️ Um paciente com o cartão do SUS "{sus}" já está registrado. <br />
          Ao salvar, as informações deste usuário serão atualizadas.
        </div>
      }
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Atestado de Comparecimento
          </AccordionTrigger>
          <AccordionContent>
            <FormCertificateofAttendance />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Atestado Médico
          </AccordionTrigger>
          <AccordionContent>
            <FormMedicalCertificate />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            APAC
          </AccordionTrigger>
          <AccordionContent>
            Container
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Encaminhamento
          </AccordionTrigger>
          <AccordionContent>
            Container
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Relatório Médico
          </AccordionTrigger>
          <AccordionContent>
            <FormMedicalReport />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Receiturário
          </AccordionTrigger>
          <AccordionContent>
            Container
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}