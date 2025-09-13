import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { List } from "../interfaces/List";
import { getAll } from "../api/list";
import axios from "axios";

function HomePage() {
  const [lists, setLists] = useState<List[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    async function fetchLists() {
      try {
        const data: List[] = await getAll();
        setLists(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } else {
          setError("Ocorreu um erro inesperado.");
        }
      }
    }

    fetchLists();
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Suas listas:</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {lists.length === 0 ? (
          <p>Nenhuma lista encontrada.</p>
        ) : (
          <ul className="space-y-2">
            {lists.map((list) => (
              <li key={list.listId} className="border p-2 rounded-md">
                {list.name} - {list.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
