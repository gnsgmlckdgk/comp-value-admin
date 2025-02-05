import React, { useState } from 'react';
import styled from 'styled-components';
import { send } from '../../components/util/clientUtil';

/* --- 스타일 컴포넌트 --- */
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 1.5rem;
  text-align: center;
  color: #181a31;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;

// 기본 FormGroup
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

// 영업이익 그룹은 전체 열을 차지하도록 함
const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

// 영업이익 필드 하위 입력들을 위한 그리드
const SubFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const SubFormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
`;

/* --- 컴포넌트 --- */
function CompValueManual() {
    // 숫자 필드 이름들을 배열로 정의 (영업이익 3개 포함)
    const numericFields = [
        'unit',
        'operatingProfitPrePre',
        'operatingProfitPre',
        'operatingProfitCurrent',
        'currentAssetsTotal',
        'currentLiabilitiesTotal',
        'currentRatio',
        'investmentAssets',
        'fixedLiabilities',
        'issuedShares'
    ];

    // 초기 상태: 숫자 필드들은 원본 값(콤마 없음)으로 저장합니다.
    const [formData, setFormData] = useState({
        unit: '100000000',
        operatingProfitPrePre: '',
        operatingProfitPre: '',
        operatingProfitCurrent: '',
        currentAssetsTotal: '',
        currentLiabilitiesTotal: '',
        currentRatio: '',
        investmentAssets: '',
        fixedLiabilities: '',
        issuedShares: ''
    });

    // 응답 결과를 저장할 상태
    const [result, setResult] = useState('');

    // 천 단위 콤마를 추가하는 함수
    const formatNumber = (value) => {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // onChange 핸들러: 숫자 필드인 경우 입력값에서 콤마를 제거한 후 상태에 저장
    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (numericFields.includes(name)) {
            // 입력값에서 콤마 제거 및 숫자만 남기기
            processedValue = value.replace(/,/g, '').replace(/\D/g, '');
        }
        setFormData((prev) => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 백엔드 엔드포인트를 실제 주소로 교체하세요.
            const response = await send('/api/financial-input', formData, 'POST');
            // 응답값을 result 상태에 저장 (response.data.result 형식 가정)
            setResult(response.data ? response.data.result : JSON.stringify(response));
            alert('전송 성공');
        } catch (error) {
            console.error(error);
            alert('전송 실패');
        }
    };

    return (
        <BoardContainer>
            <Title>재무 정보 입력</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <FieldsGrid>
                    <FormGroup>
                        <label htmlFor="unit">단위</label>
                        <input
                            id="unit"
                            name="unit"
                            type="text"
                            value={formatNumber(formData.unit)}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FullWidthFormGroup>
                        <label>영업이익</label>
                        <SubFieldsGrid>
                            <SubFormGroup>
                                <label htmlFor="operatingProfitPrePre">전전기</label>
                                <input
                                    id="operatingProfitPrePre"
                                    name="operatingProfitPrePre"
                                    type="text"
                                    value={formatNumber(formData.operatingProfitPrePre)}
                                    onChange={handleChange}
                                    placeholder="전전기 영업이익"
                                />
                            </SubFormGroup>
                            <SubFormGroup>
                                <label htmlFor="operatingProfitPre">전기</label>
                                <input
                                    id="operatingProfitPre"
                                    name="operatingProfitPre"
                                    type="text"
                                    value={formatNumber(formData.operatingProfitPre)}
                                    onChange={handleChange}
                                    placeholder="전기 영업이익"
                                />
                            </SubFormGroup>
                            <SubFormGroup>
                                <label htmlFor="operatingProfitCurrent">당기</label>
                                <input
                                    id="operatingProfitCurrent"
                                    name="operatingProfitCurrent"
                                    type="text"
                                    value={formatNumber(formData.operatingProfitCurrent)}
                                    onChange={handleChange}
                                    placeholder="당기 영업이익"
                                />
                            </SubFormGroup>
                        </SubFieldsGrid>
                    </FullWidthFormGroup>

                    <FormGroup>
                        <label htmlFor="currentAssetsTotal">유동자산합계</label>
                        <input
                            id="currentAssetsTotal"
                            name="currentAssetsTotal"
                            type="text"
                            value={formatNumber(formData.currentAssetsTotal)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="currentLiabilitiesTotal">유동부채합계</label>
                        <input
                            id="currentLiabilitiesTotal"
                            name="currentLiabilitiesTotal"
                            type="text"
                            value={formatNumber(formData.currentLiabilitiesTotal)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="currentRatio">유동비율</label>
                        <input
                            id="currentRatio"
                            name="currentRatio"
                            type="text"
                            value={formatNumber(formData.currentRatio)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="investmentAssets">투자자산(비유동자산내)</label>
                        <input
                            id="investmentAssets"
                            name="investmentAssets"
                            type="text"
                            value={formatNumber(formData.investmentAssets)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="fixedLiabilities">고정부채(비유동부채)</label>
                        <input
                            id="fixedLiabilities"
                            name="fixedLiabilities"
                            type="text"
                            value={formatNumber(formData.fixedLiabilities)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="issuedShares">발행주식수</label>
                        <input
                            id="issuedShares"
                            name="issuedShares"
                            type="text"
                            value={formatNumber(formData.issuedShares)}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </FieldsGrid>
                <SearchButton type="submit">전송</SearchButton>
                {result && (
                    <ResultContainer>
                        <strong>결과:</strong> {result}
                    </ResultContainer>
                )}
            </FormWrapper>
        </BoardContainer>
    );
}

export default CompValueManual;
