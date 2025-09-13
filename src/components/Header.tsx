import { useAuth } from "../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex items-center justify-between px-6 border-b h-16 bg-white shadow-sm">
      <div className="flex items-center space-x-1 text-sm text-gray-300 focus:outline-none">
        {isAuthenticated ? (
          <TbLogout2
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => logout()}
          />
        ) : (
          <Link className="text-lg text-gray-600 font-bold" to="/">
            WiseBuy
          </Link>
        )}
      </div>
      {isAuthenticated && (
        <div className="w-full max-w-xl ml-4">
          <SearchInput />
        </div>
      )}
    </div>
  );
}

export default Header;
