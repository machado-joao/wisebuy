import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbListSearch } from "react-icons/tb";

function SearchInput() {
  const [term, setTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?term=${term}`);
    setTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center pl-3">
          <TbListSearch className="h-6 w-6 text-gray-600" />
        </div>
        <input
          className="pl-10 py-2 w-full border-b shadow-none focus:outline-none"
          placeholder="Procurar lista"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchInput;
