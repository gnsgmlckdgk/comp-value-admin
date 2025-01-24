import React from 'react';

// index.js는 자동으로 불러와짐 (JavaScript/Node.js의 모듈 시스템에서는 디렉토리를 import할 때 자동으로 그 디렉토리의 index.js 파일을 찾음)
import { Header } from './components/common';

function App() {
    return (
        <>
            <Header />
            <h1>Hello React</h1>
        </>
    );
}

export default App;