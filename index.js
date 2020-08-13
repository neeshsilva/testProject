/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {fcmService} from './components/FCMService/FCMService';
// import bgMessaging from './components/FCMService/bgMessaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

function HeadlessCheck({isHeadLess}) {
    if (isHeadLess) {
        return null;
    }
    return < App/>;
}

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => HeadlessCheck);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => fcmService.messageListenerBackGround());
// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask("RNFirebaseBackgroundMessage",()=>bgMessaging);
