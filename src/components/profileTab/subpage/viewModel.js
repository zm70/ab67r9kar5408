import strings from 'src/res/strings.json';

const safeSetInfo = (name, props) => {
  if (props.userInfo.personal_info && props.userInfo.personal_info[name]) {
    return props.userInfo.personal_info[name];
  }
  if (props.userInfo.address && props.userInfo.address[name]) {
    return props.userInfo.address[name];
  }
  return '';
};

export const editInfoBasicBodyRequest = (props) => ({
  fname: props.userInfo.fname,
  lname: props.userInfo.lname,
  gender: props.userInfo.gender,
  mobile: props.userInfo.mobile,
  national_code: safeSetInfo('national_code', props)
});

export const editInfoBodyRequest = (props) => ({
  fname: props.userInfo.fname,
  lname: props.userInfo.lname,
  gender: props.userInfo.gender,
  mobile: props.userInfo.mobile,
  national_code: safeSetInfo('national_code', props),
  email: safeSetInfo('email', props),
  card_number: safeSetInfo('card_number', props)
});

export const userInfo = (props) => ([
  {
    name: 'fname',
    value: props.userInfo.fname,
    label: strings.fname,
    error: true,
    validation: ['require', 'persian']
  },
  {
    name: 'lname',
    value: props.userInfo.lname,
    label: strings.lname,
    error: true,
    validation: ['require', 'persian']
  },
  {
    name: 'gender',
    value: props.userInfo.gender,
    label: strings.gender
  },
  {
    name: 'email',
    value: safeSetInfo('email', props),
    label: strings.email,

    validation: ['email']
  },
  {
    name: 'card_number',
    value: safeSetInfo('card_number', props),
    label: strings.cardNumber,
    maxLen: 16,
    validation: ['cardnumber']
  },
  {
    name: 'national_code',
    value: safeSetInfo('national_code', props),
    label: strings.nationalCode,
    error: true,
    maxLen: 10,
    validation: ['nationalCode', 'required']
  }
  // ,
  // {
  //   name: 'filter',
  //   value: {
  //     province_id: safeSetInfo('province_id', props),
  //     city_id: safeSetInfo('city_id', props)
  //   },
  //   label: ''
  // },
  // {
  //   name: 'map',
  //   value: {
  //     lat: safeSetInfo('lat', props),
  //     long: safeSetInfo('long', props)
  //   },
  //   label: ''
  // }
]);

export const addAddressBodyRequest = (props) => ({
  receiver: '',
  mobile: '',
  province_id: '1',
  postal_code: '',
  address: ''
});

// because we dont have edit address yet comment the default values
export const addAddress = (props) => [
  {
    name: 'receiver',
    // value: safeSetInfo('receiver', props),
    value: '',
    label: strings.receiver,
    error: true,
    validation: ['require', 'persian']
  },
  {
    name: 'mobile',
    // value: safeSetInfo('mobile', props),
    value: '',
    label: strings.receiverMobile,
    error: true,
    maxLen: 11,
    validation: ['require', 'mobile']
  },
  {
    name: 'filter',
    value: {
      // province_id: safeSetInfo('province_id', props),
      // city_id: safeSetInfo('city_id', props)
      province_id: 1,
      city_id: 1
    },
    label: ''
  },
  {
    name: 'address',
    // value: safeSetInfo('address', props),
    value: '',
    label: strings.address,
    error: true,
    validation: ['require'],
    type: 'textarea'
  },

  {
    name: 'postal_code',
    value: '',
    // value: safeSetInfo('postal_code', props),
    label: strings.postalCode,
    error: true,
    maxLen: 10,
    validation: ['require']
  }
];