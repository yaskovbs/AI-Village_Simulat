import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { ApiProvider } from '@/types';
import useLocalStorage from '@/hooks/use-local-storage';

interface ApiKeyCardProps {
  provider: ApiProvider;
}

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "מפתח API הוא שדה חובה." }),
});

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ provider }) => {
  const [savedKey, setSavedKey] = useLocalStorage<string | null>(`api_key_${provider.id}`, null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSavedKey(values.apiKey);
    toast.success(`מפתח API עבור ${provider.name} נשמר בהצלחה!`);
    form.reset();
  }
  
  const handleRemoveKey = () => {
    setSavedKey(null);
    toast.info(`מפתח API עבור ${provider.name} הוסר.`);
  }

  const maskedKey = savedKey ? `••••••••••••${savedKey.slice(-4)}` : '';

  return (
    <Card>
      <CardHeader className="text-right">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <img src={provider.logo} alt={`${provider.name} logo`} className="w-6 h-6 object-contain" />
                    {provider.name}
                </CardTitle>
                <CardDescription>
                    <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                        השג מפתח API
                    </a>
                </CardDescription>
            </div>
            {savedKey && <Badge variant="secondary">שמור</Badge>}
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            {savedKey ? (
                 <div className="space-y-2 text-right">
                    <Label htmlFor={`saved-key-${provider.id}`}>מפתח שמור</Label>
                    <Input id={`saved-key-${provider.id}`} value={maskedKey} readOnly disabled />
                 </div>
            ) : (
                <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                    <FormItem className="text-right">
                    <FormLabel>הזן מפתח API</FormLabel>
                    <FormControl>
                        <Input placeholder="sk-..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
          </CardContent>
          <CardFooter className="flex justify-start">
            {savedKey ? (
                <Button variant="destructive" type="button" onClick={handleRemoveKey}>הסר מפתח</Button>
            ) : (
                <Button type="submit">שמור מפתח</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ApiKeyCard;
