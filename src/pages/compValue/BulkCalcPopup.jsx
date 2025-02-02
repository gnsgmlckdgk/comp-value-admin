import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingOverlayComp from '../../components/common/LoadingOverlay';
import { send } from '../../components/util/clientUtil';
import * as XLSX from 'xlsx'; // default export 없이 전체 import

// 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
`;

// 텍스트 영역 스타일
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;

// 버튼 스타일
const Button = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const ProgressText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
`;

/**
 * 날짜를 "yyyy-MM-dd HH:mm:ss" 형식의 문자열로 변환하는 함수
 * @param {Date} date 
 * @returns {string}
 */
const formatDate = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const BulkCalcPopup = ({ onClose, year = new Date().getFullYear() }) => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });

    const handleSubmit = async () => {
        // 기업명을 줄바꿈 단위로 분리 (빈 줄 제거)
        const companyNames = inputText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '');

        if (companyNames.length === 0) {
            alert('기업명을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setProgress({ current: 0, total: companyNames.length });
        const results = [];
        const sendUrl = "http://localhost:18080/dart/main/cal/per_value";

        // 각 기업명에 대해 API 호출 (요청 사이에 3초 지연)
        for (let i = 0; i < companyNames.length; i++) {
            const name = companyNames[i];
            try {
                const { data, error } = await send(sendUrl, {
                    corp_name: name,
                    corp_code: "",
                    year: year,
                });
                // 정상 응답이더라도 HttpStatus가 200이 아니면 오류 처리
                if (error || (data && data.httpStatus && data.httpStatus !== 200)) {
                    results.push({
                        '결과메시지': error || `응답 상태: ${data.httpStatus}`,
                        '기업명': name, // 입력한 기업명을 그대로 기록
                        '기업코드': '',
                        '주식코드': '',
                        '주당가치': '',
                        '현재가격': '',
                        '확인시간': formatDate(new Date()),
                        '비고': error || (data ? data.결과메시지 : '')
                    });
                } else {
                    // 정상 응답의 경우, 만약 data.기업명이 없으면 입력한 name 사용하고, 그 경우 비고에 결과메시지 기록
                    const actualName = data.기업명 || name;
                    results.push({
                        '결과메시지': data.결과메시지 || '',
                        '기업명': actualName,
                        '기업코드': data.기업코드 || '',
                        '주식코드': data.주식코드 || '',
                        '주당가치': data.주당가치 || '',
                        '현재가격': data.현재가격 || '',
                        '확인시간': data.확인시간 || formatDate(new Date()),
                        '비고': data.기업명 ? '' : (data.결과메시지 || '')
                    });
                }
            } catch (err) {
                results.push({
                    '결과메시지': '요청 중 오류 발생',
                    '기업명': name,
                    '기업코드': '',
                    '주식코드': '',
                    '주당가치': '',
                    '현재가격': '',
                    '확인시간': formatDate(new Date()),
                    '비고': '요청 중 오류 발생'
                });
            }
            // 진행도 업데이트
            setProgress({ current: i + 1, total: companyNames.length });
            // 3초 지연 (요청 간 간격 확보)
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // 결과 배열 변환:
        // - "기업명 입력"은 제거하고 "No" 컬럼 추가 (첫 번째 열)
        // - "결과메시지": '정상 처리되었습니다.'는 '정상', 그 외는 '오류'
        // - "비교" 컬럼 추가 = 주당가치 - 현재가격
        const transformedResults = results.map((row, idx) => {
            const newRow = { ...row };
            newRow['No'] = idx + 1;
            newRow['결과메시지'] =
                newRow['결과메시지'] === '정상 처리되었습니다.' ? '정상' : '오류';
            const perValue = Number(newRow['주당가치']) || 0;
            const currentPrice = Number(newRow['현재가격']) || 0;
            newRow['비교'] = perValue - currentPrice;
            return newRow;
        });

        // 원하는 컬럼 순서:
        // No, 결과메시지, 기업명, 기업코드, 주식코드, 주당가치, 현재가격, 비교, 확인시간, 비고
        const headerOrder = [
            'No',
            '결과메시지',
            '기업명',
            '기업코드',
            '주식코드',
            '주당가치',
            '현재가격',
            '비교',
            '확인시간',
            '비고'
        ];
        const worksheet = XLSX.utils.json_to_sheet(transformedResults, { header: headerOrder });

        // 헤더 스타일 적용: 중앙 정렬, 굵게 처리
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = {
                    font: { bold: true },
                    alignment: { horizontal: "center" }
                };
            }
        }

        // 컬럼 너비 설정 (wch: width in characters)
        worksheet['!cols'] = [
            { wch: 5 },   // No (반으로 축소)
            { wch: 13 },  // 결과메시지 (30% 증가)
            { wch: 20 },  // 기업명 (2배)
            { wch: 13 },  // 기업코드 (30% 증가)
            { wch: 11 },  // 주식코드 (10% 증가)
            { wch: 12 },  // 주당가치 (20% 증가)
            { wch: 12 },  // 현재가격 (주당가치와 동일)
            { wch: 12 },  // 비교 (주당가치와 동일)
            { wch: 20 },  // 확인시간 (2배)
            { wch: 20 }   // 비고 (2배)
        ];

        // 데이터 행에서 "주당가치"가 "현재가격"보다 높으면 해당 셀에 스타일 적용 (빨간색, 굵게)
        const perValueColIndex = headerOrder.indexOf('주당가치');
        const currentPriceColIndex = headerOrder.indexOf('현재가격');
        if (perValueColIndex !== -1 && currentPriceColIndex !== -1) {
            for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                const perCellAddr = XLSX.utils.encode_cell({ r: R, c: perValueColIndex });
                const curCellAddr = XLSX.utils.encode_cell({ r: R, c: currentPriceColIndex });
                const perCell = worksheet[perCellAddr];
                const curCell = worksheet[curCellAddr];
                const perVal = perCell && perCell.v ? Number(perCell.v) : 0;
                const curVal = curCell && curCell.v ? Number(curCell.v) : 0;
                if (perVal > curVal && perCell) {
                    perCell.s = { font: { bold: true, color: { rgb: "FF0000" } } };
                }
            }
        }

        // 워크북 생성 및 시트 추가
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '결과');
        XLSX.writeFile(workbook, '기업가치_결과.xlsx');

        setIsLoading(false);
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                {isLoading && <LoadingOverlayComp isLoadingFlag={true} />}
                <h2>기업명 일괄 계산</h2>
                <p>기업명을 한 줄에 하나씩 입력하세요:</p>
                <TextArea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="예:\n삼성전자\nLG전자\n현대자동차"
                />
                <ProgressText>
                    {progress.total > 0 &&
                        `${progress.current}/${progress.total}건 (${Math.round(
                            (progress.current / progress.total) * 100
                        )}%)`}
                </ProgressText>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={handleSubmit}>전송</Button>
                </div>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default BulkCalcPopup;
