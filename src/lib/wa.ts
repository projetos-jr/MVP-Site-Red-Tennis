import { contato } from "@/content/red";

/** Monta o link de WhatsApp com mensagem pronta. */
export function wa(mensagem: string): string {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
