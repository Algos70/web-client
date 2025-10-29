import SocialLinks from './SocialLinks';

export default function CompanyInfo() {
  return (
    <div className="col-span-1 md:col-span-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">MyApp</h3>
      <p className="text-gray-600 text-sm mb-4">
        Modern and secure web application. We provide professional solutions 
        that prioritize user experience.
      </p>
      <SocialLinks />
    </div>
  );
}