export default function BottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {currentYear} NoxCommerce. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-500 text-sm">
            Made with ❤️ in Turkey
          </p>
        </div>
      </div>
    </div>
  );
}