import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.configure({
      // onRegister: function(token) {
      //   console.log('[LocalNotificationService] onRegister: ', token);
      // },
      onNotification: function(notification) {
        console.log(
          '[LocalNotificationService] onNotification: ',
          notification,
        );
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : {data:notification.data,id:notification.id}, //edit accordingly for ios
        );
        // Only call callback if not from foreground
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      //Should the initial notification be popped automatically
      //default :true
      popInitialNotification: true,

      /**
       * [optional] default: true
       * - Specified if permission (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermission() later
       * - if you are not using remote notification or do not have firebase installed use this
       *     requestPermission: Platform.OS === 'ios
       */
      requestPermissions: true,
    });
  };
  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    console.log("Show Notifications");
    PushNotification.localNotification({
      /* Android Only Properties*/
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* iOS and Android properties*/
      // ...this.buildIOSNotification(id, title, message, data, options),
      /* iOS and Android properties*/
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false,
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };
  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = notificationId => {
    console.log(
      '[LocalNotificationService] removeDeliveredNotificationsByID: ',
      notificationId,
    );
    PushNotification.cancelLocalNotifications({id: `${notificationId}`});
  };
}

export const localNotificationService = new LocalNotificationService();
