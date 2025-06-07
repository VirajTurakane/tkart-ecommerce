import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);

  if (!auth?.success) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
