import { Home, NoticBoard, CompList, CompValue } from '../pages'

// src/config/menuConfig.js
export const menuItems = [
    { label: "Home", path: "/", comp: Home },
    { label: "주요사항 공지", path: "/notice", comp: NoticBoard },
    { label: "기업목록", path: "/complist", comp: CompList },
    { label: "기업가치", path: "/compvalue", comp: CompValue },
];
