import { useState } from 'react';
import Dashboard from './components/Dashboard';
import { Toaster } from "@/components/ui/sonner"
import ApiConfiguration from './components/ApiConfiguration';
import { ApiConfig } from './types';


function App() {
  const [config, setConfig] = useState<ApiConfig | null | undefined>(undefined);

  const handleConfigSuccess = (newConfig: ApiConfig | null) => {
    setConfig(newConfig);
  };

  const renderContent = () => {
    if (config === undefined) {
      return (
        <div className="flex justify-center items-center h-full">
            <ApiConfiguration onSuccess={handleConfigSuccess} />
        </div>
      );
    }
    return <Dashboard />;
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground dark">
        <div className="container mx-auto py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">לוח בקרה לניהול API</h1>
                <p className="text-muted-foreground mt-2">
                    {config === undefined ? "הגדר את החיבור שלך כדי להתחיל" : "נהל את מפתחות ה-API שלך ועקוב אחר השימוש בהם."}
                </p>
            </header>
            
            {renderContent()}

             <footer className="text-center mt-12 text-sm text-muted-foreground">
                <p>נבנה על ידי Dualite Alpha © 2025</p>
            </footer>
        </div>
        <Toaster richColors position="bottom-right" />
    </main>
  );
}

export default App;
