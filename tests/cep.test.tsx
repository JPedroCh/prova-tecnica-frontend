// __tests__/Cep.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cep from "../src/pages/cep";
import cepService from "../src/services/cep";
import { describe, expect, it, vi } from "vitest";

// Mock do cepService
vi.mock("../services/cep", () => ({
  default: {
    getAddresses: vi.fn(),
  },
}));

describe("Busca de endereços por CEP", () => {

  const fakeCepData = {
    cep: "01001-000",
    logradouro: "Praça da Sé",
    complemento: "lado ímpar",
    bairro: "Sé",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  };

  it("deve exibir os dados do endereço ao buscar um CEP válido", async () => {
    (cepService.getAddresses) = vi.fn().mockResolvedValueOnce({
      status: 200,
      data: fakeCepData,
    });

    render(<Cep />);

    const input = screen.getByLabelText(/Número de CEP/i);
    fireEvent.change(input, { target: { value: "01001000" } });

    const button = screen.getByText(/Buscar/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Praça da Sé/i));
      expect(screen.getByText(/SP/i));
    });
  });

  it("deve exibir mensagem de erro ao buscar um CEP inválido", async () => {
    (cepService.getAddresses) = vi.fn().mockResolvedValueOnce({
      status: 200,
      data: { erro: true },
    });

    render(<Cep />);

    const input = screen.getByLabelText(/Número de CEP/i);
    fireEvent.change(input, { target: { value: "00000000" } });

    const button = screen.getByText(/Buscar/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/CEP não encontrado/i));
    });
  });
});
