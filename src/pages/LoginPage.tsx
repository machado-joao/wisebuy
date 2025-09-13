import { useState } from "react";
import type { Login } from "../interfaces/Login";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../api";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Login>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const token: string = await signIn(form);
      login(token);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errorMessage && (
            <p className="mt-2 text-center text-red-600 font-medium">
              {errorMessage}
            </p>
          )}
          <p className="mt-2 text-center text-gray-600">
            Não possui uma conta?{" "}
            <Link
              className="text-blue-600 hover:underline cursor-pointer"
              to="/register"
            >
              Registre-se
            </Link>
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
