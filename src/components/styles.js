import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';
import constants from '../res/constants.json';

export default EStylesheet.create({
  flex: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$colorLightGray'
  },
  pageIndicatorWrapper: {
    backgroundColor: '$colorLightGray',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  pageTitleWrapper: {
    width: '100%',
    backgroundColor: '$colorLightGray',
    padding: 2
  },
  titleText: {
    color: '$colorPrimary',
    fontSize: RFValue(20),
    textAlign: 'center'
  },
  regularText: {
    color: '#000',
    fontSize: RFValue(15)
  },
  timeText: {
    fontSize: RFValue(15),
    color: '$colorPrimary'
  },
  seprator: {
    width: '100%',
    height: 5,
    backgroundColor: '$colorPrimary'
  },

  topbarContainer: {
    backgroundColor: '$colorLightBlue',
    flexDirection: 'row',
    padding: constants.cardPadding,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchbarWrapper: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: constants.cardRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterWrapper: {
    borderRadius: constants.cardRadius,
    padding: constants.cardPadding,
    backgroundColor: '$colorPrimary',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  icons: {
    fontSize: RFValue(20),
    padding: constants.cardPadding
  },
  searchIconWrapper: {
    backgroundColor: '$colorPrimary',
    borderTopLeftRadius: constants.cardRadius,
    borderBottomLeftRadius: constants.cardRadius,
    padding: constants.cardPadding
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  
});
