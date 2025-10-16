import ENV from "../../../config/envConfig";
import type { UploadResponse } from "../../../schemas/file/UploadResponse";
import { parseErrorResponse } from "../../utils/parseErrorResponse";
import { UploadError } from "../errors/UploadError";

export async function uploadCsv(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${ENV.API_BASE_URL}/files/uploads`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const {message, status} = await parseErrorResponse(response);
      throw new UploadError(message, status);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error sending file:", error);

    if (error instanceof UploadError) {
      throw error;
    }

    throw new UploadError("Unexpected error uploading file.", 500);
  }
}