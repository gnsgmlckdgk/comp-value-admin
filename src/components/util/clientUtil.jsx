import axios from 'axios';

/**
 * 동기 통신
 * 호출하는쪽에서 동기로 받고 싶으면 await send(...)
 * 호출하는쪽에서 비동기 방식으로 호출하고 콜백을 받고 싶으면 .then 으로 받아서 처리(Promise 체인)
 * @param {ex: { corp_name: string, corp_code: string, year: string }} params 
 * @returns {Promise<{ data: any, error: string|null }>}
 */
export const send = async (url, params, method = "GET") => {

    const sendUrl = url;

    let response;
    try {
        if (method === "POST") {
            // POST 요청
            response = await axios.post(sendUrl, params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            // GET 요청
            response = await axios.get(sendUrl, { params });
        }

        // 성공 → data 반환
        return {
            data: response.data,
            error: null
        };
    } catch (error) {
        // error.response 유무에 따라 메세지 세팅
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return {
                        data: null,
                        error: error.response.data.message || '잘못된 요청'
                    };
                default:
                    return {
                        data: null,
                        error: error.response.data.message || '서버 에러'
                    };
            }
        } else {
            // 서버 응답 없는 경우
            return {
                data: null,
                error: '네트워크 에러'
            };
        }
    }
}


/**
 * 비동기 통신
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
export const asyncSend = (url, params, method = "GET") => {

    const sendUrl = url;

    const errorProc = (error) => {
        // error.response 유무에 따라 메세지 세팅
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return {
                        data: null,
                        error: error.response.data.message || '잘못된 요청'
                    };
                default:
                    return {
                        data: null,
                        error: error.response.data.message || '서버 에러'
                    };
            }
        } else {
            // 서버 응답 없는 경우
            return {
                data: null,
                error: '네트워크 에러'
            };
        }
    }

    if (method === "POST") {
        // POST 요청
        return axios.post(sendUrl, params, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return { data: response.data, error: null }
            }).catch(error => {
                return errorProc(error);
            });
    } else {
        // GET 요청
        return axios.get(sendUrl, { params })
            .then(response => {
                return { data: response.data, error: null }
            }).catch(error => {
                return errorProc(error);
            });
    }

}