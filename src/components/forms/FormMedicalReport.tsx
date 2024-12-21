import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FormMedicalReport() {
  return (
    <div>
      <form action="" className="flex flex-col gap-3 items-start w-full">
        <div className="w-full flex gap-3">
          <Select>
            <SelectTrigger className="w-1/2 mt-1">
              <SelectValue placeholder="Selecionar CID" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cid 20">cid 20</SelectItem>
                <SelectItem value="cid 10">cid 10</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-1/2 mt-1">
              <SelectValue placeholder="Selecionar CID 2 (se houver)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cid 20">cid 20</SelectItem>
                <SelectItem value="cid 10">cid 10</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Textarea placeholder="Relatar diagnóstico" />

        <Button>
          Imprimir
        </Button>
      </form>
    </div>
  )
}