import React, { useState } from 'react';
import { BrowserRouter as Router, HashRouter, Routes, Route, Link } from 'react-router-dom';

// 컴포넌트
import { Layout } from './components/common/layout'
import Home from './pages/Home';
import { CompValue } from './pages/compValue';

// 컴포넌트
// import { Header, Sidebar, Contents, Footer } from './components/common/layout';
// // index.js는 자동으로 불러와짐 
// // JavaScript/Node.js의 모듈 시스템에서는 디렉토리를 import할 때 자동으로 그 디렉토리의 index.js 파일을 찾음
// import * as dart_comp from './components/dart_comp'


function App() {

    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cal/compvalue" element={<CompValue />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
}

export default App;