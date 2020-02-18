import React from 'react';
import { TextInputBold, TextBold, ValidationTextInput } from 'AppFonts';
import { View, ScrollView, Text } from 'react-native';
import { BoxComponents, Gender } from 'AppComponentShared';
import { mainStyles } from 'app-styles';
import CodeInput from './ConfirmComopnent';

import styles from './styles';

const UserInfoComponent = ({
  value,
  label,
  onValueChange,
  name,
  type,
  validation
}) => (
    <>
      {type === 'simple' ? (
        <ValidationTextInput
          dark
          label={label}
          validation={validation}
          containerStyle={mainStyles.inputFieldContainer}
          textStyle={[
            mainStyles.inputFieldText,
            { marginBottom: 10, textAlign: 'right' }
          ]}
          onChangeText={(text, error) => onValueChange(text, error, name)}
          fontSize="size9"
        >
          {value}
        </ValidationTextInput>
      ) : type === 'pass' ? (
        <ValidationTextInput
          dark
          label={label}
          containerStyle={mainStyles.inputFieldContainer}
          textStyle={[
            mainStyles.inputFieldText,
            { marginBottom: 10, textAlign: 'left' }
          ]}
          onChangeText={(text, error) => onValueChange(text, error, name)}
          fontSize="size9"
          secureTextEntry={true}
        >
          {value}
        </ValidationTextInput>
      ) : type === 'number' ? (
        <ValidationTextInput
          dark
          label={label}
          keyboardType="numeric"
          maxLength={11}
          autoFocus={true}
          containerStyle={mainStyles.inputFieldContainer}
          textStyle={[
            mainStyles.inputFieldText,
            mainStyles.fieldText,
            { marginBottom: 10, textAlign: 'left' }
          ]}
          onChangeText={(text, error) => onValueChange(text, error, name)}
          fontSize="size10"
          weight="medium"
        >
          {value}
        </ValidationTextInput>
      ) : (
              <Gender
                onValueChange={onValueChange}
                value={value}
                name={name}
                contrasted
              />
            )}
    </>
  );

export const PhoneNumber = (props) => (
  <>
    <UserInfoComponent
      onValueChange={props.userInfoChange}
      name={'phoneNumber'}
      {...props.userInfo['phoneNumber']}

    />
  </>
);

export const UserName = (props) => {
  const firstIndex = props.title === 'pass' ? 3 : 0;
  const secondIndex = props.title === 'pass' ? 5 : 3;
  return (
    <View style={{ width: '100%' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        {Object.keys(props.userInfo)
          .slice(firstIndex, secondIndex)
          .map((item) => (
            <UserInfoComponent
              {...props.userInfo[item]}
              onValueChange={props.userInfoChange}
              key={item}
              name={item}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export const VerficationCode = ({ onFulfill }) => (
  <View
    style={[
      styles.inputCodeWrapper,
      { minHeight: 60, paddingLeft: 20, paddingRight: 20 }
    ]}
  >
    <CodeInput
      keyboardType="numeric"
      codeLength={5}
      activeColor="rgba(100, 100, 100, 1)"
      inactiveColor="#e5e6e7"
      cellBorderWidth={0}
      compareWithCode="12345"
      codeInputStyle={styles.verificationText}
      onFulfill={onFulfill}
    />
  </View>
);
