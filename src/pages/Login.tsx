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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "@/appwrite";
import { useDispatch } from "react-redux";
import { login } from "@/app/feature/authSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { AuthFormSchema, type AuthFormType } from "@/types/authFormType";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [seePassword, setSeePassword] = useState(false);

  // Login form
  const loginForm = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  async function onSubmitHandler(data: AuthFormType) {
    const response = await authService.loginUser(data);

    if (response) {
      const currentUser = await authService.getCurrentUser();
      dispatch(login(currentUser));
    } else {
      loginForm.setError("root", { message: "Invalid user credentials" });
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to={"/auth/signup"}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmitHandler)}
              className="space-y-6"
              id="login-form"
            >
              {/* Email */}
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          id="password"
                          type={seePassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          variant={"outline"}
                          onClick={() => setSeePassword(!seePassword)}
                        >
                          {seePassword ? <Eye /> : <EyeClosed />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            {/* Display root form errors */}
            {loginForm.formState.errors.root && (
              <div className="text-destructive mt-2 text-sm">
                {loginForm.formState.errors.root.message}
              </div>
            )}
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
