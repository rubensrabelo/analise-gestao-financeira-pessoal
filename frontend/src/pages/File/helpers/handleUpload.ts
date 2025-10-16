import { uploadCsv } from "../../../api/services/file/UploadFileService";

export async function handleUpload(
  file: File | null,
  setMessage: (msg: string) => void
): Promise<boolean> {
  if (!file) {
    setMessage("Please select a CSV file before uploading.");
    return false;
  }

  try {
    const result = await uploadCsv(file);
    setMessage(`${result.message}`);
    return true;
  } catch (err: any) {
    setMessage(`${err.message}`);
    return false;
  }
}
