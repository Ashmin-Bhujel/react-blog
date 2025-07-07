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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthFormSchema, type AuthFormType } from "@/types/authFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [seePassword, setSeePassword] = useState(false);

  // Signup form
  const signupForm = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  async function onSubmitHandler(data: AuthFormType) {
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
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmitHandler)}
              id="signup-form"
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="name"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={signupForm.control}
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
                control={signupForm.control}
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
          </Form>
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
