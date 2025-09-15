import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../interfaces/LoginRequest";
import { signIn } from "../api";
import axios from "axios";
import Form from "../components/Form";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values: Record<string, string>) => {
    try {
      const body: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      const token = await signIn(body);
      login(token);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <Form
      title="Login"
      fields={[
        {
          name: "email",
          type: "email",
          placeholder: "E-mail",
          required: true,
        },
        {
          name: "password",
          type: "password",
          placeholder: "Senha",
          required: true,
        },
      ]}
      submitLabel="Entrar"
      onSubmit={handleLogin}
    >
      <p className="text-center text-gray-600">
        Não possui uma conta?{" "}
        <Link
          className="text-blue-600 hover:underline cursor-pointer"
          to="/register"
        >
          Registre-se
        </Link>
      </p>
    </Form>
  );
}

export default LoginPage;
