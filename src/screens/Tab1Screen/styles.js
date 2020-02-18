import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';


export default EStylesheet.create({
  flex: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "$colorLightGray",
  },
  pageIndicatorWrapper: {
    backgroundColor: "$colorLightGray",
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  pageTitleWrapper: {
    width: "100%",
    backgroundColor: "$colorLightGray",
    padding: 2
  },
  titleText: {
    color: "$colorPrimary",
    fontSize: RFValue(20),
    textAlign: "center"
  },
  smallText: {

  },
  timeText: {
    fontSize: RFValue(15),
    color: "$colorPrimary"
  },
  seprator: {
    width: '100%',
    height: 5,
    backgroundColor: "$colorPrimary"
  }

});