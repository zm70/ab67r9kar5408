import React from 'react';
import { TextBold, ButtonBold } from 'AppFonts';
import { View } from 'react-native';
import { mainStyles } from 'app-styles';
import strings from 'src/res/strings.json';
import styles from './styles';

const ContactUs = (props) => {
    const links = [
        { key: 0, title: 'تلفن:', value: '02155577841', onPress: () => { } },
        { key: 1, title: ':ایمیل', value: 'info@abrikar.com', onPress: () => { } },
        { key: 2, title: 'وب سایت', value: 'www.abrikar.com', onPress: () => { } },
    ]
    return (
        <View style={[styles.container, { padding: 10 }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextBold
                    color="blue"
                    fontSize="size9"
                    textStyle={{ marginBottom: 20 }}
                >{strings.introToFriends}</TextBold>

                <TextBold fontSize="size8">
                    {strings.introToFriendsDetail}
                </TextBold>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <ButtonBold
                    color="white"
                    fontSize="size9"
                    textStyle={{ textAlign: 'center', marginBottom: 3 }}
                    containerStyle={[mainStyles.nextButton,
                    mainStyles.backBlue,
                    { width: '70%' }]}>
                    {strings.sendLink}
                </ButtonBold>
            </View>
        </View>
    )
}

export default ContactUs

