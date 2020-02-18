import EStylesheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default EStylesheet.create({
  simpleListWrapper: {
    width: width * 0.8,
    padding: 10,
  },
  dialogWrapper: {
    width: width * 0.8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningBackground: {
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 30,
    padding: 0,
    backgroundColor: '$colorRed',
    width: 0.8 * width
  },
  commonDialogWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    width: '85%'
  },
  warningDialogWrapper: {
    backgroundColor: 'transparent'
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '$colorChatGray'
  },

  cartDialog: {
    padding: 10,

    width: '100%',
    alignItems: 'center'
  },
  addSubContainer: {
    flexDirection: 'row',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '$colorChatGray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButton: {
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 3,
    backgroundColor: '$colorLightGray'
  },
  inputs: {
    width: width * 0.75
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 15
  },
  radioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    margin: 4
  },
  innerRadioButton: { width: 15, height: 15, borderRadius: 7.5 },
  checkedRadioButton: { backgroundColor: '$colorPrimary' },
  uncheckedRadioButton: { backgroundColor: 'transparent' },
 
  pickerContainer: {
    width: width * 0.7,
  }
});
