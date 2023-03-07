import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../../util/cookie';
import axios from 'axios';
import { API_URL } from '../../config/apiurl';
import { setLogin, goToHome, setLoginuser } from '../../modules/logincheck';
import Title from '../../components/Title';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        useremail: "",
        userpass: ""
    })
    const onChage = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        //인풋에 입력했는지 체크 
        if (loginData.useremail === '' || loginData.userpass === '') {
            alert('이메일과 비밀번호를 입력해주세요');
        } else {
            axios.post(`${API_URL}/login`, loginData)
                //로그인이 되었을때
                .then(result => {
                    let { m_email, m_nickname, m_name, m_phone } = result.data[0];

                    console.log(result);
                    //usermail에 값이 있을때
                    if (m_email !== null && m_email !== '' && m_email !== undefined) {
                        alert('로그인되었습니다.');
                        //현재시간 객체를 생성
                        let expires = new Date();
                        //60분 더한 값으로 변경
                        expires.setMinutes(expires.getMinutes() + 10)
                        setCookie('useremail', `${m_email}`, { path: '/', expires });
                        setCookie('usernickname', `${m_nickname}`, { path: '/', expires });
                        setCookie('username', `${m_name}`, { path: '/', expires });
                        setCookie('userphone', `${m_phone}`, { path: '/', expires });

                        dispatch(setLogin());
                        dispatch(goToHome(navigate));
                    }
                })
                .catch(e => {
                    alert('이메일과 비밀번호를 확인해주세요');
                })
        }
    }
    return (
        <div className='inner' id="login">
            <Title title="Login" />
            <form onSubmit={onSubmit}>
                <table className='defaulttable'>
                    <tbody>
                        <tr>
                            <td>아이디(이메일주소)</td>
                            <td><input type="text" name="useremail" value={loginData.usermail} onChange={onChage} /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input typw="password" name="userpass" value={loginData.userpass} onChange={onChage} /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button type='submit'>로그인</button>
                                <Link to="/join"><button>회원가입</button></Link></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to="/findid"><span>아이디 찾기</span></Link>
                                <Link to="/findpass"><span>비밀번호 찾기</span></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div>

            </div>
        </div>
    );
};

export default Login;