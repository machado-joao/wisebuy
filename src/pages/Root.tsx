import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
