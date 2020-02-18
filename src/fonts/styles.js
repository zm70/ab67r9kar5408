import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
  size0: {
    fontSize: RFValue(7.28) //3.319
  },
  size1: {
    fontSize: RFValue(8.77) //4
  },
  size2: {
    fontSize: RFValue(10) //4.557
  },
  size3: {
    fontSize: RFValue(10.97) //5
  },
  size4: {
    fontSize: RFValue(11.63) //5.3
  },
  size5: {
    fontSize: RFValue(13.16) //6
  },
  size6: {
    fontSize: RFValue(13.61) //6.2
  },
  size7: {
    fontSize: RFValue(15.36) //7
  },
  size8: {
    fontSize: RFValue(17.19) //7.837
  },
  size9: {
    fontSize: RFValue(20)
  },
  size10: {
    fontSize: RFValue(26.33)
  },
  size105: {
    fontSize: RFValue(32.33)
  },
  size11: {
    fontSize: RFValue(37)
  },
  size12: {
    fontSize: RFValue(50)
  },
  size13: {
    fontSize: RFValue(70)
  },
  blue: {
    color: '$colorPrimary'
  },
  red: {
    color: '$colorRed'
  },
  darkRed: {
    color: '$colorDarkRed'
  },
  lightRed: {
    color: '$colorLightRed'
  },
  green: {
    color: '$colorGreen'
  },
  lightGreen: {
    color: '$colorLightGreen'
  },
  gray: {
    color: '$colorGray'
  },
  costGray: {
    color: '$colorCostGray'
  },
  darkGray: {
    color: '$colorDarkGray'
  },
  yellow: {
    color: '#FFDB58'
  },
  mediumDarkGray: {
    color: '$colorMediuumDarkGray'
  },
  mediumLightGray: {
    color: '$colorMediuumLightGray'
  },

  white: {
    color: '#fff'
  },
  black: {
    color: '#242021'
  },
  orange: {
    color: '$colorAccent'
  },

  // bold: {
  //   color: '#000',
  //   fontFamily: 'SFProDisplayBold'
  // },
  bold:
    Platform.OS === 'android'
      ? {
          color: '#242021',
          fontFamily: 'faBold'
        }
      : {
          color: '#242021',
          fontFamily: 'Sahel-FD',
          fontWeight: 'bold',
          textAlign: 'right'
        },
  // medium: {
  //   color: '#000',
  //   fontFamily: 'SFProDisplayMedium'
  // },
  medium:
    Platform.OS === 'android'
      ? {
          color: '#242021',
          fontFamily: 'faMedium',
          textAlign: 'center'
        }
      : {
          color: '#242021',
          fontFamily: 'Sahel-FD',
          textAlign: 'center'
        },
  // light: {
  //   color: '#000',
  //   fontFamily: 'SFProDisplayLight'
  // },
  light:
    Platform.OS === 'android'
      ? {
          color: '#242021',
          fontFamily: 'faLight'
        }
      : {
          color: '#242021',
          fontFamily: 'Sahel-FD',
          fontWeight: '300',
          textAlign: 'right'
        }
});
