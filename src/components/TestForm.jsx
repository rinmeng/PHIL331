import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const TestForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: getDefaultFormValues(),
  });

  // Commented out the original submission function
  /*
  const handleSubmitAll = (data) => {
    console.log("Form data:", data);
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("All form data submitted:", data);
    setSubmitted(true);
  };
  */

  const handleViewResponses = () => {
    navigate("/statistics");
  };

  // Always show the survey is archived
  return (
    <div className="lg:w-1/2 w-full mx-auto">
      <Alert variant="destructive" className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Survey Closed</AlertTitle>
        <AlertDescription>
          This survey has been completed and is now archived. Please check the
          Responses tab to view the results.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Survey Archive</CardTitle>
          <CardDescription>
            This ethical dilemma survey was conducted in March-April 2025.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Survey period: March 29 - April 1, 2025
            </span>
          </div>
          <p>
            Thank you to all participants who contributed to this research. The
            results are now available for viewing.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleViewResponses}>
            View Response Statistics
          </Button>
        </CardFooter>
      </Card>

      {/* The original form, disabled */}
      <div className="mt-8 opacity-50 pointer-events-none">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0  flex items-center justify-center z-10">
            <div className="text-xl font-semibold text-muted-foreground">
              Survey Archived
            </div>
          </div>
          <CardContent className="p-6">
            <Form {...form}>
              <form className="space-y-8">
                <div className="space-y-8">
                  {ethicalDilemmas.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      form={form}
                    />
                  ))}
                </div>

                <div className="border-t pt-8">
                  <FollowupSection form={form} />
                </div>

                <Button disabled type="button" className="w-full">
                  Submit All Responses
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
