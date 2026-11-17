import type { ReactNode } from "react";

/** "O clube *de quem joga*" -> texto + <span class="serif">. */
export function marca(texto: string): ReactNode[] {
  return texto.split("*").map((parte, i) =>
    i % 2 ? (
      <span className="serif" key={i}>
        {parte}
      </span>
    ) : (
      parte
    ),
  );
}
