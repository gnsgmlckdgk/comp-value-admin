import React, { useState } from 'react';
import axios from 'axios';  // npm install axios

const InputFrom = () => {

    // <input onChange={(e) => setName(e.target.value)} />
    const [companyName, setCompanyName] = useState('');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('');

    // <div> {result && <p>결과: {result}</p>} </div>
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let sendUrl = "http://localhost:18080/dart/main/cal/per_value";

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
                    companyName: companyName,
                    code: code,
                    date: date
                }
            }); // GET Sample

            console.log("response", response);
            setResult(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" className="input" placeholder="기업명"
                        value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div class="input-group">
                    <input type="text" className="input" placeholder="기업코드"
                        value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div class="input-group">
                    <input type="date" className="input"
                        value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button className="btn" onClick={handleSubmit}>검색</button>
            </form>
            <div class="result">
                <p>주당가치: <span>{ }</span></p>
                <p>기업명: <span>{ }</span></p>
                <p>기준일: <span>{ }</span></p>
            </div>
        </>
    );
}
export default InputFrom;