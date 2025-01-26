import React from 'react';

// 스타일
import * as comp from './components/common/common_stcomp'

// 컴포넌트
// index.js는 자동으로 불러와짐 (JavaScript/Node.js의 모듈 시스템에서는 디렉토리를 import할 때 자동으로 그 디렉토리의 index.js 파일을 찾음)
import { Header } from './components/common';
import { InputForm } from './components/dart_comp'

function App() {
    return (
        <>
            <Header />
            <div className='container'>
                <InputForm />
            </div>

        </>
    );
}

export default App;