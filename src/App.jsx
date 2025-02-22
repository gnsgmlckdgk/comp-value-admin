import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트
import Layout from './components/layout/Layout';
import { menuItems } from './config/menuConfig';

const App = () => (
    <HashRouter>
        <Layout>
            <Routes>
                {menuItems.map(({ path, comp: Component, subItems }) => (
                    <React.Fragment key={path}>
                        <Route path={path} element={<Component />} />
                        {subItems && subItems.map(({ path: subPath, comp: SubComp }) => (
                            <Route key={subPath} path={subPath} element={<SubComp />} />
                        ))}
                    </React.Fragment>
                ))}
            </Routes>
        </Layout>
    </HashRouter>
);

export default App;
