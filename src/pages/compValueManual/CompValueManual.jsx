import React, { useState } from 'react';
import styled from 'styled-components';
import { send } from '@utils/clientUtil';

import { API_CONFIG, GET_HOST } from '@config/apiConfig'

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
  font-size: 2rem;
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

const ResetButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
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

// 오류 메시지 스타일
const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 0.85rem;
  color: red;
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
    // currentRatio는 자동 계산되므로 numericFields에서 제외합니다.
    const numericFields = [
        'unit',
        'operatingProfitPrePre',
        'operatingProfitPre',
        'operatingProfitCurrent',
        'currentAssetsTotal',
        'currentLiabilitiesTotal',
        'investmentAssets',
        'fixedLiabilities',
        'issuedShares'
    ];

    // 초기 상태: 모든 숫자 필드는 원본 값(콤마 없음)으로 저장
    const initialFormData = {
        unit: '100000000',
        operatingProfitPrePre: '',
        operatingProfitPre: '',
        operatingProfitCurrent: '',
        currentAssetsTotal: '',
        currentLiabilitiesTotal: '',
        currentRatio: '', // 자동 계산
        investmentAssets: '',
        fixedLiabilities: '',
        issuedShares: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [result, setResult] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // 천 단위 콤마 추가 함수 (소수점은 그대로, 음수도 처리)
    const formatNumber = (value) => {
        if (!value) return '';
        let str = value.toString();
        let sign = '';
        if (str.startsWith('-')) {
            sign = '-';
            str = str.slice(1);
        }
        const parts = str.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return sign + parts.join('.');
    };

    // onChange 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        // 숫자 필드(단, currentRatio는 자동 계산이므로 제외)에 대해서만 처리
        if (numericFields.includes(name)) {
            processedValue = value.replace(/,/g, '');
            if (processedValue.startsWith('-')) {
                processedValue = '-' + processedValue.slice(1).replace(/\D/g, '');
            } else {
                processedValue = processedValue.replace(/\D/g, '');
            }
        }
        // 입력 시 해당 필드 오류 제거
        setFormErrors((prev) => {
            const newErrors = { ...prev };
            if (newErrors[name]) {
                delete newErrors[name];
            }
            return newErrors;
        });
        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: processedValue
            };
            // 유동자산 또는 유동부채가 변경되면 유동비율을 계산 (값이 없거나 0이면 0)
            if (name === 'currentAssetsTotal' || name === 'currentLiabilitiesTotal') {
                const assets = parseFloat(updated.currentAssetsTotal) || 0;
                const liabilities = parseFloat(updated.currentLiabilitiesTotal) || 0;
                const ratio = liabilities === 0 ? 0 : assets / liabilities;
                // 소수점 3자리까지 반올림하여 저장
                updated.currentRatio = ratio.toFixed(3);
            }
            return updated;
        });
    };

    // 제출 전 필수 입력값 검증
    const validate = () => {
        const requiredFields = [
            'unit',
            'operatingProfitPrePre',
            'operatingProfitPre',
            'operatingProfitCurrent',
            'currentAssetsTotal',
            'currentLiabilitiesTotal',
            'investmentAssets',
            'fixedLiabilities',
            'issuedShares'
        ];
        let errors = {};
        requiredFields.forEach((field) => {
            if (formData[field].trim() === '') {
                errors[field] = '필수 입력 값입니다.';
            }
        });
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            const sendUrl = `${GET_HOST()}${API_CONFIG.TRADE.COMPVALUE_MANUAL.URL}`;

            const response = await send(sendUrl, formData, API_CONFIG.TRADE.COMPVALUE_MANUAL.METHOD);
            setResult(response.data ? formatNumber(response.data.result) : JSON.stringify(response));
            // 제출 성공 시 오류 초기화
            setFormErrors({});
        } catch (error) {
            console.error(error);
        }
    };

    // 초기화 버튼 핸들러: 단위는 그대로 두고 나머지는 초기화
    const handleReset = () => {
        setFormData({
            ...initialFormData,
            unit: formData.unit
        });
        setResult('');
        setFormErrors({});
    };

    return (
        <BoardContainer>
            <Title>재무 정보 입력</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <FieldsGrid>
                    <FormGroup>
                        <label htmlFor="unit">단위 (Default: 1억)</label>
                        <input
                            id="unit"
                            name="unit"
                            type="text"
                            value={formatNumber(formData.unit)}
                            onChange={handleChange}
                        />
                        {formErrors.unit && <ErrorText>{formErrors.unit}</ErrorText>}
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
                                {formErrors.operatingProfitPrePre && <ErrorText>{formErrors.operatingProfitPrePre}</ErrorText>}
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
                                {formErrors.operatingProfitPre && <ErrorText>{formErrors.operatingProfitPre}</ErrorText>}
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
                                {formErrors.operatingProfitCurrent && <ErrorText>{formErrors.operatingProfitCurrent}</ErrorText>}
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
                        {formErrors.currentAssetsTotal && <ErrorText>{formErrors.currentAssetsTotal}</ErrorText>}
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
                        {formErrors.currentLiabilitiesTotal && <ErrorText>{formErrors.currentLiabilitiesTotal}</ErrorText>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="currentRatio">유동비율</label>
                        <input
                            id="currentRatio"
                            name="currentRatio"
                            type="text"
                            value={formatNumber(formData.currentRatio)}
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="investmentAssets">투자자산 (비유동자산내)</label>
                        <input
                            id="investmentAssets"
                            name="investmentAssets"
                            type="text"
                            value={formatNumber(formData.investmentAssets)}
                            onChange={handleChange}
                        />
                        {formErrors.investmentAssets && <ErrorText>{formErrors.investmentAssets}</ErrorText>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="fixedLiabilities">고정부채 (비유동부채)</label>
                        <input
                            id="fixedLiabilities"
                            name="fixedLiabilities"
                            type="text"
                            value={formatNumber(formData.fixedLiabilities)}
                            onChange={handleChange}
                        />
                        {formErrors.fixedLiabilities && <ErrorText>{formErrors.fixedLiabilities}</ErrorText>}
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
                        {formErrors.issuedShares && <ErrorText>{formErrors.issuedShares}</ErrorText>}
                    </FormGroup>
                </FieldsGrid>
                <ButtonContainer>
                    <SearchButton type="submit">전송</SearchButton>
                    <ResetButton type="button" onClick={handleReset}>초기화</ResetButton>
                </ButtonContainer>
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
