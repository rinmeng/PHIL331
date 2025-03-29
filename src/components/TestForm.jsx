import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { QuestionCard } from "./QuestionCard";
import { FollowupSection } from "./FollowupSection";
import media from "@/assets/media.png";

export const TestForm = ({ onSubmit }) => {
  const [questions] = useState([
    {
      id: "q1",
      title: "AI Caregiver & Human Autonomy",
      scenario: `
      It's 2035, hospitals use advanced AI caregivers to assist elderly patients. 
      These AI caregivers, equipped with sophisticated machine learning models and robotic precision, 
      can provide medication, companionship, and even emotional support. 
      Studies show that patients cared for by AI exhibit better health outcomes than those 
      cared for by overworked human nurses. However, some patients express discomfort, 
      stating they feel "trapped" under the AI's constant monitoring and prefer human interaction.`,
      question:
        "Should hospitals prioritize the statistical health benefits of AI caregivers over patient autonomy and comfort with human care?",
      imagePath: media,
      options: [
        {
          value: "1",
          label:
            "Mandate AI caregivers for all elderly patients due to superior health benefits, even if some patients feel uncomfortable",
        },
        {
          value: "2",
          label:
            "Require human caregivers for those who request them, even if they are less effective",
        },
        {
          value: "3",
          label:
            "Allow a hybrid approach where AI caregivers handle most care, but human nurses check in periodically",
        },
        {
          value: "4",
          label:
            "Ban AI caregivers entirely, prioritizing human dignity and autonomy over efficiency",
        },
      ],
    },
    {
      id: "q2",
      title: "Question 2",
      scenario: "This is scenario 2 of the test.",
      question: "What is your response to scenario 2?",
      imagePath: media,
      options: [
        { value: "1", label: "Option A" },
        { value: "2", label: "Option B" },
        { value: "3", label: "Option C" },
        { value: "4", label: "Option D" },
      ],
    },
    {
      id: "q3",
      title: "Question 3",
      scenario: "This is scenario 3 of the test.",
      question: "What is your response to scenario 3?",
      imagePath: media,
      options: [
        { value: "1", label: "Option A" },
        { value: "2", label: "Option B" },
        { value: "3", label: "Option C" },
        { value: "4", label: "Option D" },
      ],
    },
    {
      id: "q4",
      title: "Question 4",
      scenario: "This is scenario 4 of the test.",
      question: "What is your response to scenario 4?",
      imagePath: media,
      options: [
        { value: "1", label: "Option A" },
        { value: "2", label: "Option B" },
        { value: "3", label: "Option C" },
        { value: "4", label: "Option D" },
      ],
    },
    {
      id: "q5",
      title: "Question 5",
      scenario: "This is scenario 5 of the test.",
      question: "What is your response to scenario 5?",
      imagePath: media,
      options: [
        { value: "1", label: "Option A" },
        { value: "2", label: "Option B" },
        { value: "3", label: "Option C" },
        { value: "4", label: "Option D" },
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
    console.log("Form data:", data);
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
