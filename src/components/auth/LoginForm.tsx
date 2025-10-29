interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-3">Welcome to NoxCommerce</h1>
        <p className="text-slate-600 text-lg">Your premium shopping destination</p>
      </div>
      
      <div className="card p-8 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Sign in to your account</h2>
            <p className="text-slate-500 text-sm mt-2">Access your personalized shopping experience</p>
          </div>
          
          <button 
            onClick={onLogin}
            className="btn-primary w-full"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login / Register
            </span>
          </button>
          
          <div className="text-center">
            <p className="text-xs text-slate-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}