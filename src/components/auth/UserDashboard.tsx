import { User } from "../../lib/types/auth";
import {
  formatPermission,
  getPermissionColor,
} from "../../lib/utils/permissions";

interface UserDashboardProps {
  user: User | null;
  onCallBackend: () => void;
  onLogout?: () => void;
}

export default function UserDashboard({
  user,
  onCallBackend,
}: UserDashboardProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="gradient-bg rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
          <span className="text-xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">My Profile</h1>
        <p className="text-slate-600 text-sm">
          Manage your account and preferences
        </p>
      </div>

      <div className="card p-5 space-y-5">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Account Information
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 uppercase tracking-wide">
                Full Name
              </label>
              <p className="text-base text-slate-900 font-medium">
                {user?.name}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 uppercase tracking-wide">
                Email Address
              </label>
              <p className="text-sm text-slate-900 break-all">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 uppercase tracking-wide">
                Username
              </label>
              <p className="text-sm text-slate-900">
                {user?.preferred_username}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 uppercase tracking-wide">
                Email Status
              </label>
              <div className="flex items-center">
                {user?.email_verified ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <label className="block text-xs font-medium text-slate-700 mb-2 uppercase tracking-wide">
            Account Permissions
          </label>
          <div className="flex flex-wrap gap-1.5">
            {user?.permissions
              ?.slice()
              .sort()
              .map((permission: string, index: number) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(
                    permission
                  )}`}
                >
                  {formatPermission(permission)}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-2">
          Developer Tools
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Test API connectivity and authentication
        </p>
        <button
          onClick={onCallBackend}
          className="btn-success text-sm py-2 px-4"
        >
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Test Protected API
          </span>
        </button>
      </div>
    </div>
  );
}
