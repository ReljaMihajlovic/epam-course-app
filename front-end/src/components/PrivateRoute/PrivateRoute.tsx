import React from "react"; // Import React
import { Navigate } from "react-router-dom";
import useIsAdmin from "../../helpers/useIsAdmin";
interface PrivateRouteProps {
  Component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const isAdmin = useIsAdmin();
  return isAdmin ? <Component /> : <Navigate to="/courses" />;
};

export default PrivateRoute;
