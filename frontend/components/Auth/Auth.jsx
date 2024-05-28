// useAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
      // Redirect to login page if not logged in
      router.push('/login'); // Change '/login' to your actual login route
    }
  }, []);
}
