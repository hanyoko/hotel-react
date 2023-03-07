import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';
import { useSelector } from 'react-redux';
const WriteEvent = () => {
    const navigate = useNavigate();
    const username = getCookie("usernickname")
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const [formData, setFormData] = useState({
        e_title: "",
        e_time: "",
        e_titledesc: "",
        e_desc: "",
        e_category: "",
        e_img1: "",
        e_img2: "",
    });
    //파일 전송하기
    const onChangeImage = (e) => {
        const {name} = e.target;
        //폼태그생성하기 
        const imageFormData = new FormData();
        //폼태그에 데이터 추가하기
        imageFormData.append('img', e.target.files[0]);
        axios.post(`${API_URL}/upload`, imageFormData, {
            headers: {'content-type': 'multipart/formdata'},
        }).then(res=>{
            console.log(res.data.imageUrl);
            setFormData({
                ...formData,
                [name]: res.data.imageUrl
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setFormData({
            ...formData,
            [name]: value
        })
    }
    //폼전송 이벤트 
    const onSubmit = (e) => {
        e.preventDefault();
        //입력이 다 되어있는지 체크하고 addMember()호출
        if(formData.e_title !== "" && formData.e_time !== "" && formData.e_titledesc !== "" 
        && formData.e_category !== "" ){
            addEvent();
        }
    }
    const addEvent = () => {
        console.log("호출");
        axios.post(`${API_URL}/event`, formData)
        .then(res=> {
            alert('등록되었습니다.');
            navigate('/');
        })
        .catch(e=>{
            console.log("에러가 발생했어요")
            console.log(e);
        })
    }
    useEffect(()=>{
        if(!isLogin || username !== 'admin') {
            alert("관리자만 접근할수 있습니다.");
            navigate('/');
        }
    },[isLogin, username, navigate])
    if(!isLogin || username !== 'admin') return null;
    return (
        <div className='inner'>
            <Title title="Event"/>
            <div>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable'>
                        <tbody>
                            <tr>
                                <td>제목</td>
                                <td><input type="text" 
                                name="e_title" value={formData.e_title} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>기간</td>
                                <td><input type="text" 
                                name="e_time" value={formData.e_time} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>간략설명</td>
                                <td><input type="text" 
                                name="e_titledesc" value={formData.e_titledesc} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>분류</td>
                                <td><select name="e_category" value={formData.e_category} onChange={onChange}>
                                    <option value="special">스페셜</option>
                                    <option value="promotion">프로모션</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <td>이미지1</td>
                                <td><input type="file"
                                name="e_img1" onChange={onChangeImage} />
                                {formData.e_img1 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img1}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>이미지2</td>
                                <td><input type="file"
                                name="e_img2" onChange={onChangeImage} />
                                 {formData.e_img2 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img2}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>상세설명글</td>
                                <td>
                                    <textarea name="e_desc" value={formData.e_desc}
                                    onChange={onChange}>

                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                               <td colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                               </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default WriteEvent;