import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { List } from "../interfaces/List";
import { addList, getAll, removeList } from "../api/list";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import Form from "../components/Form";
import type { ListRequest } from "../interfaces/ListRequest";
import { TbTrash } from "react-icons/tb";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      async function fetchLists() {
        try {
          const data: List[] = await getAll();
          setLists(data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data);
          }
        }
      }

      fetchLists();
    }
  }, [isAuthenticated, navigate]);

  const handleAddList = async (values: Record<string, string>) => {
    try {
      const body: ListRequest = {
        name: values.name,
        description: values.description,
      };
      const list: List = await addList(body);
      setLists((prev) => [...prev, list]);
      toast.success("Lista criada.");
      setShowModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const handleRemoveList = async (listId: number) => {
    try {
      await removeList(listId);
      const updatedLists = lists.filter((list) => {
        return list.listId !== listId;
      });
      setLists(updatedLists);
      toast.success("Lista removida.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Suas listas:</h1>
        {lists.length === 0 ? (
          <p className="text-gray-500">Nenhuma lista encontrada.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map((list) => (
              <li key={list.listId} className="relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                  onClick={() => handleRemoveList(list.listId)}
                  aria-label="Remover lista"
                >
                  <TbTrash className="text-black hover:text-red-700" />
                </button>
                <Link
                  to={`/lists/${list.listId}`}
                  className="block border rounded-2xl p-4 shadow-sm bg-white hover:shadow-lg transition duration-200 hover:bg-gray-50"
                >
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">
                    {list.name}
                  </h2>
                  <p className="text-sm text-gray-500">{list.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        + Adicionar lista
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Form
            title="Nova lista"
            fields={[
              {
                name: "name",
                type: "text",
                placeholder: "Nome",
                required: true,
              },
              {
                name: "description",
                type: "text",
                placeholder: "Descrição",
                required: true,
              },
            ]}
            submitLabel="Adicionar"
            onSubmit={handleAddList}
            withBackground={false}
          />
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
