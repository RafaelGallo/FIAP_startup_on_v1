import { Plus, Bell, Clock, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';

export function HomeContractor() {
  const { state, dispatch } = useApp();

  const handleHireService = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/hire' });
  };

  const stats = [
    { label: 'Serviços Ativos', value: '2', icon: Clock, color: 'bg-orange-100 text-orange-600' },
    { label: 'Serviços Concluídos', value: '8', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Profissionais Favoritos', value: '5', icon: Users, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium">Olá, {state.user?.name}</h1>
            <p className="text-primary-foreground/80">O que você precisa hoje?</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Quick Action */}
        <Button 
          className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 rounded-xl"
          onClick={handleHireService}
        >
          <Plus className="w-5 h-5 mr-2" />
          Contratar um Serviço
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Services */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Serviços Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Pintura de sala</p>
                <p className="text-sm text-muted-foreground">João Silva • R$ 1.200,00</p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Em andamento</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Reforma de banheiro</p>
                <p className="text-sm text-muted-foreground">Carlos Santos • R$ 3.500,00</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Agendado</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Jardinagem</p>
                <p className="text-sm text-muted-foreground">Ana Costa • R$ 280,00</p>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Concluído</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Categories Quick Access */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Categorias Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 rounded-xl"
                onClick={() => {
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'mason' });
                  dispatch({ type: 'SET_ROUTE', payload: '/hire/mason/briefing' });
                }}
              >
                <span className="text-2xl">🧱</span>
                <span className="text-xs">Pedreiro</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 rounded-xl"
                onClick={() => {
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'painter' });
                  dispatch({ type: 'SET_ROUTE', payload: '/hire/painter/briefing' });
                }}
              >
                <span className="text-2xl">🎨</span>
                <span className="text-xs">Pintor</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 rounded-xl"
                onClick={() => {
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'gardener' });
                  dispatch({ type: 'SET_ROUTE', payload: '/hire/gardener/briefing' });
                }}
              >
                <span className="text-2xl">🌱</span>
                <span className="text-xs">Jardineiro</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="rounded-2xl bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-1">Dica de segurança</h3>
                <p className="text-sm text-green-700">
                  Sempre verifique a reputação do profissional antes de contratar. 
                  Use nosso chat interno para combinações de pagamento e horários.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}