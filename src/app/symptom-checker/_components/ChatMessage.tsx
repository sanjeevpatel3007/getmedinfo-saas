import { Message } from "../types";
import { format } from "date-fns";
import SuggestedQuestions from "./SuggestedQuestions";

interface ChatMessageProps {
  message: Message;
  onSuggestedQuestionClick?: (question: string) => void;
  isLoading?: boolean;
}

export default function ChatMessage({ message, onSuggestedQuestionClick, isLoading }: ChatMessageProps) {
  const isAssistant = message.type === 'assistant';

  // Extract suggested questions if they exist in the message
  const suggestedQuestions = isAssistant ? 
    message.content
      .split('Suggested questions:')
      .pop()
      ?.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(1).trim()) ?? []
    : [];

  // Clean message content by removing suggested questions section
  const cleanContent = isAssistant ? 
    message.content.split('Suggested questions:')[0].trim() 
    : message.content;

  // Format the message content to handle markdown-style formatting
  const formattedContent = isAssistant ? 
    cleanContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .split('\n')
      .map(line => {
        // Handle bullet points
        if (line.trim().startsWith('*')) {
          return `<div class="ml-4 my-1">•${line.substring(1)}</div>`;
        }
        return `<div class="my-1">${line}</div>`;
      })
      .join('')
    : cleanContent;

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      <div className={`flex items-start gap-2.5 max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        {isAssistant ? (
          <div className="flex-shrink-0 mt-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0 mt-1">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-2 shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className={`flex flex-col gap-1 ${isAssistant ? 'items-start' : 'items-end'}`}>
          <div className={`p-3 rounded-2xl ${
            isAssistant 
              ? 'bg-white text-gray-800 border border-gray-200 shadow-sm' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-gray-100 shadow-md'
          }`}>
            <div 
              className="text-sm whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>
          
          {suggestedQuestions.length > 0 && onSuggestedQuestionClick && (
            <SuggestedQuestions
              questions={suggestedQuestions}
              onQuestionClick={onSuggestedQuestionClick}
              disabled={isLoading}
            />
          )}

          <span className="text-xs text-gray-400 px-1">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
} 