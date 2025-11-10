import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApiKeyManager from "./ApiKeyManager";
import UsageDashboard from "./UsageDashboard";

const Dashboard = () => {
  return (
    <Tabs defaultValue="keys" className="w-full max-w-5xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="keys">ניהול מפתחות API</TabsTrigger>
        <TabsTrigger value="dashboard">לוח בקרה ושימוש</TabsTrigger>
      </TabsList>
      <TabsContent value="keys" className="mt-6">
        <ApiKeyManager />
      </TabsContent>
      <TabsContent value="dashboard" className="mt-6">
        <UsageDashboard />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
