import { AppProvider } from './context/AppContext';
import { Router } from './Router';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Router />
        <Toaster position="top-center" />
      </div>
    </AppProvider>
  );
}