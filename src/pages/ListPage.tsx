import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { List } from "../interfaces/List";
import type { Item } from "../interfaces/Item";
import type { ItemRequest } from "../interfaces/ItemRequest";
import { addItem, getById, removeItem, toggleItemDone } from "../api/index";
import axios from "axios";
import { FaRegCircleCheck, FaRegCircle } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import Form from "../components/Form";

function ListPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [list, setList] = useState<List | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchList() {
      try {
        const data: List = await getById(Number(id));
        setList(data);
      } catch (error: unknown) {
        toast.error(`Ocorreu uma falha ao buscar a lista. ${error}`);
      }
    }
    fetchList();
  }, [id]);

  const handleAddItem = async (values: Record<string, string>) => {
    try {
      const body: ItemRequest = {
        listId: Number(id),
        name: values.name,
        quantity: Number(values.quantity),
        price: Number(values.price),
      };
      const item: Item = await addItem(body);
      setList((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: [...prev.items, item],
        };
      });
      toast.success("Item adicionado à lista.");
      setShowModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const handleToggleDone = async (itemId: number) => {
    if (!list) return;
    try {
      const updatedItem: Item = await toggleItemDone(itemId);
      const updatedItems = list.items.map((item) =>
        item.itemId === itemId ? updatedItem : item
      );
      setList({ ...list, items: updatedItems });
    } catch (error: unknown) {
      toast.error(`Ocorreu uma falha ao atualizar o status do item. ${error}`);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    if (!list) return;
    try {
      await removeItem(itemId);
      setList({
        ...list,
        items: list.items.filter((item) => item.itemId !== itemId),
      });
    } catch (error: unknown) {
      toast.error(`Ocorreu uma falha ao deletar o item. ${error}`);
    }
  };

  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-gray-600 mb-4">Esta lista não existe.</p>
        <button
          className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{list.name}</h1>
      <p className="mb-6 text-gray-600">{list.description}</p>
      {list.items.length > 0 ? (
        <ul className="space-y-4">
          {list.items.map((item) => (
            <li
              key={item.itemId}
              className="border border-gray-300 rounded-md p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 flex-1">
                <h2
                  className={`font-semibold text-lg break-words ${
                    item.done ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Quantidade: {item.quantity} | Valor: R${" "}
                  {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="px-4 py-2 text-black font-medium transition-colors duration-100 cursor-pointer"
                  onClick={() => handleToggleDone(item.itemId)}
                >
                  {item.done ? (
                    <FaRegCircleCheck className="text-green-600" />
                  ) : (
                    <FaRegCircle className="text-gray-700" />
                  )}
                </button>
                <button
                  className="px-4 py-2 transition cursor-pointer"
                  onClick={() => handleRemoveItem(item.itemId)}
                >
                  <TbTrash className="text-black hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">A lista não possui itens ainda.</p>
      )}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        + Adicionar item
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Form
            title="Novo item"
            fields={[
              {
                name: "name",
                type: "text",
                placeholder: "Nome",
                required: true,
              },
              {
                name: "quantity",
                type: "number",
                min: 0,
                placeholder: "Quantidade",
                required: true,
              },
              {
                name: "price",
                type: "number",
                min: 0,
                step: 0.1,
                placeholder: "Preço",
                required: true,
              },
            ]}
            submitLabel="Adicionar"
            onSubmit={handleAddItem}
            withBackground={false}
          />
        </Modal>
      )}
    </div>
  );
}

export default ListPage;
