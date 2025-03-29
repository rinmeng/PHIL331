import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const FollowupSection = ({ form }) => {
  // Define follow-up questions (some with Likert scale, some with open-ended responses)
  const followupQuestions = [
    {
      id: "followup1",
      question: "How confident are you in your answers to the questions above?",
      type: "likert",
      labels: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"],
    },
    {
      id: "followup2",
      question:
        "What factors influenced your choices when answering the questions?",
      type: "text",
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
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Follow-up Questions</h2>
          <p className="text-muted-foreground">
            Please answer these follow-up questions based on your previous
            responses.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {followupQuestions.map((q) => (
            <FormField
              key={q.id}
              control={form.control}
              name={q.id}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{q.question}</FormLabel>
                  <FormControl>
                    {q.type === "likert" ? (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex justify-between"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <FormItem
                            key={value}
                            className="flex flex-col items-center space-y-1"
                          >
                            <FormControl>
                              <RadioGroupItem value={value.toString()} />
                            </FormControl>
                            <FormLabel className="text-xs font-normal text-center w-16">
                              {q.labels[value - 1]}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Textarea
                        placeholder="Enter your response"
                        className="min-h-24"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
