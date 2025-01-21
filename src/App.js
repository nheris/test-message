import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { requestPermission, listenForMessages } from "./firebase";


function App() {
  // useEffect(()=>{
  //   requestPermission().then((token) => {
  //     if (token) {
  //       console.log("토큰을 성공적으로 가져왔습니다:", token);
  //       // 필요한 추가 처리 (ex. 서버에 토큰 저장)
  //     }
  //   });

  //   // 포그라운드 메시지 리스너 설정
  //   listenForMessages();
  // },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ㅡ_ㅡ
        </p>
      </header>
    </div>
  );
}

export default App;
