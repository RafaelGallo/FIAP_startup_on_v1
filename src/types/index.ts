export type UserRole = 'provider' | 'contractor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Reputation {
  averageRating: number;
  totalReviews: number;
  punctualityRate: number;
  totalServices: number;
  recentReviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  examples: string[];
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  clientId: string;
  clientReputation: Reputation;
  neighborhood: string;
  city: string;
  deadline: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  photos?: string[];
  status: 'open' | 'closed';
  createdAt: string;
}

export interface Budget {
  id: string;
  requestId: string;
  providerId: string;
  value: number;
  executionDays: number;
  message: string;
  photos?: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface AppState {
  user: User | null;
  currentRoute: string;
  selectedCategory: string | null;
  selectedRequest: ServiceRequest | null;
  selectedBudget: Budget | null;
  chatMessages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}