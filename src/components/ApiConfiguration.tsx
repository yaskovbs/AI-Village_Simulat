import React, { useState } from 'react';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiConfig } from '@/types';

interface ApiConfigurationProps {
  onSuccess: (config: ApiConfig | null) => void;
}

const ApiConfiguration: React.FC<ApiConfigurationProps> = ({ onSuccess }) => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [serperApiKey, setSerperApiKey] = useState('');
  const [errors, setErrors] = useState<{ openai?: string; serper?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSubmit = async () => {
    const newErrors: { openai?: string; serper?: string } = {};
    if (!openaiApiKey) newErrors.openai = "מפתח OpenAI הוא שדה חובה.";
    if (!serperApiKey) newErrors.serper = "מפתח Serper הוא שדה חובה.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate API key validation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulated validation logic
    if (!openaiApiKey.startsWith('sk-')) {
        newErrors.openai = "מפתח OpenAI לא תקין. הוא צריך להתחיל ב-'sk-'.";
    }
    if (serperApiKey.length < 20) {
        newErrors.serper = "מפתח Serper לא תקין. הוא קצר מדי.";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("נמצאו שגיאות באימות המפתחות.");
        setIsLoading(false);
        return;
    }


    setIsLoading(false);
    toast.success("המפתחות אומתו ונשמרו בהצלחה!");
    onSuccess({ openaiApiKey, serperApiKey });
  };

  const handleDemoMode = () => {
    toast.info("נכנסת למצב הדגמה.");
    onSuccess(null);
  };

  return (
    <Tabs defaultValue="connect" className="w-[450px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="connect">חיבור API</TabsTrigger>
        <TabsTrigger value="demo">מצב הדגמה</TabsTrigger>
      </TabsList>
      <TabsContent value="connect">
        <Card>
          <CardHeader className="text-right">
            <CardTitle>הגדרת מפתחות API</CardTitle>
            <CardDescription>הזן את מפתחות ה-API שלך כדי להתחבר.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-right">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                placeholder="••••••••••••••••••••"
                className={errors.openai ? 'border-destructive' : ''}
              />
              {errors.openai && <p className="text-xs text-destructive mt-1">{errors.openai}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serper-key">Serper API Key</Label>
              <Input
                id="serper-key"
                type="password"
                value={serperApiKey}
                onChange={(e) => setSerperApiKey(e.target.value)}
                placeholder="••••••••••••••••••••"
                className={errors.serper ? 'border-destructive' : ''}
              />
              {errors.serper && <p className="text-xs text-destructive mt-1">{errors.serper}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={validateAndSubmit} disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              שמור והתחבר
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="demo">
        <Card>
          <CardHeader className="text-right">
            <CardTitle>מצב הדגמה</CardTitle>
            <CardDescription>
              האפליקציה תפעל עם נתונים מדומים ללא צורך במפתחות API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              במצב זה, כל הפונקציונליות תהיה זמינה אך תשתמש בנתוני דמה.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDemoMode} className="w-full" variant="secondary">
              המשך במצב הדגמה
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ApiConfiguration;
