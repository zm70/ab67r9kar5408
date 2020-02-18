import strings from 'src/res/strings.json';

export const YES = 10;
export const NO = 11;
export const NULL = 101;

export const requestField = {
  category_id: 'category_id',
  title: 'title',
  en_title: 'en_title',
  owner: 'owner',
  phone: 'phone',
  mobile: 'mobile',
  work_hour: 'work_hour',
  card_number: 'card_number',
  city_id: 'city_id',
  employees: 'employees',
  address: 'address',
  description: 'description',
  lat: 'lat',
  long: 'long',
  images: 'images',
  privacy: 'privacy',
  // account_id: 'account_id',
  reagent_code: 'reagent_code'
};

export const levelsData = [
  {
    title: strings.chooseBusinessType,
    isMandatory: YES,
    fields: [{ type: 'box' }]
  },
  {
    title: strings.chooseBusinessCategory,
    isMandatory: YES,
    fields: [
      {
        key:'cat',
        type: 'filter1',
        isMandatory: YES,
        name: requestField.category_id
      }
    ]
  },
  {
    title: strings.chooseShopCity,
    isMandatory: YES,
    fields: [
      {
        key: 'city_id',
        title: strings.city_id,
        type: 'filter2',
        isMandatory: YES,
        name: requestField.city_id
      }
    ]
  },
  {
    title: strings.chooseShopName,
    isMandatory: NULL,
    fields: [
      {
        key: 0,
        title: strings.fa,
        type: 'textinput',
        isMandatory: YES,
        name: requestField.title,
        error: true,
        validation: ['require', 'persian']
      },
      {
        key: 1,
        title: strings.en,
        type: 'textinput',
        isMandatory: NO,
        name: requestField.en_title
      }
    ]
  },
  {
    title: strings.chooseShopInfo,
    isMandatory: NULL,
    fields: [
      {
        key: 0,
        title: strings.owner,
        type: 'textinput',
        isMandatory: YES,
        name: requestField.owner,
        error: true,
        validation: ['require', 'persian']
      },
      {
        key: 1,
        title: strings.phone,
        maxLen: 11,
        type: 'textinput',
        isMandatory: YES,
        name: requestField.phone,
        error: false,
        validation: ['require', 'phone']
      },
      {
        key: 2,
        title: strings.mobile,
        type: 'textinput',
        maxLen: 11,
        isMandatory: YES,
        name: requestField.mobile,
        error: true,
        validation: ['require', 'mobile']
      },
      {
        key: 3,
        title: strings.workHour,
        type: 'textinput',
        isMandatory: NO,
        name: requestField.work_hour
      },
      {
        key: 4,
        title: strings.cardNumber,
        name: requestField.card_number,
        maxLen: 16,
        type: 'textinput',
        isMandatory: NO,
        validation: ['card']
      },
      // {
      //   key: 5,
      //   title: strings.employee,
      //   type: 'textinput',
      //   isMandatory: NO,
      //   name: requestField.employees
      // },
      {
        key: 6,
        title: strings.address,
        type: 'textarea',
        isMandatory: YES,
        name: requestField.address,
        error: true,
        validation: ['require']
      },
      {
        key: 7,
        title: strings.description,
        type: 'textarea',
        isMandatory: YES,
        name: requestField.description,
        error: true,
        validation: ['require']
      }
    ]
  },
  {
    title: strings.chooseShopPlace,
    isMandatory: NULL,
    fields: [
      {
        type: 'map'
      }
    ],
    name: [requestField.lat, requestField.long]
  },
  {
    title: strings.chooseShopImage,
    isMandatory: NULL,
    fields: [
      {
        title: strings.logo,
        isMandatory: NO,
        type: 'imagePath',
        name: 'logo'
      },
      {
        title: strings.banner,
        isMandatory: NO,
        type: 'imagePath',
        name: 'banner'
      },
      {
        title: strings.license,
        isMandatory: NO,
        type: 'imagePath',
        name: 'license'
      }
    ],
    name: requestField.images
  },
  {
    title: strings.chooseShopPrivacy,
    isMandatory: YES,
    fields: [
      {
        key: 0,
        title: strings.public,
        detail: strings.publicExplain,
        type: 'box',
        name: requestField['privacy']
      },
      {
        key: 1,
        title: strings.private,
        detail: strings.privateExplain,
        type: 'box',
        name: requestField['privacy']
      }
    ],
    name: requestField.privacy
  },
  // {
  //   title: strings.chooseShopCredit,
  //   isMandatory: NULL,
  //   fields: [
  //     { type: 'picker', name: requestField.account_id, isMandatory: YES }
  //   ]
  // },
  {
    title: strings.chooseIntroducer,
    isMandatory: NULL,
    fields: [
      {
        key: 0,
        title: strings.introducerCode,
        type: 'textinput',
        isMandatory: NO,
        name: requestField.reagent_code
        // error: [],
        // check: ['respond']
      }
    ]
  }
];

const body = {};
body[requestField['category_id']] = null;
body[requestField['title']] = '';
body[requestField['en_title']] = '';
body[requestField['owner']] = '';
body[requestField['phone']] = '';
body[requestField['mobile']] = '';
body[requestField['work_hour']] = '';
body[requestField['card_number']] = '';
body[requestField['employees']] = [];
body[requestField['address']] = '';
body[requestField['description']] = '';
body[requestField['lat']] = null;
body[requestField['long']] = null;
body[requestField['images']] = {
  logo: [],
  banner: [],
  license: []
};
body[requestField['city_id']] = null;
body[requestField['privacy']] = 0; ///omoomi 0 khosoosi 1
// body[requestField['account_id']] = null;
body[requestField['reagent_code']] = null;
export const requestBody = body;


