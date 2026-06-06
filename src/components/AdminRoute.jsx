import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {

  const isAdmin =
    localStorage.getItem("admin") === "true";

  return isAdmin
    ? children
    : <Navigate to="/admin" />;
}

export default ProtectedAdminRoute;