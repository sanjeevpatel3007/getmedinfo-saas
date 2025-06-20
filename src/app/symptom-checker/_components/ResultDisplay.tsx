// app/check-symptom/_components/ResultDisplay.tsx
type Props = {
    result: string;
  };
  
  export default function ResultDisplay({ result }: Props) {
    if (!result) return null;
  
    return (
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 12h.01M12 12a1 1 0 110-2 1 1 0 010 2zm0 0v.01" />
            </svg>
          </div>
          <h2 className="text-white font-semibold text-lg">AI Medical Assistant Suggestions</h2>
        </div>
        <div className="p-6">
          <div className="prose prose-blue max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {result}
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            Note: These are general suggestions. Please consult a healthcare professional for medical advice.
          </div>
        </div>
      </div>
    );
  }
  