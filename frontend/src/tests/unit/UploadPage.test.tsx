import { render, screen, fireEvent } from "@testing-library/react";
import UploadPage from "../../pages/File/UploadFile";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("UploadPage - Renderização", () => {
  test("renderiza o título do componente", () => {
    renderWithRouter(<UploadPage />);
    expect(screen.getByText("Upload de Arquivo CSV")).toBeInTheDocument();
  });

  test("renderiza input do tipo file", () => {
    renderWithRouter(<UploadPage />);
    const input = screen.getByTestId("file-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "file");
  });

  test("botão é renderizado desativado inicialmente", () => {
    renderWithRouter(<UploadPage />);
    const button = screen.getByTestId("submit-button");
    expect(button).toBeDisabled();
  });

  test("habilita o botão depois de selecionar um arquivo", () => {
    renderWithRouter(<UploadPage />);
    const input = screen.getByTestId("file-input");
    const file = new File(["csv,data"], "arquivo.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    const button = screen.getByTestId("submit-button");
    expect(button).toBeEnabled();
  });
});
