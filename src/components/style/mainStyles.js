import {Platform  } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';
import constants from 'src/res/constants.json';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default EStylesheet.create({
  extraContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor: '$colorLightGray',
    borderColor: '$colorChatGray',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  recPro:{
    padding:4,
    marginBottom:5
  },
  backLightBlue: {
    backgroundColor: '$colorLightBlue'
  },
  redBackground: {
    backgroundColor: '$colorPink'
  },
  flex: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$colorLightGray'
  },
  welcomeText: {
    color: '#fff',
    fontSize: RFValue(18)
  },
  regularText: {
    color: '#000',
    fontSize: RFValue(12)
  },

  icons: {
    fontSize: RFValue(20),
    color: '$colorPrimary'
  },
  mediumIcon: {
    fontSize: RFValue(25)
  },
  smallIcon: {
    fontSize: RFValue(15)
  },
  mediumText: {
    fontSize: RFValue(15)
  },
  smallText: {
    fontSize: RFValue(12)
  },
  bigIcons: {
    fontSize: RFValue(30),
    color: '$colorPrimary'
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  horizontalScrollContainer: {
    paddingLeft: constants.cardPadding,
    paddingRight: constants.cardPadding
  },
  verticalScrollContainer: {
    paddingTop: constants.cardPadding,
    paddingBottom: constants.cardPadding
  },
  cardWrapper: {
    backgroundColor: '#fff',
    borderTopWidth: 1,

    borderColor: '$colorPrimary'
  },
  backOrange: {
    backgroundColor: '$colorAccent'
  },
  backRed: {
    backgroundColor: '$colorRed'
  },
  nextButton: {
    borderRadius: 50,
    backgroundColor: '$colorAccent',
    padding: constants.smallPadding / 2,
    paddingTop: 0,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextButtonText: {
    fontSize: RFValue(20),
    color: '#FFF'
  },
  inputFieldContainer: {
    width: '70%'
  },
  inputFieldText: {
    width: '100%',
    paddingTop: 3,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,

    borderRadius: 5,
    backgroundColor: '#FFF',
    color: '#000'
  },

  inputFieldTextReq: {
    width: '60%',
    paddingTop: 3,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '$colorChatGray',
    borderWidth: 1,
    borderRadius:10,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:20,
    marginBottom:20
  },


  smallInputField: { fontSize: RFValue(12) },
  defaultButton: {
    padding: 2,
    paddingBottom: 2,
    borderRadius: constants.smallRadius,
    backgroundColor: '$colorPrimary',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButton: {
    flexDirection: 'row-reverse',
    height: '100%',
    padding: 5,
    paddingTop: 0,
    borderRadius: 10
  },
  defaultButtonText: {
    fontSize: RFValue(15),
    color: '#fff'
  },
  rowWrappers: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topbarContainer: {
    backgroundColor: '$colorLightBlue',
    flexDirection: 'row',
    padding: constants.cardPadding,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: Platform.OS === "android" ?  height / 11 : height / 13
  },
  costContainer: {
    backgroundColor: '$colorLightBlue',


    alignItems: 'center',
    justifyContent: 'space-around'
  },
  borderedButtton: {
    backgroundColor: '#fff',
    borderColor: '$colorChatGray',
    borderWidth: 1
  },
  grayButton: {
    backgroundColor: '$colorLightGray'
  },
  backGray: { backgroundColor: '$colorLightGray' },
  backBlue: { backgroundColor: '$colorPrimary' },
  backGreen: { backgroundColor: '$colorGreen' },
  marginHorizotal: { marginLeft: 3, marginRight: 3 },
  marginHorizotalDouble: { marginLeft: 10, marginRight: 10 },
  paddingHorizontal: { paddingLeft: 10, paddingRight: 10, marginRight:5, width:"99%" },
  paddingVertically: { paddingTop: 5, paddingBottom: 5 },
  paddingHorizontalDouble: { paddingLeft: 20, paddingRight: 20 },
  productListContainer: { backgroundColor: '#fff' },
  halfScreenCard: { width: width * 0.46 },
  fullScreenCard: { width: width * 0.94 },
  giganticIcon: { fontSize: RFValue(100) },
  divider: { width: '100%', height: 1, backgroundColor: '$colorChatGray' },
  pickerContainer: {
    height: RFValue(35)
  },
  picker: {
    width: 0.9 * width,
    padding: 5,
    color: 'transparent',
    backgroundColor: 'transparent'
  },
  dialogWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0
  },
  hoverFullscreen: {
    position: 'absolute',
    height,
    width,
    backgroundColor: 'red'
  },
  titleAcc:{
    fontSize:30,
    marginTop:50,
  }

});
