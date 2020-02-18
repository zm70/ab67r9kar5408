import propTypes from 'prop-types';

export const numericProps = {
  productsCount: propTypes.oneOfType([propTypes.string, propTypes.number]),
  disocunted: propTypes.oneOfType([propTypes.string, propTypes.number]),
  followersCount: propTypes.oneOfType([propTypes.string, propTypes.number]),
  uri: propTypes.shape({}),
  type: propTypes.string
};
export const numericDefaults = {
  productsCount: '',
  disocunted: '',
  followersCount: '',
  uri: {},
  type: 'simple'
};

export const mainDetailProps = {
  name: propTypes.string,
  category: propTypes.oneOfType([propTypes.string, propTypes.arrayOf({})]),
  phone: propTypes.oneOfType([propTypes.string, propTypes.number]),
  rating: propTypes.number
};
export const mainDetailDefault = {
  name: '',
  category: '',
  phone: '',
  rating: null,
  owner: false
};

export const imageProps = {
  uri: propTypes.shape({})
};
export const imageDefault = {
  name: '',
  category: '',
  phone: '',
  rating: 0,
  uri: {}
};
