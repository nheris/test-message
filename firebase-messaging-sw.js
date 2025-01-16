//Service Worker 설정

//서비스워커 스크립트 설치, 활성화 확인
self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});
self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

//Web push 알림 확인
self.addEventListener("push", function (e) {
    console.log("push: ", e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image,
        tag: resultData.tag,
        ...resultData,
    };
    console.log("push: ", { resultData, notificationTitle, notificationOptions });

    self.registration.showNotification(notificationTitle, notificationOptions);
});

//Web push 알림 클릭 핸들러
self.addEventListener("notificationclick", function (event) {
console.log("notification click");
const url = "http://www.iist.kr/";
event.notification.close();
event.waitUntil(clients.openWindow(url));
});