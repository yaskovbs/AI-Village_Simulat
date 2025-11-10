import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';

export function AgentSettingsPage() {
  const [webSearchApiKey, setWebSearchApiKey] = React.useState('');
  const [youtubeApiKey, setYoutubeApiKey] = React.useState('');
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const handleSave = () => {
    const settings = {
      webSearchApiKey,
      youtubeApiKey,
      isConfirmed,
    };
    console.log("הגדרות נשמרות:", settings);
    alert("ההגדרות נשמרו! בדוק את הקונסולה לפרטים.");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>הגדרות סוכן</CardTitle>
        <CardDescription>נהל כאן את מפתחות ה-API והרשאות הגישה.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="web-search-key">מפתח API לחיפוש באינטרנט</Label>
              <Input 
                id="web-search-key" 
                placeholder="הזן את מפתח ה-API..." 
                value={webSearchApiKey}
                onChange={(e) => setWebSearchApiKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="youtube-key">מפתח API של YouTube</Label>
              <Input 
                id="youtube-key" 
                placeholder="הזן את מפתח ה-API..." 
                value={youtubeApiKey}
                onChange={(e) => setYoutubeApiKey(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox 
                id="terms" 
                checked={isConfirmed}
                onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                אני מאשר/ת ומבין/ה את מגבלות השימוש במפתחות ה-API.
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button onClick={handleSave}>שמור הגדרות</Button>
      </CardFooter>
    </Card>
  );
}
