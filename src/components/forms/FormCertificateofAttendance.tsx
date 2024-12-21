import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FormCertificateofAttendance() {
  return (
    <div>
      <form action="" className="flex flex-col gap-3 items-start">
        <Select>
          <SelectTrigger className="w-1/2 mt-1">
            <SelectValue placeholder="Selecionar periodo do dia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="matutino">Matutino</SelectItem>
              <SelectItem value="vespertino">Vespertino</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>
          Imprimir
        </Button>
      </form>
    </div>
  )
}