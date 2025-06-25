import React from 'react';
import Navbar from '../SharedTwo/Navbar';
import { Outlet } from 'react-router';
import Footer from '../SharedTwo/Footer';

const MainLayouts = () => {
    return (
        <div className='font-poppins'>
             <Navbar></Navbar>
             <Outlet></Outlet>
             <Footer></Footer>
        </div>
    );
};

export default MainLayouts;