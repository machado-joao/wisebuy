import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import { api } from "./config";

export const signUp = async (payload: RegisterRequest): Promise<string> => {
  const { data } = await api.post<string>("/api/auth/register", payload);
  return data;
};

export const signIn = async (payload: LoginRequest): Promise<string> => {
  const { data } = await api.post<string>("/api/auth/login", payload);
  return data;
};
