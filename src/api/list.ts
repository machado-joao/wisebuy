import type { List } from "../interfaces/List";
import type { Item } from "../interfaces/Item";
import { api } from "./config";
import type { ListRequest } from "../interfaces/ListRequest";
import type { ItemRequest } from "../interfaces/ItemRequest";

export const getAll = async (): Promise<List[]> => {
  const { data } = await api.get<List[]>("/api/list/all");
  return data;
};

export const getById = async (listId: number): Promise<List> => {
  const { data } = await api.get<List>(`/api/list/${listId}`);
  return data;
};

export const addList = async (list: ListRequest): Promise<List> => {
  const { data } = await api.post<List>("/api/list/addList", list);
  return data;
};

export const removeList = async (listId: number): Promise<void> => {
  await api.delete<void>(`/api/list/removeList/${listId}`);
};

export const addItem = async (item: ItemRequest): Promise<Item> => {
  const { data } = await api.post("/api/list/addItem", item);
  return data;
};

export const toggleItemDone = async (itemId: number): Promise<Item> => {
  const { data } = await api.post(`/api/list/toggleItem/${itemId}`);
  return data;
};

export const removeItem = async (itemId: number): Promise<void> => {
  await api.delete(`/api/list/removeItem/${itemId}`);
};
