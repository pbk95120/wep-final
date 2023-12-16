import { Outlet, Navigate } from "react-router-dom";

//is Logined Check
const LoginRoute = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/register"></Navigate>;
};

export default LoginRoute;
