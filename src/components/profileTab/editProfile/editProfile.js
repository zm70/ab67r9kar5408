import React from 'react';
import { View, ScrollView } from 'react-native';

import { mainStyles, inputStyle } from 'app-styles';
import { connect } from 'react-redux';
import { updateObject } from 'AppUtils';
import { ButtonBold, TextBold } from 'AppFonts';
import { User, defaultUser } from '../../../models/user';
import {
  updateUserInfo,
  updateAdditionalUserInfo,
  addToAddressList
} from 'AppRedux';
import {
  httpUpdateUserInfo,
  createUserAddress,
  flyToSelectedCity
} from 'AppServices';
import { errorUpdateDialog, successUpdateDialog, startLoadingDialog, pushErrorDialog } from '../../shared/navigation'
import colors from 'src/res/colors.json';
import strings from 'src/res/strings.json';

import {
  addAddress,
  addAddressBodyRequest,
  editInfoBodyRequest,
  userInfo
} from '../subpage/viewModel';
import { Actions } from 'react-native-router-flux';
import { mapRegionConstraint } from "../../shared/helperFunc";
import { SaeInput } from '../subpage/helper'


class EditProfile extends React.PureComponent {
  safeSetInfo = (name) => {
    if (this.props.personal_info) {
      return this.props.personal_info[name];
    }
    return '';
  };

  state = {
    anyError: false,
    type: '',
    showAlert: false,
    showLoading: false,
    showConfirm: false,
    bodyRequest: {},
    userInfo: [],
    selectedProv: '',
    flyTo: null
  };

  onMapSelect = (lat, long) => {
    console.log(lat, long);
    if (!mapRegionConstraint([long, lat])) {
      return
    }
    this.setState(
      {
        bodyRequest: updateObject(this.state.bodyRequest, {
          lat,
          long
        })
      },
      () => console.log(this.state.bodyRequest)
    );
  };

  onValueChange = (text, name, index, error) => {
    const field = this.state.userInfo[index];

    const newValue = {};
    newValue[name] = text;

    this.setState(
      (prevState) => ({
        bodyRequest: updateObject(prevState.bodyRequest, {
          ...newValue
        }),
        userInfo: [
          ...prevState.userInfo.slice(0, index),
          updateObject(field, {
            error
          }),
          ...prevState.userInfo.slice(index + 1)
        ]
      }),
      () => console.log(this.state)
    );
  };

  setPermitSubmit = () => {
    const anyError = (anyError = this.state.userInfo.reduce(
      (prevValue, currentValue) => prevValue || currentValue.error,
      false
    ));
    this.setState({ anyError });
  };

  confirm = () => {
    if (this.props.addAddress) {
      return this.createAddressCB();
    }
    Actions.dialogbox({
      dialogType: 'confirm',
      msg: strings.confirmEditProfile,
      loadingThen: true,
      onConfirm: this.confirmCB
    });
  };

  confirmCB = () => {
    Actions.refresh({
      dialogType: 'loading',
      loadingThen: false,
      msg: ''
    });
    httpUpdateUserInfo(this.state.bodyRequest, this.props.userInfo.id)
      .then((data) => {
        console.log(data);
        successUpdateDialog(strings.successEditProfile)

        this.props.updateUserInfo(data);
      })
      .catch((err) => {

        errorUpdateDialog(err);
      });

    // httpUpdateAdditionalUserInfo(
    //   {
    //     email: this.state.bodyRequest.email,
    //     card_number: this.state.bodyRequest.card_number,
    //     lat: this.state.bodyRequest.lat,
    //     long: this.state.bodyRequest.long,
    //     national_code: this.state.bodyRequest.national_code
    //   },
    //   this.props.userInfo.id
    // )
    //   .then((data) => {
    //     this.props.updateAdditionalUserInfo(data);
    //   })
    //   .catch((err) => console.log(err));
  };

