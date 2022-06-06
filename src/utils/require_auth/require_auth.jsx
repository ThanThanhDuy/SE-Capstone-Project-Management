import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../../store/user/user";
// import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  const auth = useRecoilValue(userAuthState);
  console.log(
    "test" + auth?.roles?.find(role => allowedRoles?.includes(role))
      ? "pass"
      : auth?.user
      ? "unauthorized"
      : "login"
  );
  const location = useLocation();

  return auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;