import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from 'react-native'

export default class PushController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION: weener', notification);
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        })
    }

    render() {
        return null
    }
}