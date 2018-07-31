import React from 'react';
import { AlertIOS, AppState, Button, Picker, SectionList, StyleSheet, Text, View } from 'react-native';
import StartPage from './components/StartPage';
import PushNotification from 'react-native-push-notification';
import PushController from './components/PushController';
import RunningPage from './components/RunningPage';
import PushNotificationIOS from 'react-native'
import AppleHealthKit from 'rn-apple-healthkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsModal from './components/SettingsModal';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  state = {
    selectedSprintDuration: 10,
    selectedRestDuration: 10,
    selectedSets: 2,
    start: true,
    warmUp: false,
    sound: 'leadUp',
    modalState: false
  }

  componentDidMount() {
    PushNotification.localNotification({
      message: 'lol'
    })
  }

  componentWillMount() {
    console.disableYellowBox = true;
    AppState.addEventListener('change', this.handleAppStateChange)
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });

  }

  componentWillUnmount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(appState) {
    // console.log('app in background')
    // PushNotification.localNotification({
    //   message: 'hello'
    // });
  }

  updateTimer = (sprintDuration, restDuration, sets) => {
    this.setState({
      selectedSprintDuration: sprintDuration,
      selectedRestDuration: restDuration,
      selectedSets: sets,
      start: false
    })
  }

  backToStart = () => {
    this.setState({ start: true })
  }

  updateWarmUp = () => {
    this.setState({ warmUp: !this.state.warmUp })
  }

  updateSoundSetting = (sound) => {
    if (this.state.sound === sound) {
      this.setState({ sound: '' })
    } else {
      this.setState({ sound: sound })
    }
  }

  updateModal = () => {
    this.setState({ modalState: !this.state.modalState })
  }

  render() {

    return (
      <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', backgroundColor: '#292D3E' }}>
        <Icon
          name="cog"
          size={30}
          color="white"
          style={{ alignSelf: 'flex-end', top: 30, right: 20, zIndex: 5 }}
          onPress={() => {
            this.updateModal();
          }}
        />
        {this.state.start ?
          <StartPage updateTimer={this.updateTimer} warmUp={this.state.warmUp} updateWarmUp={this.updateWarmUp} /> :
          <RunningPage sound={this.state.sound} warmUp={this.state.warmUp} backToStart={this.backToStart} sprintDuration={this.state.selectedSprintDuration} restDuration={this.state.selectedRestDuration} sets={this.state.selectedSets} />
        }
        <SettingsModal modalState={this.state.modalState} updateModal={this.updateModal} updateSoundSetting={this.updateSoundSetting} sound={this.state.sound} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
