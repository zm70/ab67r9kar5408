import React from 'react';
import { View, Image, ViewPropTypes } from 'react-native';
import propTypes from 'prop-types';
import   {cardStyles}  from 'app-styles';
import { getImageOrPlaceholder } from '../../helperFunc';

const RoundIcon = ({ images, containerStyle }) => {
  return (
    <View style={[cardStyles.businessImgWrapper, containerStyle]}>
      <Image
        source={getImageOrPlaceholder(images)}
        style={cardStyles.businessImg}
      />
    </View>
  );
};

RoundIcon.propTypes = {
  images: propTypes.shape({}),
  containerStyle: ViewPropTypes.style
};
RoundIcon.defaultProps = {
  images: {},
  containerStyle: {}
};

export default RoundIcon;
