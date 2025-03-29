import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { QuestionCard } from "./QuestionCard";
import { FollowupSection } from "./FollowupSection";
import { ethicalDilemmas, getDefaultFormValues } from "@/lib/questions";

export const TestForm = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: getDefaultFormValues(),
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
