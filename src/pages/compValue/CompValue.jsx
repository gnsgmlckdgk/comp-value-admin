import React, { useState } from 'react';
import axios from 'axios';  // npm install axios

// 컴포넌트
import LoadingOverlayComp from '../../components/common/LoadingOverlay'
import DetailsToggle from './detail_comp'

// 스타일컴포넌트(styled-components)
// import { Form, Input, Button } from './input_style'
import * as comp from './style/compValueStyle'

// 데이터
import dart_data from './data/open_dart'

/**
 * 상세정보 세팅
 * @param {obj} result 
 * @returns 
 */
const setDetailData = (result) => {

    const detailsData = result.상세정보;
    let detailsDataArr = [];

    if (detailsData) {
        for (let key in detailsData) {
            const data = detailsData[key];
            detailsDataArr.push({
                id: key,
                title: key,
                content: data
            });
        }
    }

    return detailsDataArr;
}


const CompValue = () => {

    const [isLoading, setIsLoading] = useState(false);

    // <input onChange={(e) => setName(e.target.value)} />
    const [pageTitle, setPageTitle] = useState('한 주당 적정가격 계산 프로그램');
    const [companyName, setCompanyName] = useState('삼성전자');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('2025');

    const [result, setResult] = useState(dart_data);
    const [details, setDetails] = useState([]);

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
                    setDetails(setDetailData(response.data));

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
                    <comp.resultMessageLi>
                        <comp.resultSpan>결과메시지</comp.resultSpan>
                        <comp.resultSpan2>{result.결과메시지}</comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>기업명</comp.resultSpan>
                        <comp.resultSpan2>{result.기업명}</comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>기업코드</comp.resultSpan>
                        <comp.resultSpan2>{result.기업코드}</comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>주식코드</comp.resultSpan>
                        <comp.resultSpan2>{result.주식코드}</comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>주당가치</comp.resultSpan>
                        <comp.resultSpan2> {Number(result.주당가치) > Number(result.현재가격) ?
                            <comp.StrongTextRed>{result.주당가치 !== "" ? Number(result.주당가치).toLocaleString() : ""}</comp.StrongTextRed> :
                            <comp.StrongText>{result.주당가치 !== "" ? Number(result.주당가치).toLocaleString() : ""}</comp.StrongText>}</comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>현재가격</comp.resultSpan>
                        <comp.resultSpan2><comp.StrongText>{result.현재가격 !== "" ? Number(result.현재가격).toLocaleString() : ""}</comp.StrongText></comp.resultSpan2>
                    </comp.resultMessageLi>
                    <comp.resultMessageLi>
                        <comp.resultSpan>확인시간</comp.resultSpan>
                        <comp.resultSpan2>{result.확인시간}</comp.resultSpan2>
                    </comp.resultMessageLi>

                    {/* containerStyle 로 스타일 정보를 넘길 수 있음 */}
                    <DetailsToggle details={details} containerStyle={{ marginTop: '10px' }} />
                </comp.ResultMessage>

                {/* {isLoading && (
                    <comComp.LoadingOverlay>
                        <comComp.Spinner />
                    </comComp.LoadingOverlay>
                )} */}
                <LoadingOverlayComp isLoadingFlag={isLoading} />

            </comp.Container>
        </>
    );
}
export default CompValue;