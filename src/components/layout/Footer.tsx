import CompanyInfo from './footer/CompanyInfo';
import QuickLinks from './footer/QuickLinks';
import SupportLinks from './footer/SupportLinks';
import BottomBar from './footer/BottomBar';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CompanyInfo />
          <QuickLinks />
          <SupportLinks />
        </div>
        <BottomBar />
      </div>
    </footer>
  );
}