  createAddressCB = () => {
    // startLoadingDialog(strings.loadingMsg)
    const bodyRequest = {}
    Object.keys(this.state.bodyRequest).forEach(key => {
      if (this.state.bodyRequest[key]) {
        bodyRequest[key] = this.state.bodyRequest[key]
      }
    })

    createUserAddress(bodyRequest)
      .then(({ data }) => {
        this.props.addToAddressList([data.data]);
        Actions.pop()

        // successUpdateDialog(strings.successAddAddress)
      })
      .catch((err) => {
        pushErrorDialog(err)
        // Actions.dialogbox({ msg: err, dialogType: 'alert' })

      });
  };

  setCityParameter = (filterObj, label, regionKey) => {
    console.log(filterObj, label, regionKey);
    const newValue = {};
    if (regionKey && regionKey.city_id) {
      newValue['city_id'] = regionKey.city_id;
      // newValue["address"] = "address";
      // newValue["receiver"] = "receiver";
      // newValue["postal_code"] = "postal_code";
    }
    if (regionKey && regionKey.province_id) {
      newValue['province_id'] = regionKey.province_id;
      // newValue["address"] = "address"
      // newValue["receiver"] = "receiver";
      // newValue["postal_code"] = "postal_code";
    }

    if (label.prov_name) {
      this.setState({ selectedProv: label.prov_name });
    } else if (label.city_name) {
      if (this.state.selectedProv) {
        flyToSelectedCity({
          city_name: label.city_name,
          province_name: this.state.selectedProv
        })
          .then((res) => {
            res.value &&
              res.value[0] &&
              this.setState({ flyTo: res.value[0].geom.coordinates });
          })
          .catch((err) => console.log(err));
      }
    }
    console.log(newValue)
    this.setState({
      bodyRequest: updateObject(this.state.bodyRequest, {
        ...newValue
      })
    });
  };

  componentDidMount() {

    console.log(this.props);
    if (this.props.editUserInfo) {

      this.setState(
        {
          bodyRequest: editInfoBodyRequest(this.props),
          userInfo: userInfo(this.props),
          flyTo: this.props.personal_info && [
            this.props.personal_info.long,
            this.props.personal_info.lat
          ]
        },
        () => console.log(this.state)
      );
    } else if (this.props.addAddress) {
      this.setState({
        bodyRequest: addAddressBodyRequest(this.props),
        userInfo: addAddress(this.props)
      });
    }
  }

  render() {
    console.log(this.state)

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
            padding: 15
          }}
        >
          {this.state.userInfo.map((item, index) => (
            <SaeInput
              validation={item.validation}
              {...item}
              onValueChange={this.onValueChange}
              index={index}
              gender={this.state.bodyRequest.gender}
              onMapSelect={this.onMapSelect}
              showConfirm={() =>
                this.setState({ showConfirm: true, msg: strings.confirmMap })
              }
              ejectCityParameters={this.setCityParameter}
              flyTo={this.state.flyTo}
            />
          ))}
        </ScrollView>
        <ButtonBold
          containerStyle={mainStyles.defaultButton}
          fontSize="size7"
          color="white"
          onPress={this.confirm}
        >
          {strings.confirm}
        </ButtonBold>
      </View>
    );
  }
}

EditProfile.propTypes = {
  userInfo: { ...User }
};

EditProfile.defaultProps = {
  userInfo: { ...defaultUser }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userInfo: state.user.userInfo
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    updateUserInfo: (updateinfo) => dispatch(updateUserInfo(updateinfo)),
    updateAdditionalUserInfo: (updateinfo) =>
      dispatch(updateAdditionalUserInfo(updateinfo)),
    addToAddressList: (addresses) => dispatch(addToAddressList(addresses))
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(EditProfile);

{
  /* <DialogAux
showAlert={this.state.showAlert}
dismissAlert={() => this.setState({ showAlert: false })}
showLoading={this.state.showLoading}
dismissLoading={() => this.setState({ showLoading: false })}
type={this.state.type}
msg={this.state.msg}
showConfirm={this.state.showConfirm}
onDismiss={() => {}}
dismissConfirm={() => this.setState({ showConfirm: false })}
confirm={() => this.setState({ showConfirm: false })}
> */
}
