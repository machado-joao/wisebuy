import { useState, type FormEvent } from "react";
import { useCart } from "../hooks/useCart";

interface AddItemFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  quantity: number;
  price: number;
}

function AddItemForm({ onClose }: AddItemFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    quantity: 1,
    price: 0,
  });
  const { addItem } = useCart();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value) || 0,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || form.quantity <= 0 || form.price < 0) return;

    addItem(form.name, form.quantity, form.price);
    setForm({
      name: "",
      quantity: 1,
      price: 0,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nome"
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
        required
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity || ""}
        onChange={handleChange}
        placeholder="Quantidade"
        min={1}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
        required
      />
      <input
        type="number"
        name="price"
        value={form.price || ""}
        onChange={handleChange}
        placeholder="Preço"
        min={0}
        step={1}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition cursor-pointer"
      >
        Adicionar
      </button>
    </form>
  );
}

export default AddItemForm;
