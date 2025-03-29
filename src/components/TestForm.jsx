import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionCard } from "./QuestionCard";
import { FollowupSection } from "./FollowupSection";
import media from "@/assets/media.png";

export const TestForm = ({ onSubmit }) => {
  const [questions] = useState([
    {
      id: 1,
      title: "Question 1",
      scenario: "This is the first scenario of the test.",
      imagePath: media,
      options: [
        { id: "q1_a", label: "Option A" },
        { id: "q1_b", label: "Option B" },
        { id: "q1_c", label: "Option C" },
        { id: "q1_d", label: "Option D" },
      ],
    },
    {
      id: 2,
      title: "Question 2",
      scenario: "This is scenario 2 of the test.",
      imagePath: media,
      options: [
        { id: "q2_a", label: "Option A" },
        { id: "q2_b", label: "Option B" },
        { id: "q2_c", label: "Option C" },
        { id: "q2_d", label: "Option D" },
      ],
    },
    {
      id: 3,
      title: "Question 3",
      scenario: "This is scenario 3 of the test.",
      imagePath: media,
      options: [
        { id: "q3_a", label: "Option A" },
        { id: "q3_b", label: "Option B" },
        { id: "q3_c", label: "Option C" },
        { id: "q3_d", label: "Option D" },
      ],
    },
    {
      id: 4,
      title: "Question 4",
      scenario: "This is scenario 4 of the test.",
      imagePath: media,
      options: [
        { id: "q4_a", label: "Option A" },
        { id: "q4_b", label: "Option B" },
        { id: "q4_c", label: "Option C" },
        { id: "q4_d", label: "Option D" },
      ],
    },
    {
      id: 5,
      title: "Question 5",
      scenario: "This is scenario 5 of the test.",
      imagePath: media,
      options: [
        { id: "q5_a", label: "Option A" },
        { id: "q5_b", label: "Option B" },
        { id: "q5_c", label: "Option C" },
        { id: "q5_d", label: "Option D" },
      ],
    },
  ]);

  const form = useForm({
    defaultValues: {
      // Initialize form values for questions
      ...questions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {}),
      // Initialize form values for follow-up questions
      followup1: "",
      followup2: "",
      followup3: "",
      followup4: "",
      followup5: "",
    },
  });

  const handleSubmitAll = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("All form data submitted:", data);
  };

  return (
    <div className="lg:w-1/2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitAll)}
          className="space-y-8"
        >
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Scenario Questions</h2>
            {questions.map((question) => (
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
