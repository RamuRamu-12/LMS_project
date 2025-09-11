import { useState, useEffect } from 'react';

const useCourseLogo = (courseId, hasLogo) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId || !hasLogo) {
      setLogoUrl(null);
      return;
    }

    const fetchLogo = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching logo for course ${courseId}`);
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}/logo?t=${Date.now()}`, {
          cache: 'no-cache'
        });
        
        console.log('Logo response status:', response.status);
        console.log('Logo response headers:', response.headers.get('content-type'));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch logo: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Logo response data:', data);
        
        if (data.success && data.data && data.data.logoUrl) {
          setLogoUrl(data.data.logoUrl);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching course logo:', err);
        setError(err.message);
        setLogoUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [courseId, hasLogo]);

  return { logoUrl, loading, error };
};

export default useCourseLogo;
