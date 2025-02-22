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

/*

    '@components': path.resolve(__dirname, 'src/components/page'),
    '@layout': path.resolve(__dirname, 'src/components/layout'),
    '@utils': path.resolve(__dirname, 'src/util'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@pages': path.resolve(__dirname, 'src/pages'),


    import { ROUTES } from '@config/routes'

    //@ 홈
    ROUTES.HOME: '/',

    //@ 트레이드
    //# 기업주요사항
    ROUTES.TRADE_NOTICE: '/notice',
    
    //# 기업가치
    ROUTES.TRADE_COMPLIST: '/complist',
    ROUTES.TRADE_COMPVALUE: '/compvalue',
    ROUTES.TRADE_COMPVALUE_MANUAL: '/compvalue/manual',

    //@ 게시판

    //# 자유게시판
    ROUTES.BOARD_FREEBOARD: '/freeBoard',
    ROUTES.BOARD_FREEBOARD_VIEW: '/freeBoard/view/:id',
    ROUTES.BOARD_FREEBOARD_REGISTER: '/freeBoard/view',    // TODO: regi 로 변경필요
    ROUTES.BOARD_FREEBOARD_EDIT: '/freeBoard/edit/:id',

    */