"use client"; // Indicate this is a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page
    router.push('/homepage');
  }, [router]);

  return null; // Render nothing while redirecting
}