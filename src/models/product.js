import PropTypes from 'prop-types';

export const productProptypes = {
  id: PropTypes.number,
  product_key: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.string,
  brand: null,
  price: PropTypes.string,
  images: {
    logo: {
      id: PropTypes.number,
      path: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string
    },
    license: null
  }
};

export const productDefaults = {
  id: -1,
  product_key: '',
  name: '',
  quantity: '',
  brand: null,
  price: '',
  images: {
    logo: {
      id: -1,
      path: '',
      name: '',
      size: '*'
    },
    license: null
  }
};
