import React, { useState } from 'react';
import HomeDashboard from './DashBoard/HomeDashboard';
import QuickLinks from './QuickLinks/QuickLinks';
import NoticeBoard from './NoticeBoard/NoticBoard';

const Home = () => {
    return (
        <>
            <div>
                <NoticeBoard />
                {/* <QuickLinks /> */}
                {/* <HomeDashboard /> */}
            </div>
        </>
    )
}

export default Home;