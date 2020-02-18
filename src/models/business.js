import PropTypes from 'prop-types';

export const defaultBusiness = {
  id: -1,
  business_key: '',
  title: '',
  user_id: 16,
  city_id: 0,
  owner: '',
  phone: '',
  mobile: '',
  description: '',
  address: '',
  employees: [],
  lat: '',
  long: '',
  card_number: null,
  profile_status: '',
  images: {
    logo: {
      id: -1,
      path: '',
      name: '',
      size: '*'
    },
    license: null
  },
  created_at: '',
  updated_at: '',
  category: [
    {
      id: -1,
      name: '',
      slug: ''
    }
  ],
  payments: [],
  isOwner: false
};

export const defaultSingleBusiness = {
  address: '',
  business_key: '',
  card_number: '',
  category: -1,
  description: '',
  employees: [],
  id: -1,
  images: {
    logo: {
      id: -1,
      path: '',
      name: '',
      size: '*'
    },
    license: null
  },
  lat: '',
  long: '',
  mobile: '',
  owner: '',
  phone: '',
  profile_status: '',
  status: 'غیر فعال',
  title: '',
  user_id: -1
};

export const proptypesBusiness = {
  id: PropTypes.number,
  business_key: PropTypes.string,
  title: PropTypes.string,
  user_id: PropTypes.number,
  city_id: PropTypes.number,
  owner: PropTypes.string,
  phone: PropTypes.string,
  mobile: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  employees: PropTypes.arrayOf[PropTypes.shape({})],
  lat: PropTypes.string,
  long: PropTypes.string,
  card_number: null,
  profile_status: PropTypes.string,
  images: {
    logo: {
      id: PropTypes.number,
      path: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string
    },
    license: null
  },
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  category: [
    {
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string
    }
  ],
  payments: [],
  isOwner: PropTypes.bool
};

export const businessObjPropType = PropTypes.shape({ proptypesBusiness });
export const businessObjDefault = PropTypes.shape({ defaultBusiness });

export const setupUpdateField = (data) => {
  const formatted = {
    category_id: data.category && data.category[0] && data.category[0].id,
    title: data.title,
    owner: data.owner,
    phone: data.phone,
    mobile: data.mobile,
    description: data.description,
    address: data.address,
    city_id: data.city_id || 1
  };
  const Others = ['employees', 'lat', 'long', 'card_number'];
  Others.forEach((item) => {
    if (data[item]) {
      // if (item === "images") {
      //   const images = {}
      //   Object.keys(data[item]).forEach(key => {
      //     images[key] = [data[item].key]
      //   })
      //   formatted[item] = images;

      // } else {
      formatted[item] = data[item];
      // }
    }
  });
  return formatted;
};

export const topCardPropTypes = {
  business_key: PropTypes.string,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  followersCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  logo: {
    id: PropTypes.number,
    name: PropTypes.string,
    path: PropTypes.string,
    size: PropTypes.string
  },
  productsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string
};

export const defaultTopCard = {
  business_key: '',
  category: '',
  followersCount: '',
  id: -1,
  logo: {
    id: -1,
    name: '',
    path: '',
    size: '*'
  },
  productsCount: '',
  title: ''
};
