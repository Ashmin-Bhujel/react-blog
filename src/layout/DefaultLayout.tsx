import { login, logout } from "@/app/feature/authSlice";
import { authService } from "@/appwrite";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await authService.getCurrentUser();

        if (response) {
          dispatch(login(response));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to fetch user login data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Header />
      {!isLoading ? (
        <Outlet />
      ) : (
        <main className="container mx-auto p-4">
          <h1 className="text-center text-6xl">Fetching Data...</h1>
        </main>
      )}
    </>
  );
}
