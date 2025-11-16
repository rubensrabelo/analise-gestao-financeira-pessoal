import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UploadPage from "../../pages/File/UploadFile";
import { uploadCsv } from "../../api/services/file/UploadFileService";

jest.mock("../../api/services/file/UploadFileService");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Integração: Upload", () => {

  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigate.mockClear();
  });

  test("simula envio de arquivo e redireciona após delay", async () => {
    const mockUpload = uploadCsv as jest.MockedFunction<typeof uploadCsv>;

    mockUpload.mockResolvedValue({
      message: "Arquivo enviado com sucesso!",
    });

    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByTestId("file-input");
    const button = screen.getByTestId("submit-button");

    const file = new File(["csv,data"], "dados.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(button);

    await waitFor(() => expect(mockUpload).toHaveBeenCalled());

    jest.advanceTimersByTime(1500);

    expect(mockNavigate).toHaveBeenCalledWith("/reports");
  });
});
