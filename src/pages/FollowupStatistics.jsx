import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { followupQuestions } from "@/lib/questions";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
// Import Papa Parse for CSV parsing
import Papa from "papaparse";
// Import the CSV data as raw text
import csvDataRaw from "@/assets/user_response_rows.csv?raw";

const FollowupStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [likertData, setLikertData] = useState({});
  const [textResponses, setTextResponses] = useState({});
  const [totalResponses, setTotalResponses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parse the CSV data using Papa Parse
        const data = Papa.parse(csvDataRaw, {
          header: true,
          skipEmptyLines: true,
        }).data;

        setTotalResponses(data.length);

        // Get follow-up question IDs
        // const followupIds = followupQuestions.map((q) => q.id);

        // Process Likert scale questions
        const likertQuestions = followupQuestions.filter(
          (q) => q.type === "likert"
        );
        const likertResults = {};

        likertQuestions.forEach((question) => {
          const counts = {};
          // Initialize counts for all possible options
          question.labels.forEach((label) => {
            counts[label] = 0;
          });

          // Count responses
          data.forEach((response) => {
            const answer = response[question.id];
            if (answer && question.labels[answer - 1]) {
              counts[question.labels[answer - 1]] =
                (counts[question.labels[answer - 1]] || 0) + 1;
            }
          });

          // Format for chart
          const chartData = Object.entries(counts).map(([label, count]) => ({
            label,
            count,
          }));

          likertResults[question.id] = chartData;
        });

        setLikertData(likertResults);

        // Process text responses
        const textQuestions = followupQuestions.filter(
          (q) => q.type === "text"
        );
        const textResults = {};

        textQuestions.forEach((question) => {
          const responses = data
            .map((response) => response[question.id])
            .filter(Boolean) // Remove empty responses
            .slice(0, 10); // Limit to 10 responses for display

          textResults[question.id] = responses;
        });

        setTextResponses(textResults);
      } catch (error) {
        console.error("Error processing follow-up statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate chart config for bar charts
  const chartConfig = {
    count: {
      label: "Responses",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-center">
          Follow-up Question Statistics
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {followupQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Likert Scale Questions */}
          {followupQuestions
            .filter((q) => q.type === "likert")
            .map((question) => (
              <Card key={question.id} className="w-full">
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                  <CardDescription>Likert Scale Responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[300px] w-full items-center flex justify-center"
                    style={{ minHeight: "300px", position: "relative" }}
                  >
                    {likertData[question.id] &&
                    likertData[question.id].length > 0 ? (
                      <ChartContainer
                        config={chartConfig}
                        className="w-full h-full"
                      >
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={likertData[question.id]}
                            layout="vertical"
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid horizontal={false} vertical={true} />
                            <XAxis type="number" />
                            <YAxis
                              type="category"
                              dataKey="label"
                              width={100}
                              tickLine={true}
                              axisLine={true}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                              dataKey="count"
                              fill="var(--chart-5)"
                              radius={[0, 6, 6, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    ) : (
                      <div className="text-muted-foreground">
                        No data available
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Total responses: {totalResponses}{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>

                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Distribution across {question.labels.length} response
                    options
                  </div>
                </CardFooter>
              </Card>
            ))}

          {/* Text Response Questions */}
          {followupQuestions
            .filter((q) => q.type === "text")
            .map((question) => (
              <Card key={question.id} className="w-full">
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                  <CardDescription>Text Responses (Sample)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full pr-4">
                    {textResponses[question.id]?.length > 0 ? (
                      textResponses[question.id].map((response, index) => (
                        <Card key={index} className="mb-3 bg-muted/50">
                          <CardContent className="p-4">
                            <blockquote className="border-l-2 border-muted-foreground pl-4 italic">
                              "{response}"
                            </blockquote>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No text responses available
                      </p>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Total responses: {textResponses[question.id]?.length || 0} /{" "}
                    {totalResponses}
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Showing sample of max 10 responses
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default FollowupStatistics;
