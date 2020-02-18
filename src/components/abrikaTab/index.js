import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import Animation from 'lottie-react-native';
import { Actions } from 'react-native-router-flux'
import propTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { axios } from 'AppServices';
import { Icon, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import colors from 'src/res/colors.json';
import { icons } from './enums';

const welcomeText = require('../../assets/animation/welcomeAnimation.json');
const mellat = require('../../assets/images/mellat.png');
const samane = require('../../assets/images/samanedehi.png');
const namad = require('../../assets/images/namad.png');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  headWrapper: {
    backgroundColor: '$colorPrimary',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center'
  },
  icons: {
    fontSize: RFValue(55),
    color: '$colorPrimary'
  },
  seprator: {
    width: '100%',
    margin: 10,
    backgroundColor: '$colorPrimary',
    height: 2
  }
});

class AbrikaTab extends React.Component {
  getIcon = async (icon) => {
    const newState = { ...icon };
    newState['iconName'] = await Icon.getImageSource(
      newState.iconName,
      100,
      colors.blue
    );
    return newState;
  };

  state = {
    mainIcon: '',
    images: [
      { key: 0, uri: samane, height: RFValue(90),link:"https://logo.samandehi.ir/Verify.aspx?id=1018077&p=rfthobpdrfthmcsiobpdjyoejyoe" },
      { key: 1, uri: namad, height: RFValue(90),link:"https://trustseal.enamad.ir/Verify.aspx?id=109940&amp;p=nWCUT2S6ZWn7FeMh" },
      { key: 2, uri: mellat, height: RFValue(90),link:"" }
    ],

  };

  componentDidMount() {
    // this.state.icons.map((icon) =>
    //   this.getIcon(icon).then((res) => {
    //     const icons = this.state.icons;
    //     icons[res.key] = res;
    //     this.setState({ icons });
    //   })
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.headWrapper}>
            <View style={{  alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{
                  height: RFPercentage(15),
                  width: RFPercentage(20)
                }}
              />
              <Animation
                source={welcomeText}
                progress={1}
                style={{ width: RFPercentage(25) }}
              />
            </View>
            <TextBold color="white" textStyle={{ margin: RFPercentage(5) }}>
              {strings.businessCode} : {strings.businessCodeNum}
            </TextBold>
            <TextBold color="white" weight="light" fontSize="size9">
              {strings.website}
            </TextBold>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%'
            }}
          >
            {this.state.images.map(({ key, uri, height,link }) => (
              <Image
                key={key}
                source={uri}
                style={{ width: '33%', height, margin: 10 }}
                resizeMode="contain"
                onPress={() => Linking.openURL(link)}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            <View style={styles.seprator} />
            {icons.map(({ key, iconName, title }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Actions.subAbrika({ childKey: key })}
                key={key}
                style={{ alignItems: 'center', width: '23%', margin: '1%' }}
              >
                <Icon name={iconName} style={styles.icons} />
                <TextBold color="blue" weight="medium">
                  {title}
                </TextBold>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

AbrikaTab.propTypes = {
  uri: propTypes.shape({})
};
AbrikaTab.defaultProps = {
  uri: {}
};

export default AbrikaTab;
