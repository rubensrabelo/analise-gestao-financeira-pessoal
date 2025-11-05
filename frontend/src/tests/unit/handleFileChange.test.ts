import { handleFileChange } from "../../pages/File/helpers/handleFileChange";
import { logger } from "../../log";

jest.mock("../../log", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("handleFileChange", () => {
  const mockSetFile = jest.fn();
  const mockSetMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("define arquivo corretamente ao selecionar um CSV válido", () => {
    const file = new File(["data"], "dados.csv", { type: "text/csv" });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileChange(event, mockSetFile, mockSetMessage);

    expect(mockSetFile).toHaveBeenCalledWith(file);
    expect(mockSetMessage).toHaveBeenCalledWith("");
    expect(logger.info).toHaveBeenCalled();
  });

  test("exibe aviso e limpa arquivo quando nenhum arquivo é enviado", () => {
    const event = { target: { files: null } } as any;

    handleFileChange(event, mockSetFile, mockSetMessage);

    expect(mockSetFile).toHaveBeenCalledWith(null);
    expect(mockSetMessage).toHaveBeenCalledWith("Nenhum arquivo selecionado");
    expect(logger.warn).toHaveBeenCalled();
  });
});
