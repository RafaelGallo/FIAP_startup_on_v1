import { Clock, Edit, X, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';

interface AwaitingApplicationsProps {
  requestId: string;
}

export function AwaitingApplications({ requestId }: AwaitingApplicationsProps) {
  const { state, dispatch } = useApp();
  const request = state.selectedRequest;

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/home-contractor' });
  };

  const handleEdit = () => {
    // Navigate back to edit the request
    dispatch({ type: 'SET_ROUTE', payload: `/hire/${request?.category}/briefing` });
  };

  const handleCancel = () => {
    // Cancel the request and go back home
    dispatch({ type: 'SET_ROUTE', payload: '/home-contractor' });
  };

  const handleSimulateApplications = () => {
    // Simulate receiving applications for demo
    dispatch({ type: 'SET_ROUTE', payload: `/request/${requestId}/proposals` });
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Solicitação não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Aguardando Candidatos" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Status Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Solicitação Publicada</h2>
          <p className="text-muted-foreground">
            Sua solicitação foi enviada e profissionais qualificados podem vê-la
          </p>
        </div>

        {/* Request Summary */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium flex-1">{request.title}</h3>
              <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {request.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Local:</span>
                <p className="font-medium">{request.neighborhood}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Prazo:</span>
                <p className="font-medium">{new Date(request.deadline).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            {request.budgetRange && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <span className="text-green-800 text-sm">Orçamento máximo:</span>
                <p className="text-green-700 font-medium">
                  Até R$ {request.budgetRange.max.toLocaleString('pt-BR')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Status Atual</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">0 candidaturas recebidas</p>
                  <p className="text-sm text-muted-foreground">Profissionais estão visualizando sua solicitação</p>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  ⏱️ Geralmente você recebe as primeiras propostas em até 2 horas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-11 rounded-xl"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Solicitação
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-11 rounded-xl text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleCancel}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar Solicitação
          </Button>

          {/* Demo button for testing */}
          <Button 
            className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700"
            onClick={handleSimulateApplications}
          >
            🎭 Simular Candidaturas (Demo)
          </Button>
        </div>

        {/* Tips */}
        <Card className="rounded-2xl bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold text-sm">💡</span>
              </div>
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">Dicas enquanto aguarda</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Você será notificado a cada nova proposta recebida</li>
                  <li>• Analise a reputação dos profissionais com cuidado</li>
                  <li>• Compare propostas antes de tomar uma decisão</li>
                  <li>• Você pode editar sua solicitação a qualquer momento</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}