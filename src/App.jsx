import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Citation from "@/pages/Citation";
import Team from "@/pages/Team";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/AuthProvider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function App() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const { signIn } = useAuth();
  const [feedbackMessage, setFeedbackMessage] = useState({
    title: "",
    description: "",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const { error } = await signIn({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        setFeedbackMessage({ title: "Error", description: error.message });
        return;
      }

      // Close the dialog on successful sign in
      setOpenLoginDialog(false);
      setFeedbackMessage({
        title: "Success",
        description: "You have been logged in as " + values.email,
      });
    } catch (error) {
      console.error("Error:", error.message);
      setFeedbackMessage({ title: "Error", description: error.message });
    }
  }

  // dark mode
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  useEffect(() => {
    if (feedbackMessage.title && feedbackMessage.description) {
      toast.success(feedbackMessage.description, feedbackMessage.title);
      setFeedbackMessage({ title: "", description: "" });
    }
  }, [feedbackMessage]);

  return (
    <>
      <Navbar
        setOpenLoginDialog={setOpenLoginDialog}
        setFeedbackMessage={setFeedbackMessage}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setOpenLoginDialog={setOpenLoginDialog} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/citation" element={<Citation />} />
        <Route path="/team" element={<Team />} />
      </Routes>

      {/* Login Dialog */}
      <Dialog
        open={openLoginDialog}
        onOpenChange={setOpenLoginDialog}
        className="max-w-md"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              If you were provided with an account to do the test, please sign
              in here.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" onSubmit={onSubmit}>
                Sign In
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}

export default App;
