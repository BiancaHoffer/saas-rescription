import { DrawerNewPrescriptionAndPatient } from "@/components/drawers/DrawerNewPrescriptionAndPatient";
import { TablePatients } from "@/components/tables/TablePatients";

export default function Patients() {
  return (
    <main className="bg-zinc50 h-full px-5 py-8">
      <div className="bg-[url('/caduceu.png')] bg-no-repeat bg-center bg-white rounded-lg shadow-lg border-zinc100 border-[1px] h-full px-8 py-14">
        <div className="w-full max-w-[1320px] m-auto">
          <header className="flex justify-between items-center pb-4 mb-6 border-b-[1px] border-zinc100">
            <h1 className="font-bold text-lg uppercase text-zinc800">
              Pacientes
            </h1>
            <DrawerNewPrescriptionAndPatient />
          </header>
          <TablePatients />
        </div>
      </div>
    </main>
  )
}