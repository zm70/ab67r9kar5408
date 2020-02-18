import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import { ButtonBold, TextBold, Icon } from 'AppFonts';
import strings from 'src/res/strings';

import   {cardStyles}  from 'app-styles';

const Comments = ({ email, id, message, name, lname, timestamp }) => {
  const feedback = [
    { key: 2, title: strings.answer, icon: 'thumb_up' },
    { key: 0, title: strings.like, icon: 'thumb_up' },
    { key: 1, title: strings.unlike, icon: 'thumb_down' }
  ];
  const feedbackItems = feedback.map(({ key, title, icon }) => (
    <ButtonBold
      key={key}
      weight="medium"
      fonSize="size5"
      color="darkGray"
      iconName={icon}
      iconStyle={{ margin: 3 }}
    >
      {title}
    </ButtonBold>
  ));
  return (
    <View style={cardStyles.commentWrapper}>
      <View style={{ height: '100%', width: 3, backgroundColor: 'gray' }} />
      <View style={{ width: '95%', justifyContent: 'flex-start' }}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
          <Image
            source={require('../../../assets/images/test2.jpg')}
            style={[cardStyles.roundImage]}
          />
          <View style={{ margin: 3 }}>
            <TextBold
              weight="medium"
              fonSize="size7"
              textStyle={{ textAlign: 'right' }}
            >
              {name} {lname}
            </TextBold>
            <TextBold
              weight="medium"
              fonSize="size6"
              textStyle={{ textAlign: 'right' }}
            >
              {message}
            </TextBold>
          </View>
        </View>
        {/* <View style={cardStyles.feedbackWrap}>
          <TextBold weight="medium" fonSize="size5" color="gray">
            {timestamp}
          </TextBold>
          {feedbackItems}
        </View> */}
      </View>
    </View>
  );
};

export default Comments;
