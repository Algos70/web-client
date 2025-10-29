import Link from 'next/link';
import { ROUTES } from '../../../lib/constants/routes';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href={ROUTES.HOME} className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">
          NoxCommerce
        </h1>
      </Link>
    </div>
  );
}