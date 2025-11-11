import { Settings as SettingsIcon, Shield, Database, Bell } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          System configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* System Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">System Settings</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Configure database, file storage, and system preferences.
          </p>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Configure
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Manage authentication, roles, and access control.
          </p>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Configure
          </button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Configure email and SMS notification settings.
          </p>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Configure
          </button>
        </div>

        {/* Admin Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Manage admin accounts and permissions.
          </p>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Manage Admins
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Fundax Backoffice System v1.0.0</p>
          <p>Built with FastAPI, React, and TypeScript</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
