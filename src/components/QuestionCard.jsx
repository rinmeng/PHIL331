import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "./ui/separator";

export const QuestionCard = ({ question, form }) => {
  const {
    id,
    title,
    scenario,
    question: questionText,
    imagePath,
    options,
  } = question;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imagePath && (
          <div className="relative w-full h-full overflow-hidden rounded-md">
            <img
              src={imagePath}
              alt={`Scenario for ${title}`}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = "/images/placeholder.jpg";
                e.target.alt = "Image not available";
              }}
            />
          </div>
        )}
        <div className="text-base">Scenario: {scenario}</div>

        <Separator />
        {questionText && (
          <div className="font-medium text-lg text-center">
            <p>{questionText}</p>
          </div>
        )}

        <Separator />
        <FormField
          control={form.control}
          name={id}
          rules={{ required: "Please select an answer" }}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choice of answers:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  {options.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal leading-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
