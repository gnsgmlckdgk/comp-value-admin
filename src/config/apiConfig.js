// src/config/apiConfig.js

/**
 * 로컬환경인지 확인
 * @returns 
 */
export const IS_LOCAL = () => (window.location.hostname === 'localhost')

/**
 * 백엔드 주소
 */
export const API_CONFIG = {

    BASE_URL_LOCAL: 'http://localhost:18080',
    BASE_URL: '',

    //@ 게시판
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


// import { API_CONFIG, IS_LOCAL } from '@config/apiConfing'