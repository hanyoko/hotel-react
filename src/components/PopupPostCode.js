import React from 'react';
import DaumPostcode from 'react-daum-postcode';
const PopupPostCode = ({onClose, onAddData}) => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        onAddData(data);
      };
      const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "600px",
        height: "600px",
        border: "2px solid #666"
      }
    return (
        <div>
            <DaumPostcode onComplete={handleComplete} style={postCodeStyle}/>
            <button className='postCode_btn' onClick={()=>{
                onClose()
            }}>입력</button>
        </div>
    );
};

export default PopupPostCode;