import { TestForm } from "@/components/TestForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supabase from "@/config/supabaseClient";
import { toast } from "sonner";

const Home = () => {
  const handleSubmit = async (data) => {
    try {
      // Insert the form data into the database
      const { error } = await supabase.from("user_responses").insert([data]);

      if (error) throw error;
      toast.success("Test responses submitted successfully!");
    } catch (error) {
      console.error("Error submitting responses:", error.message);
      toast.error("Failed to submit responses");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col items-center container mx-auto space-y-8">
        <Card className="w-full lg:w-1/2">
          <CardHeader className="text-center text-2xl">
            <CardTitle>Philosophy Assessment</CardTitle>
            <CardDescription className="flex">
              This test is designed to assess your philosophical beliefs and
              values. Please answer the questions honestly and to the best of
              your ability. By answering or submitting these questions, you
              confirm that your responses will be recorded and you consent to
              the use of this data for research purposes.
            </CardDescription>
          </CardHeader>
        </Card>
        <TestForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;
