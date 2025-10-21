import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleUpload } from "./handleUpload";

export function useUpload(file: File | null, setMessage: (msg: string) => void) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      setMessage("Selecione um arquivo antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      const success = await handleUpload(file, setMessage);
      if (success) setTimeout(() => navigate("/reports"), 1500);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
