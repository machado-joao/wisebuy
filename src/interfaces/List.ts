import type { Item } from "./Item";

export interface List {
  listId: number;
  name: string;
  description: string;
  items: Item[];
  createdAt: Date;
  updatedAt: Date;
}
