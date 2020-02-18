// @flow

import * as React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { UserInfo } from 'AppComponentShared';
import { connect } from 'react-redux';
import { getAsyncProfile } from 'AppRedux';
import { TextBold, Icon, ButtonBold } from 'AppFonts';
import { getMyOrders, getNotifications } from 'AppServices';
import strings from 'src/res/strings.json';
import styles from '../layout/styles';
import { User, defaultUser } from '../../models/user';
import * as navigationKeys from "../shared/navigationKeys";
import { pushEditProfile } from "../shared/navigation";
import { CustomScrollView } from '../shared/CustomScrollView'
import { getImageOrPlaceholder } from "../shared/helperFunc";

class ProfileTab extends React.PureComponent {
  state = {
    titles: [
      {
        key: navigationKeys.PROFILE_BOOKMARK,
        title: strings.bookmarks,
        content: strings.bookmarksDetail,
        data: []
      },
      {
        key: navigationKeys.PROFILE_ACOUNTANT,
        title: strings.accountant,
        content: strings.accountantDetail
        
      },
      // {
      //   key: navigationKeys.PROFILE_SHARED_BUSINESS,
      //   title: strings.shares,
      //   content: strings.sharesDetail,
      //   data: []
      // },
      {
        key: navigationKeys.PROFILE_MY_ORDER,
        title: strings.orders,
        content: strings.ordersDetail,
        data: []
      },
      {
        key: navigationKeys.PROFILE_NOTIFICATIONS,
        title: strings.notifications,
        content: strings.notificationsDetail,
        data: []
      },
      // {
      //   key: navigationKeys.NOT_MATTER,
      //   title: strings.responds,
      //   content: strings.respondsDetail
      // },
      // {
      //   key: navigationKeys.PROFILE_ADS_OVERVIEW,
      //   title: strings.adReports,
      //   content: strings.adReportsDetail
      // },
      // {
      //   key: navigationKeys.PROFILE_SETTINGS,
      //   title: strings.settings,
      //   content: strings.settingsDetail
      // },
      {
        key: navigationKeys.NOT_MATTER,
        title: strings.updates,
        content: strings.updatesDetail
      },
      // {
      //   key: navigationKeys.NOT_MATTER,
      //   title: strings.returned,
      //   content: strings.returnedDetail
      // }
    ]
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.profileAsync !== prevProps.profileAsync) {
      this.setupUserBadge();
    }
  }

  updateTabData = (index, data) => {
    this.setState(
      (prevState) => ({
        titles: [
          ...prevState.titles.slice(0, index),
          { ...prevState.titles[index], data },
          ...prevState.titles.slice(index + 1)
        ]
      }),
      () => console.log(this.state.titles)
    );
  };

  setupUserBadge = () => {
    const bookmarks =
      Object.keys(this.props.profileAsync.bookmarks).map(
        (key) => this.props.profileAsync.bookmarks[key]
      ) || [];
    this.setState(
      (prevState) => ({
        titles: [
          { ...prevState.titles[0], data: bookmarks },
          // prevState.titles[1],
          // { ...prevState.titles[2], data: this.props.profileAsync.shares },
          // ...prevState.titles.slice(3)
          ...prevState.titles.slice(1)
        ]
      }),
      () => console.log(this.state.titles)
    );
  };

  fetchMyOrders = () => {
    const ordersIndex = this.state.titles
      .findIndex(i => i.key === navigationKeys.PROFILE_MY_ORDER);
    console.log(ordersIndex)

    getMyOrders()
      .then((orders) => {
        this.updateTabData(ordersIndex, orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchNotifications = () => {
    const notificationIndex = this.state.titles
      .findIndex(i => i.key === navigationKeys.PROFILE_NOTIFICATIONS);
    getNotifications()
      .then((notifications) => this.updateTabData(notificationIndex, notifications))
      .catch((err) => {
        console.log(err.responds);
      });
  };

  fetchMoneyRequests = () => {
    const reqIndex = this.state.titles
      .findIndex(i => i.key === navigationKeys.PROFILE_ACOUNTANT);
    console.log(reqIndex)

    getMoneyReq()
      .then((orders) => {
        this.updateTabData(reqIndex, orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  componentDidMount() {
    this.props.getAsyncProfile();
    this.initial();
  }

  initial = () => {
    this.fetchMyOrders();
    this.fetchNotifications();
  }

  renderItem = ({ key, title, content, data }) => {
    return (
      <TouchableOpacity
        key={key}
        style={styles.sideItem}
        onPress={() => Actions.subProfile({ title, childKey: key, data })}
      >
        {data && data.length > 0 ? (
          <Badge
            value={data.length}
            status="error"
            textStyle={{ color: '#fff', padding: 3 }}
          />
        ) : null}
        <View
          style={{
            marginRight: 5,
            width: 0,
            flexGrow: 1,
            alignItems: 'flex-end'
          }}
        >
          <TextBold weight="medium" fontSize="size7">
            {title}
          </TextBold>
          <TextBold fontSize="size4" color="gray" weight="medium">
            {content}
          </TextBold>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.sideMenuWrapper}>
        <UserInfo
          updatedImage={this.props.updatedImage}
          onImageSelect={this.props.onImageSelect}
          image={userInfo.avatar}
          name={`${userInfo.fname} ${userInfo.lname}`}
          field={userInfo.mobile}
          address=""
          points={0}
          code={userInfo.reagent_code}
          credit={userInfo.credit ? userInfo.credit : 0}
          onEditProfile={() => {
            if (userInfo.id) {
              pushEditProfile(navigationKeys.PROFILE_EDIT)
            }
          }}
          logout={this.props.logout}
        />

        <CustomScrollView
          onRefresh={this.initial}
        >
          {this.state.titles.map(this.renderItem)}
        </CustomScrollView>
      </View>
    );
  }
}

ProfileTab.propTypes = {
  userInfo: { ...User }
};
ProfileTab.defaultProps = {
  userInfo: { ...defaultUser }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profileAsync: state.user.profileAsync
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    getAsyncProfile: () => dispatch(getAsyncProfile())
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(ProfileTab);
