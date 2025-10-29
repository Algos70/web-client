export default function BottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm">
          © {currentYear} NoxCommerce. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <p className="text-slate-500 text-sm flex items-center">
            Made with 
            <span className="text-red-500 mx-1">❤️</span> 
            in Turkey
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-slate-500 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}