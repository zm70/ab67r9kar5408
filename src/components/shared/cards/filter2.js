import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import { TextBold, ButtonBold } from 'AppFonts';
import { mainStyles, inputStyle } from 'app-styles';
import Picker from '../inputs/Picker';

import strings from 'src/res/strings.json';
import { updateObject } from 'AppUtils';
import { AnimationAux, RetryAux } from 'AppAux';

import {
  getCities,
  getCategories,
  searchOnMap,
  getProvince
} from 'AppServices';
import { Actions } from 'react-native-router-flux';
import { startLoadingDialog } from "../../shared/navigation";
import { dialogboxPopInterval } from "../helperFunc";

class Filter2 extends React.PureComponent {
  state = {
    // {prov_id:{city_id}}

    cityList: [],
    //parent children structured
    structuredCategory: [],
    loading: true,
    bodyRequest: {
      cat: '',
      city_id: '',
      prov: '',
      type: ''
    },
    titles: [
      
     
      {
        key: 'prov',
        title: strings.province,
        initValue: 0,
        listItems: [{ value: 'key0', label: strings.province }],
        placeholder: strings.province
      },
      {
        key: 'city_id',
        title: strings.city,
        initValue: 0,
        listItems: [{ value: 'key0', label: strings.city }],
        placeholder: strings.city
      },
      {
        key: 'cat',
        title: strings.category,
        initValue: 0,
        listItems: [{ value: 'key0', label: strings.category }],
        placeholder: strings.category
      },
      {
        key: 'type',
        title: strings.businessType,
        initValue: 0,
        listItems: [{ value: 'key0', label: strings.businessType }],
        placeholder: strings.businessType
      }
    ]
  };

  setSubCategories = (catIndex, structuredCategory) => {
    return structuredCategory[catIndex].children.map((item, index) => ({
      label: item.name,
      value: item.id
    }));
  };

  fetchProvince = () => {
    getProvince().then((provinceList) => {
      const listItems = Object.keys(provinceList).map((province) => ({
        value: `${province}`,
        label: provinceList[province],
        index: province
      }));

      let selectedProvince = 0;
      if (this.props.province_id && this.props.province_id !== '') {
        selectedProvince = listItems.findIndex(
          (prov) => prov.value == this.props.province_id
        );
      }
      console.log("this.props.province_id", this.props.province_id, selectedProvince, listItems)
      const newValue = { prov: listItems[selectedProvince].value };
      // console.log(newValue, selectedProvince, listItems);
      this.setBodyRequest(newValue, listItems[selectedProvince].label);

      this.setState((prevState) => ({
        loading: false,

        titles: [
          updateObject(prevState.titles[0], {
            listItems,
            initValue: selectedProvince
          }),
          ...prevState.titles.slice(1)
        ]
      }));
    });
  };

  setCityList = (cityList) => {

    let province_id = 1;
    if (this.props.province_id && this.props.province_id !== '') {
      province_id = this.props.province_id;
    }

    const cities = cityList[province_id];

    const listItems = Object.keys(cities).map((city) =>
      this.setCities(cities, city)
    );


    let selectedCity = 0;
    if (this.props.city_id && this.props.city_id !== '') {
      selectedCity = listItems.findIndex((city) => city.value == this.props.city_id);
    }


    const newValue = { city_id: listItems[selectedCity].value };

    // console.log(newValue, selectedCity, listItems);
    this.setBodyRequest(newValue, listItems[selectedCity].label);

    this.setState((prevState) => ({
      loading: false,
      cityList,
      titles: [
        ...prevState.titles.slice(0, 1),
        updateObject(prevState.titles[1], {
          listItems,
          initValue: selectedCity
        }),
        ...prevState.titles.slice(2)
      ]
    }));
  };

  fetchCities = () => {
    getCities()
      .then((cityList) => {
        console.log(cityList)
        this.setCityList(cityList);
        // const cities = cityList[1];
        // const listItems = Object.keys(cities).map((city) =>
        //   this.setCities(cities, city)
        // );
      })
      .catch((err) => console.log(err));
  };

