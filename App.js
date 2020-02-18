import React, { Component } from 'react';
import {
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import {
  Router,
  Scene,
  Lightbox,
  Actions,
  Tabs
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Provider } from 'AppRedux';
import { TextBold, Icon } from 'AppFonts';
import EStyles from 'react-native-extended-stylesheet';
import { addCurrentUserToChannel } from 'AppRedux';
import {
  WelcomeScreen,
  Tab1Subpage,
  Tab2Screen,
  Tab5Screen,
  Tab3Screen,
  Tab3Subpage,
  Tab4Screen,
  Tab5Subpage,
  Tab2Subpage,
  Tab4Subpage,
  Tab1InternalTabs
} from 'AppScreens';

import {
  BottomTabbar,
  HomePage,
  FollowBusiness,
  ChatPage,
  BarcodePage,
  TopTabbarIcon,
  SingleBusiness,
  DialogBox,
  DialogBoxList,
  DialogCreateBusiness,
  DialogBoxBarcode,
  MyBusiness,
  BusinessAddress,
  SearchDialog
} from 'AppComponent';

import { tabRoutes } from './src/components/layout/enums';
import Test from './testComponent';
import colors from './src/res/colors.json';
import strings from './src/res/strings.json';
import Create from './src/components/cardTab/addresses';

EStyles.build({
  $theme: 'dark',
  $colorPrimary: colors.blue,
  $colorAccent: colors.orange,
  $colorLightGray: colors.lightGray,
  $colorDarkGray: colors.darkGray,
  $colorMediuumDarkGray: colors.mediumDarkGray,
  $colorMediuumLightGray: colors.mediumLighGray,
  $colorGray: colors.gray,
  $colorRed: colors.red,
  $colorPink: colors.pink,
  $colorDarkRed: colors.darkRed,
  $colorLightRed: colors.lightRed,
  $colorLightBlue: colors.lightBlue,
  $colorGreen: colors.green,
  $colorLightGreen: colors.lightGreen,
  $colorMarkerBlue: colors.markerBlue,
  $colorUserPinBlue: colors.userPinBlue,
  $colorChatGray: colors.chatGray,
  $colorCostGray: colors.costGray
});

const { width } = Dimensions.get('window');

const TabIcon2 = (props) => {
  const color = props.selected ? '#00f240' : '#301c2a';

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
      }}
      onPress={() => {
        console.log(props.navigation.state.key);
      }}
    >
      <Icon style={{ color }} name={props.iconName || 'circle'} size={18} />
    </TouchableOpacity>
  );
};

class App extends Component {
  state = {};

  render() {
    const RouterWithRedux = connect()(Router);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Provider>
          <RouterWithRedux key="root">
            <Lightbox key="Lightbox" initial>
              <Scene
                key="tabs"
                hideNavBar
                lazy
                tabBarComponent={(navigation) => (
                  <BottomTabbar navigation={navigation} />
                )}
                wrap={false}
                tabs={true}
                showLabel={false}
                tabBarPosition="bottom"
                activeTintColor={'black'}
                inactiveTintColor={'gray'}
                hideTabBar={false}
              >
                <Scene hideNavBar key="tabAbrika" title={strings.abrika}>
                  <Scene
                    hideNavBar
                    key="tabAbrikaMain"
                    component={Tab5Screen}
                  />
                  <Scene hideNavBar key="subAbrika" component={Tab5Subpage} />
                </Scene>
                <Scene hideNavBar key="tabProfile" title={strings.profile}>
                  <Scene
                    hideNavBar
                    key="tabProfileMain"
                    component={Tab4Screen}
                  />
                  <Scene hideNavBar component={Tab4Subpage} key="subProfile" />
                </Scene>

                <Scene hideNavBar key="tabCart" title={strings.cart}>
                  <Scene
                    hideNavBar
                    key="tabCartMain"
                    component={Tab3Screen}
                    
                  />
                  <Scene hideNavBar component={Tab3Subpage} key="subCart" />
                </Scene>

                <Scene hideNavBar key="tabCategory" title={strings.category}>
                  <Scene
                    hideNavBar
                    key="tabCategoryMain"
                    component={Tab2Screen}
                    custom="hey"
                  />
                  <Scene hideNavBar key="subCategory" component={Tab2Subpage} />
                </Scene>

                <Scene hideNavBar key="tabHome" title={strings.home} initial>
                  <Scene
                    key="tabHomeMain"
                    swipeEnabled={false}
                    hideNavBar
                    lazy
                    tabBarComponent={(navigation) => (
                      <TopTabbarIcon navigation={navigation} />
                    )}
                    wrap={false}
                    tabs={true}
                    showLabel={false}
                    tabBarPosition="top"
                  >
                    <Scene
                      hideNavBar
                      key={tabRoutes[0].key}
                      title={tabRoutes[0].title}
                      icon={TabIcon2}
                      component={BarcodePage}
                    />
                    <Scene
                      hideNavBar
                      key={tabRoutes[1].key}
                      title={tabRoutes[1].title}
                      icon={TabIcon2}
                      component={BusinessAddress}
                    />
                    <Scene
                      hideNavBar
                      key={tabRoutes[2].key}
                      title={tabRoutes[2].title}
                      icon={TabIcon2}
                      component={ChatPage}
                    />
                    <Scene
                      hideNavBar
                      key={tabRoutes[3].key}
                      title={tabRoutes[3].title}
                      icon={TabIcon2}
                      component={MyBusiness}
                    />
                    <Scene
                      hideNavBar
                      key={tabRoutes[4].key}
                      title={tabRoutes[4].title}
                      icon={TabIcon2}
                      component={Tab1InternalTabs}
                    />
                    <Scene
                      hideNavBar
                      key={tabRoutes[5].key}
                      title={tabRoutes[5].title}
                      icon={TabIcon2}
                      component={HomePage}
                      initial
                    />
                  </Scene>

                  <Scene hideNavBar key="subHome" component={Tab1Subpage} />
                </Scene>
              </Scene>

              <Scene hideNavBar key="dialogbox" component={DialogBox} />
              <Scene hideNavBar key="dialogboxList" component={DialogBoxList} />
              <Scene hideNavBar key="dialogboxBarcode" component={DialogBoxBarcode} />
              <Scene hideNavBar key="dialogboxCreateBusiness" component={DialogCreateBusiness} />
              <Scene hideNavBar key="search" component={SearchDialog} />
              <Scene
                hideNavBar
                key="welcome"
                title="welcome"
                component={WelcomeScreen}
                initial
              />
              <Scene hideNavBar
                key="test" title="languages" component={Test}
                 />
            </Lightbox>
          </RouterWithRedux>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;
