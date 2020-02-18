import React from 'react';
import { View } from 'react-native';
import { Subpage } from 'AppComponent';
import { icons } from '../../components/abrikaTab/enums';
import Tutorial from "../../components/abrikaTab/subpage/tutorial";
import ContactUs from "../../components/abrikaTab/subpage/contactUs";
import AboutUs from "../../components/abrikaTab/subpage/aboutUs";
import Ads from "../../components/abrikaTab/subpage/ads";
import Opportunities from "../../components/abrikaTab/subpage/opportunities";
import CallFriend from "../../components/abrikaTab/subpage/callFriend";
import Faq from "../../components/abrikaTab/subpage/faq";
import Terms from "../../components/abrikaTab/subpage/terms";
import * as navigationKeys from "../../components/shared/navigationKeys";

let ChildComponent = null;

export default class Tab5Subpage extends React.PureComponent {
  state = {
    didLoad: false
  };
  getPage = () => {
    switch (this.props.childKey) {
      case navigationKeys.ABRIKA_TUTORIAL:
        return <Tutorial />
      case navigationKeys.ABRIKA_CONTACTUS:
        return <ContactUs />
      case navigationKeys.ABRIKA_ABOUTUS:
        return <AboutUs />
      case navigationKeys.ABRIKA_ADS:
        return <Ads />
      case navigationKeys.ABRIKA_OPPORTUNITIES:
        return <Opportunities />
      case navigationKeys.ABRIKA_CALL_FRIEND:
        return <CallFriend />
      case navigationKeys.ABRIKA_FAQ:
        return <Faq />
      case navigationKeys.ABRIKA_TERMS:
        return <Terms />
      default:
        <View />
    }
  }


  render() {
    const { childKey } = this.props;
    const childIndex = icons.findIndex(icon => icon.key === childKey)
    return (
      <View style={{ flex: 1 }}>

        <Subpage
          ChildComponent={ChildComponent}
          title={icons[childIndex].title}
          iconName={icons[childIndex].iconName}
        >
          {this.getPage()}
        </Subpage>

      </View>
    );
  }
}
