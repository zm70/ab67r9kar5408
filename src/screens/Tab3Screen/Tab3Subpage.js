import React from 'react';
import { View } from 'react-native';
import { Subpage } from 'AppComponent';

import Addresses from '../../components/cardTab/addresses';
import EditProfile from '../../components/profileTab/editProfile/editProfile';
import * as navigationKeys from "../../components/shared/navigationKeys";

export default class Tab3Subpage extends React.PureComponent {
  componentDidMount() { }

  getPage = () => {
    console.log(this.props);
    switch (this.props.parentKey) {
      case navigationKeys.CARD_ADDRESS:
        return <Addresses {...this.props.data} />;
      case navigationKeys.CARD_ADD_PROFILE:
        return <EditProfile {...this.props.data} />;
      default:
        <View />;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Subpage title={this.props.titles} iconName={this.props.iconName}>
          {this.getPage()}
        </Subpage>
      </View>
    );
  }
}
