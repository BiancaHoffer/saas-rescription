import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function FormMedicalCertificate() {
  return (
    <div>
      <form action="" className="flex flex-col gap-3 items-start">
        <Input
          className="w-1/2 mt-1"
          placeholder="Quant. dias de atestado"
          type="number"
          min={1}
        />
        <Button>
          Imprimir
        </Button>
      </form>
    </div>
  )
}