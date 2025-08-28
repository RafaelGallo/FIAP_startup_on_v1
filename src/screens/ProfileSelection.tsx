import { UserCheck, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

export function ProfileSelection() {
  const { dispatch } = useApp();

  const handleRoleSelection = (role: 'provider' | 'contractor') => {
    dispatch({ type: 'SET_ROUTE', payload: `/login?role=${role}` });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">B</span>
          </div>
          <h1 className="text-2xl font-bold">BICOS</h1>
          <p className="text-muted-foreground">Conectando profissionais e clientes</p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          <Card 
            className="rounded-2xl border-2 hover:border-primary cursor-pointer transition-colors"
            onClick={() => handleRoleSelection('provider')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Prestador de Serviços</h3>
                  <p className="text-sm text-muted-foreground">Ofereça seus serviços e encontre clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="rounded-2xl border-2 hover:border-primary cursor-pointer transition-colors"
            onClick={() => handleRoleSelection('contractor')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Contratante</h3>
                  <p className="text-sm text-muted-foreground">Encontre profissionais qualificados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          className="w-full h-12 rounded-xl"
          onClick={() => handleRoleSelection('provider')}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}