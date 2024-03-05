import { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  return (
    <header
      className="shadow-lg px-20 py-4 flex items-center"
      style={{ justifyContent: "space-between" }}
    >
      {children}
    </header>
  );
}
