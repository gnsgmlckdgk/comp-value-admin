import { Home, NoticBoard, CompList, CompValue, CompValueManual, BoardListPage, BoardViewPage, BoardRegisterPage, BoardEditPage } from '../pages'

// src/config/menuConfig.js
export const menuItems = [
    { label: "Home", path: "/", comp: Home, show: true },
    { label: "주요사항 공지", path: "/notice", comp: NoticBoard, show: true },
    { label: "기업목록", path: "/complist", comp: CompList, show: true },
    { label: "기업가치", path: "/compvalue", comp: CompValue, show: true },
    { label: "기업가치(수동)", path: "/compvalue/manual", comp: CompValueManual, show: true },
    { label: "자유게시판", path: "/freeBoard", comp: BoardListPage, show: true },


    //@ 메뉴 추가X 항목
    //# 자유게시판 서브 페이지
    { label: "자유게시판뷰페이지", path: "/freeBoard/view/:id", comp: BoardViewPage, show: false },
    { label: "자유게시판등록페이지", path: "/freeBoard/view", comp: BoardRegisterPage, show: false },
    { label: "자유게시판수정페이지", path: "/freeBoard/edit/:id", comp: BoardEditPage, show: false },
];