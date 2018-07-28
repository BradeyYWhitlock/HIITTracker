import React from 'react';
import { Button, Image, Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import TimeFormatter from 'minutes-seconds-milliseconds';
// import Sound from 'react-native-sound'
import KeepAwake from 'react-native-keep-awake';


export default class StartPage extends React.Component {

    state = {
        sprintDuration: this.props.sprintDuration * 1000,
        restDuration: this.props.restDuration * 1000,
        warmUpDuration: 60000,
        warmUp: this.props.warmUp,
        sets: this.props.sets,
        sprintTime: true,
        complete: false,
        showStart: true,
        skipWarmup: false
    }


    componentDidMount() {
        // const sound = new Sound('https://sounds.com/release/6181/sound/878227', null, (error) => {
        //     if (error) {
        //         // do something
        //     }

        //     // play when loaded
        //     sound.play();
        // });

        // if (this.props.warmUp) {
        //     this.setState({ sets: this.state.sets + 1 })
        // }
    }

    startSprints() {
        KeepAwake.activate();
        PushNotification.localNotification({
            message: 'hello'
        });
        this.setState({ restDuration: this.props.restDuration * 1000, sets: this.state.sets - 1, showStart: false })
        var sprintInterval = setInterval(() => {
            this.setState({
                sprintDuration: this.state.sprintDuration - 34
            })
            if (this.state.sprintDuration < 0) {
                this.setState({ sprintTime: false })
                clearInterval(sprintInterval);
                this.startRest();
            }
        }, 32)
    }

    startWarmUp() {
        KeepAwake.activate();
        this.setState({ showStart: false })
        var warmUpInterval = setInterval(() => {
            this.setState({
                warmUpDuration: this.state.warmUpDuration - 34
            })
            if (this.state.warmUpDuration < 0 || this.state.skipWarmup) {
                this.setState({ warmUp: false })
                clearInterval(warmUpInterval);
                this.startSprints();
            }
        }, 32)
    }

    startRest() {
        this.setState({ sprintDuration: this.props.sprintDuration * 1000 })
        var restInterval = setInterval(() => {
            this.setState({
                restDuration: this.state.restDuration - 34
            })
            if (this.state.restDuration < 0) {
                this.setState({ sprintTime: true })
                clearInterval(restInterval);

                if (this.state.sets === 0) {
                    this.setState({ complete: true })
                    return;
                } else {
                    this.startSprints();
                }
            }
        }, 32)
    }

    numberWithOrdinal(i) {
        var j = i % 10, k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <KeepAwake /> */}
                {this.state.warmUp ?
                    <View>
                        <Text style={{ fontSize: 50, alignSelf: 'center', top: -100, color: 'lime' }}>Warm Up</Text>
                        <Text style={{ fontSize: 50, color: 'white', width: 215, alignSelf: 'center' }}>{TimeFormatter(this.state.warmUpDuration)}</Text>
                    </View> :
                    this.state.sprintTime ?
                        <View>
                            {!this.state.complete && <Text style={{ fontSize: 50, alignSelf: 'center', top: -100, color: 'lime' }}>Sprint</Text>}
                            {this.state.complete ?
                                <Text style={{ fontSize: 50, color: 'white' }}> Complete</Text> :
                                <Text style={{ fontSize: 50, width: 215, color: 'white' }}>{TimeFormatter(this.state.sprintDuration)}</Text>
                            }
                        </View> :
                        <View>
                            <Text style={{ fontSize: 50, alignSelf: 'center', top: -100, color: 'red' }}>Rest</Text>
                            <Text style={{ fontSize: 50, width: 215, color: 'white' }}>{TimeFormatter(this.state.restDuration)}</Text>
                        </View>
                }
                }

                {!this.state.complete ?
                    <View style={{ width: 200 }}>
                        {
                            this.state.showStart ?
                                <TouchableOpacity style={{ height: 100, top: 70, alignSelf: 'center' }}>
                                    <Text
                                        style={{ fontSize: 30, color: 'lime' }}
                                        onPress={() => {
                                            this.state.warmUp ? this.startWarmUp() : this.startSprints()
                                        }}>
                                        Start
                                    </Text>
                                </TouchableOpacity> :
                                this.state.warmUp ?
                                    <TouchableOpacity style={{ height: 100, top: 70, color: 'white' }}>
                                        <Text
                                            style={{ fontSize: 30, color: 'lightblue', alignSelf: 'center' }}
                                            onPress={() => {
                                                this.setState({ skipWarmup: true })
                                            }}>
                                            Skip Warmup
                                        </Text>
                                    </TouchableOpacity> :
                                    <Text style={{ height: 100, top: 70, fontSize: 30, color: 'white', alignSelf: 'center' }}>
                                        {this.state.sets === 0 ? this.numberWithOrdinal(this.props.sets - this.state.sets) + ' and Last Set' : this.numberWithOrdinal(this.props.sets - this.state.sets) + ' Set of ' + this.props.sets}
                                    </Text>
                        }
                        }
                        <View style={{ width: 200 }}>
                            <TouchableOpacity style={{ position: 'absolute', top: 50, height: 100, alignSelf: 'center' }}>
                                <Text
                                    style={{ fontSize: 30, color: 'red' }}
                                    onPress={() => {
                                        this.props.backToStart()
                                    }}>
                                    {this.state.showStart ? 'Go Back' : 'End Early'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
                    <TouchableOpacity style={{ height: 100, top: 100 }}>
                        <Text
                            style={{ fontSize: 30, color: 'lime', alignSelf: 'center' }}
                            onPress={() => {
                                this.props.backToStart()
                                KeepAwake.deactivate();
                            }}>
                            Finish Workout
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292D3E',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
