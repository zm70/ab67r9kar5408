import React from 'react';
import { View, Image } from 'react-native';
import { TextBold } from 'AppFonts';

import cardStyles from '../../style/cardStyles';

const NewsCard = ({ title, content, uri }) => (
  <View style={cardStyles.recommendedContainer}>
    <View style={{ width: '60%' }}>
      <TextBold fontSize="size3" color="red">
        {title}
      </TextBold>
      <TextBold fontSize="size1">{content}</TextBold>
    </View>
    <Image source={uri} style={cardStyles.smallNewsIcon} />
  </View>
);

export default NewsCard;
