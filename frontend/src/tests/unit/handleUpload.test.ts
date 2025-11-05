import { handleUpload } from "../../pages/File/helpers/handleUpload";
import { uploadCsv } from "../../api/services/file/UploadFileService";

jest.mock("../../api/services/file/UploadFileService", () => ({
  uploadCsv: jest.fn(),
}));

describe("handleUpload", () => {
  const mockSetMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("retorna false se não houver arquivo", async () => {
    const result = await handleUpload(null, mockSetMessage);

    expect(result).toBe(false);
    expect(mockSetMessage).toHaveBeenCalledWith(
      "Please select a CSV file before uploading."
    );
  });

  test("retorna true e exibe mensagem de sucesso", async () => {
    (uploadCsv as jest.Mock).mockResolvedValue({
      message: "Upload realizado com sucesso!",
    });

    const file = new File(["data"], "arquivo.csv", { type: "text/csv" });
    const result = await handleUpload(file, mockSetMessage);

    expect(uploadCsv).toHaveBeenCalledWith(file);
    expect(result).toBe(true);
    expect(mockSetMessage).toHaveBeenCalledWith("Upload realizado com sucesso!");
  });

  test("retorna false em erro de upload", async () => {
    (uploadCsv as jest.Mock).mockRejectedValue(new Error("Erro ao enviar"));

    const file = new File(["data"], "arquivo.csv", { type: "text/csv" });
    const result = await handleUpload(file, mockSetMessage);

    expect(result).toBe(false);
    expect(mockSetMessage).toHaveBeenCalledWith("Erro ao enviar");
  });
});
