import { useState } from "react";
import type { Register } from "../interfaces/Register";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const message: string = await signUp(form);
      alert(message);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 sm:p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">Registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-3 hover:bg-blue-700 transition-colors duration-200"
          >
            Cadastrar
          </button>
        </form>
        {errorMessage && (
          <p className="mt-2 text-center text-red-600 font-medium">
            {errorMessage}
          </p>
        )}
        <p className="mt-2 text-center text-gray-600">
          Já possui uma conta?{" "}
          <Link
            className="text-blue-600 hover:underline cursor-pointer"
            to="/login"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
