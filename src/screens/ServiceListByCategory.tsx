import { ArrowLeft, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { ReputationCard } from '../components/ReputationCard';
import { useApp } from '../context/AppContext';
import { mockServiceRequests, serviceCategories } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

interface ServiceListByCategoryProps {
  category: string;
}

export function ServiceListByCategory({ category }: ServiceListByCategoryProps) {
  const { dispatch } = useApp();

  const categoryInfo = serviceCategories.find(c => c.id === category);
  const requests = mockServiceRequests.filter(r => r.category === category);

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/opportunities' });
  };

  const handleViewDetails = (request: any) => {
    dispatch({ type: 'SET_SELECTED_REQUEST', payload: request });
    dispatch({ type: 'SET_ROUTE', payload: `/opportunities/${category}/${request.id}` });
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  if (!categoryInfo) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={`${categoryInfo.name} - Oportunidades`}
        onBack={handleBack}
      />

      <div className="p-4 space-y-4">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
            {categoryInfo.icon}
          </div>
          <div>
            <h2 className="font-medium">{categoryInfo.name}</h2>
            <p className="text-sm text-muted-foreground">
              {requests.length} oportunidade{requests.length !== 1 ? 's' : ''} disponível{requests.length !== 1 ? 'eis' : ''}
            </p>
          </div>
        </div>

        {/* Service Requests */}
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{categoryInfo.icon}</span>
            </div>
            <h3 className="font-medium mb-2">Nenhuma oportunidade disponível</h3>
            <p className="text-muted-foreground text-sm">
              Não há solicitações para {categoryInfo.name.toLowerCase()} no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Request Header */}
                    <div>
                      <h3 className="font-medium text-lg mb-2">{request.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {request.description}
                      </p>
                    </div>

                    {/* Location and Deadline */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{request.neighborhood}, {request.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Até {formatDeadline(request.deadline)}</span>
                      </div>
                    </div>

                    {/* Budget Range */}
                    {request.budgetRange && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-medium">
                          {formatCurrency(request.budgetRange.min)} - {formatCurrency(request.budgetRange.max)}
                        </span>
                      </div>
                    )}

                    {/* Client Reputation Preview */}
                    <div className="bg-muted/30 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium mb-1">Reputação do Cliente</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">⭐ {request.clientReputation.averageRating.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">
                              ({request.clientReputation.totalReviews} avaliações)
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {request.clientReputation.punctualityRate}% pontual
                        </Badge>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full h-11 rounded-xl"
                      onClick={() => handleViewDetails(request)}
                    >
                      Ver Detalhes e Orçar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}