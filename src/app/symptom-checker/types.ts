export type MessageType = 'user' | 'assistant';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

export interface SymptomData {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  symptoms: string;
} 