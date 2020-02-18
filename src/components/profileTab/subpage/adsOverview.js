import React from 'react';
import { TextBold, ButtonBold } from 'AppFonts';
import { View, TouchableOpacity } from 'react-native';
import   {mainStyles}  from 'app-styles';
import { Picker } from 'AppComponentShared';
import strings from 'src/res/strings.json';
import Animation from 'lottie-react-native';
import CircleProgress from '../../../assets/animation/circularProgress.json';

const AdsOverview = (props) => {
  const process = [
    { key: 0, title: strings.recommended, value: 100, remains: 30 },
    { key: 1, title: strings.special, value: 50, remains: 15 },
    { key: 2, title: strings.selections, value: 0, remains: 0 }
  ];
  return (
    <View style={[mainStyles.mainContainer, { alignItems: 'center' }]}>
      {process.map(({ key, title, value, remains }) => (
        <View
          style={{
            flexDirection: 'row',
            
            borderBottomWidth: 1,
            borderColor: 'gray'
          }}
          key={key}
        >
          <View >
            <TextBold fontSize="size7">{title}</TextBold>
            <TextBold fontSize="size7" color="green">
              {remains + strings.remainsDay}
            </TextBold>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animation
              source={CircleProgress}
              progress={value / 100}
              style={{ width: 100, height: 100 }}
            />
            <TextBold fontSize="size7" textStyle={{ position: 'absolute' }}>
              % {value}
            </TextBold>
          </View>
        </View>
      ))}

      <View style={{ flex: 1, width: '70%' }}>
        <TextBold fontSize="size7" textStyle={{ textAlign: 'right' }}>
          انتخاب تعداد روز
        </TextBold>
        <Picker containerStyle={{ width: '100%', maringBottom: 10 }} />
      </View>

      <ButtonBold
        containerStyle={[mainStyles.nextButton, { width: '35%' }]}
        textStyle={{ paddingBottom: 4 }}
        onPress={() => {}}
        color="white"
        fontSize="size9"
      >
        {strings.pay}
      </ButtonBold>
    </View>
  );
};

export default AdsOverview;
