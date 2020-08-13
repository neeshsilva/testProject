import React ,{Component}from 'react';
import {setupAxios} from './components/utils/axios.global';
import {YellowBox} from 'react-native';

import Navigator from './components/Navigator';
import Root from './Root';
import {fcmService} from './components/FCMService/FCMService';
import {localNotificationService} from './components/FCMService/LocalNotificationService';

YellowBox.ignoreWarnings([
    'Warning: Each',
    'Warning: Failed',
    'Require cycle:',
]);



setupAxios();

// function App() {
//
//     return(
//         <Root>
//                          <Navigator/>
//                          </Root>
//     )
// }


class App extends Component {

    componentDidMount() {
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister,onNotification,onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        function onRegister(token) {
            console.log('[App] onRegister: ', token);

        }

        function onNotification(notify) {
            console.log('[App] onNotification: ', notify);
            const options = {
                soundName: 'default',
                playSound: true,
            };
            localNotificationService.showNotification(notify.messageId,
                notify.title, notify.body, notify,options);
        }

        function onOpenNotification(notify) {
            console.log("[App] onOpenNotification: ",notify);
            alert("Open Notification: "+notify.data.body);
            // fcmService.removeDeliveredNotification(notify);
            // localNotificationService.removeDeliveredNotificationByID(notify.id);
        }

        // return()=>{
        //     console.log('[App] unRegister');
        //     fcmService.unRegister();
        //     localNotificationService.unregister()
        // }
    }

    render() {
        return (

            <Root>
                <Navigator/>
            </Root>

        );
    }
}

export default App;
