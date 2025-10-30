import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-blue-100">Products Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;