import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { getUserInfo } from "AppServices";
import { getAsyncUserCart } from 'AppRedux';
import { Icon, TextBold, fontStyles } from 'AppFonts';
import { Badge } from 'react-native-elements';
import EStylesSheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const styles = EStylesSheet.create({
  container: {
    backgroundColor: '#fff',

    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5
  },
  activeText: {
    color: '$colorPrimary'
  },
  deactiveText: {
    color: '#222',
    opacity: 0.7
  },
  tabContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
class BottomTabbar extends React.Component {
  state = { selectedTab: '', baseScene: '' };

  init = true;

  bottomTabIcons = [
    { key: 'tabAbrika', index: 0, iconName: 'abrika', title: strings.abrika },
    {
      key: 'tabProfile',
      index: 1,
      iconName: 'ic_profile',
      title: strings.profile
    },
    { key: 'tabCart', index: 2, iconName: 'ic_cart', title: strings.cart },
    {
      key: 'tabCategory',
      index: 3,
      iconName: 'stack',
      title: strings.category
    },
    { key: 'tabHome', index: 4, iconName: 'home', title: strings.home }
  ];

  setupBadgeCount = () => {
    const cartItemCount = Object.keys(this.props.cartItems).reduce(
      (prevValue, curentValue) => prevValue + 1,
      0
    );
    this.setState({ cartItemCount });
  };

  popToPropsInterval;

  tabPressed = (pageKey) => {
    // if (pageKey === 'tabProfile') {
    //     Actions.drawerOpen()
    //     return;
    // }
    // console.log(
    //   this.props.navigation,
    //   pageKey,
    //   this.state.selectedTab,
    //   Actions.currentScene
    // );
    // if (
    //   this.state.selectedTab == pageKey &&
    //   !('' + Actions.currentScene).includes('Main')
    // ) {
    //   Actions.pop();
    //   return;
    // }
    if (pageKey == "tabHome") {
      Actions.jump("sixthMain")
    } else {

      Actions.popTo("" + pageKey + "Main")
    }
    this.props.navigation.jumpTo(pageKey);
    // this.setState({
    //   selectedTab: pageKey
    // });
  };

  componentDidMount() {
    this.props.getAsyncUserCart();
    //this is wrong in server design which make me dependant on userid it should rely on token
    //so I should request for user info again and again
    // if (this.props.userInfo.id === 0)
    //   this.props.getUserInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      if (this.props.cartItems) this.setupBadgeCount();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.bottomTabIcons.map(({ key, iconName, index, title }) => {
          const acitvate =
            this.props.navigation.navigation.state.index === index;

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              key={key}
              style={styles.tabContainer}
              onPress={() => this.tabPressed(key)}
            >
              {key === 'tabCart' && this.state.cartItemCount > 0 ? (
                <Badge
                  value={this.state.cartItemCount}
                  status="error"
                  containerStyle={{ position: 'absolute', top: 0, right: 20 }}
                  textStyle={[
                    fontStyles.bold,
                    {
                      color: '#fff',
                      padding: 3
                    }
                  ]}
                />
              ) : null}
              <Icon
                name={iconName}
                iconSize="size8"
                iconColor={acitvate ? 'blue' : 'black'}
                style={{
                  textAlign: 'center',

                  opacity: acitvate ? 1 : 0.8
                }}
              />
              <TextBold
                textStyle={{ textAlign: 'center', opacity: acitvate ? 1 : 0.8 }}
                fontSize="size5"
                color={acitvate ? 'blue' : 'black'}
              >
                {title}
              </TextBold>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.shop.cartItem,
    userInfo: state.user.userInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    getAsyncUserCart: () => dispatch(getAsyncUserCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTabbar);
