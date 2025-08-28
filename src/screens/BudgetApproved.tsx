import { CheckCircle, MessageCircle, Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

interface BudgetApprovedProps {
  budgetId: string;
}

export function BudgetApproved({ budgetId }: BudgetApprovedProps) {
  const { state, dispatch } = useApp();
  const budget = state.selectedBudget;

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/home-provider' });
  };

  const handleOpenChat = () => {
    dispatch({ type: 'SET_ROUTE', payload: `/chat/${budgetId}` });
  };

  const handleSchedule = () => {
    dispatch({ type: 'SET_ROUTE', payload: `/schedule/${budgetId}` });
  };

  if (!budget) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Orçamento não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Orçamento Aprovado" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Success Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Parabéns!</h2>
          <p className="text-muted-foreground">
            Seu orçamento foi aprovado pelo cliente
          </p>
        </div>

        {/* Agreement Summary */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Resumo do Acordo</h3>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Aprovado
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor acordado:</span>
                <span className="font-bold text-green-600">{formatCurrency(budget.value)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prazo de execução:</span>
                <span className="font-medium">{budget.executionDays} dias</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">Aprovado</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <span className="text-muted-foreground text-sm">Mensagem original:</span>
              <p className="mt-1 text-sm bg-muted/50 rounded-lg p-3">{budget.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Próximos Passos</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Orçamento aprovado</p>
                  <p className="text-sm text-muted-foreground">Cliente aceitou sua proposta</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Chat liberado</p>
                  <p className="text-sm text-muted-foreground">Converse com o cliente sobre detalhes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Agendar serviço</p>
                  <p className="text-sm text-muted-foreground">Combine data e horário com o cliente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 rounded-xl"
            onClick={handleOpenChat}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Abrir Chat
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-11 rounded-xl"
            onClick={handleSchedule}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Propor Data
          </Button>
        </div>

        {/* Important Notice */}
        <Card className="rounded-2xl bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold text-sm">!</span>
              </div>
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">Importante</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Use sempre o chat do aplicativo para combinações</li>
                  <li>• Confirme todos os detalhes antes de iniciar o serviço</li>
                  <li>• Mantenha o cliente informado sobre o progresso</li>
                  <li>• Cumpra o prazo acordado para manter sua reputação</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}