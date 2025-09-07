import { useState } from "react";
import type { Item } from "./interfaces/Item";
import { useCart } from "./hooks/useCart";
import Modal from "./components/Modal";
import AddItemForm from "./components/AddItemForm";
import {
  TbShoppingCartPlus,
  TbShoppingCartMinus,
  TbTrash,
} from "react-icons/tb";

function App() {
  const { items, toggleInCart, removeItem } = useCart();
  const [showModal, setShowModal] = useState(false);

  const toBuyItems: Item[] = items.filter((item) => !item.inCart);
  const inCartItems: Item[] = items.filter((item) => item.inCart);

  const renderItem = (item: Item) => {
    return (
      <li
        key={item.id}
        className="flex items-center justify-between p-2 border rounded-md"
      >
        <span>{item.name}</span>
        <div className="text-sm text-gray-600">
          Quantidade: {item.quantity} | Preço: R${" "}
          {(item.price * item.quantity).toFixed(2).replace(".", ",")}
        </div>
        <div className="flex gap-2">
          <button
            className="text-lg text-blue-700 cursor-pointer"
            onClick={() => toggleInCart(item.id)}
          >
            {item.inCart ? <TbShoppingCartMinus /> : <TbShoppingCartPlus />}
          </button>
          <button
            className="text-lg text-red-700 cursor-pointer"
            onClick={() => removeItem(item.id)}
          >
            <TbTrash />
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">WiseBuy</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
      >
        Adicionar
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddItemForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
      <h2 className="font-bold mb-2">Itens a comprar</h2>
      {toBuyItems.length > 0 && (
        <div>
          <ul className="space-y-2">{toBuyItems.map(renderItem)}</ul>
        </div>
      )}
      <h2 className="font-bold mb-2">Itens no carrinho</h2>
      {inCartItems.length > 0 && (
        <div>
          <ul className="space-y-2">{inCartItems.map(renderItem)}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
