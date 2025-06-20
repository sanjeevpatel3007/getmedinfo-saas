interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({ questions, onQuestionClick, disabled }: SuggestedQuestionsProps) {
  if (!questions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          disabled={disabled}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full 
            transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 
            disabled:cursor-not-allowed flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {question}
        </button>
      ))}
    </div>
  );
} 