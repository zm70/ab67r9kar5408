import React from 'react';
import { Image } from 'react-native';

import propTypes from 'prop-types';

import cardStyles from '../../style/cardStyles';

const SpecialOffer = props => (
  <Image source={props.uri} style={cardStyles.specialOffer} />
);

SpecialOffer.propTypes = {
  uri: propTypes.shape({})
};
SpecialOffer.defaultProps = {
  uri: {}
};

export default SpecialOffer;
