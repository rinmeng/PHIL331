import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Change to React Router
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { QuestionCard } from "./QuestionCard";
import { FollowupSection } from "./FollowupSection";
import { ethicalDilemmas, getDefaultFormValues } from "@/lib/questions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export const TestForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: getDefaultFormValues(),
  });

  const handleSubmitAll = (data) => {
    console.log("Form data:", data);
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("All form data submitted:", data);
    setSubmitted(true);
  };

  const handleViewResponses = () => {
    navigate("/statistics"); // Use navigate instead of router.push
  };

  if (submitted) {
    return (
      <div className="lg:w-1/2 w-full mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Thank You!</CardTitle>
            <CardDescription>
              Your responses have been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            We appreciate your participation in this ethical dilemma survey.
            Your responses will help us better understand ethical
            decision-making.
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleViewResponses}>
              View Response Statistics
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:w-1/2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitAll)}
          className="space-y-8"
        >
          <div className="space-y-8">
            {ethicalDilemmas.map((question) => (
              <QuestionCard key={question.id} question={question} form={form} />
            ))}
          </div>

          <div className="border-t pt-8">
            <FollowupSection form={form} />
          </div>

          <Button type="submit" className="w-full">
            Submit All Responses
          </Button>
        </form>
      </Form>
    </div>
  );
};
