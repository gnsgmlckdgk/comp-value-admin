import { Home, NoticBoard, CompList, CompValue, CompValueManual, BoardListPage } from '../pages'

// src/config/menuConfig.js
export const menuItems = [
    { label: "Home", path: "/", comp: Home },
    { label: "주요사항 공지", path: "/notice", comp: NoticBoard },
    { label: "기업목록", path: "/complist", comp: CompList },
    { label: "기업가치", path: "/compvalue", comp: CompValue },
    { label: "기업가치(수동)", path: "/compvalue/manual", comp: CompValueManual },
    { label: "자유게시판", path: "/freeBoard", comp: BoardListPage },
];
