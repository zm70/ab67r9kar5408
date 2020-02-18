import React from 'react';

import { View } from 'react-native';
import { Subpage } from 'AppComponent';
import BusinessesList from '../../components/homeTab/shop/businessesList';
import * as navigationKeys from "../../components/shared/navigationKeys";
// let ChildComponent = null;

class Tab2Subpage extends React.PureComponent {
  // state = {
  //   didLoad: false
  // };

  // componentDidMount() {
  //   console.log(this.props);
  //   switch (this.props.childIndex) {
  //     case -1:
  //       ChildComponent = require('../../components/profileTab/subpage/editProfile')
  //         .default;
  //       break;
  //     case 1:
  //       ChildComponent = require('../../components/profileTab/subpage/acountant')
  //         .default;
  //       break;
  //     case 5:
  //       ChildComponent = require('../../components/profileTab/subpage/adsOverview')
  //         .default;
  //       break;
  //   }

  //   this.setState({ didLoad: true });
  // }

  getPage = () => {
    console.log(this.props);
    switch (this.props.parentKey) {
      case navigationKeys.LIST_PAGE:
        if (this.props.childKey === navigationKeys.LIST_SUB_BUSINESS) {
          console.log("launch")
          return <BusinessesList {...this.props.data} />;
        }

      default:
        <View />;
    }
  };

  // componentWillUnmount() {
  //   ChildComponent = null;
  // }
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

export default Tab2Subpage;
