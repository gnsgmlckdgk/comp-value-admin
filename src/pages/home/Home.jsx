import React, { useState } from 'react';
import HomeDashboard from './DashBoard/HomeDashboard';
import QuickLinks from './QuickLinks/QuickLinks';
import NoticeBoard from './NoticeBoard/NoticBoard';

const Home = () => {
    return (
        <>
            <div>
                <h1>Home</h1>
                {/* <NoticeBoard /> */}
                <QuickLinks />
                {/* <HomeDashboard /> */}
            </div>
        </>
    )
}

export default Home;