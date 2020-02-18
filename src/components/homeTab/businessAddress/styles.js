import EStyleSheet from 'react-native-extended-stylesheet';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = EStyleSheet.create({
    bottomSearchContainer: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.5)',
      width: '100%',
  
      alignItems: 'center'
    },
    shopSmallImage: {
      width: RFValue(30),
      height: RFValue(30),
      borderRadius: RFValue(15),
      position: 'absolute',
      top: RFValue(10)
    },
    iconWrapper: {
      fontSize: RFValue(80)
    },
    activeIcon: { color: '$colorLightBlue' },
    deactiveIcon: { color: 'transparent' },
    iconContainer: {
      position: 'absolute',
      color: '$colorMarkerBlue',
      fontSize: RFValue(65),
      top: RFValue(4)
    }
  });