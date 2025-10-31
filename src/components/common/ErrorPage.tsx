import { useRouter } from "next/router";

interface ErrorPageProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ErrorPage({ 
  title, 
  message, 
  buttonText = "Go Back Home",
  onButtonClick 
}: ErrorPageProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}