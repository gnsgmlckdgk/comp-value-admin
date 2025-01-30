import React, { useState } from 'react';

// 컴포넌트
import LoadingOverlayComp from '../../components/common/LoadingOverlay'
import { send } from '../../components/util/clientUtil'
import DetailsToggle from './DetailCompValue'

// 스타일컴포넌트(styled-components)
import * as comp from './style/CompValueStyle'

// 데이터
import dart_data from './data/open_dart'

/**
 * 상세정보 세팅
 * @param {obj} result 
 * @returns 
 */
const setDetailData = (result) => {

    if (!result) return;

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
    const [companyName, setCompanyName] = useState('');
    const [code, setCode] = useState('');
    const [date, setDate] = useState(new Date().getFullYear());

    const [result, setResult] = useState(dart_data);
    const [details, setDetails] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (companyName === '' && code === '') {
            alert('기업명 또는 기업코드를 입력해주세요.');
            return;
        }

        try {
            let sendUrl = "http://localhost:18080/dart/main/cal/per_value";

            setIsLoading(true);

            const { data, error } = await send(sendUrl, {
                corp_name: companyName,
                corp_code: code,
                year: date
            });

            if (error) {
                // 에러처리
                setResult(prevState => ({
                    결과메시지: error
                }));
            } else {
                setResult(data);
                setDetails(setDetailData(data));
            }

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <comp.Container>

                <comp.H1>기업가치 분석</comp.H1>

                <comp.Form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <comp.Input type="text" className="input" placeholder="기업명"
                            value={companyName} onChange={(e) => {
                                setCompanyName(e.target.value);
                                setCode('');
                            }
                            } />
                    </div>
                    <div className="input-group">
                        <comp.Input type="text" className="input" placeholder="기업코드"
                            value={code} onChange={(e) => {
                                setCode(e.target.value);
                                setCompanyName('');
                            }} />
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

                <LoadingOverlayComp isLoadingFlag={isLoading} />

            </comp.Container>
        </>
    );
}
export default CompValue;