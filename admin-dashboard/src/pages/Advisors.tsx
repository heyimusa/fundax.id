import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Advisor } from '../types';
import { UserCircle, Mail, Phone, MapPin } from 'lucide-react';

const Advisors = () => {
  const { data: advisors, isLoading } = useQuery({
    queryKey: ['advisors'],
    queryFn: async () => {
      const response = await apiClient.get<Advisor[]>('/api/advisors/');
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Loan Advisors</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage loan advisors and their assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors?.map((advisor) => (
          <div key={advisor.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{advisor.name}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  advisor.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {advisor.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {advisor.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {advisor.phone}
              </div>
              {advisor.city && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {advisor.city}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Applications</span>
                <span className="text-lg font-semibold text-gray-900">{advisor.total_applications}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advisors;

