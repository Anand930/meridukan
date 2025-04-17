// components/RouteLoader.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner= () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Set loading to true on route change
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time

    // Cleanup to clear the timeout if component unmounts
    return () => clearTimeout(timer);
  }, [location]); // The effect runs whenever the location (page) changes

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <ClipLoader size={200} color="#f76060"  aria-label='LOADING...' cssOverride={{
          borderWidth: "18px" // Adjust thickness by modifying border-width
        }} />
    </div>
  );
};

export default Spinner;
