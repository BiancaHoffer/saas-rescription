import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pacientes | Nova receita",
  description: "Lista de pacientes - Desenvolvido por Bianca Hoffer.",
  icons: {
    icon: "favicon.png",
  },
};

export default function privateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  )
}

