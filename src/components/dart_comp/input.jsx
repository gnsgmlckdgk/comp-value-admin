import React, { useState } from 'react';
import axios from 'axios';  // npm install axios

// styled-components
// import { Form, Input, Button } from './input_style'
import * as comp from './input_stcomp'


const InputForm = () => {

    // <input onChange={(e) => setName(e.target.value)} />
    const [companyName, setCompanyName] = useState('삼성전자');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('2025');

    // <div> {result && <p>결과: {result}</p>} </div>
    const [result, setResult] = useState({
        "결과메시지": "",
        "기업코드": "",
        "기업명": "",
        "주식코드": "",
        "주당가치": "",
        "현재가격": "",
        "확인시간": "",
        "상세정보": {
            "단위": "",
            "영업이익_전전기": "",
            "영업이익_전기": "",
            "영업이익_당기": "",
            "영업이익_합계": "",
            "영업이익_평균": "",
            "유동자산합계": "",
            "유동부채합계": "",
            "유동비율": "",
            "투자자산_비유동자산내": "",
            "고정부채": "",
            "발행주식수": "",
            "계산_사업가치": "",
            "계산_재산가치": "",
            "계산_부채": "",
            "계산_기업가치": ""
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let sendUrl = "http://localhost:18080/dart/main/cal/per_value";
            console.log("sendUrl", sendUrl);

            // const response = await axios.get(sendUrl, {
            //     params: {
            //         companyName: companyName,
            //         code: code,
            //         date: date
            //     }
            // }); // GET Sample

            // const response = await axios.post('sendUrl', {
            //     companyName: companyName,
            //     code: code,
            //     date: date
            // }); // POST Sample (async/await, 응답 받을 수 있음)

            // axios.post('/api', data)
            // .then(response => {})
            // .catch(error => {}); // POST Promise 기반 Sample(.then을 통해서 응답받음, 전송 후 안기다리고 아래코드 바로 실행됨)

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
    };

    return (
        <>
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
        </>
    );
}
export default InputForm;