import ReactDOM from 'react-dom';

const PopupDom = ({ children }) => {
    const el = document.getElementById('popupDom');
    return ReactDOM.createPortal(children,el);
};

export default PopupDom;