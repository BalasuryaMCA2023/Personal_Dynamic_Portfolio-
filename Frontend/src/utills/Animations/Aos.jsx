
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useAosInit = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
};

export default useAosInit;
