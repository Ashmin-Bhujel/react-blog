import { login, logout } from "@/app/feature/authSlice";
import { authService } from "@/appwrite";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
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

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
