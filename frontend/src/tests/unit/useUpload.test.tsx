import { renderHook, act } from "@testing-library/react";
import { useUpload } from "../../pages/File/helpers/useUpload";
import { uploadCsv } from "../../api/services/file/UploadFileService";
import { logger } from "../../log/core/logger";
import { useNavigate } from "react-router-dom";

jest.mock("../../api/services/file/UploadFileService");
jest.mock("../../log/core/logger");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("useUpload", () => {
  const mockNavigate = jest.fn();
  const mockSetMessage = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test("chama upload e redireciona em sucesso", async () => {
    const file = new File(["csv,data"], "arquivo.csv", { type: "text/csv" });

    // ✅ mocka uploadFile com sucesso
    (uploadCsv as jest.Mock).mockResolvedValue({
      success: true,
      data: { fileUrl: "http://example.com/file.csv" }
    });

    const { result } = renderHook(() => useUpload());

    await act(async () => {
      await result.current.handleUpload(file, mockSetMessage);
    });

    // ✅ verifica se upload foi chamado
    expect(uploadCsv).toHaveBeenCalledWith(file);

    // ✅ agora navigate deve ter sido chamado
    expect(mockNavigate).toHaveBeenCalledWith("/analise");

    // ✅ logger deve ter logado sucesso
    expect(logger.info).toHaveBeenCalled();
  });
});
