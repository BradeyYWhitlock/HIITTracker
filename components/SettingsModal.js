import React from 'react'
import { SectionList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import CheckBox from 'react-native-check-box'

export default class SettingsModal extends React.Component {
    render() {
        return (
            <Modal isVisible={this.props.modalState}>
                <Icon
                    name="times-circle"
                    size={30}
                    color="black"
                    style={{ alignSelf: 'flex-end', top: 40, right: 40, zIndex: 5 }}
                    onPress={() => {
                        this.props.updateModal();
                    }}
                />
                <View style={{ height: 400, width: 300, borderRadius: 25, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 25, width: 200, alignSelf: 'center', bottom: 5 }}>Sound</Text>
                    <CheckBox
                        style={{ width: 200, alignSelf: 'center' }}
                        checkBoxColor='black'
                        leftTextStyle={{ fontSize: 18, color: 'black' }}
                        onClick={() => this.props.updateSoundSetting('startStop')}
                        isChecked={this.props.sound === 'startStop'}
                        leftText='Start/Stop Sounds'
                    />
                    <CheckBox
                        style={{ width: 200, alignSelf: 'center' }}
                        checkBoxColor='black'
                        leftTextStyle={{ fontSize: 18, color: 'black' }}
                        onClick={() => this.props.updateSoundSetting('leadUp')}
                        isChecked={this.props.sound === 'leadUp'}
                        leftText='Lead Up Sounds'
                    />
                </View>
            </Modal>
        )
    }
}