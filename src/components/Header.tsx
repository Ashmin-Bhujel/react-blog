import type { StoreStateType } from "@/app/store";
import { ModeToggle } from "./mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { authService } from "@/appwrite";
import { useNavigate } from "react-router-dom";
import { logout } from "@/app/feature/authSlice";

export default function Header() {
  const isLoggedIn = useSelector(
    (state: StoreStateType) => state.auth.isLoggedIn
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    await authService.logoutUser();
    dispatch(logout());
  }

  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <p className="text-3xl font-semibold">React Blog</p>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Button variant={"outline"} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
