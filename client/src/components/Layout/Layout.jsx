import React from 'react';
import Navbar from '../../sections/Navbar/Navbar';
import Footer from '../../sections/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout