import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAdminAuth<P extends {}>(WrappedComponent: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    useEffect(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      if (!token) {
        router.replace('/admin/login');
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };
}
