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
        question: "What factors influenced your decision the most?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup2",
        question:
          "How comfortable are you with AI making decisions that impact human lives?",
        type: "likert",
        labels: [
          "Very uncomfortable",
          "Uncomfortable",
          "Neutral",
          "Comfortable",
          "Very comfortable",
        ],
      },
      {
        id: "followup3",
        question:
          "Do you believe AI can be conscious in the same way humans are? Why or why not?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup4",
        question:
          "Should AI that demonstrates self-awareness be granted rights similar to humans? Why or why not?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup5",
        question:
          "Would your decision change if the AI were developed to simulate emotions more convincingly?",
        type: "text",
        maxWords: 100,
      },

      {
        id: "followup6",
        question:
          "Do you think AI should be subject to ethical guidelines different from those applied to humans? Why or why not?",
        type: "text",
        maxWords: 100,
      },

      {
        id: "followup7",
        question:
          "Would you be more trusting of AI if it were developed to be explainable and transparent in its decision-making?",
        type: "text",
        maxWords: 100,
      },

      {
        id: "followup8",
        question:
          "How should society balance the benefits of AI (efficiency, fairness, accuracy) with ethical concerns about AI consciousness?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup9",
        question:
          "What potential risks do you foresee if AI is granted too much decision-making power in human affairs?",
        type: "text",
        maxWords: 100,
      },
      {
        id: "followup10",
        question:
          "Do you believe human oversight should always be required for AI-driven decisions? If so, in what situations?",
        type: "text",
        maxWords: 100,
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
            responses. It is not necessary to answer all the questions, but your
            input is valuable for our research.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {followupQuestions.map((q, index) => (
            <div key={q.id}>
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
                    // Removed the "required" validation
                    validate:
                      q.type === "text"
                        ? (value) => {
                            if (!value) return true; // Allow empty values
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
                              className="flex flex-col xl:flex-row justify-between gap-1"
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
                              className="min-h-20 mt-2 w-full resize-y whitespace-normal break-words overflow-wrap-anywhere"
                              style={{
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                              }}
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
                                {100 - wordCounts[q.id] || 100} words left
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
