import { useAuth } from "../hooks/useAuth";
import { TbListDetails, TbLogout2 } from "react-icons/tb";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-between px-6 border-b h-16 bg-white shadow-sm">
      <div className="flex items-center space-x-1 text-sm text-gray-300 focus:outline-none">
        {isAuthenticated ? (
          <div className="flex gap-4">
            <TbListDetails
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <TbLogout2
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <Link className="text-lg text-gray-600 font-bold" to="/">
            WiseBuy
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
