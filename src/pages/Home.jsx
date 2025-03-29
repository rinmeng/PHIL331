import { TestForm } from "@/components/TestForm";
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
      <div className="flex flex-col items-center container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Philosophy Assessment
        </h1>
        <TestForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;
