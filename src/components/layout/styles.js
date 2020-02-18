import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';
import constants from 'src/res/constants.json';

export default EStylesheet.create({
  pageIndicatorWrapper: {
    backgroundColor: '$colorLightGray',
    height: '85%',
    borderTopLeftRadius: constants.smallRadius,
    borderTopRightRadius: constants.smallRadius
  },

  titleText: {
    width: '100%',
    backgroundColor: '$colorLightGray',
    padding: 1,
    textAlign: 'center'
  },
  timeText: {
    fontSize: RFValue(11),
    color: '$colorPrimary'
  },
 
  icons: {
    fontSize: RFValue(20)
  },

  filterWrapper: {
    borderRadius: constants.smallRadius,
    padding: constants.smallPadding,
    backgroundColor: '$colorPrimary',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tabbarContainer: {
    width: '100%',
    padding: 5,
    
    flexDirection: 'row',
    backgroundColor: '$colorPrimary',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sideMenuWrapper: {
    flex: 1,
    padding:5,
    backgroundColor: '$colorLightGray'
  },
  sideheader: {
    width: '100%',
    backgroundColor: '$colorLightBlue',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

    elevation: 4
  },
  iconStyle: {
    fontSize: RFValue(25),
    color: '#222'
  },
  sideCodeWrapper: {
    padding: 20,
    textAlign: 'center'
  },
  sideItem: {
    backgroundColor: '#fff',
    padding: 4,
    borderColor: '$colorChatGray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end'
  }
});
