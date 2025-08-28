import { ServiceCategory, ServiceRequest, Budget, Reputation, Review } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'mason',
    name: 'Pedreiro',
    icon: '🧱',
    examples: ['Construção de muros', 'Reforma de banheiros', 'Assentamento de pisos']
  },
  {
    id: 'painter',
    name: 'Pintor',
    icon: '🎨',
    examples: ['Pintura residencial', 'Pintura comercial', 'Textura decorativa']
  },
  {
    id: 'gardener',
    name: 'Jardineiro',
    icon: '🌱',
    examples: ['Poda de árvores', 'Paisagismo', 'Manutenção de jardins']
  }
];

export const sampleReviews: Review[] = [
  {
    id: '1',
    rating: 5,
    comment: 'Excelente profissional, pontual e caprichoso no trabalho.',
    date: '2024-01-15',
    reviewerName: 'Maria Silva'
  },
  {
    id: '2',
    rating: 4,
    comment: 'Bom serviço, entregou no prazo acordado.',
    date: '2024-01-10',
    reviewerName: 'João Santos'
  }
];

export const sampleClientReputation: Reputation = {
  averageRating: 4.7,
  totalReviews: 86,
  punctualityRate: 92,
  totalServices: 95,
  recentReviews: sampleReviews
};

export const sampleProviderReputation: Reputation = {
  averageRating: 4.3,
  totalReviews: 52,
  punctualityRate: 88,
  totalServices: 67,
  recentReviews: sampleReviews
};

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'Construção de muro em quintal',
    description: 'Preciso construir um muro de 2 metros de altura por 15 metros de comprimento no quintal. Material já comprado.',
    category: 'mason',
    clientId: 'client1',
    clientReputation: sampleClientReputation,
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    deadline: '2024-02-15',
    budgetRange: { min: 800, max: 1200 },
    status: 'open',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Reforma completa de banheiro',
    description: 'Reforma completa incluindo troca de azulejos, louças e instalações hidráulicas.',
    category: 'mason',
    clientId: 'client2',
    clientReputation: sampleClientReputation,
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    deadline: '2024-02-20',
    status: 'open',
    createdAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Assentamento de piso cerâmico',
    description: 'Assentamento de piso cerâmico em sala e quartos, área total de 60m².',
    category: 'mason',
    clientId: 'client3',
    clientReputation: sampleClientReputation,
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    deadline: '2024-02-25',
    budgetRange: { min: 1500, max: 2000 },
    status: 'open',
    createdAt: '2024-01-16'
  },
  {
    id: '4',
    title: 'Pintura externa de casa',
    description: 'Pintura completa da parte externa de casa térrea, incluindo preparação das paredes.',
    category: 'painter',
    clientId: 'client1',
    clientReputation: sampleClientReputation,
    neighborhood: 'Jardins',
    city: 'São Paulo',
    deadline: '2024-02-10',
    status: 'open',
    createdAt: '2024-01-22'
  },
  {
    id: '5',
    title: 'Pintura de apartamento completo',
    description: 'Pintura interna de apartamento de 3 quartos, sala, cozinha e banheiros.',
    category: 'painter',
    clientId: 'client2',
    clientReputation: sampleClientReputation,
    neighborhood: 'Ipanema',
    city: 'Rio de Janeiro',
    deadline: '2024-02-18',
    budgetRange: { min: 2500, max: 3500 },
    status: 'open',
    createdAt: '2024-01-19'
  },
  {
    id: '6',
    title: 'Aplicação de textura decorativa',
    description: 'Aplicação de textura decorativa em parede da sala de estar.',
    category: 'painter',
    clientId: 'client3',
    clientReputation: sampleClientReputation,
    neighborhood: 'Vila Madalena',
    city: 'São Paulo',
    deadline: '2024-02-12',
    status: 'open',
    createdAt: '2024-01-21'
  },
  {
    id: '7',
    title: 'Poda de árvores grandes',
    description: 'Poda de 3 árvores grandes no quintal, com remoção dos galhos cortados.',
    category: 'gardener',
    clientId: 'client1',
    clientReputation: sampleClientReputation,
    neighborhood: 'Alto de Pinheiros',
    city: 'São Paulo',
    deadline: '2024-02-08',
    budgetRange: { min: 400, max: 600 },
    status: 'open',
    createdAt: '2024-01-23'
  },
  {
    id: '8',
    title: 'Paisagismo de jardim frontal',
    description: 'Criação de paisagismo para jardim frontal de casa, incluindo plantio e decoração.',
    category: 'gardener',
    clientId: 'client2',
    clientReputation: sampleClientReputation,
    neighborhood: 'Leblon',
    city: 'Rio de Janeiro',
    deadline: '2024-02-28',
    status: 'open',
    createdAt: '2024-01-17'
  },
  {
    id: '9',
    title: 'Manutenção mensal de jardim',
    description: 'Serviço de manutenção mensal incluindo poda, adubação e limpeza.',
    category: 'gardener',
    clientId: 'client3',
    clientReputation: sampleClientReputation,
    neighborhood: 'Moema',
    city: 'São Paulo',
    deadline: '2024-02-05',
    budgetRange: { min: 200, max: 350 },
    status: 'open',
    createdAt: '2024-01-24'
  }
];

export const mockBudgets: Budget[] = [
  {
    id: 'budget1',
    requestId: '1',
    providerId: 'provider1',
    value: 950,
    executionDays: 3,
    message: 'Orçamento para construção do muro conforme especificado. Já trabalhei em projetos similares.',
    status: 'pending',
    createdAt: '2024-01-21'
  },
  {
    id: 'budget2',
    requestId: '1',
    providerId: 'provider2',
    value: 1100,
    executionDays: 4,
    message: 'Proposta para o muro com garantia de 2 anos. Material de primeira qualidade.',
    status: 'approved',
    createdAt: '2024-01-21'
  }
];