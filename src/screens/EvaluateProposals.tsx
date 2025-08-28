import { ArrowLeft, MessageCircle, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { ReputationCard } from '../components/ReputationCard';
import { useApp } from '../context/AppContext';
import { mockBudgets, sampleProviderReputation } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

interface EvaluateProposalsProps {
  requestId: string;
}

export function EvaluateProposals({ requestId }: EvaluateProposalsProps) {
  const { state, dispatch } = useApp();
  const request = state.selectedRequest;

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: `/request/${requestId}/waiting` });
  };

  const handleAcceptProposal = (budget: any) => {
    // Accept the proposal and navigate to chat
    dispatch({ type: 'SET_SELECTED_BUDGET', payload: { ...budget, status: 'approved' } });
    dispatch({ type: 'SET_ROUTE', payload: `/chat/${budget.id}` });
  };

  const handleViewProfile = (providerId: string) => {
    // Navigate to provider profile (not implemented in this demo)
    console.log('View profile for provider:', providerId);
  };

  // Mock proposals with different providers
  const proposals = [
    {
      ...mockBudgets[0],
      providerName: 'João Silva',
      providerReputation: { ...sampleProviderReputation, averageRating: 4.8, totalReviews: 124 }
    },
    {
      ...mockBudgets[1],
      providerName: 'Carlos Santos',
      providerReputation: { ...sampleProviderReputation, averageRating: 4.5, totalReviews: 87 }
    }
  ];

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
        title="Avaliar Propostas" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">
            {proposals.length} proposta{proposals.length !== 1 ? 's' : ''} recebida{proposals.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-muted-foreground">
            Analise as propostas e escolha o melhor profissional
          </p>
        </div>

        {/* Request Summary */}
        <Card className="rounded-2xl bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">{request.title}</h3>
            <p className="text-sm text-muted-foreground">{request.description}</p>
          </CardContent>
        </Card>

        {/* Proposals */}
        <div className="space-y-4">
          {proposals.map((proposal, index) => (
            <Card key={proposal.id} className="rounded-2xl">
              <CardContent className="p-4 space-y-4">
                {/* Provider Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{proposal.providerName}</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    #{index + 1}
                  </Badge>
                </div>

                {/* Reputation Quick View */}
                <div className="bg-muted/30 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(proposal.providerReputation.averageRating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{proposal.providerReputation.averageRating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({proposal.providerReputation.totalReviews} avaliações)
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(proposal.providerId)}
                    >
                      Ver Perfil
                    </Button>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{proposal.providerReputation.totalServices} serviços</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 text-center">⏰</span>
                      <span>{proposal.providerReputation.punctualityRate}% pontual</span>
                    </div>
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Valor proposto:</span>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(proposal.value)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Prazo:</span>
                      <p className="font-medium">{proposal.executionDays} dias</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-sm">Mensagem do profissional:</span>
                    <p className="mt-1 text-sm bg-muted/50 rounded-lg p-3">{proposal.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 h-11 rounded-xl"
                    onClick={() => handleAcceptProposal(proposal)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aceitar Proposta
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-11 w-11 rounded-xl"
                    disabled
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="rounded-2xl bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">💡</span>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Como escolher</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Analise a reputação e número de serviços realizados</li>
                  <li>• Compare os valores com seu orçamento</li>
                  <li>• Verifique se o prazo atende sua necessidade</li>
                  <li>• Leia a mensagem do profissional com atenção</li>
                  <li>• O chat será liberado após aceitar uma proposta</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}