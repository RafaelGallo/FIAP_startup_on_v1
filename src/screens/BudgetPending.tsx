import { Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

interface BudgetPendingProps {
  budgetId: string;
}

export function BudgetPending({ budgetId }: BudgetPendingProps) {
  const { state, dispatch } = useApp();
  const budget = state.selectedBudget;

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/opportunities' });
  };

  const handleSimulateApproval = () => {
    // Simulate budget approval for demo
    if (budget) {
      const approvedBudget = { ...budget, status: 'approved' as const };
      dispatch({ type: 'SET_SELECTED_BUDGET', payload: approvedBudget });
      dispatch({ type: 'SET_ROUTE', payload: `/budget/${budgetId}/approved` });
    }
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
        title="Orçamento Enviado" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Status Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Orçamento em Análise</h2>
          <p className="text-muted-foreground">
            Seu orçamento foi enviado e está aguardando a resposta do cliente
          </p>
        </div>

        {/* Budget Summary */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Resumo do Orçamento</h3>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Clock className="w-3 h-3 mr-1" />
                Pendente
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor proposto:</span>
                <span className="font-medium">{formatCurrency(budget.value)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prazo de execução:</span>
                <span className="font-medium">{budget.executionDays} dias</span>
              </div>
              
              <div className="pt-2 border-t">
                <span className="text-muted-foreground text-sm">Mensagem enviada:</span>
                <p className="mt-1 text-sm bg-muted/50 rounded-lg p-3">{budget.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Status do Processo</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Orçamento enviado</p>
                  <p className="text-sm text-muted-foreground">Hoje às 14:30</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Aguardando resposta</p>
                  <p className="text-sm text-muted-foreground">Cliente tem até 24h para responder</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-muted-foreground">3</span>
                </div>
                <div>
                  <p className="text-muted-foreground">Chat liberado</p>
                  <p className="text-sm text-muted-foreground">Após aprovação do orçamento</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SLA Information */}
        <Card className="rounded-2xl bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Tempo de resposta</h3>
                <p className="text-sm text-blue-700 mb-2">
                  Clientes geralmente respondem em até 24 horas. Você será notificado assim que houver uma resposta.
                </p>
                <p className="text-sm text-blue-700">
                  Mantenha-se disponível para possíveis esclarecimentos adicionais.
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
            onClick={handleBack}
          >
            Voltar às Oportunidades
          </Button>
          
          {/* Demo button for testing */}
          <Button 
            className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700"
            onClick={handleSimulateApproval}
          >
            🎭 Simular Aprovação (Demo)
          </Button>
        </div>
      </div>
    </div>
  );
}