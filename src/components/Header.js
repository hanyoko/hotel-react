import React, { useEffect } from 'react';
import { MdFace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogin, setLogout } from '../modules/logincheck';
import { getCookie, removeCookie } from '../util/cookie';
import './Header.css';
const Header = () => {
    const username = getCookie("usernickname");
    const isLogin = useSelector(state => state.logincheck.isLogin);
    const dispatch = useDispatch();
    const logoutClick = () => {
        removeCookie('usernickname');
        removeCookie('useremail');
        removeCookie('username');
        removeCookie('userphone');
        dispatch(setLogout());
    }
    useEffect(() => {
        const loop = setInterval(()=>{
            const username = getCookie("usernickname");
            if (username) {
            dispatch(setLogin());
            } else {
                dispatch(setLogout());
                clearInterval(loop);
            }
        },3000)
    }, [username,dispatch])
    return (
        <header>
            <h1><Link to="/"><img src="/images/logo2.png" alt="" /></Link></h1>
            <ul className='menu'>
                <li><Link to="/special">스페셜오퍼</Link></li>
                <li><Link to="/room">객실안내</Link></li>
                <li><Link to="/reservation">객실예약</Link></li>
                <li>이용안내</li>
                {isLogin && username === 'admin' ?
                    <>
                        <li><Link to='/writeevent'>이벤트 등록</Link></li>
                        <li><Link to='/writeroom'>객실등록</Link></li>
                    </>
                    : null}
            </ul>
            <div>
                <div className='iconDiv'>
                    <MdFace />
                    <ul className='membermenu'>
                        {isLogin ? <><li onClick={logoutClick}>로그아웃</li>
                            <li><Link to="/join">회원정보</Link></li></> :
                            <><li><Link to="/login">로그인</Link></li>
                                <li><Link to="/join">회원가입</Link></li></>
                        }
                    </ul>
                </div>
            </div>

        </header>
    );
};

export default Header;