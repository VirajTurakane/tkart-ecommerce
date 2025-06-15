import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./shared/Loader";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (!auth || !auth.id || !auth.email) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
