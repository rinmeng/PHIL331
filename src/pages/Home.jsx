import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import supabase from "@/config/supabaseClient";
import { toast } from "sonner";

const Home = () => {
  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
    },
  });

  const fetchCount = useCallback(async () => {
    try {
      // Count total number of rows in the table instead of filtering by user
      const { count: totalCount, error } = await supabase
        .from("user_response")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      // Set count to total number of rows
      setCount(totalCount || 0);
    } catch (error) {
      console.error("Error fetching count:", error.message);
      toast.error("Error fetching count");
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Insert the form data into the database
      const { error } = await supabase.from("user_response").insert([data]);

      if (error) throw error;

      // Increment the local count and show success message
      setCount((prevCount) => prevCount + 1);
      toast.success("Response submitted successfully!");

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting response:", error.message);
      toast.error("Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  const questions = [
    "What is your name?",
    "What is your major?",
    "What is your favorite philosopher?",
    "What philosophical topic interests you most?",
    "Share a philosophical question you've been pondering lately.",
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <Card className="w-full mb-8">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold">Philosophy Questionnaire</h1>
            <p className="text-muted-foreground">Total Responses: {count}</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <FormField
                    key={num}
                    control={form.control}
                    name={`q${num}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question {num}</FormLabel>
                        <FormControl>
                          {num === 5 ? (
                            <Textarea
                              placeholder={questions[num - 1]}
                              {...field}
                              className="min-h-24"
                            />
                          ) : (
                            <Input
                              placeholder={questions[num - 1]}
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormDescription>{questions[num - 1]}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isSubmitting ||
                    Object.values(form.getValues()).some((value) => !value)
                  }
                >
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
