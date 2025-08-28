import { ArrowLeft, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { serviceCategories } from '../data/mockData';

export function ServiceOpportunities() {
  const { dispatch } = useApp();

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/home-provider' });
  };

  const handleCategorySelect = (categoryId: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
    dispatch({ type: 'SET_ROUTE', payload: `/opportunities/${categoryId}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Oportunidades de Serviços" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Instructions */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Escolha uma categoria</h2>
          <p className="text-muted-foreground">
            Selecione a categoria de serviço para ver as oportunidades disponíveis
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {serviceCategories.map((category) => (
            <Card 
              key={category.id}
              className="rounded-2xl border-2 hover:border-primary cursor-pointer transition-colors"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                    <div className="space-y-1">
                      {category.examples.map((example, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          • {example}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="bg-muted/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">!</span>
            </div>
            <div>
              <h3 className="font-medium mb-1">Como funciona</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Visualize as solicitações da categoria escolhida</li>
                <li>• Envie orçamentos para os serviços de interesse</li>
                <li>• Aguarde a aprovação do cliente</li>
                <li>• Chat liberado após aprovação do orçamento</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}