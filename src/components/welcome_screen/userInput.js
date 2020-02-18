import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TextBold, ButtonBold, ButtonLoading } from 'AppFonts';
import Animation from 'lottie-react-native';
import { BoxComponents } from 'AppComponentShared';
import ImagePick from './imagePick';
import { mainStyles } from 'app-styles';
import styles from './styles';
import CustomScrollView from './CustomScrollview';
import { PhoneNumber, UserName, VerficationCode } from './basicInputs';


const typeInput = ({ onValueChange, value, title, gender, description }) => ({
  numSimple: <PhoneNumber userInfoChange={onValueChange} userInfo={value} gender={gender} />,
  numCode: <VerficationCode onFulfill={onValueChange} />,
  textSimple: (
    <UserName userInfoChange={onValueChange} userInfo={value} title={title} />
  ),
  imgInput: <ImagePick avatarSource={value} setImagePath={onValueChange} />,
  acceptRulesInput: (
    <View style={styles.scrollViewContainer}>
      <CustomScrollView description={description} />

      <View style={{ flexGrow: 1, alignSelf: 'flex-end' }}>
        <BoxComponents
          yekan
          title={title}
          onChange={onValueChange}
          fontSize="size7"
          isActive={value}
        />
      </View>
    </View>
  )
});

const IntroButton = ({ nextLevel, btnTitle, deactive, error, loading }) => {
  if (deactive || error) {
    return (
      <TextBold
        fontSize="size8"
        color="white"
        textStyle={[mainStyles.nextButton, { opacity: 0.7 }]}
      >
        {btnTitle}
      </TextBold>
    );
  } else if (loading) {
    return (
      <ButtonLoading containerStyle={[mainStyles.nextButton]}>
        <ActivityIndicator size={24} color="#fff" />
      </ButtonLoading>
    );
  }
  return (
    <ButtonBold
      fontSize="size8"
      color="white"
      containerStyle={[mainStyles.nextButton]}
      onPress={nextLevel}
    >
      {btnTitle}
    </ButtonBold>
  );
};

const UserInput = ({ type, topInput, bottomDetails, ...props }) => (
  <View
    style={[
      styles.userInputWrapper,
      type === 'acceptRulesInput' ? null : styles.userInputWrapperMargin
    ]}
  >
    <TextBold fontSize="size8" color="white" textStyle={mainStyles.welcomeText}>
      {topInput}
    </TextBold>

    <View
      style={[
        styles.userInputContainer,
        type === 'acceptRulesInput' ? styles.scrollViewWrapper : null
      ]}
    >
      {typeInput({ ...props })[type]}
    </View>
    <IntroButton {...props} />

    {bottomDetails}
  </View>
);

export default UserInput;
