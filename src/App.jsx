import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
    grid-template-rows: 60px 1fr 60px;
    grid-template-columns: 250px 1fr;
    height: 100vh;
`;

// 컴포넌트
import { Header, Sidebar, Contents, Footer } from './components/common/layout';
// index.js는 자동으로 불러와짐 
// JavaScript/Node.js의 모듈 시스템에서는 디렉토리를 import할 때 자동으로 그 디렉토리의 index.js 파일을 찾음
import * as dart_comp from './components/dart_comp'


function App() {

    return (
        // TODO: 실무에서 라우트로 많이하는지 확인
        // TODO: 실제 서버에 올리는 방법(웹서버 설정 등) 확인
        // TODO: 3000포트가 아니라 8080인데 디폴트가 변경됬는지
        // TODO: 콘솔 경고문구 확인
        <>
            <Container>
                <Header />
                <Sidebar />
                <Contents>
                    <Link to="/">HOME</Link><br />
                    <Link to="/cal">TEST</Link>
                    <Routes>
                        <Route path='/' element={<div><h1>Home</h1></div>} />
                        <Route path='/cal' element={<dart_comp.InputForm />} />
                    </Routes>
                </Contents>
                <Footer />
            </Container>
        </>
    );
}

export default App;