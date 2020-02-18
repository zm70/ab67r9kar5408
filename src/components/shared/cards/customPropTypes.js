import propTypes from 'prop-types';

export const numericProps = {
  products: propTypes.oneOfType([propTypes.string, propTypes.number]),
  disocunted: propTypes.oneOfType([propTypes.string, propTypes.number]),
  followers: propTypes.oneOfType([propTypes.string, propTypes.number]),
  uri: propTypes.shape({}),
  type: propTypes.string
};
export const numericDefaults = {
  products: '',
  disocunted: '',
  followers: '',
  uri: {},
  type: 'simple'
};

export const mainDetailProps = {
  name: propTypes.string,
  field: propTypes.string,
  phone: propTypes.oneOfType([propTypes.string, propTypes.number]),
  rating: propTypes.number
};
export const mainDetailDefault = {
  name: '',
  field: '',
  phone: '',
  rating: null
};

export const imageProps = {
  uri: propTypes.shape({})
};
export const imageDefault = {
  name: '',
  field: '',
  phone: '',
  rating: 0,
  uri: {}
};
