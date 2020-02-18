import React from 'react';

import { View } from 'react-native';
import { Subpage } from 'AppComponent';
import EditProfile from '../../components/profileTab/editProfile/editProfile';
import Acountant from '../../components/profileTab/subpage/acountant';
import AdsOverview from '../../components/profileTab/subpage/adsOverview';
import Bookmarks from '../../components/profileTab/subpage/bookmarks';
import SharesBusiness from '../../components/profileTab/subpage/sharesBusiness';
import MyOrders from '../../components/profileTab/subpage/myOrders';
import Notifications from '../../components/profileTab/subpage/notifications';
import SingleNotification from '../../components/profileTab/subpage/singleNotification';
// let ChildComponent = null;
import * as navigationKeys from "../../components/shared/navigationKeys";

class Tab4Subpage extends React.PureComponent {
 

  getPage = () => {
    console.log(this.props);
    switch (this.props.childKey) {
      case navigationKeys.PROFILE_EDIT:
        return <EditProfile {...this.props.data} />;

      case navigationKeys.PROFILE_BOOKMARK:
        return <Bookmarks {...this.props} />;
      case navigationKeys.PROFILE_ACOUNTANT:
        return <Acountant {...this.props.data} />;
      case navigationKeys.PROFILE_SHARED_BUSINESS:
        return <SharesBusiness {...this.props} />;
      case navigationKeys.PROFILE_MY_ORDER:
        return <MyOrders {...this.props} />;
      case navigationKeys.PROFILE_ADS_OVERVIEW:
        return <AdsOverview {...this.props.data} />;
      case navigationKeys.PROFILE_NOTIFICATIONS:
        return <Notifications {...this.props.data} />;
      case navigationKeys.PROFILE_SINGLE_NOTIFICATIONS:
        return <SingleNotification {...this.props.data} />;

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
        <Subpage title={this.props.title}>{this.getPage()}</Subpage>
      </View>
    );
  }
}

export default Tab4Subpage;
