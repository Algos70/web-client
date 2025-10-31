import Logo from '../../common/Logo';

export default function CompanyInfo() {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="mb-6">
        <Logo size="lg" className="mb-4" />
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">
        Your trusted e-commerce platform built for modern businesses. We empower
        entrepreneurs with cutting-edge tools to grow their online presence and
        deliver exceptional shopping experiences to customers worldwide.
      </p>
    </div>
  );
}
