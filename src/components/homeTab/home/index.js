import React, { PureComponent } from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  BackHandler,
  DeviceEventEmitter,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AnimationAux, RetryAux } from 'AppAux';
import { connect } from 'react-redux';
import strings from 'src/res/strings.json';
import { setHideTopTabbar } from "AppRedux";
import {
  selectedBusinesses,
  randomBusiness,
  moreViewBusiness,
  bestBusinesses,
  newestBusinesses,
  followingProducts,
  httpSuggestBusinesses,
  followBusinessById,
  suggBusinesses
} from 'AppServices';

import { setupBackhandler, checkCautianMsg } from '../../shared/helperFunc';
import { errorUpdateDialog, successUpdateDialog } from '../../shared/navigation';
import { updateObject } from 'AppUtils';
import { mainStyles } from 'app-styles';
import { CustomScrollView } from '../../shared/CustomScrollView'
import * as navigationKeys from "../../shared/navigationKeys";
import { renderWholeCards } from './renderCardHelper'


class HomePage extends PureComponent {
  state = {
    loading: false,
    scrollHeight: 1,
    loadIndex: 9,
    visibleHeight: 0,
    titles: [
      {
        key: 'selections',
        endPoint: selectedBusinesses,
        title: 'برگزیده ها',
        items: []
      },
      {
        key: 'tops',
        endPoint: bestBusinesses,
        title: 'کسب و کارهای برتر',
        items: []
      },
      {
        key: 'followedProduct',
        endPoint: followingProducts,
        title: 'محصولات کسب و کارهای دنبال شده',
        items: []
      },
      {
        key: 'recommended',
        endPoint: suggBusinesses,
        title: 'کسب و کارهای پیشنهادی',
        items: []
      },
      {
        key: 'special',
        endPoint: null,
        title: 'پیشنهادات ویژه',
        uri:
          'https://previews.123rf.com/images/vectorgift/vectorgift1608/vectorgift160800109/61622829-sale-discount-background-for-the-online-store-shop-promotional-leaflet-promotion-poster-banner-vecto.jpg'
      },
      {
        key: 'icon',
        endPoint: moreViewBusiness,
        title: 'کسب و کارهای پربازدید',
        items: []
      },
      {
        key: 'icon2',
        endPoint: randomBusiness,
        title: 'کسب و کارهای اتفاقی',
        items: []
      },
      {
        key: 'icon',
        endPoint: newestBusinesses,
        title: 'کسب و کارهای جدید',
        items: []
      }
      // {
      //   key: 'news',
      //   endPoint: null,
      //   loading: false,
      //   loaded: false,
      //   title: 'اخبار و اطلاعیه ها',
      //   items: [
      //     {
      //       title: 'تصمیم جدید اتحادیه پوشاک',
      //       content:
      //         'ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نش ',
      //       uri:
      //         'https://previews.123rf.com/images/vectorgift/vectorgift1608/vectorgift160800109/61622829-sale-discount-background-for-the-online-store-shop-promotional-leaflet-promotion-poster-banner-vecto.jpg'
      //     },
      //   ]
      // }
    ]
  };

  handleBackPressApp() {

    if (Actions.currentScene == navigationKeys.HOME_PAGE) {
      BackHandler.exitApp();
    } else if (("" + Actions.currentScene).includes('dialog')) {
      Actions.refresh({ stillVisible: false })

      return true;
    } else {
      Actions.pop();
      return true;
    }

  }

  backPressSubscriptions = new Set();

