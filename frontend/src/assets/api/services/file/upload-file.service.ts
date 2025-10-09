import ENV from "../../../../config/env.config";
import { UploadError } from "../errors/upload.error";

// Ajeitar o padrão do error personalizado, utilizando o padrão dos meus outros projetos
export async function uploadCsv(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${ENV.API_BASE_URL}/files/uploads`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message =
        errorData.detail ||
        `Falha no upload do arquivo (status ${response.status}).`;

      throw new UploadError(message, response.status);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erro ao enviar arquivo:", error);

    if (error instanceof UploadError) {
      throw error;
    }

    throw new UploadError("Erro inesperado ao enviar o arquivo.", 500);
  }
}