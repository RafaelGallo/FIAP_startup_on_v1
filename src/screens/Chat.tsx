import { useState } from 'react';
import { ArrowLeft, Send, Camera, Calendar, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';

interface ChatProps {
  threadId: string;
}

export function Chat({ threadId }: ChatProps) {
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: 'client',
      text: 'Olá! Gostei muito da sua proposta. Quando podemos começar o serviço?',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: '2',
      senderId: state.user?.id || '',
      text: 'Olá! Obrigado pela confiança. Posso começar já na próxima segunda-feira. Você estará disponível para receber?',
      timestamp: '14:35',
      isOwn: true
    },
    {
      id: '3',
      senderId: 'client',
      text: 'Perfeito! Estarei em casa durante a manhã. Que horário seria melhor para você?',
      timestamp: '14:38',
      isOwn: false
    }
  ]);

  const handleBack = () => {
    dispatch({ type: 'SET_ROUTE', payload: '/budget/' + threadId + '/approved' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: state.user?.id || '',
      text: message,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        'Perfeito, obrigado!',
        'Combinado então!',
        'Certo, aguardo você.',
        'Ótimo, até lá!'
      ];
      
      const reply = {
        id: (Date.now() + 1).toString(),
        senderId: 'client',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      };

      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleProposeDate = () => {
    dispatch({ type: 'SET_ROUTE', payload: `/schedule/${threadId}` });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="Chat com Cliente" 
        onBack={handleBack}
        rightAction={
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Calendar className="h-4 w-4" />
          </Button>
        }
      />

      {/* Safety Notice */}
      <div className="p-4 border-b bg-yellow-50">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            Mantenha toda comunicação dentro do app por segurança
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              msg.isOwn 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.isOwn 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t">
        <div className="flex gap-2 mb-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={handleProposeDate}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Propor Data
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={() => setMessage('Podemos confirmar o endereço exato?')}
          >
            📍 Confirmar Local
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
            <Camera className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-2xl"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="icon" 
            className="h-10 w-10 rounded-full flex-shrink-0"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}