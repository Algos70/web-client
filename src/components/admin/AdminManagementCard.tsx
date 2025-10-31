import { ReactNode } from 'react';

interface AdminManagementCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  buttonText: string;
  buttonClass: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  onClick: () => void;
}

export default function AdminManagementCard({
  title,
  description,
  icon,
  buttonText,
  buttonClass,
  borderColor,
  iconBgColor,
  iconColor,
  onClick
}: AdminManagementCardProps) {
  return (
    <div className={`card p-4 hover:shadow-lg transition-all duration-300 border-l-4 ${borderColor}`}>
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <h3 className="ml-3 text-base font-semibold text-slate-800">
          {title}
        </h3>
      </div>
      <p className="text-slate-600 text-xs mb-4 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onClick}
        className={`${buttonClass} w-full text-sm py-2 hover:cursor-pointer`}
      >
        {buttonText}
      </button>
    </div>
  );
}