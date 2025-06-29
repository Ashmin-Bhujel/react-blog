import { login, logout } from "@/app/feature/authSlice";
import type { StoreStateType } from "@/app/store";
import { authService } from "@/appwrite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const isLoggedIn = useSelector(
    (state: StoreStateType) => state.auth.isLoggedIn
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await authService.getCurrentUser();

      if (response) {
        dispatch(login(response));
      } else {
        dispatch(logout());
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}