  fetchCategorires = async () => {
    try {
      let structuredCategory;
      if (this.props.structuredCategory) {
        structuredCategory = this.props.structuredCategory;
      } else {
        structuredCategory = await getCategories();
      }

      const listItems = structuredCategory.map((item) => ({
        value: item.parent.id,
        label: item.parent.name
      }));

      const initType = this.props.type ? this.props.type : 0;
      const newValue = {
        type: structuredCategory[initType].parent.id,
        cat: structuredCategory[initType].children[0].id
      };

      this.setBodyRequest(newValue, '');

      this.setState((prevState) => ({
        loading: false,
        structuredCategory,
        titles: [
          ...prevState.titles.slice(0, 2),
          updateObject(prevState.titles[2], {
            listItems,
            initValue: initType
          }),
          updateObject(prevState.titles[3], {
            listItems: this.setSubCategories(initType, structuredCategory)
          })
        ]
      }));
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  popUpInterval;

  search = async () => {
    startLoadingDialog();
    try {
      const filteredBusiness = await searchOnMap(this.state.bodyRequest);

      Actions.refresh({
        stillVisible: false
      });
      this.popUpInterval = dialogboxPopInterval(Actions.currentScene, () => {
        this.props.onFilter(filteredBusiness)
        if (this.popUpInterval) {
          clearInterval(this.popUpInterval)
        }
      })
    } catch (err) {
      Actions.refresh({ dialogType: 'alert', msg: strings.failedUpdate });
      console.log(err);
    }
  };

  setCities = (cities, city) => {
    return {
      value: city,
      label: cities[city]
    };
  };

  onSelect = (index, key, label) => {
    console.log(index,key, label)
    // if (
    //   this.state.structuredCategory.length === 0 ||
    //   this.state.cityList.length === 0
    // ) {
    //   return;
    // }

    const regionName = {};
    const regionKey = {};
    const newValue = {};
    if (index === 'prov') {
      newValue['prov'] = key;

      regionName['prov_name'] = label;
      if (key) {
        regionKey['province_id'] = key;
      }
      if (this.state.cityList.length === 0) {
        return;
      }
      const cities = this.state.cityList[key];
      const toArrayCities = Object.keys(cities);
      const listItems = toArrayCities.map((city) =>
        this.setCities(cities, city)
      );
      if (this.props.justCities) {
        this.setState((prevState) => ({
          titles: [
            prevState.titles[0],
            updateObject(prevState.titles[1], {
              listItems
            }),
            ...prevState.titles.slice(2)
          ]
        }));
      } else {
        this.setState((prevState) => ({
          titles: [
            prevState.titles[0],
            updateObject(prevState.titles[1], {
              listItems
            }),
            ...prevState.titles.slice(2)
          ]
        }));
      }

      newValue['city_id'] = toArrayCities[0];
    }

    if (index === 'city_id') {
      regionName['city_name'] = label;
      if (key) {
        regionKey['city_id'] = key;
      }
    }
    if (index === 'cat') {
      newValue['cat'] = key
      regionName['cat'] = label;
    }

    if (index === 'type') {
      
      const catIndex = this.state.structuredCategory.findIndex(
        (item) => item.parent.id === key
      );

      const listItems = this.setSubCategories(
        catIndex,
        this.state.structuredCategory
      );
      this.setState((prevState) => ({
        titles: [
          ...prevState.titles.slice(0, 3),
          updateObject(prevState.titles[3], {
            listItems
          })
        ]
      }));
      newValue['cat'] = this.state.structuredCategory[catIndex].children[0].id;
    }

    // if (this.props.ejectParameters) {
    //   this.props.ejectParameters(newValue, label);
    // }
    this.setBodyRequest(newValue, regionName, regionKey);
    // this.setState((prevState) => ({
    //   bodyRequest: updateObject(prevState.bodyRequest, {
    //     ...newValue
    //   })
    // }));
  };

  setBodyRequest = (newValue, regionName, regionKey) => {
    // console.log(this.props.ejectParameters, newValue, regionName);
    if (this.props.ejectParameters) {
      this.props.ejectParameters(newValue, regionName, regionKey);
    }
    this.setState((prevState) => ({
      bodyRequest: updateObject(prevState.bodyRequest, {
        ...newValue
      })
    }));
  };

  componentDidMount() {
    if (!this.props.justCities) {
      this.fetchCategorires();
    }
    this.fetchCities();
    this.fetchProvince();
  }

  componentWillUnmount() {
    if (this.popUpInterval) {
      clearInterval(this.popUpInterval)
    }
  }

  render() {
    let items = [];
    if (this.props.limitedIndex == 2) {
      items = [
        ...this.state.titles.slice(0,2),
      ];
    } else if (this.props.limitedIndex == 1) {
      items = [
        ...this.state.titles.slice(2,3),
      ];
    }
    // console.log(items);
    return (
      <AnimationAux loading={this.state.loading}>
        <RetryAux
          dataLoaded={
            this.state.titles[0].listItems.length > 0 &&
            this.state.titles[2].listItems.length > 0
          }
          retry={this.loadingCategories}
        >
          {items.map(({ title, key, listItems, initValue, placeholder }) => (
            <View
              style={[
                { flex: 1, marginBottom: 10, alignSelf: 'center' },
                this.props.itemStyle || inputStyle.inputWrapper80
              ]}
              key={key}
            >
              <TextBold fontSize="size7" textStyle={{ textAlign: 'right' }}>
                {title}
              </TextBold>
              <Picker
                initValue={initValue}
                listItems={listItems}
                onSelect={this.onSelect}
                pickerIndex={key}
                placeholder={placeholder}
                containerStyle={
                  this.props.itemStyle || inputStyle.inputWrapper80
                }
              />
            </View>
          ))}
          {this.props.limitedIndex || this.props.justCities ? null : (
            <ButtonBold
              containerStyle={[
                mainStyles.defaultButton,
                { paddingLeft: '20%', paddingRight: '20%', marginTop: 1 }
              ]}
              color="white"
              fontSize="size7"
              onPress={this.search}
            >
              {strings.search}
            </ButtonBold>
          )}
        </RetryAux>
      </AnimationAux>
    );
  }
}

Filter2.propTypes = {
  height: propTypes.string,
  containerStyle: propTypes.shape({}),
  onFilter: propTypes.func.isRequired
};
Filter2.defaultProps = {
  height: '100%',
  containerStyle: {}
};

export default Filter2;
