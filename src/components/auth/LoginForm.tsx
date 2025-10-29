interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome</h1>
      <div className="space-y-4">
        <button 
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Login/Register
        </button>
      </div>
    </div>
  );
}