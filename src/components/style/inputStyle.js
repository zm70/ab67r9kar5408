import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const borderWidth = 2;
const borderRadius = 4;
const borderColor = 'gray';

export default EStylesheet.create({
  activeBox: {
    backgroundColor: '$colorPrimary',
    width: '100%',
    height: '100%'
  },
  deactiveBox: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  activeBox2: {
    backgroundColor: '$colorAccent',
    width: '100%',
    height: '100%'
  },

  boxContainer: {
    width: 25,
    height: 25,
    borderRadius,
    borderWidth,
    borderColor,
    padding: 2,
    marginLeft: 15
  },
  boxContainer2: { borderColor: '#fff' },
  boxDetail: { marginLeft: 20, marginRight: 30 },
  boxComponent: {
    width: '100%',
    margin: 10,

    alignItems: 'flex-end'
  },
  inputBoxContainer: {
    borderRadius,
    borderWidth,
    borderColor
  },
  inputWrapper80: {
    width: width * 0.8,

  },
  inputWrapper: {
    width: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullInputWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
    marginTop: 5,
    marginBottom: 5
  },
  dropDownContainer: {
    width: width * 0.4,
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    maxHeight: 200,
    elevation: 4,

    zIndex: 10,
    padding: 20
  },
  textInputWrapper: {
    width: width,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20
  },
  mapInputWrapper: {
    width: width,
    height: '25%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20
  },
  detailText: { marginRight: 15, color: 'gray', width: width * 0.6 },
  dirText: {
    backgroundColor: '$colorPrimary',
    textAlignVertical: 'center',
    padding: 5,
    paddingBottom: 10
  },
  descriptionWrapper: {
    marginTop: 5,
    width: '98%',
    textAlign: 'right',
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  }
});
