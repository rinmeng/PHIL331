import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const QuestionCard = ({ question, form }) => {
  const { id, title, scenario, imagePath, options } = question;

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="scenario-container">
          <p className="mb-4">{scenario}</p>
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
        </div>

        <FormField
          control={form.control}
          name={`${id}`}
          rules={{ required: "Please select an answer" }}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select your answer:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  {options.map((option) => (
                    <FormItem
                      key={option.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <FormLabel className="font-normal">
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
