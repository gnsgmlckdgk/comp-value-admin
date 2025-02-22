// routes.js
export const ROUTES = {
    //@ 홈
    HOME: '/',

    //@ 트레이드
    //# 기업주요사항
    TRADE_NOTICE: '/notice',
    //# 기업가치
    TRADE_COMPLIST: '/complist',
    TRADE_COMPVALUE: '/compvalue',
    TRADE_COMPVALUE_MANUAL: '/compvalue/manual',

    //@ 게시판

    //# 자유게시판
    BOARD_FREEBOARD: '/freeBoard',
    BOARD_FREEBOARD_VIEW: '/freeBoard/view/:id',
    BOARD_FREEBOARD_REGISTER: '/freeBoard/regi',
    BOARD_FREEBOARD_EDIT: '/freeBoard/edit/:id',
};