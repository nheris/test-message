import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

// Firebase 초기화 (React 애플리케이션용)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

};
const app = initializeApp(firebaseConfig);


// Firebase Cloud Messaging 초기화
const messaging = getMessaging(app);

// 서비스 워커를 명시적으로 등록
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/test-message/service-worker.js', {scope: '/test-message/', type: 'module'})
    .then((registration) => {
        console.log('서비스 워커 등록 성공:', registration);
    })
    .catch((error) => {
        console.log('서비스 워커 등록 실패:', error);
    });
}
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/test-message/firebase-messaging-sw.js')
//       .then((registration) => {
//         console.log('서비스 워커 등록 성공:', registration);
//       })
//       .catch((error) => {
//         console.log('서비스 워커 등록 실패:', error);
//       });
// }

// 알림 권한 요청 및 토큰 가져오기
export async function requestPermission() {
    console.log("권한 요청 중...");
    
    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            console.log("알림 권한이 허용됨");

            // FCM 토큰 서버에 가져오기
            const token = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
            });
            if (token) {
                console.log("FCM Token:", token);
                return token;
            } else {
                console.log("FCM 토큰을 가져오지 못했습니다.");
                return;
            }
        }else {
            console.log("알림 권한 허용 안됨");
            return;
        }

    } catch (err) {
        console.error("알림 권한 요청 중 에러 발생:", err);
        return;
    }
};
requestPermission()

// 포그라운드 메시지 처리 함수
// export const listenForMessages = () => {
//     onMessage(messaging, (payload) => {
//         console.log("메시지가 도착했습니다.", payload);
//         // 추가 로직: 알림 표시, 데이터 업데이트
//     });
// };