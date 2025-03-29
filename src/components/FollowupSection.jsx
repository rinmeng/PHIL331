import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useMemo } from "react";

export const FollowupSection = ({ form }) => {
  // Define follow-up questions (some with Likert scale, some with open-ended responses)
  const followupQuestions = useMemo(
    () => [
      {
        id: "followup1",
        question:
          "How confident are you in your answers to the questions above?",
        type: "likert",
        labels: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"],
      },
      {
        id: "followup2",
        question:
          "What factors influenced your choices when answering the questions?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup3",
        question:
          "How much would you agree that the scenarios presented were realistic?",
        type: "likert",
        labels: [
          "Strongly disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly agree",
        ],
      },
      {
        id: "followup4",
        question:
          "Describe any additional information that would have helped you make your decisions.",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup5",
        question:
          "How satisfied were you with the available options for each question?",
        type: "likert",
        labels: [
          "Very unsatisfied",
          "Unsatisfied",
          "Neutral",
          "Satisfied",
          "Very satisfied",
        ],
      },
    ],
    []
  );

  // Word count state for each text question
  const [wordCounts, setWordCounts] = useState({});

  // Function to count words in text
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Set up validation for text fields
  useEffect(() => {
    // Find all text questions
    const textQuestions = followupQuestions.filter((q) => q.type === "text");

    // Add validation rules to each text field
    textQuestions.forEach((q) => {
      const fieldName = q.id;
      const currentValidator = form.getFieldState(fieldName).error;

      if (!currentValidator) {
        form.register(fieldName, {
          validate: (value) => {
            const wordCount = countWords(value);
            return wordCount <= 100 || "Response exceeds 100 words limit";
          },
        });
      }
    });
  }, [form, followupQuestions]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl sm:text-2xl font-bold">Follow-up Questions</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Please answer these follow-up questions based on your previous
            responses.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {followupQuestions.map((q, index) => (
            <div key={q.id} className="space-y-3">
              {index > 0 && <Separator className="my-4 sm:my-6" />}
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div
                    className="flex-shrink-0 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full
                   bg-primary text-primary-foreground font-medium text-sm"
                  >
                    {index + 1}
                  </div>
                  <FormLabel className="text-base sm:text-lg font-medium">
                    {q.question}
                  </FormLabel>
                </div>

                <FormField
                  control={form.control}
                  name={q.id}
                  rules={{
                    required: "This field is required",
                    validate:
                      q.type === "text"
                        ? (value) => {
                            const wordCount = countWords(value);
                            return (
                              wordCount <= 100 ||
                              "Response exceeds 100 words limit"
                            );
                          }
                        : undefined,
                  }}
                  render={({ field }) => (
                    <FormItem className="pl-9 w-full">
                      <FormControl>
                        {q.type === "likert" ? (
                          <div className="w-full mt-2">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row sm:justify-between gap-1"
                            >
                              {[1, 2, 3, 4, 5].map((value) => (
                                <FormItem
                                  key={value}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={value.toString()} />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {q.labels[value - 1]}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </div>
                        ) : (
                          <div className="relative">
                            <Textarea
                              placeholder="Enter your response"
                              className="min-h-20 mt-2"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                // Update word count
                                const count = countWords(e.target.value);
                                setWordCounts((prev) => ({
                                  ...prev,
                                  [q.id]: count,
                                }));
                              }}
                            />
                            <div className="text-xs text-muted-foreground mt-1 flex justify-end items-center">
                              <span
                                className={`font-medium ${
                                  (wordCounts[q.id] || 0) > 100
                                    ? "text-destructive"
                                    : ""
                                }`}
                              >
                                {100 - wordCounts[q.id] || 100} words maximum
                              </span>
                            </div>
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
