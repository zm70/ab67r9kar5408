import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import propTypes from 'prop-types';

import cardStyles from '../../style/cardStyles';

const SimpleImageCard = (props) => (
  <TouchableOpacity
    onPress={props.onItemPress}
    style={cardStyles.imageCardWrapper}
  >
    <Image source={props.uri} style={cardStyles.imageCard} />
  </TouchableOpacity>
);

SimpleImageCard.propTypes = {
  uri: propTypes.shape({}),
  onItemPress: propTypes.func
};
SimpleImageCard.defaultProps = {
  uri: {},
  onItemPress: null
};

export default SimpleImageCard;
