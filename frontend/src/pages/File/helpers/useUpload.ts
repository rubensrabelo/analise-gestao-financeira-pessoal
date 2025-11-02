import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleUpload } from "./handleUpload";
import { logger } from "../../../log";

export function useUpload(file: File | null, setMessage: (msg: string) => void) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      logger.warn("[UPLOAD] Tentativa de envio sem arquivo selecionado");
      setMessage("Selecione um arquivo antes de enviar.");
      return;
    }

    logger.info("[UPLOAD] Iniciando upload do CSV", { fileName: file.name, size: file.size });

    setLoading(true);
    const startTime = Date.now();

    try {
      const success = await handleUpload(file, setMessage);
      if (success) {
        const duration = Date.now() - startTime;
        logger.info("[UPLOAD] Upload concluído com sucesso", { durationMs: duration });

        logger.info("[UPLOAD] Redirecionando para /reports em 1.5s...");
        setTimeout(() => navigate("/reports"), 1500);
      } else {
        logger.warn("[UPLOAD] Upload retornou false (backend pode ter respondido erro)");
      }
    } catch (err: any) {
      logger.error("[UPLOAD] Erro inesperado no upload", {
        error: err?.message || err,
      });
      setMessage("Erro inesperado ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