  fetchSuggestBusinesses = (index, id) => {
    httpSuggestBusinesses(id)
      .then((items) => {
        // console.log([...res, ...res, ...res]);
        // const items = [...res];

        this.setBusinessesState(
          index,
          {
            loaded: true,
            loading: false,
            items
          },
          () => { }
        );

      })
      .catch((err) => {
        this.setBusinessesState(index, { loading: false }, () => { });
        console.log(err, index);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userInfo && prevProps.userInfo) {
      if (this.props.userInfo.id !== prevProps.userInfo.id) {
        if (this.props.userInfo)
          this.fetchSuggestBusinesses(3, this.props.userInfo.id);
      }
    }
  }

  componentDidMount() {

    this.startupFetching()
    this.backPressSubscriptions.add(this.handleBackPressApp);
    setupBackhandler(this.backPressSubscriptions);

  }

  startupFetching = () => {
    this.setState({ loading: true })
    this.state.titles.forEach((section, index) => {
      if (!section.loaded && !section.loading && section.endPoint) {
        // console.log(section.endPoint);
        this.getData(index, section.endPoint);
      }
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  // pushSingleBusiness = (id, title) => {
  //   pushSubpage(0, 1, title, null, {
  //     id,
  //     title
  //   });
  // };

  setBusinessesState = (index, newValue, func) => {
    this.setState(
      (prevState) => ({
        titles: [
          ...prevState.titles.slice(0, index),
          updateObject(prevState.titles[index], {
            ...newValue
          }),
          ...prevState.titles.slice(index + 1)
        ]
      }),
      () => console.log(this.state.titles)
    );
  };

  fetchBusinesses = (index, endPoint) => {
    endPoint()
      .then((res) => {
        if (this.state.loading) {
          this.setState({ loading: false })
        }
        let items = res
        if (endPoint == followingProducts) {
          let wholeItems = res.reduce((prevProducts, currentShop) => {
            if (currentShop.products && currentShop.products.length > 0)
              return prevProducts.concat(currentShop.products)
            return prevProducts
          }, [])

          let selectedItems = wholeItems.slice(0, 5)
          items = { wholeItems, selectedItems }
        }
      
        if (endPoint == bestBusinesses) {
          items = items.map(item => ({ item, onFollowCB: this.onFollowCB }))
        }
        this.setBusinessesState(
          index,
          {
            // loaded: true, loading: false, 
            items
          },
          () => { }
        );
        // console.log(this.state.titles);
      })
      .catch((err) => {
        // this.setBusinessesState(index, 
        //   { loading: false }, () => { });
        console.log(err, index);
      });
  };

  getData = (index, endPoint) => {
    this.fetchBusinesses(index, endPoint);
    // this.setState(
    //   (prevState) => ({
    //     titles: [
    //       ...prevState.titles.slice(0, index),
    //       updateObject(prevState.titles[index], {
    //         loading: true
    //       }),
    //       ...prevState.titles.slice(index + 1)
    //     ]
    //   }),
    //   () => {
    //     this.fetchBusinesses(index, endPoint);
    //   }
    // );
    // this.setBusinessesState(index, { loading: true }, )
  };

  onFollowCB = (showCautionAgain, body) => {

    checkCautianMsg(showCautionAgain)

    followBusinessById(body)
      .then((res) => {
        Actions.refresh({ stillVisible: false })
        // successUpdateDialog(strings.successMsgSubmit)

        const wholeItemsIndex = this.state.titles.findIndex(title => title.key === "tops")
        const wholeItems = this.state.titles[wholeItemsIndex].items;
        const itemIndex = wholeItems.findIndex(item => item.item.id === body.bId)
        const item = updateObject(wholeItems[itemIndex], {
          item: updateObject(wholeItems[itemIndex].item, {
            isFollowed: 1
          })
        })


        const items = [
          ...wholeItems.slice(0, itemIndex),
          item,
          ...wholeItems.slice(itemIndex+1)
        ];
        console.log(item, items);
        this.setBusinessesState(
          wholeItemsIndex,
          {
            // loaded: true, loading: false, 
            items
          },
          () => { }
        );

      })
      .catch((err) => {
        errorUpdateDialog(err)
      });
  };

  render() {
    return (
      <View style={mainStyles.mainContainer}>
        <CustomScrollView
          style={{ flexGrow: 1 }}
          onRefresh={this.startupFetching}
          onScrollUp={() => {
            this.props.setHideTopTabbar(false)
          }}
          onScrollDown={() => {
            this.props.setHideTopTabbar(true)
          }}
          hideTopTabbar={this.props.hideTopTabbar}
        >
          <AnimationAux loading={this.state.loading} >

            {this.state.titles.map((section, index) => {
              return (
                renderWholeCards(section, index, this.state, this.onFollowCB)
              );
            })}

          </AnimationAux>
      
        </CustomScrollView>
  
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    hideTopTabbar: state.commonReducers.hideTopTabbar
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    setHideTopTabbar: (value) => dispatch(setHideTopTabbar(value))
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(HomePage);
