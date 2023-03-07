import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';
import { setId } from '../../modules/logincheck';

const PassFind = () => {
    const dispatch = useDispatch();
    const [idInfo, setIdInfo] = useState("");
    const [formData, setFormData] = useState({
        m_name: "",
        m_email: ""
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
        axios.post(`${API_URL}/findpass`, formData)
        .then(res=>{
            alert("아이디와 이름이 확인되셨습니다.");
            setIdInfo(res.data);
            dispatch(setId(res.data));
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <div className='inner'>
            <Title title="Find password"/>
            { idInfo ? <div>비밀번호를 변경할 수 있습니다. <Link to="/updatepass"><button>비밀번호변경하기</button></Link></div> :
            <><p className='small'>가입시 입력한 이름과 아이디를 입력해 주세요</p>
            <form onSubmit={onSubmit}>
            <table className='defaulttable small'>
                <tbody>
                <tr>
                    <td>이름</td>
                    <td><input name="m_name" value={formData.m_name} onChange={onChange}/></td>
                </tr>
                <tr>
                    <td>아이디(이메일)</td>
                    <td><input name="m_email" value={formData.m_email} onChange={onChange}/></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button type="submit">확인</button>
                        <button type="reset">취소</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </form></>
            }
            
        </div>
    );
};

export default PassFind;