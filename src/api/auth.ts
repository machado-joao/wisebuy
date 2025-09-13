import type { Login } from "../interfaces/Login";
import type { Register } from "../interfaces/Register";
import { api } from "./config";

export const signUp = async (payload: Register): Promise<string> => {
  const { data } = await api.post<string>("/api/auth/register", payload);
  return data;
};

export const signIn = async (payload: Login): Promise<string> => {
  const { data } = await api.post<string>("/api/auth/login", payload);
  return data;
};
