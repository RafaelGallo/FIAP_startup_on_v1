import { Search, Bell, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';

export function HomeProvider() {
  const { state, dispatch } = useApp();

  const handleApplyForServices = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/opportunities' });
  };

  const stats = [
    { label: 'Orçamentos Pendentes', value: '3', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    { label: 'Orçamentos Aprovados', value: '1', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Serviços Concluídos', value: '12', icon: Search, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium">Olá, {state.user?.name}</h1>
            <p className="text-primary-foreground/80">Bem-vindo de volta!</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Quick Action */}
        <Button 
          className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 rounded-xl"
          onClick={handleApplyForServices}
        >
          <Search className="w-5 h-5 mr-2" />
          Candidatar-se a Serviços
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

        {/* Recent Activity */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Construção de muro</p>
                <p className="text-sm text-muted-foreground">Vila Olímpia • R$ 950,00</p>
              </div>
              <Badge variant="secondary">Pendente</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Pintura de apartamento</p>
                <p className="text-sm text-muted-foreground">Ipanema • R$ 2.800,00</p>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Aprovado</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Poda de árvores</p>
                <p className="text-sm text-muted-foreground">Alto de Pinheiros • R$ 450,00</p>
              </div>
              <Badge variant="outline">Concluído</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="rounded-2xl bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Dica do dia</h3>
                <p className="text-sm text-blue-700">
                  Responda rapidamente aos orçamentos para aumentar suas chances de aprovação. 
                  Clientes preferem profissionais que demonstram agilidade.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}