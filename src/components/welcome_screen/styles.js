import { Platform } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  indicatorWrapper: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#00aeef',
    height: '100%',
    width: 10,
    borderRadius: 5
  },
  indicator: {
    position: 'absolute',
    right: 0,
    borderRadius: 5,
    backgroundColor: '$colorAccent',
    width: 10
  },
  imageContainer: {
    padding: 10,
    width: 125,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
    borderRadius: 1000,
    borderWidth: 3
  },
  inputCode: {
    width: '80%',
    backgroundColor: '#FFF',
    color: '#000'
  },
  userInputWrapperMargin: {
    minHeight: '50%',
    marginTop: '10%'
  },
  userInputWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  scrollViewContainer: {
    padding: 15,
    height: '100%',

    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '80%'
  },
  scrollViewWrapper: { height: '60%' },
  userInputContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputCodeWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verificationText: {
    fontSize: RFValue(20)
  }
});
