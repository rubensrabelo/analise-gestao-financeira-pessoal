import { renderHook, act } from "@testing-library/react";
import { useUpload } from "../../pages/File/helpers/useUpload";
import { logger } from "../../log/core/logger";
import { useNavigate } from "react-router-dom";
import { handleUpload } from "../../pages/File/helpers/handleUpload";

jest.useFakeTimers();

jest.mock("../../pages/File/helpers/handleUpload", () => ({
  handleUpload: jest.fn(() => Promise.resolve(true)),
}));
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
    (handleUpload as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useUpload(file, mockSetMessage));

    await act(async () => {
      await result.current.handleSubmit();
    });

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(handleUpload).toHaveBeenCalledWith(file, mockSetMessage);
    expect(mockNavigate).toHaveBeenCalledWith("/reports");
    expect(logger.info).toHaveBeenCalled();
  });

  test("exibe mensagem quando nenhum arquivo é selecionado", async () => {
    const { result } = renderHook(() => useUpload(null, mockSetMessage));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockSetMessage).toHaveBeenCalledWith("Selecione um arquivo antes de enviar.");
    expect(logger.warn).toHaveBeenCalled();
  });
});
