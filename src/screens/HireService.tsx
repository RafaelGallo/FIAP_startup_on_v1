import { ArrowLeft, Plus } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { serviceCategories } from '../data/mockData';

export function HireService() {
  const { dispatch } = useApp();

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/home-contractor' });
  };

  const handleCategorySelect = (categoryId: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
    dispatch({ type: 'SET_ROUTE', payload: `/hire/${categoryId}/briefing` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Contratar Serviço" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Instructions */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Que tipo de serviço você precisa?</h2>
          <p className="text-muted-foreground">
            Selecione a categoria que melhor descreve o serviço desejado
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
                      <p className="text-sm text-muted-foreground font-medium">Exemplos:</p>
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

        {/* Tips */}
        <Card className="rounded-2xl bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">💡</span>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Dicas para um bom resultado</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Seja específico na descrição do serviço</li>
                  <li>• Inclua fotos se possível para melhor entendimento</li>
                  <li>• Defina um prazo realista para execução</li>
                  <li>• Verifique sempre a reputação dos profissionais</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}