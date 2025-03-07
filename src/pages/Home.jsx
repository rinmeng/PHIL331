import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/utils/AuthProvider";
import supabase from "@/config/supabaseClient";
import { toast } from "sonner";

const Home = ({ setOpenLoginDialog }) => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  const fetchCount = useCallback(async () => {
    try {
      const userIdToFetch = user
        ? user.id
        : "7ce00f22-7b01-4ff2-ab96-65589ab0746c";

      const { data, error } = await supabase
        .from("user_response")
        .select("count")
        .eq("user_id", userIdToFetch)
        .single();

      if (error) {
        // If no row exists yet, set count to 0
        if (error.code === "PGRST116") {
          setCount(0);
          return;
        }
        throw error;
      }

      if (data) setCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error.message);
      toast.error("Error fetching count");
    }
  }, [user]);
  const incrementCount = async () => {
    if (!user) {
      toast.error("Please login to increment count");
      setOpenLoginDialog(true);
      return;
    }

    try {
      const newCount = count + 1;
      // upsert will create new row if user_id doesn't exist
      // or update count if user_id exists
      const { error } = await supabase.from("user_response").upsert(
        {
          user_id: user.id, // Primary Key
          count: newCount,
        },
        {
          onConflict: "user_id", // specify which column to check for conflicts
        }
      );

      if (error) throw error;
      setCount(newCount);
      toast.success("Count incremented successfully!");
    } catch (error) {
      console.error("Error incrementing count:", error.message);
      toast.error("Failed to increment count");
    }
  };

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return (
    <div className="h-screen">
      <div className="flex w-full items-center justify-center mt-4 gap-4">
        <Card className={"w-3/4 lg:w-1/4"}>
          <CardHeader className={"text-center text-5xl"}>Home</CardHeader>
          <CardContent className={"text-center text-4xl"}>
            <h1>Count: {count}</h1>
          </CardContent>
          <CardFooter className={"flex justify-center"}>
            <Button onClick={incrementCount}>
              {user ? "Increment Count" : "Login to Increment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
