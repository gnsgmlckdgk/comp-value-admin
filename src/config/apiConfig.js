// src/config/apiConfig.js

/**
 * 로컬환경인지 확인
 * @returns 
 */
export const IS_LOCAL = () => (window.location.hostname === 'localhost')
export const GET_HOST = () => {
    if (IS_LOCAL()) {
        return API_CONFIG.BASE_URL_LOCAL;
    } else {
        return API_CONFIG.BASE_URL;
    }
}

/**
 * 백엔드 주소
 * import { API_CONFIG, GET_HOST } from '@config/apiConfig'
 */
export const API_CONFIG = {

    BASE_URL_LOCAL: 'http://localhost:18080',
    BASE_URL: '',

    //@ 트레이드, `${GET_HOST()}${API_CONFIG.TRADE.NOTICE.URL}`;
    TRADE: {
        //# 기업주요사항
        NOTICE: { URL: '/dart/disclosure/disc/list', METHOD: 'POST' },
        //# 기업목록
        COMPLIST: { URL: '/dart/disclosure/corpCode', METHOD: 'GET' },
        //# 기업가치계산
        COMPVALUE: { URL: '/dart/main/cal/per_value', METHOD: 'GET' },
        //# 기업가치계산(수동)
        COMPVALUE_MANUAL: { URL: '/dart/main/cal/per_value/manual', METHOD: 'POST' },
    },

    //@ 게시판, `${GET_HOST()}${API_CONFIG.BOARD.FREEBOARD.VIEW.URL}/${id}`;
    BOARD: {
        //# 자유게시판
        FREEBOARD: {
            LIST: { URL: '/dart/freeboard', METHOD: 'GET' },
            VIEW: { URL: '/dart/freeboard/view', METHOD: 'GET' },
            REGISTER: { URL: '/dart/freeboard/regi', METHOD: 'POST' },
            EDIT: { URL: '/dart/freeboard/modi', METHOD: 'PUT' },
            DELETE: { URL: '/dart/freeboard/delete', METHOD: 'DELETE' }
        }
    }


}