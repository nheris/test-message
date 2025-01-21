import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Initialize Firebase
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


// 알림 권한 요청 및 토큰 가져오기
async function requestPermission() {
    console.log("권한 요청 중...");
    
    const permission = Notification.requestPermission();
    if (permission === "denied") {
        console.log("알림 권한 허용 안됨");
        return;
    }
    
    console.log("알림 권한이 허용됨");

    try {
        //app.js시 토큰 서버로 전달
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
        });
        if (token) console.log("FCM Token:", token);
        else console.log("FCM Token을 가져올 수 없습니다.");
    } catch (error) {
        console.error("FCM Token 가져오기 실패:", error);
    }

    //포그라운드 메시지 수신
    onMessage(messaging, (payload) => {
        console.log("메시지가 도착했습니다.", payload);
    });

    // 백그라운드 알림 수신 설정
    // messaging.onBackgroundMessage(messaging, (payload) => {
    //     const notificationTitle = "안뇽";
    //     const notificationOptions = {
    //     body: payload,
    //     icon: "/favicon.ico",
    //     };
    //     self.registration.showNotification(notificationTitle, notificationOptions);
    // });
};



requestPermission();