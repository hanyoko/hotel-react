import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';

const IdFind = () => {
    const [idInfo, setIdInfo] = useState("");
    const [formData, setFormData] = useState({
        m_name: "",
        m_phone: ""
    });
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/findid`, formData)
        .then(res=>{
            setIdInfo(res.data)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    return (
        <div className='inner'>
            <Title title="Find id"/>
            { idInfo ? <div>당신의 id는 {idInfo} 입니다. <Link to="/login"><button>로그인</button></Link></div> :
            <><p className='small'>가입시 입력한 이름과 전화번호를 입력해 주세요</p>
            <form onSubmit={onSubmit}>
            <table className='defaulttable small'>
                <tr>
                    <td>이름</td>
                    <td><input name="m_name" value={formData.m_name} onChange={onChange}/></td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td><input name="m_phone" value={formData.m_phone} onChange={onChange}/></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button type="submit">확인</button>
                        <button type="reset">취소</button>
                    </td>
                </tr>
            </table>
            </form></>
            }
            
        </div>
    );
};

export default IdFind;