import axios from 'axios';

/**
 * 에러 응답 처리
 * @param {any} error 
 * @returns {{ data: null, error: string }}
 */
const handleError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        const message = data.message;
        if (status === 400) {
            return { data: null, error: message || '잘못된 요청' };
        }
        return { data: null, error: message || '서버 에러' };
    }
    return { data: null, error: '네트워크 에러' };
};

/**
 * 동기 통신 (async/await 방식)
 * 호출하는 쪽에서 동기로 받고 싶으면 await send(...)
 * 호출하는 쪽에서 비동기 방식으로 호출하고 콜백을 받고 싶으면 .then 으로 받아서 처리 (Promise 체인)
 * 
 * @param {string} url 
 * @param {object} params 예: { corp_name: string, corp_code: string, year: string }
 * @param {string} [method="GET"] 
 * @returns {Promise<{ data: any, error: string|null }>}
 */
export const send = async (url, params, method = "GET") => {
    try {
        let response;
        if (method === "POST") {
            response = await axios.post(url, params, {
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            response = await axios.get(url, { params });
        }
        return { data: response.data, error: null };
    } catch (error) {
        return handleError(error);
    }
};

/**
 * 비동기 통신 (Promise 체인 방식)
 * @param {string} url 
 * @param {object} params 
 * @param {string} [method="GET"] 
 * @returns {Promise<{ data: any, error: string|null }>}
 */
export const asyncSend = (url, params, method = "GET") => {
    const request = method === "POST"
        ? axios.post(url, params, {
            headers: { 'Content-Type': 'application/json' }
        })
        : axios.get(url, { params });

    return request
        .then(response => ({ data: response.data, error: null }))
        .catch(handleError);
};
