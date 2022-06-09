import { Navigate } from "react-router-dom";
import usersService from "../../services/usersService";

const ProtectedRoute = ({ children, adminOnly }) => {
  const currentUser = usersService.getUser();

  if (!currentUser || (adminOnly && !currentUser.isAdmin)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
