import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Camera, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { ReputationCard } from '../components/ReputationCard';
import { CurrencyInput } from '../components/CurrencyInput';
import { useApp } from '../context/AppContext';
import { formatCurrency, parseCurrency } from '../utils/currency';

interface RequestDetailsProps {
  category: string;
  requestId: string;
}

export function RequestDetails({ category, requestId }: RequestDetailsProps) {
  const { state, dispatch } = useApp();
  const [value, setValue] = useState('');
  const [executionDays, setExecutionDays] = useState('');
  const [message, setMessage] = useState('');
  const [valueError, setValueError] = useState('');
  const [daysError, setDaysError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const request = state.selectedRequest;

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: `/opportunities/${category}` });
  };

  const validateForm = () => {
    let isValid = true;

    // Validate value
    const numericValue = parseCurrency(value);
    if (!value || numericValue <= 0) {
      setValueError('Valor deve ser maior que zero');
      isValid = false;
    } else {
      setValueError('');
    }

    // Validate execution days
    const days = parseInt(executionDays);
    if (!executionDays || days <= 0) {
      setDaysError('Prazo deve ser maior que zero');
      isValid = false;
    } else {
      setDaysError('');
    }

    // Validate message
    if (!message || message.length < 20) {
      setMessageError('Mensagem deve ter pelo menos 20 caracteres');
      isValid = false;
    } else {
      setMessageError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const budget = {
        id: `budget_${Date.now()}`,
        requestId: request?.id || '',
        providerId: state.user?.id || '',
        value: parseCurrency(value),
        executionDays: parseInt(executionDays),
        message,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      dispatch({ type: 'SET_SELECTED_BUDGET', payload: budget });
      dispatch({ type: 'SET_ROUTE', payload: `/budget/${budget.id}/pending` });
      setIsSubmitting(false);
    }, 2000);
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
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
        title="Detalhes da Solicitação" 
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Request Details */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>{request.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            <div>
              <Label className="text-muted-foreground">Descrição</Label>
              <p className="mt-1">{request.description}</p>
            </div>

            {/* Location and Deadline */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{request.neighborhood}, {request.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Prazo: {formatDeadline(request.deadline)}</span>
              </div>
            </div>

            {/* Budget Range */}
            {request.budgetRange && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <Label className="text-green-800">Faixa de orçamento sugerida</Label>
                <p className="text-green-700 font-medium">
                  {formatCurrency(request.budgetRange.min)} - {formatCurrency(request.budgetRange.max)}
                </p>
              </div>
            )}

            {/* Photos */}
            {request.photos && request.photos.length > 0 && (
              <div>
                <Label className="text-muted-foreground">Fotos do local</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {request.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Client Reputation */}
        <div>
          <Label className="text-muted-foreground mb-3 block">Reputação do Cliente</Label>
          <ReputationCard reputation={request.clientReputation} showReviews={true} />
        </div>

        {/* Budget Form */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Enviar Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Value */}
            <CurrencyInput
              label="Valor do serviço"
              value={value}
              onChange={setValue}
              error={valueError}
              required
            />

            {/* Execution Time */}
            <div className="space-y-2">
              <Label htmlFor="execution-days" className="flex items-center gap-1">
                Prazo de execução (dias)
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="execution-days"
                type="number"
                value={executionDays}
                onChange={(e) => setExecutionDays(e.target.value)}
                placeholder="Ex: 3"
                min="1"
                className={daysError ? "border-destructive" : ""}
              />
              {daysError && (
                <p className="text-sm text-destructive">{daysError}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-1">
                Mensagem para o cliente
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explique como você pretende executar o serviço, sua experiência com trabalhos similares, etc."
                rows={4}
                className={messageError ? "border-destructive" : ""}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{message.length}/20 caracteres mínimos</span>
                {messageError && (
                  <span className="text-destructive">{messageError}</span>
                )}
              </div>
            </div>

            {/* Photos Upload */}
            <div className="space-y-2">
              <Label>Fotos do trabalho (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Adicione fotos de trabalhos anteriores similares
                </p>
                <Button variant="outline" className="mt-2" disabled>
                  Selecionar Fotos
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full h-12 rounded-xl"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Orçamento
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-sm">i</span>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Informações importantes</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• O cliente tem até 24h para responder ao orçamento</li>
                <li>• Você será notificado sobre a decisão do cliente</li>
                <li>• Chat será liberado apenas após aprovação</li>
                <li>• Mantenha-se disponível para esclarecimentos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}