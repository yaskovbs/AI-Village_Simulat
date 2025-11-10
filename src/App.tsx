import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import Dashboard from "@/components/Dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold">סימולטור כפר AI</h1>
                <ThemeToggle />
            </div>
        </header>
        <main className="container mx-auto p-4 md:p-8">
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
