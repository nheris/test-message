import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


// Your web app's Firebase configuration
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0jw2xwrWz5jW1qkfpjoIZdzePrs7aJsc",
  authDomain: "test-messaging-acaae.firebaseapp.com",
  projectId: "test-messaging-acaae",
  storageBucket: "test-messaging-acaae.firebasestorage.app",
  messagingSenderId: "207356196934",
  appId: "1:207356196934:web:79dbb8793df26ebad9b247"
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
    // getToken(messaging, {vapidKey: "BI4TGnUTpGvepZ2OybPh6VKcFuYqW0u3VWqpYGM9h9qiFAiEmAb_H_uub2elREf5OU_SApheVAea5w7CD34Sxl0"});
    // const token = getToken(messaging, {vapidKey: "BI4TGnUTpGvepZ2OybPh6VKcFuYqW0u3VWqpYGM9h9qiFAiEmAb_H_uub2elREf5OU_SApheVAea5w7CD34Sxl0"});
    // console.log("token:", token)

    try {
        // VAPID 키를 사용하여 FCM 토큰 가져오기
        const token = await getToken(messaging, {
            vapidKey: "BI4TGnUTpGvepZ2OybPh6VKcFuYqW0u3VWqpYGM9h9qiFAiEmAb_H_uub2elREf5OU_SApheVAea5w7CD34Sxl0"
        });

        if (token) console.log("FCM Token:", token);
        else console.log("FCM Token을 가져올 수 없습니다.");
    } catch (error) {
        console.error("FCM Token 가져오기 실패:", error);
    }

    onMessage(messaging, (payload) => {
        console.log("메시지가 도착했습니다.", payload);
    });
};



requestPermission();