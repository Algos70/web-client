import AdminManagementCard from "./AdminManagementCard";

interface AdminDashboardProps {
  onNavigate: (view: "dashboard" | "categories" | "products") => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const productIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );

  const categoryIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );

  return (
    <div className="card p-6 mb-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold gradient-text mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Control center to manage your e-commerce platform and monitor
          operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminManagementCard
          title="Product Management"
          description="Add, edit and organize products with inventory management."
          icon={productIcon}
          buttonText="Manage Products"
          buttonClass="btn-success"
          borderColor="border-l-emerald-500"
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-600"
          onClick={() => onNavigate("products")}
        />

        <AdminManagementCard
          title="Category Management"
          description="Organize and manage product categories and subcategories."
          icon={categoryIcon}
          buttonText="Manage Categories"
          buttonClass="btn-secondary"
          borderColor="border-l-amber-500"
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
          onClick={() => onNavigate("categories")}
        />
      </div>
    </div>
  );
}
