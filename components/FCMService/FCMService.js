import messaging, {firebase} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(
            onRegister,
            onNotification,
            onOpenNotification,
        );
    };

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };

    checkPermission = onRegister => {
        messaging()
            .hasPermission()
            .then(enabled => {
                if (enabled) {
                    //User has permission
                    this.getToken(onRegister);
                } else {
                    //user don't have permission
                    this.requestPermission(onRegister);
                }
            })
            .catch(error => {
                console.log('[FCMService] Permission rejected', error);
            });
    };

    getToken = onRegister => {
        messaging()
            .getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken);
                } else {
                    console.log('[FCMService] User does not have a device token');
                }
            })
            .catch(error => {
                console.log('[FCMService] getToken rejected', error);
            });
    };

    requestPermission = onRegister => {
        messaging()
            .requestPermission()
            .then(() => {
                this.getToken(onRegister);
            })
            .catch(error => {
                console.log('[FCMService] Request Permission rejected', error);
            });
    };

    deleteToken = () => {
        console.log('[FCMService] deleteToken');
        messaging()
            .deleteToken()
            .catch(error => {
                console.log('[FCMService] Delete token error', error);
            });
    };

    createNotificationListeners = (
        onRegister,
        onNotification,
        onOpenNotification,
    ) => {
        //When the application is running , but in the background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                '[FCMService] onNotificationOpenedApp Notification caused app to open from background state: ',
                remoteMessage,
            );
            if (remoteMessage) {

                const notification = {data:remoteMessage.notification,id:remoteMessage.messageId}; //do changes for the ios
                onOpenNotification(notification);
                console.log("Going to remove from onNotificationOpenedApp");
                // this.removeDeliveredNotification(notification);
            }
        });

        //When the application is opened from a quit state
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log(
                    '[FCMService] getInitialNotification Notification caused app to open from quit state: ',
                    remoteMessage,
                );
                if (remoteMessage) {
                    const notification = {data:remoteMessage.notification,id:remoteMessage.messageId};  //do changes for the ios
                    onOpenNotification(notification);
                    console.log("Going to remove from getInitialNotification");
                    this.removeDeliveredNotification(notification);
                }
            });

        //Foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log('[FCMService] A new FCM message arrived!',remoteMessage);
            console.log('[FCMService] A new FCM message data content',remoteMessage.data);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification;
                    notification.data = remoteMessage.data;
                } else {
                    notification = remoteMessage.notification;
                    notification.data = remoteMessage.data;
                }
                onNotification(notification);
            }
        });

        // Background stat messages
        this.messageListenerBackGround = messaging().setBackgroundMessageHandler(
            async remoteMessage => {
                console.log('[FCMService] A new FCM background message arrived!');

                if (remoteMessage) {
                    console.log('[msg] : ',remoteMessage)
                    let notification = null;
                    if (Platform.OS === 'ios') {
                        // notification = remoteMessage.data.notification; // edit Accordingly for ios
                        notification = remoteMessage.notification;
                        notification.data = remoteMessage.data;
                    } else {
                        // notification = {data:remoteMessage.notification,id:remoteMessage.messageId};
                        notification = remoteMessage.notification;
                        notification.data = remoteMessage.data;
                    }
                    // onNotification(notification);
                }
            },
        );

        //Triggered when have a new token
        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCMService] New token refresh: ', fcmToken);
            onRegister(fcmToken);
        });
    };

    unRegister = () => {
        this.messageListener();
        // this.messageListenerBackGround();
    };

    removeDeliveredNotification = (notify) => {
        console.log('[FCMService] remove Delivered Notifications: ', notify);
        // firebase.notification.removeDeliveredNotificationByID();

    };

}

export const fcmService = new FCMService();
