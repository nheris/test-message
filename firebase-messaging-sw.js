import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

//백그라운드에서 동작/ Service Worker 설정 /firebase-messaging-sw.js

// Firebase 초기화 (서비스 워커용)
const firebaseConfig = {
  apiKey: "AIzaSyC0jw2xwrWz5jW1qkfpjoIZdzePrs7aJsc",
    authDomain: "test-messaging-acaae.firebaseapp.com",
    projectId: "test-messaging-acaae",
    storageBucket: "test-messaging-acaae.firebasestorage.app",
    messagingSenderId: "207356196934",
    appId: "1:207356196934:web:79dbb8793df26ebad9b247",
};
const app = initializeApp(firebaseConfig);

// Firebase Cloud Messaging 초기화
const messaging = getMessaging(app);
//messaging.useServiceWorker('/test-message/firebase-messaging-sw.js');

// 백그라운드 알림 수신 설정
// messaging.onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   const notificationTitle = "안뇽 (Background Message Title)";
//   const notificationOptions = {
//     //body: payload,
//     body: 'Background Message body.',
//     icon: "/favicon.ico",
//   };
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// //서비스워커 스크립트 설치, 활성화 확인
// self.addEventListener("install", function (e) {
//   console.log("fcm sw install..");
//   self.skipWaiting();
// });

// //Web push 알림 확인
// self.addEventListener("push", function (e) {
//   console.log("push: ", e.data.json());
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//       body: resultData.body,
//       icon: resultData.image,
//       tag: resultData.tag,
//       ...resultData,
//   };
//   console.log("push: ", { resultData, notificationTitle, notificationOptions });

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// //Web push 알림 클릭 핸들러
// self.addEventListener("notificationclick", function (event) {
// console.log("notification click");
// const url = "http://www.iist.kr/";
// event.notification.close();
// event.waitUntil(clients.openWindow(url));
// });