import type { StoreStateType } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const isLoggedIn = useSelector(
    (state: StoreStateType) => state.auth.isLoggedIn
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}
