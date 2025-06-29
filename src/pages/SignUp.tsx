import { login } from "@/app/feature/authSlice";
import { authService } from "@/appwrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AccountAuthType } from "@/types/appwriteTypes";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm<AccountAuthType>();
  const dispatch = useDispatch();

  async function onSubmitHandler(data: AccountAuthType) {
    const response = await authService.createAccount(data);

    if (response) {
      const currentUser = await authService.getCurrentUser();
      dispatch(login(currentUser));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
          <CardAction>
            <Link to={"/auth"}>
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)} id="signup-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Enter your name"
                  {...register("name")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="signup-form">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
