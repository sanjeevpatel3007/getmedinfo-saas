import { useState } from 'react';
import { SymptomData } from '../types';

interface InitialFormProps {
  onSubmit: (data: SymptomData) => void;
}

export default function InitialForm({ onSubmit }: InitialFormProps) {
  const [formData, setFormData] = useState<SymptomData>({
    age: undefined,
    gender: undefined,
    duration: '',
    severity: undefined,
    symptoms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            min="0"
            max="150"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.gender || ''}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as SymptomData['gender'] })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">How long have you been experiencing symptoms?</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 2 days, 1 week"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.severity || ''}
          onChange={(e) => setFormData({ ...formData, severity: e.target.value as SymptomData['severity'] })}
        >
          <option value="">Select severity</option>
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Describe your symptoms</label>
        <textarea
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Please describe your symptoms in detail..."
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={!formData.symptoms}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
          transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Consultation
      </button>
    </form>
  );
} 