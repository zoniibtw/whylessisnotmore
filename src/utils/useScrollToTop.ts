// useScrollToTop.ts
import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const onRouteChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', onRouteChange);

    return () => {
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);
};

export default useScrollToTop;
