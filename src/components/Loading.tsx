import { ClipLoader } from "react-spinners";

interface LoadingProps {
  sizee?: "sm" | "base" | "large";
  color?: "zinc" | "black" | "white";
}

export function Loading({ color = "zinc", sizee = "sm" }: LoadingProps) {
  return (
    <ClipLoader
      color={color == "zinc" ? "#909090" : color == "black" ? "#292929" : "#fff"}
      size={
        sizee == "sm" ? 18 :
          sizee == "large" ? 52 :
            sizee === "base" ? 32 : 32
      }
    />
  )
}