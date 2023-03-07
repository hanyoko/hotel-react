
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import RoomContainer from './containers/RoomContainer';
import RoomDetailContainer from './containers/RoomDetailContainer';
import SpDetailContainer from './containers/SpDetailContainer';
import SpecialContainer from './containers/SpecialContainer';
import Main from './pages/Main';
import EditPassword from './pages/member/EditPassword';
import IdFind from './pages/member/IdFind';
import JoinPage from './pages/member/JoinPage';
import Login from './pages/member/Login';
import PassFind from './pages/member/PassFind';
import Reservation from './pages/Reservation';
import ResurvCalendar from './pages/ReservCalendar';
import WriteEvent from './pages/WriteEvent';
import WriteRoom from './pages/WriteRoom';


function App() {
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/special"
          element={<SpecialContainer isMain={false} limits={10} />} />
        <Route path="/special/:no" element={<SpDetailContainer />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findid" element={<IdFind />} />
        <Route path="/findpass" element={<PassFind />} />
        <Route path="/writeEvent" element={<WriteEvent />} />
        <Route path="/updatepass" element={<EditPassword />} />
        <Route path="/writeRoom" element={<WriteRoom />} />
        <Route path="/room" element={<RoomContainer isreserv={false} />} />
        <Route path="/guestroom/:no" element={<RoomDetailContainer />} />
        <Route path="/reservation/*" element={<Reservation />} />
        <Route path="/test" element={<ResurvCalendar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
