import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './components/layout/Layout';
import { menuItems } from './config/menuConfig';

const App = () => (
    <HashRouter>
        <Layout>
            <Routes>
                {menuItems.map(({ path, comp: Component, show }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        </Layout>
    </HashRouter>
);

export default App;
