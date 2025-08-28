import { useApp } from './context/AppContext';

// Import all screens
import { ProfileSelection } from './screens/ProfileSelection';
import { Login } from './screens/Login';
import { HomeProvider } from './screens/HomeProvider';
import { HomeContractor } from './screens/HomeContractor';
import { ServiceOpportunities } from './screens/ServiceOpportunities';
import { ServiceListByCategory } from './screens/ServiceListByCategory';
import { RequestDetails } from './screens/RequestDetails';
import { BudgetPending } from './screens/BudgetPending';
import { BudgetApproved } from './screens/BudgetApproved';
import { Chat } from './screens/Chat';
import { HireService } from './screens/HireService';
import { ServiceBriefing } from './screens/ServiceBriefing';
import { AwaitingApplications } from './screens/AwaitingApplications';
import { EvaluateProposals } from './screens/EvaluateProposals';

export function Router() {
  const { state } = useApp();
  const route = state.currentRoute;

  // Helper function to parse route parameters
  const parseRoute = (route: string) => {
    const parts = route.split('/').filter(Boolean);
    return {
      path: parts,
      query: new URLSearchParams(route.split('?')[1] || '')
    };
  };

  const { path, query } = parseRoute(route);

  // Route matching
  if (route === '/role' || route === '/') {
    return <ProfileSelection />;
  }

  if (route.startsWith('/login')) {
    const role = query.get('role') as 'provider' | 'contractor';
    return <Login role={role || 'provider'} />;
  }

  if (route === '/home-provider') {
    return <HomeProvider />;
  }

  if (route === '/home-contractor') {
    return <HomeContractor />;
  }

  if (route === '/opportunities') {
    return <ServiceOpportunities />;
  }

  if (route.startsWith('/opportunities/') && path.length === 2) {
    const category = path[1];
    return <ServiceListByCategory category={category} />;
  }

  if (route.startsWith('/opportunities/') && path.length === 3) {
    const category = path[1];
    const requestId = path[2];
    return <RequestDetails category={category} requestId={requestId} />;
  }

  if (route.startsWith('/budget/') && route.includes('/pending')) {
    const budgetId = path[1];
    return <BudgetPending budgetId={budgetId} />;
  }

  if (route.startsWith('/budget/') && route.includes('/approved')) {
    const budgetId = path[1];
    return <BudgetApproved budgetId={budgetId} />;
  }

  if (route.startsWith('/chat/')) {
    const threadId = path[1];
    return <Chat threadId={threadId} />;
  }

  if (route === '/hire') {
    return <HireService />;
  }

  if (route.startsWith('/hire/') && route.includes('/briefing')) {
    const category = path[1];
    return <ServiceBriefing category={category} />;
  }

  if (route.startsWith('/request/') && route.includes('/waiting')) {
    const requestId = path[1];
    return <AwaitingApplications requestId={requestId} />;
  }

  if (route.startsWith('/request/') && route.includes('/proposals')) {
    const requestId = path[1];
    return <EvaluateProposals requestId={requestId} />;
  }

  // Schedule and other screens would be implemented here
  if (route.startsWith('/schedule/')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Agendamento</h2>
          <p className="text-muted-foreground mb-4">Tela de agendamento será implementada aqui</p>
          <p className="text-sm text-muted-foreground">
            Funcionalidade: Calendário para escolher data e horário do serviço
          </p>
        </div>
      </div>
    );
  }

  if (route.startsWith('/service/') && route.includes('/summary')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Resumo do Serviço</h2>
          <p className="text-muted-foreground mb-4">Tela de resumo final será implementada aqui</p>
          <p className="text-sm text-muted-foreground">
            Funcionalidade: Detalhes finais, instruções de chegada, política de cancelamento
          </p>
        </div>
      </div>
    );
  }

  if (route === '/forgot-password') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Recuperar Senha</h2>
          <p className="text-muted-foreground mb-4">Tela de recuperação de senha será implementada aqui</p>
          <p className="text-sm text-muted-foreground">
            Funcionalidade: Formulário para recuperação de senha por email
          </p>
        </div>
      </div>
    );
  }

  // 404 - Route not found
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground">Rota: {route}</p>
      </div>
    </div>
  );
}