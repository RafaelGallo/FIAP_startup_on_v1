import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, ServiceRequest, Budget, ChatMessage } from '../types';

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ROUTE'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'SET_SELECTED_REQUEST'; payload: ServiceRequest | null }
  | { type: 'SET_SELECTED_BUDGET'; payload: Budget | null }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  user: null,
  currentRoute: '/role',
  selectedCategory: null,
  selectedRequest: null,
  selectedBudget: null,
  chatMessages: [],
  isLoading: false,
  error: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ROUTE':
      return { ...state, currentRoute: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SELECTED_REQUEST':
      return { ...state, selectedRequest: action.payload };
    case 'SET_SELECTED_BUDGET':
      return { ...state, selectedBudget: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}