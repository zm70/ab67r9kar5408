import protoTypes from 'prop-types';

export const User = {
  accesses: {
    can_order: protoTypes.bool,
    main_status: protoTypes.string,
    rule: protoTypes.string
  },
  avatar: {
    id: protoTypes.number,
    name: protoTypes.string,
    path: protoTypes.string,
    size: protoTypes.string
  },
  credit: protoTypes.number,
  fname: protoTypes.string,
  gender: protoTypes.string,
  id: protoTypes.number,
  lname: protoTypes.string,
  mobile: protoTypes.string,
  personal_info: {
    card_number: protoTypes.string,
    email: protoTypes.string,
    lat: protoTypes.string,
    long: protoTypes.string,
    national_code: protoTypes.string
  },
  reagent_code: protoTypes.string
};

export const defaultUser = {
  accesses: {
    can_order: false,
    main_status: '',
    rule: ''
  },
  avatar: {
    id: 0,
    name: '',
    path: '',
    size: ''
  },
  credit: 0,
  fname: '',
  gender: '',
  id: 0,
  lname: '',
  mobile: '',
  personal_info: {
    card_number: '',
    email: '',
    lat: '',
    long: '',
    national_code: ''
  },
  reagent_code: ''
};
