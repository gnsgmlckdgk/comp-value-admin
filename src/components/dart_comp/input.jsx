import React, { useState } from 'react';
import axios from 'axios';  // npm install axios

import * as comComp from '../common'

// 스타일컴포넌트(styled-components)
// import { Form, Input, Button } from './input_style'
import * as comp from './style/input_stcomp'

// 데이터
import dart_data from './data/open_dart'


const InputForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    // <input onChange={(e) => setName(e.target.value)} />
    const [pageTitle, setPageTitle] = useState('기업 한 주당 적정가격 계산 프로그램');
    const [companyName, setCompanyName] = useState('삼성전자');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('2025');

    const [result, setResult] = useState(dart_data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let sendUrl = "http://localhost:18080/dart/main/cal/per_value";
            console.log("sendUrl", sendUrl);

            setIsLoading(true);
            const response = await axios.get(sendUrl, {
                params: {
                    corp_name: companyName,
                    corp_code: code,
                    year: date
                }
            })
                .then(response => {
                    console.log("response", response);
                    setResult(response.data);
                })
                .catch(error => {
                    // 서버 응답이 있는 경우
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                console.log('잘못된 요청', error.response);
                                setResult(prevState => ({
                                    결과메시지: error.response.data.message
                                }));
                                break;
                            default:
                                console.log('서버 에러', error.response);
                                setResult(prevState => ({
                                    결과메시지: error.response.data.message
                                }));
                        }
                    }
                    // 서버 응답이 없는 경우
                    else {
                        console.log('네트워크 에러');
                        setResult(prevState => ({
                            결과메시지: "네트워크 에러"
                        }));
                    }
                });

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <comp.Container>

                <comp.H1>{pageTitle}</comp.H1>

                <comp.Form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <comp.Input type="text" className="input" placeholder="기업명"
                            value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <comp.Input type="text" className="input" placeholder="기업코드"
                            value={code} onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <comp.Input type="text" className="input" placeholder="기준연도"
                            value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <comp.Button className="btn" onClick={handleSubmit}>검색</comp.Button>
                </comp.Form>
                <comp.ResultMessage className="result">
                    <p>결과메시지: <span>{result.결과메시지}</span></p>
                    <p>기업명: <span>{result.기업명}</span></p>
                    <p>기업코드: <span>{result.기업코드}</span></p>
                    <p>주식코드: <span>{result.주식코드}</span></p>
                    <p>주당가치: <comp.StrongText>{result.주당가치}</comp.StrongText></p>
                    <p>현재가격: <comp.StrongText>{result.현재가격}</comp.StrongText></p>
                    <p>확인시간: <span>{result.확인시간}</span></p>
                </comp.ResultMessage>

                {isLoading && (
                    <comComp.LoadingOverlay>
                        <comComp.Spinner />
                    </comComp.LoadingOverlay>
                )}
            </comp.Container>
        </>
    );
}
export default InputForm;