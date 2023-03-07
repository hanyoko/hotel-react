import { Cookies } from "react-cookie";

const cookies = new Cookies();
//쿠키 생성 함수
export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options})
}
//쿠키 접근 함수
export const getCookie = (name) => {
    return cookies.get(name)
}
//쿠키 삭제 함수
export const removeCookie = (name) => {
    return cookies.remove(name)
}