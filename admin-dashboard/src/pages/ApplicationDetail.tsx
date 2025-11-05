import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '../api/applications';
import { formatDate, formatDateTime } from '../lib/utils';
import { ArrowLeft, User, FileText, Clock } from 'lucide-react';

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', id],
    queryFn: () => applicationsApi.get(Number(id)),
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { status: string; current_step: string; notes?: string }) =>
      applicationsApi.updateStatus(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', id] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setStatusNotes('');
      alert('Status updated successfully');
    },
  });

  const handleUpdateStatus = () => {
    if (!selectedStatus) return;
    
    const stepMessages: Record<string, string> = {
      pending: 'Pengajuan diterima, menunggu review',
      review: 'Dokumen sedang ditinjau oleh tim',
      approved: 'Pengajuan disetujui, menunggu pencairan',
      rejected: 'Pengajuan ditolak',
      disbursed: 'Dana telah dicairkan',
    };

    updateStatusMutation.mutate({
      status: selectedStatus,
      current_step: stepMessages[selectedStatus] || 'Status updated',
      notes: statusNotes || undefined,
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!application) {
    return <div className="text-center py-12">Application not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'disbursed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/applications')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Applications
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{application.application_number}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Submitted on {formatDate(application.submitted_at)}
            </p>
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{application.user?.full_name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{application.user?.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{application.user?.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">City</div>
                <div className="font-medium">{application.user?.city || '-'}</div>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Loan Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Product Type</div>
                <div className="font-medium">{application.product_type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Loan Amount</div>
                <div className="font-medium">{application.loan_amount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Income</div>
                <div className="font-medium">{application.monthly_income || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Occupation</div>
                <div className="font-medium">{application.occupation || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Company</div>
                <div className="font-medium">{application.company_name || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Work Experience</div>
                <div className="font-medium">{application.work_experience || '-'}</div>
              </div>
            </div>
            {application.loan_purpose && (
              <div className="mt-4">
                <div className="text-sm text-gray-500">Loan Purpose</div>
                <div className="mt-1">{application.loan_purpose}</div>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Timeline</h2>
            </div>
            <div className="space-y-4">
              {application.timeline?.map((entry, index) => (
                <div key={entry.id} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getStatusColor(entry.status)} px-2 py-1 rounded`}>
                        {entry.status}
                      </span>
                      <span className="text-sm text-gray-500">{formatDateTime(entry.created_at)}</span>
                    </div>
                    {entry.notes && (
                      <p className="mt-1 text-sm text-gray-600">{entry.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Update */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select status...</option>
                  <option value="pending">Pending</option>
                  <option value="review">Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Add notes about this status change..."
                />
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={!selectedStatus || updateStatusMutation.isPending}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>

          {/* Current Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Status</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium">{application.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Current Step</div>
                <div className="font-medium">{application.current_step}</div>
              </div>
              {application.advisor && (
                <div>
                  <div className="text-sm text-gray-500">Assigned Advisor</div>
                  <div className="font-medium">{application.advisor.name}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;

