import { Outlet, Navigate } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

const LoginRoute = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/register"></Navigate>;
};

export default LoginRoute;
