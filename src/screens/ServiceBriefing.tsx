import { useState } from 'react';
import { ArrowLeft, Camera, Send, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { CurrencyInput } from '../components/CurrencyInput';
import { useApp } from '../context/AppContext';
import { serviceCategories } from '../data/mockData';
import { parseCurrency } from '../utils/currency';

interface ServiceBriefingProps {
  category: string;
}

export function ServiceBriefing({ category }: ServiceBriefingProps) {
  const { dispatch } = useApp();
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [address, setAddress] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryInfo = serviceCategories.find(c => c.id === category);

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/hire' });
  };

  const validateForm = () => {
    let isValid = true;

    // Validate description
    if (!description || description.length < 30) {
      setDescriptionError('Descrição deve ter pelo menos 30 caracteres');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Validate deadline
    if (!deadline) {
      setDeadlineError('Prazo é obrigatório');
      isValid = false;
    } else {
      const selectedDate = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        setDeadlineError('Prazo deve ser maior que hoje');
        isValid = false;
      } else {
        setDeadlineError('');
      }
    }

    // Validate address
    if (!address || address.length < 10) {
      setAddressError('Endereço/bairro é obrigatório');
      isValid = false;
    } else {
      setAddressError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const requestId = `request_${Date.now()}`;
      
      // Create service request
      const serviceRequest = {
        id: requestId,
        title: `Serviço de ${categoryInfo?.name}`,
        description,
        category,
        clientId: 'current_user',
        neighborhood: address.split(',')[0] || address,
        city: 'São Paulo',
        deadline,
        budgetRange: maxBudget ? { 
          min: parseCurrency(maxBudget) * 0.8, 
          max: parseCurrency(maxBudget) 
        } : undefined,
        status: 'open' as const,
        createdAt: new Date().toISOString()
      };

      dispatch({ type: 'SET_SELECTED_REQUEST', payload: serviceRequest });
      dispatch({ type: 'SET_ROUTE', payload: `/request/${requestId}/waiting` });
      setIsSubmitting(false);
    }, 2000);
  };

  if (!categoryInfo) {
    return <div>Categoria não encontrada</div>;
  }

  // Get today's date for min date input
  const today = new Date();
  today.setDate(today.getDate() + 1); // Minimum is tomorrow
  const minDate = today.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={`Contratar ${categoryInfo.name}`}
        onBack={handleBack}
      />

      <div className="p-4 space-y-6">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
            {categoryInfo.icon}
          </div>
          <div>
            <h2 className="font-medium">{categoryInfo.name}</h2>
            <p className="text-sm text-muted-foreground">
              Descreva o serviço que você precisa
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Detalhes do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-1">
                Descrição do serviço
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Descreva detalhadamente o serviço de ${categoryInfo.name.toLowerCase()} que você precisa...`}
                rows={4}
                className={descriptionError ? "border-destructive" : ""}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{description.length}/30 caracteres mínimos</span>
                {descriptionError && (
                  <span className="text-destructive">{descriptionError}</span>
                )}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Prazo desejado
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={minDate}
                className={deadlineError ? "border-destructive" : ""}
              />
              {deadlineError && (
                <p className="text-sm text-destructive">{deadlineError}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Endereço/Bairro
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Bairro, Cidade - Estado"
                className={addressError ? "border-destructive" : ""}
              />
              {addressError && (
                <p className="text-sm text-destructive">{addressError}</p>
              )}
            </div>

            {/* Max Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Orçamento máximo (opcional)
              </Label>
              <CurrencyInput
                label=""
                value={maxBudget}
                onChange={setMaxBudget}
                placeholder="R$ 0,00"
              />
              <p className="text-sm text-muted-foreground">
                Ajuda os profissionais a entenderem sua faixa de preço
              </p>
            </div>

            {/* Photos */}
            <div className="space-y-2">
              <Label>Fotos do local (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Adicione fotos para ajudar os profissionais a entenderem melhor o serviço
                </p>
                <Button variant="outline" disabled>
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
                'Enviando solicitação...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Solicitação
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="rounded-2xl bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">💡</span>
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-1">Dica</h3>
                <p className="text-sm text-green-700">
                  Quanto mais detalhada for sua descrição, melhores serão os orçamentos 
                  que você receberá. Include dimensões, materiais preferidos e 
                  qualquer requisito específico.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}