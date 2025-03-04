// src/config/menuConfig.js
import {
    Home,
    NoticBoard,
    CompList,
    CompValue,
    CompValueManual,
    BoardListPage,
    BoardViewPage,
    BoardRegisterPage,
    BoardEditPage
} from '@pages';
import { ROUTES } from './routes';

export const menuItems = [
    {
        label: "Home",
        path: ROUTES.HOME,
        comp: Home,
        show: true,
    },
    {
        label: "트레이드",
        path: ROUTES.TRADE_NOTICE,
        comp: NoticBoard,
        show: true,
        subItems: [
            { label: "주요사항 공지", path: ROUTES.TRADE_NOTICE, comp: NoticBoard, show: true },
            { label: "기업목록", path: ROUTES.TRADE_COMPLIST, comp: CompList, show: true },
            { label: "기업가치", path: ROUTES.TRADE_COMPVALUE, comp: CompValue, show: true },
            { label: "기업가치(수동)", path: ROUTES.TRADE_COMPVALUE_MANUAL, comp: CompValueManual, show: true },
        ],
    },
    {
        label: "자유게시판",
        path: ROUTES.BOARD_FREEBOARD,
        comp: BoardListPage,
        show: true,
        // visible 메뉴가 활성화될 조건 (자유게시판의 메인/뷰/등록/편집 모두 포함)
        activePaths: [
            ROUTES.BOARD_FREEBOARD,
            ROUTES.BOARD_FREEBOARD_VIEW,
            ROUTES.BOARD_FREEBOARD_REGISTER,
            ROUTES.BOARD_FREEBOARD_EDIT,
        ],
    },
    // 보이지 않는 페이지들은 화면 렌더링에서 제외합니다.
    {
        label: "자유게시판뷰페이지",
        path: ROUTES.BOARD_FREEBOARD_VIEW,
        comp: BoardViewPage,
        show: false,
    },
    {
        label: "자유게시판등록페이지",
        path: ROUTES.BOARD_FREEBOARD_REGISTER,
        comp: BoardRegisterPage,
        show: false,
    },
    {
        label: "자유게시판수정페이지",
        path: ROUTES.BOARD_FREEBOARD_EDIT,
        comp: BoardEditPage,
        show: false,
    },
];