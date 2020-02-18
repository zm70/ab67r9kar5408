import React from 'react';
import { View } from 'react-native';
import { ButtonBold, TextBold } from 'AppFonts';
import   {mainStyles}  from 'app-styles';

const GroupButton = ({
  onNext,
  onCancel,
  cancelText,
  nextText,
  extraBtnStyle,
  loading,
  error,
  onLayout
}) => (
  <View
    style={[
      {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }
    ]}
    onLayout={onLayout}
  >
    <ButtonBold
      containerStyle={[
        mainStyles.nextButton,
        { backgroundColor: 'red', width: '35%' }
      ]}
      textStyle={{ paddingBottom: 4 }}
      onPress={onCancel}
      color="white"
      fontSize="size9"
    >
      {cancelText}
    </ButtonBold>
    {error || loading ? (
      <TextBold
        textStyle={[
          mainStyles.nextButton,
          extraBtnStyle,
          { width: '55%', opacity: 0.7, paddingBottom: 4 }
        ]}
        color="white"
        fontSize="size9"
      >
        {nextText}
      </TextBold>
    ) : (
      <ButtonBold
        containerStyle={[
          mainStyles.nextButton,
          extraBtnStyle,
          { width: '55%' }
        ]}
        onPress={onNext}
        textStyle={{ paddingBottom: 4 }}
        color="white"
        fontSize="size9"
      >
        {nextText}
      </ButtonBold>
    )}
  </View>
);

export default GroupButton;
