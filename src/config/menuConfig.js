import { Home, NoticBoard, CompList, CompValue, CompValueManual, BoardListPage, BoardViewPage, BoardRegisterPage, BoardEditPage } from '@pages'
import { ROUTES } from './routes'

// src/config/menuConfig.js
export const menuItems = [
    { label: "Home", path: ROUTES.HOME, comp: Home, show: true },
    { label: "주요사항 공지", path: ROUTES.TRADE_NOTICE, comp: NoticBoard, show: true },
    { label: "기업목록", path: ROUTES.TRADE_COMPLIST, comp: CompList, show: true },
    {
        label: "기업가치", path: ROUTES.TRADE_COMPVALUE, comp: CompValue, show: true,
        subItems: [
            { label: "기업가치(수동)", path: ROUTES.TRADE_COMPVALUE_MANUAL, comp: CompValueManual, show: true },
        ],
    },

    { label: "자유게시판", path: ROUTES.BOARD_FREEBOARD, comp: BoardListPage, show: true },


    //@ 메뉴 추가X 항목
    //# 자유게시판 서브 페이지
    { label: "자유게시판뷰페이지", path: ROUTES.BOARD_FREEBOARD_VIEW, comp: BoardViewPage, show: false },
    { label: "자유게시판등록페이지", path: ROUTES.BOARD_FREEBOARD_REGISTER, comp: BoardRegisterPage, show: false },
    { label: "자유게시판수정페이지", path: ROUTES.BOARD_FREEBOARD_EDIT, comp: BoardEditPage, show: false },
];