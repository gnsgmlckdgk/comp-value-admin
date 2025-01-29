import React, { useState } from 'react';
import { BrowserRouter as Router, HashRouter, Routes, Route, Link } from 'react-router-dom';

// 컴포넌트
import { Layout } from './components/layout'
import { Home, Board, CompValue } from './pages'


function App() {

    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/compvalue" element={<CompValue />} />
                    <Route path='/complist' element={<Board />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
}

export default App;