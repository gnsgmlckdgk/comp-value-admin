// routes.js
export const ROUTES = {
    //@ 홈
    HOME: '/',

    //@ 트레이드
    //# 기업주요사항
    TRADE_NOTICE: '/trade/notice',
    //# 기업가치
    TRADE_COMPLIST: '/trade/complist',
    TRADE_COMPVALUE: '/trade/compvalue',
    TRADE_COMPVALUE_MANUAL: '/trade/compvalue/manual',

    //@ 게시판

    //# 자유게시판
    BOARD_FREEBOARD: '/board/freeBoard',
    BOARD_FREEBOARD_VIEW: '/board/freeBoard/view/:id',
    BOARD_FREEBOARD_REGISTER: '/board/freeBoard/regi',
    BOARD_FREEBOARD_EDIT: '/board/freeBoard/edit/:id',
};