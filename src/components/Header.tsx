import type { StoreStateType } from "@/app/store";
// import { ModeToggle } from "./mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { authService } from "@/appwrite";
import { logout } from "@/app/feature/authSlice";
import { Link, NavLink } from "react-router-dom";
import { Home, Pen, Text, TextQuote } from "lucide-react";
import type { ReactNode } from "react";

export default function Header() {
  const isLoggedIn = useSelector(
    (state: StoreStateType) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();

  async function handleLogout() {
    await authService.logoutUser();
    dispatch(logout());
  }

  const navLinks: {
    to: string;
    title: string;
    icon: ReactNode;
  }[] = [
    {
      to: "/",
      title: "Home",
      icon: <Home />,
    },
    {
      to: "/article/list",
      title: "Articles",
      icon: <Text />,
    },
    {
      to: "/article/my-articles",
      title: "My Articles",
      icon: <TextQuote />,
    },
    {
      to: "/article/add",
      title: "Add Article",
      icon: <Pen />,
    },
  ];

  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <Link to={"/"}>
        <p className="text-3xl font-semibold">React Blog</p>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.title}
            to={navLink.to}
            className={({ isActive }) =>
              `flex items-center gap-2 font-semibold capitalize ${isActive && "text-primary"}`
            }
          >
            {navLink.icon}
            <span>{navLink.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Button variant={"outline"} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to={"/auth"}>
            <Button variant={"outline"}>Login</Button>
          </Link>
        )}
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
}
