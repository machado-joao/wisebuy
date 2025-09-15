import { useNavigate, Link } from "react-router-dom";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import { signUp } from "../api";
import axios from "axios";
import Form from "../components/Form";
import { toast } from "react-toastify";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values: Record<string, string>) => {
    try {
      const body: RegisterRequest = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const message: string = await signUp(body);
      toast.success(message);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <Form
      title="Cadastro"
      fields={[
        {
          name: "name",
          type: "text",
          placeholder: "Nome",
          required: true,
        },
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
      submitLabel="Registrar"
      onSubmit={handleRegister}
    >
      <p className="mt-2 text-center text-gray-600">
        Já possui uma conta?{" "}
        <Link
          className="text-blue-600 hover:underline cursor-pointer"
          to="/login"
        >
          Entrar
        </Link>
      </p>
    </Form>
  );
}

export default RegisterPage;
