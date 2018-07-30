import React from 'react';
import { Button, Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box'
import PushNotification from 'react-native-push-notification';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';


export default class StartPage extends React.Component {

    state = {
        selectedSprintDuration: 20,
        selectedRestDuration: 40,
        selectedSets: 7,
        warmUp: false
    }

    componentDidMount() {
        PushNotification.localNotification({
            message: 'hello'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ alignSelf: 'center', top: -155, fontSize: 45, color: 'white', fontFamily: "BLACK" }}>HIIT</Text>
                <Text style={{ alignSelf: 'center', top: -155, fontSize: 45, color: 'white', fontFamily: "BLACK" }}>Tracker</Text>
                <View style={{ position: 'absolute', width: 75, left: 50, alignSelf: 'flex-start' }}>
                    <Text style={{ left: 20, color: 'white' }}>On For</Text>
                    <Picker
                        selectedValue={this.state.selectedSprintDuration}
                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedSprintDuration: itemValue })}>
                        <Picker.Item label="10" color="white" value={10} />
                        <Picker.Item label="15" color="white" value={15} />
                        <Picker.Item label="20" color="white" value={20} />
                        <Picker.Item label="25" color="white" value={25} />
                        <Picker.Item label="30" color="white" value={30} />
                        <Picker.Item label="35" color="white" value={35} />
                        <Picker.Item label="40" color="white" value={40} />
                        <Picker.Item label="45" color="white" value={45} />
                        <Picker.Item label="50" color="white" value={50} />
                        <Picker.Item label="55" color="white" value={55} />
                        <Picker.Item label="60" color="white" value={60} />
                    </Picker>
                </View>
                <View style={{ position: 'absolute', width: 50, alignSelf: 'center' }}>
                    <Text style={{ color: 'white' }}>Off For</Text>
                    <Picker
                        selectedValue={this.state.selectedRestDuration}
                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedRestDuration: itemValue })}>
                        <Picker.Item label="10" color="white" value={10} />
                        <Picker.Item label="15" color="white" value={15} />
                        <Picker.Item label="20" color="white" value={20} />
                        <Picker.Item label="25" color="white" value={25} />
                        <Picker.Item label="30" color="white" value={30} />
                        <Picker.Item label="35" color="white" value={35} />
                        <Picker.Item label="40" color="white" value={40} />
                        <Picker.Item label="45" color="white" value={45} />
                        <Picker.Item label="50" color="white" value={50} />
                        <Picker.Item label="55" color="white" value={55} />
                        <Picker.Item label="60" color="white" value={60} />
                    </Picker>
                </View>
                <View style={{ position: 'absolute', width: 75, right: 50, alignSelf: 'flex-end' }}>
                    <Text style={{ color: 'white' }}># of Sprints</Text>
                    <Picker
                        selectedValue={this.state.selectedSets}
                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedSets: itemValue })}>
                        <Picker.Item label="2" color="white" value={2} />
                        <Picker.Item label="3" color="white" value={3} />
                        <Picker.Item label="4" color="white" value={4} />
                        <Picker.Item label="5" color="white" value={5} />
                        <Picker.Item label="6" color="white" value={6} />
                        <Picker.Item label="7" color="white" value={7} />
                        <Picker.Item label="8" color="white" value={8} />
                        <Picker.Item label="9" color="white" value={9} />
                        <Picker.Item label="10" color="white" value={10} />
                    </Picker>
                </View>
                <TouchableOpacity style={{ top: 120, height: 40 }}>
                    <Text
                        style={{ fontSize: 30, color: 'lime' }}
                        onPress={() => {
                            this.props.updateTimer(this.state.selectedSprintDuration, this.state.selectedRestDuration, this.state.selectedSets)
                        }}>
                        Set Timer
                    </Text>
                </TouchableOpacity>
                <CheckBox
                    style={{ top: 140, height: 40, width: 130 }}
                    checkBoxColor='white'
                    leftTextStyle={{ fontSize: 24, color: 'white' }}
                    onClick={() => this.props.updateWarmUp()}
                    isChecked={this.props.warmUp}
                    leftText='Warm Up'
                />;
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292D3E',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
