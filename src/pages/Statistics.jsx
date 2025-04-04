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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ethicalDilemmas } from "@/lib/questions";
import FollowupStatistics from "./FollowupStatistics";
// Import Papa Parse for CSV parsing
import Papa from "papaparse";
// Import the CSV data as raw text
import csvDataRaw from "@/assets/user_response_rows.csv?raw";

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    q1: [],
    q2: [],
    q3: [],
    q4: [],
    q5: [],
  });
  const [totalResponses, setTotalResponses] = useState(0);

  useEffect(() => {
    // Parse the CSV data
    const fetchData = async () => {
      try {
        // Parse the CSV data using Papa Parse
        const parsedData = Papa.parse(csvDataRaw, {
          header: true,
          skipEmptyLines: true,
        }).data;

        setTotalResponses(parsedData.length);

        // Process the data for visualization
        const processedStats = {
          q1: formatForRadarChart(countResponses(parsedData, "q1")),
          q2: formatForRadarChart(countResponses(parsedData, "q2")),
          q3: formatForRadarChart(countResponses(parsedData, "q3")),
          q4: formatForRadarChart(countResponses(parsedData, "q4")),
          q5: formatForRadarChart(countResponses(parsedData, "q5")),
        };

        setStats(processedStats);
      } catch (error) {
        console.error("Error processing statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to count responses for each option
  const countResponses = (data, questionKey) => {
    const counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    data.forEach((response) => {
      const answer = response[questionKey];
      if (answer) {
        counts[answer] = (counts[answer] || 0) + 1;
      }
    });

    return counts;
  };

  // Format data for radar chart
  const formatForRadarChart = (counts) => {
    return [
      { option: "Option 1", value: counts["1"] || 0 },
      { option: "Option 2", value: counts["2"] || 0 },
      { option: "Option 3", value: counts["3"] || 0 },
      { option: "Option 4", value: counts["4"] || 0 },
    ];
  };

  // Get option text by question id and option value
  const getOptionText = (questionId, optionValue) => {
    const question = ethicalDilemmas.find((q) => q.id === questionId);
    if (!question) return "";

    const option = question.options.find((o) => o.value === optionValue);
    return option ? option.label : "";
  };

  // Format chart title
  const getChartTitle = (questionId) => {
    const question = ethicalDilemmas.find((q) => q.id === questionId);
    return question ? question.title : questionId;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, questionId }) => {
    if (active && payload && payload.length) {
      const optionNumber = payload[0].payload.option.replace("Option ", "");
      const optionText = getOptionText(questionId, optionNumber);
      const value = payload[0].value;
      const percentage =
        totalResponses > 0 ? Math.round((value / totalResponses) * 100) : 0;

      return (
        <Card className="">
          <CardHeader>
            <CardTitle>{payload[0].payload.option}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {optionText}
            </CardDescription>
            <CardContent>
              {value} responses ({percentage}%)
            </CardContent>
          </CardHeader>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-8 ">
      <div className="m-5">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold">Response Statistics</h1>
        </div>

        <Alert variant={"destructive"} className="mb-6 max-w-4xl mx-auto">
          <AlertCircle />
          <AlertTitle>Archived Survey Data</AlertTitle>
          <AlertDescription>
            Supabase was leveraged for data collection and storage, but since
            this survey is conducted, the user responses are stored & read from
            a CSV file and not in the database.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(stats).map((questionKey) => (
            <Card key={questionKey} className="w-full gap-0">
              <CardHeader className="items-center">
                <CardTitle>{getChartTitle(questionKey)}</CardTitle>
                <CardDescription className="text-center">
                  {ethicalDilemmas.find((q) => q.id === questionKey)
                    ?.question || ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0 px-0">
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-[250px] w-full" />
                  </div>
                ) : (
                  <div
                    className="mx-auto
                   aspect-square max-h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={stats[questionKey]}
                        outerRadius={100}
                        className="px-2"
                      >
                        <PolarGrid />
                        <PolarAngleAxis
                          dataKey="option"
                          tick={{ fontSize: 13, dy: 5 }} // Adjust dy for better spacing
                        />
                        <Tooltip
                          content={<CustomTooltip questionId={questionKey} />}
                        />
                        <Radar
                          name="Responses"
                          dataKey="value"
                          stroke="var(--chart-3)"
                          fill="var(--chart-5)"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Total responses: {totalResponses}{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>

                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing response distribution across all options
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <FollowupStatistics />
      </div>
    </div>
  );
};

export default Statistics;
