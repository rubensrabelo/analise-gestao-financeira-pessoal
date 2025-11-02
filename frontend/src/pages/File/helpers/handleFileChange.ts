import { logger } from "../../../log";

export function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: (file: File | null) => void,
  setMessage: (msg: string) => void
) {
  const selected = e.target.files?.[0] || null;

  if (!selected) {
    logger.warn("Nenhum arquivo selecionado");
    setFile(null);
    setMessage("Nenhum arquivo selecionado");
    return;
  }

  logger.info("Arquivo CSV selecionado", {
    fileName: selected.name,
    sizeKb: (selected.size / 1024).toFixed(2),
  });

  setFile(selected);
  setMessage("");
}
