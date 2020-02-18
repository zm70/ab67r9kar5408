import React from 'react';
import {
  View,
  Image,
  Animated,
  ScrollView,
  Dimensions,
  Linking,
  Vibration
} from 'react-native';
import {
  getCategories,
  craeteOrChangeBusiness
} from 'AppServices';
import { TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import LottieView from 'lottie-react-native';
import { updateObject } from 'AppUtils';
import {
  checkIsPersian,
  toEnglishConverter
} from '../../../services/validation';


import {
  BoxComponents,
  GroupButton,
  Picker,
  SimpleTextInput,
  MapInput,
  ImagePick,
  InputHeader
} from 'AppComponentShared';

import { Actions } from 'react-native-router-flux';
import { YES, levelsData, requestBody, requestField } from './helper';
import { pushConfirmChange } from '../../shared/navigation';
import mellat from '../../../assets/images/MellatLogo.png';
import FilterCard from '../../shared/cards/filterCard';
import Filter2 from '../../shared/cards/filter2';

import { startLoadingDialog, errorUpdateDialog, successUpdateDialog } from "../../shared/navigation";

class CreateBusinessWrapper extends React.Component {
  state = {
    visibleHeight: 1,
    requireConfirm: false,
    loading: false,
    anyError: false,
    level: 0,
    progress: new Animated.Value(0),
    boxValues: [],
    boxPrivacy: [true, false],
    pickerValue: 0,
    linkingPay: '',
    boxTitle: null,
    requestBody,

    levelsData
  };

  checkAnyError = () => {
    let anyError = false;
    const data = this.state.levelsData[this.state.level].fields;
    data.forEach((item) => (item.error ? (anyError = true) : null));
    this.setState({ anyError });
  };

  onNext = () => {
    if (this.state.requireConfirm) {
      return this.onMapConfirm();
    }
    Vibration.vibrate(50);
    if (this.state.loading || this.state.anyError) {
      return;
    }

    if (this.state.level === levelsData.length - 1) {
      this.createBusiness();

      return;
    }
    if (this.state.level === levelsData.length - 2) {
      Animated.timing(this.state.progress, {
        toValue: 1,
        timing: 10000,
        useNativeDriver: true
      }).start();
    }

    Animated.timing(this.state.progress, {
      toValue: (this.state.level + 1) / 8,
      timing: 10000,
      useNativeDriver: true
    }).start();

    this.setState(
      (prevState) => ({
        level: prevState.level + 1
      }),
      this.checkAnyError
    );
  };

  onCancel = () => {
    if (this.state.level === 0) {
      this.props.exitCreate();
      return;
    }
    Animated.timing(this.state.progress, {
      toValue: (this.state.level - 1) / 8,
      timing: 1500,
      useNativeDriver: true
    }).start();

    this.setState(
      (prevState) => ({ level: prevState.level - 1 }),
      this.checkAnyError
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.structuredCategory.length !==
      prevProps.structuredCategory.length
    ) {
      this.setMainCategories();
    }
  }

  componentDidMount() {
    // this.fetchategorires();

    this.setState({ error: false });
    if (this.props.structuredCategory.length > 0) {
      this.setMainCategories();
    }
  }



  _handleOpenURL(event) {
    console.log(event.url);
  }


  createBusiness = () => {
    startLoadingDialog(strings.createBusinessLoading);
    craeteOrChangeBusiness(this.state.requestBody)
      .then(({ data }) => {
        Actions.refresh({ stillVisible: false });
        if (data.data) {
          // successUpdateDialog(strings.successCreateBusiness)
          this.props.addNewBusinessToList(data.data)
        }
        this.props.exitCreate();

      })
      .catch((err) => {
        errorUpdateDialog(err)
      });
  };


  setMainCategories = () => {
    const prevLevelsData = this.state.levelsData;

    const fields = this.props.structuredCategory.map((item, index) => ({
      key: index,
      title: item.parent.name,
      detail: '',
      type: 'box',
      name: 'categories'
    }));

    const len = this.props.structuredCategory.length;
    const boxValues = new Array(len).fill(false, 0, len);
    boxValues[0] = true;
    const boxTitle = this.props.structuredCategory[0].parent.name
    const levelsData = [
      {
        ...prevLevelsData[0],
        fields
      },
      ...prevLevelsData.slice(1)
    ];


    this.setState({ levelsData, boxValues, boxTitle });
  };

  pickerValues = (field) => {
    if (field === requestField['category_id']) {
      return this.setSubCategories();
      // eslint-disable-next-line no-else-return
    }
    //  else if (field === requestField['account_id']) {
    //   // this.props.fetchAccounts();
    //   if (!this.state.requestBody.account_id) {
    //     this.setInitialAccount();
    //   }

    //   return this.props.accounts;
    // }
  };

  setSubCategories = () => {
    if (this.props.structuredCategory.length === 0) return;
    const catIndex = this.state.boxValues.findIndex((value) => value);
    return this.props.structuredCategory[catIndex].children.map(
      (item, index) => ({
        label: item.name,
        value: `key${index}`
      })
    );
  };

  // fetchategorires = async () => {
  //   try {
  //     const structuredCategory = await getCategories();

  //     this.setState(
  //       { structuredCategory, loading: false },
  //       this.setMainCategories
  //     );
  //   } catch (error) {
  //     this.setState({ loading: false });
  //     console.log(error);
  //   }
  // };

  onImageSelect = (name, path) => {
    const newValue = [];
    newValue[name] = [{ path }];
    const images = updateObject(this.state.requestBody.images, {
      ...newValue
    });
    console.log(images)

    this.setState({
      requestBody: updateObject(this.state.requestBody, {
        images
      })
    });
  };

  onMapSelect = (lat, long) => {
    this.setState(
      {
        requestBody: updateObject(this.state.requestBody, {
          lat,
          long
        })
      },
      () => console.log(this.state.requestBody)
    );
  };

  boxValue = (key, name) => {
    if (name === 'categories') {
      return this.state.boxValues[key];
    } else if (name === requestField['privacy']) {
      return this.state.boxPrivacy[key];
    }
  };

  onBoxSelect = (key, name, title) => {
    if (name === 'categories') {
      const boxValues = new Array(5).fill(false, 0, 5);
      boxValues[key] = true;
      this.setState({ boxValues, boxTitle: title });
    } else if (name === requestField['privacy']) {
      const boxPrivacy = new Array(2).fill(false, 0, 2);
      boxPrivacy[key] = true;
      this.setState(
        {
          boxPrivacy,
          requestBody: updateObject(this.state.requestBody, {
            privacy: boxPrivacy[1] ? 1 : 0
          })
        },
        () => console.log(this.state.requestBody)
      );
    }
  };

  onPickerSelect = (name, index) => {
    console.log(name, index);
    const newValue = {};
    newValue[name] = index;
    this.setState(
      {
        requestBody: updateObject(this.state.requestBody, {
          ...newValue
        })
      },
      () => console.log(this.state.requestBody)
    );
  };


  ejectParameters = (filterObj) => {
    console.log(filterObj)
    const newValue = {};
    if (filterObj.city_id) {
      newValue['city_id'] = filterObj.city_id;
    }
    if (filterObj.cat) {
      newValue['category_id'] = filterObj.cat;
    }
    // this.checkAllPickerSelected(newValue)

    this.setState({
      requestBody: updateObject(this.state.requestBody, {
        ...newValue
      })
    });
  };

  onValueChange = (text, name, index, itemError) => {
    const newValue = {};

    if (
      (name === requestField['phone'] ||
        name === requestField['mobile'] ||
        name === requestField['reagent_code'] ||
        name === requestField['card_number']) &&
      checkIsPersian(text)
    ) {
      const newText = toEnglishConverter(text);
      this.setItemError(itemError, index);
      newValue[name] = newText;
    } else {
      this.setItemError(itemError, index);
      newValue[name] = text;
    }

    this.setState((prevState) => ({
      requestBody: updateObject(prevState.requestBody, {
        ...newValue
      })
    }));
  };

  setItemError = (itemError, index) => {
    const parent = this.state.levelsData[this.state.level];
    const field = parent.fields[index];

    // const regMobile = /^[0]?[9]\d{9}$/;
    // const regPhone = /^[0]\d{10}$/

    this.setState(
      (prevState) => ({
        levelsData: [
          ...prevState.levelsData.slice(0, this.state.level),
          updateObject(parent, {
            fields: [
              ...parent.fields.slice(0, index),
              updateObject(field, {
                error: itemError
              }),
              ...parent.fields.slice(index + 1)
            ]
          }),
          ...prevState.levelsData.slice(this.state.level + 1)
        ]
      }),
      () => {
        let anyError = true;
        const parents = this.state.levelsData[this.state.level];

        if (parents.fields.length > 0) {
          anyError = parents.fields.reduce(
            (prevValue, currentValue) => prevValue || currentValue.error,
            false
          );
        }

        this.setState({ anyError });
      }
    );
  };

  onMapConfirm = () => {
    pushConfirmChange(
      () => this.setState({ requireConfirm: false }, this.onNext),
      () => { },
      strings.confirmMap
    );
    // Actions.dialogbox({
    //   dialogType: 'confirm',
    //   popCallback: () => {
    //     this.setState({ requireConfirm: false });
    //   },
    //   onConfirm: this.onNext,
    //   msg: strings.confirmMap
    // });
  };

  onFilter = (businesses) => { };

  renderItems = (item, index) => {

    if (item.type === 'box') {
      return (
        <View style={{ alignSelf: 'center', width: '90%' }}>
          <BoxComponents
            key={item.key}
            index={item.key}
            title={item.title}
            detail={item.detail}
            onChange={(index) => this.onBoxSelect(index, item.name, item.title)}
            isActive={this.boxValue(item.key, item.name)}
            name={item.name}
            containerStyle={{ justifyContent: 'flex-end' }}
          />
        </View>
      );
    }
    if (item.type === 'filter1') {
      return (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '90%',
            height: '60%'
          }}
        >
          <Filter2
            type={this.state.boxValues.findIndex((item) => item)}
            ejectParameters={this.ejectParameters}
            limitedIndex={1}
            structuredCategory={this.props.structuredCategory}
            onFilter={this.onFilter}
          />
        </View>
      );
    }
    if (item.type === 'filter2') {
      return (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '90%',
            height: '60%'
          }}
        >
          <Filter2
            type={this.state.boxValues.findIndex((item) => item)}
            ejectParameters={this.ejectParameters}
            limitedIndex={2}
            structuredCategory={this.props.structuredCategory}
            onFilter={this.onFilter}
          />
        </View>
      );
    }

    if (item.type === 'picker') {
      // const isAccount = item.name === requestField['account_id'];
      return (
        <View
          style={{
            flex: 1,
            justifyContent: isAccount ? 'center' : 'flex-start',
            width: '60%',
            alignSelf: 'center'
          }}
        >
          <InputHeader key={100} isMandatory={item.isMandatory === YES} />
          <Picker
            listItems={this.pickerValues(item.name)}
            onSelect={(name, value) => this.onPickerSelect(item.name, value)}
          />
          {isAccount ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 20
              }}
            >
              <Image
                source={mellat}
                style={{ width: '40%', aspectRatio: 1 / 1, marginTop: 20 }}
                resizeMode="contain"
              />
              <TextBold
                weight="light"
                fontSize="size8"
                textStyle={{ marginTop: 20 }}
              >
                {strings.mellatPay}
              </TextBold>
            </View>
          ) : null}
        </View>
      );
    }
    if (item.type === 'textinput' || item.type === 'textarea') {
      const requestBody = this.state.requestBody;

      return (
        <View style={{ alignSelf: 'center' }}>
          <SimpleTextInput
            extraLabel={
              item.isMandatory === YES
                ? `(${strings.mandatory})`
                : `(${strings.optional})`
            }
            extraLabelColor={item.isMandatory === YES ? 'red' : 'gray'}
            validation={item.validation}
            label={item.title}
            keyboardType={item.maxLen ? 'numeric' : 'default'}
            maxLength={item.maxLen}
            key={item.key}
            name={item.name}
            onValueChange={this.onValueChange}
            value={requestBody[item.name]}
            index={index}
            multiline={item.type === 'textarea'}
            numberOfLines={item.type === 'textarea' ? 4 : 1}
            textStyle={item.type === 'textarea' ? { textAlign: 'right' } : null}
          />
        </View>
      );
    }
    /* <DialogAux
          showConfirm={this.state.showConfirm}
          onDismiss={this.onNext}
          dismissConfirm={() => this.setState({ showConfirm: false })}
          confirm={() => this.setState({ showConfirm: false })}
          msg={strings.confirmMap}
        ></DialogAux> */

    if (item.type === 'map') {
      // if (!this.state.requireConfirm) this.setState({ requireConfirm: true });
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View style={{ alignSelf: 'center' }}>
            <InputHeader isMandatory={false} />
            <MapInput
              requireConfirm={() => this.setState({ requireConfirm: true })}
              onSelect={this.onMapConfirm}
              placeholder={strings.searchMap}
              onMapSelect={this.onMapSelect}
            />
          </View>
        </View>
      );
    }
    if (item.type === 'imagePath') {
      return (
        <View style={{ alignSelf: 'center' }}>
          <InputHeader key={100} isMandatory={false} title={item.title} />
          <ImagePick onImageSelect={this.onImageSelect} name={item.name} />
        </View>
      );
    }
  };

  setRequestBody = (name) => { };

  chooseNextText = () => {
    if (this.state.level < levelsData.length - 1) {
      return strings.nextLevel;
    }
    if (this.state.level === levelsData.length - 1) {
      return strings.createBusiness;
    }
    // return strings.createBusiness;
  };

  render() {
    let { isMandatory, title } = this.state.levelsData[this.state.level];
    title = title && this.state.boxTitle && title.replace("ــ", this.state.boxTitle)
    return (
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 20,
          flex: 1
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TextBold color="gray" fontSize="size7">
            {strings.createNewBusiness}
          </TextBold>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            progress={this.state.progress}
            style={{ width: '90%', margin: 10 }}
            source={require('src/assets/animation/progressbar.json')}
            autoPlay={false}
          />
          <TextBold fontSize="size8" textStyle={{ margin: 10 }}>
            {title}
          </TextBold>
          <InputHeader isMandatory={isMandatory} />
          <View style={{ width: '100%', flex: 1 }}>
            {this.state.levelsData[this.state.level].fields.map(
              this.renderItems
            )}
          </View>
          <View style={{ height: this.state.visibleHeight }} />
        </ScrollView>
        <GroupButton
          containerStyle={{ position: 'absolute', bottom: 0 }}
          onCancel={this.onCancel}
          onNext={this.onNext}
          cancelText={
            this.state.level === 0 ? strings.exitLevel : strings.previousLevel
          }
          nextText={this.chooseNextText()}
          buttonStyle={
            this.state.level === 0 ? { backgroundColor: 'green' } : null
          }
          loading={this.state.loading}
          error={this.state.anyError}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height }
            }
          }) => this.setState({ visibleHeight: height, yPos: y })}
        />
      </View>
    );
  }
}
export default CreateBusinessWrapper;
