import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiProvider } from "@/types";
import ApiKeyCard from "./ApiKeyCard";

const providers: ApiProvider[] = [
    { id: 'openai', name: 'OpenAI', logo: 'https://seeklogo.com/images/O/openai-logo-8324A4336B-seeklogo.com.png', docsUrl: 'https://platform.openai.com/api-keys' },
    { id: 'anthropic', name: 'Anthropic (Claude)', logo: 'https://seeklogo.com/images/A/anthropic-logo-4920121213-seeklogo.com.png', docsUrl: 'https://console.anthropic.com/settings/keys' },
    { id: 'google', name: 'Google (Gemini)', logo: 'https://seeklogo.com/images/G/google-gemini-logo-A35553E176-seeklogo.com.png', docsUrl: 'https://aistudio.google.com/app/apikey' },
    { id: 'youtube', name: 'YouTube Data API v3', logo: 'https://seeklogo.com/images/Y/youtube-logo-0BCF2E6C23-seeklogo.com.png', docsUrl: 'https://developers.google.com/youtube/v3/getting-started' },
    { id: 'websearch', name: 'חיפוש באינטרנט', logo: 'https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png', docsUrl: 'https://cse.google.com/cse/' },
];


const ApiKeyManager = () => {
  return (
    <div className="space-y-8">
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>אזהרה</AlertTitle>
            <AlertDescription>
                מפתחות ה-API שלך נשמרים באופן מקומי בדפדפן בלבד. אין להשתמש בפתרון זה בסביבת ייצור (production).
            </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map(provider => (
                <ApiKeyCard key={provider.id} provider={provider} />
            ))}
        </div>
    </div>
  );
};

export default ApiKeyManager;
