import React from 'react';
import ScrollToTop from '../../components/ScrollToTop';
import { Outlet } from 'react-router-dom';
import bgImage from "../../assets/backgrounds/BGImage.png"
import ManagerHeader from './ManagerHeader';

interface props {
}

const ManagerLayout: React.FC<props> = () => {
    return (
      <div className={`min-h-svh bg-cover bg-center bg-no-repeat bg-fixed
            overflow-hidden` } style={{ backgroundImage: `url(${bgImage})` }}>
        <ManagerHeader />
        {/* add padding to push outlet below fixed header */}
        <main className="pt-18">
          <ScrollToTop />
          <Outlet />
        </main>
      </div>
    );
};

export default ManagerLayout;