import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const WriteRoom = () => {
    const navigate = useNavigate();
    const username = getCookie("usernickname")
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const [amenitychecks,setamenitychecks] = useState([
        {id:1, text:"북한산 전망의 발코니", checked: false},
        {id:2, text:"프리미엄 덕다운 침구 세트", checked: false},
        {id:3, text:"LG 43인치 LED TV (케이블TV 채널)", checked: false},
        {id:4, text:"최대 1기가 유/무선 인터넷 무료", checked: false},
        {id:5, text:"와인셀러", checked: false},
        {id:6, text:"욕실(자쿠지, 샤워부스)화장실 2개", checked: false},
        {id:7, text:"해양심층수 천년동안 3병 제공", checked: false},
        {id:8, text:"미니바 1회 무료", checked: false},
        {id:9, text:"욕실(욕조, 샤워부스)", checked: false}
    ]);
    const checkClick = (id) => {
        setamenitychecks(amenitychecks.map(ame=> ame.id === id ? 
            {...ame, checked: !ame.checked}: ame))
    }
    const [formData, setFormData] = useState({
        r_name: "",
        r_img1: "",
        r_img2: "",
        r_img3: "",
        r_img4: "",
        r_size: "",
        r_price:"",
        r_bed: "",
        r_amenity: "",
        r_desc:"",
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
        addRoom();
        
    }
    const addRoom = () => {
        console.log("호출");
        const amenitysText =  amenitychecks.filter(am=>am.checked).map(am=>am.text).join('*');
        const formData2 = { ...formData, r_amenity: amenitysText};
        axios.post(`${API_URL}/room`, formData2)
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
            navigate('/room');
        }
    },[isLogin, username, navigate])
    if(!isLogin || username !== 'admin') return null;
    return (
        <div className='inner'>
            <Title title="Room"/>
            <div>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable'>
                        <tbody>
                            <tr>
                                <td>방이름</td>
                                <td><input type="text" 
                                name="r_name" value={formData.r_name} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>베드타입</td>
                                <td>
                                    <select name="r_bed" value={formData.r_bed} onChange={onChange}>
                                    <option value="퀸 베드 1개">퀸 베드 1개</option>
                                    <option value="싱글 베드 1개 & 세미 더블 베드 1개">싱글 베드 1개 & 세미 더블 베드 1개</option>
                                    <option value="할리우드 베드 1개 (세미 더블 베드 2개 일체형)">할리우드 베드 1개 (세미 더블 베드 2개 일체형)</option>
                                    <option value="싱글 베드 2개 & 침구류 1세트">싱글 베드 2개 & 침구류 1세트</option>
                                    <option value="싱글 베드 1개 & 더블 베드 1개">싱글 베드 1개 & 더블 베드 1개</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>크기</td>
                                <td>
                                    <select name="r_size" value={formData.r_size} onChange={onChange}>
                                    <option value="13평">13평</option>
                                    <option value="18평">18평</option>
                                    <option value="24평">24평</option>
                                    <option value="27평">27평</option>
                                    <option value="32평">32평</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>어메니티</td>
                                <td>
                                {amenitychecks.map(amenity=>
                                <div key={amenity.id} >
                                    <label>{amenity.text}</label>
                                    <input type="checkbox" value={amenity.text} checked={amenity.checked} 
                                    onChange={()=>checkClick(amenity.id)}/></div>)}
                                </td>
                            </tr>
                            <tr>
                                <td>이용요금</td>
                                <td><input type="number" min={50000} step={1000} name="r_price" 
                                value={formData.r_price} onChange={onChange}/></td>
                            </tr>
                            <tr>
                                <td>이미지1</td>
                                <td><input type="file"
                                name="r_img1" onChange={onChangeImage} />
                                {formData.r_img1 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img1}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>이미지2</td>
                                <td><input type="file"
                                name="r_img2" onChange={onChangeImage} />
                                 {formData.r_img2 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img2}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>이미지3</td>
                                <td><input type="file"
                                name="r_img3" onChange={onChangeImage} />
                                 {formData.r_img3 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img3}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>이미지4</td>
                                <td><input type="file"
                                name="r_img4" onChange={onChangeImage} />
                                 {formData.r_img4 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img4}`} width="100px" alt="" />
                                    </div>}</td>
                            </tr>
                            <tr>
                                <td>상세설명글</td>
                                <td>
                                    <textarea name="r_desc" value={formData.r_desc}
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

export default WriteRoom;