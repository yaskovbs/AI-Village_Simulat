import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import UsageChart from "./UsageChart";
import { UsageData } from "@/types";

const mockData: UsageData[] = [
  { day: 'ראשון', openai: 120, anthropic: 80, google: 95 },
  { day: 'שני', openai: 150, anthropic: 110, google: 100 },
  { day: 'שלישי', openai: 90, anthropic: 130, google: 140 },
  { day: 'רביעי', openai: 180, anthropic: 70, google: 85 },
  { day: 'חמישי', openai: 210, anthropic: 160, google: 120 },
  { day: 'שישי', openai: 50, anthropic: 40, google: 30 },
  { day: 'שבת', openai: 20, anthropic: 15, google: 10 },
];

const UsageDashboard = () => {
  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle>שימוש ב-API בשבעת הימים האחרונים</CardTitle>
        <CardDescription>הנתונים המוצגים הם נתוני דמה לצורך הדגמה</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
            <UsageChart data={mockData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageDashboard;
