import type { List } from "../interfaces/List";
import { api } from "./config";

export const getAll = async (): Promise<List[]> => {
  const { data } = await api.get<List[]>("/api/list/all");
  console.log(data);
  return data;
};
