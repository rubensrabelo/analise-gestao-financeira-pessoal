import { render, screen } from "@testing-library/react";
import ReportPage from "../../pages/Report/ReportPage";

jest.mock("../../pages/Report/components/SummaryCards", () => ({
  SummaryCards: () => <div data-testid="summary-cards" />,
}));

jest.mock("../../pages/Report/components/CategoryChart", () => ({
  CategoryChart: () => <div data-testid="category-chart" />,
}));

jest.mock("../../pages/Report/components/MonthlyChart", () => ({
  MonthlyChart: () => <div data-testid="monthly-chart" />,
}));

jest.mock("../../pages/Report/hooks/useReports");
import { useReports } from "../../pages/Report/hooks/useReports";
const mockUseReports = useReports as jest.MockedFunction<typeof useReports>;

describe("ReportPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza loading quando loading=true", () => {
    mockUseReports.mockReturnValue({
      summary: { income: 1000, expense: 500, balance: 500 },
      expenseCategoryData: [],
      incomeCategoryData: [],
      monthlyData: [],
      loading: true,
    });

    render(<ReportPage />);

    expect(screen.getByText("Financial Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Loading reports...")).toBeInTheDocument();
  });

  test("não renderiza nada quando summary=null", () => {
    mockUseReports.mockReturnValue({
      summary: null,
      expenseCategoryData: [],
      incomeCategoryData: [],
      monthlyData: [],
      loading: false,
    });

    const { container } = render(<ReportPage />);
    expect(container.firstChild).toBeNull();
  });

  test("renderiza os componentes após sucesso", () => {
    mockUseReports.mockReturnValue({
      summary: { income: 2000, expense: 800, balance: 1200 },
      expenseCategoryData: [{ category: "Food", amount: 200 }],
      incomeCategoryData: [{ category: "Job", amount: 2000 }],
      monthlyData: [{ month: "Jan", income: 2000, expense: 800 }],
      loading: false,
    });

    render(<ReportPage />);

    expect(screen.getByText("Financial Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("summary-cards")).toBeInTheDocument();
    expect(screen.getAllByTestId("category-chart")).toHaveLength(2);
    expect(screen.getByTestId("monthly-chart")).toBeInTheDocument();
  });
});
