import React, { useState } from 'react';

// 컴포넌트
import LoadingOverlayComp from '../../components/common/LoadingOverlay';
import { send } from '../../components/util/clientUtil';
import DetailsToggle from './DetailCompValue';

// 스타일 컴포넌트(styled-components)
import * as comp from './style/CompValueStyle';

// 데이터 (초기 더미 데이터)
import dart_data from './data/open_dart';

/**
 * 상세정보 세팅 (결과 객체의 "상세정보" 속성을 배열 형태로 변환)
 * @param {object} result 
 * @returns {Array<{id: string, title: string, content: any}>}
 */
const setDetailData = (result) => {
    if (!result || !result.상세정보) return [];
    return Object.entries(result.상세정보).map(([key, value]) => ({
        id: key,
        title: key,
        content: value,
    }));
};

const CompValue = () => {
    const [isLoading, setIsLoading] = useState(false);
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

        const sendUrl = "http://localhost:18080/dart/main/cal/per_value";
        setIsLoading(true);

        try {
            const { data, error } = await send(sendUrl, {
                corp_name: companyName,
                corp_code: code,
                year: date,
            });

            if (error) {
                // 에러 발생 시 결과 메시지 업데이트
                setResult({ 결과메시지: error });
            } else {
                setResult(data);
                setDetails(setDetailData(data));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // result 객체에서 필요한 값을 구조 분해
    const {
        결과메시지 = '',
        기업명 = '',
        기업코드 = '',
        주식코드 = '',
        주당가치 = '',
        현재가격 = '',
        확인시간 = '',
    } = result;

    // 숫자 값 포맷팅 (값이 있을 경우에만 처리)
    const formatted주당가치 =
        주당가치 !== '' ? Number(주당가치).toLocaleString() : '';
    const formatted현재가격 =
        현재가격 !== '' ? Number(현재가격).toLocaleString() : '';
    const isValueLower =
        주당가치 !== '' && 현재가격 !== '' && Number(주당가치) > Number(현재가격);

    return (
        <comp.Container>
            <comp.H1>기업가치 분석</comp.H1>

            <comp.Form onSubmit={handleSubmit}>
                <div className="input-group">
                    <comp.Input
                        type="text"
                        placeholder="기업명"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                            setCode('');
                        }}
                    />
                </div>
                <div className="input-group">
                    <comp.Input
                        type="text"
                        placeholder="기업코드"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setCompanyName('');
                        }}
                    />
                </div>
                <div className="input-group">
                    <comp.Input
                        type="text"
                        placeholder="기준연도"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <comp.Button type="submit">검색</comp.Button>
            </comp.Form>

            <comp.ResultMessage>
                <comp.resultMessageLi>
                    <comp.resultSpan>결과메시지</comp.resultSpan>
                    <comp.resultSpan2>{결과메시지}</comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>기업명</comp.resultSpan>
                    <comp.resultSpan2>{기업명}</comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>기업코드</comp.resultSpan>
                    <comp.resultSpan2>{기업코드}</comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>주식코드</comp.resultSpan>
                    <comp.resultSpan2>{주식코드}</comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>주당가치</comp.resultSpan>
                    <comp.resultSpan2>
                        {isValueLower ? (
                            <comp.StrongTextRed>{formatted주당가치}</comp.StrongTextRed>
                        ) : (
                            <comp.StrongText>{formatted주당가치}</comp.StrongText>
                        )}
                    </comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>현재가격</comp.resultSpan>
                    <comp.resultSpan2>
                        <comp.StrongText>{formatted현재가격}</comp.StrongText>
                    </comp.resultSpan2>
                </comp.resultMessageLi>
                <comp.resultMessageLi>
                    <comp.resultSpan>확인시간</comp.resultSpan>
                    <comp.resultSpan2>{확인시간}</comp.resultSpan2>
                </comp.resultMessageLi>

                <DetailsToggle details={details} containerStyle={{ marginTop: '10px' }} />
            </comp.ResultMessage>

            <LoadingOverlayComp isLoadingFlag={isLoading} />
        </comp.Container>
    );
};

export default CompValue;
