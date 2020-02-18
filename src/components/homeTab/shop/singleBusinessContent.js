import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';

import { TextBold, Icon } from 'AppFonts';
import strings from 'src/res/strings.json';
import { Actions } from 'react-native-router-flux';
import {
  NumericDetail,
  ProductSearchbar,
  MainDetail,
  MainDetailEdit,
  SmallIconCard
} from 'AppComponentShared';


import { AnimationAux, RetryAux } from 'AppAux';
import ProductLists from './productOverview';
import {
  pushEditProduct,
  pushConfirmChange,
  pushStartFromBusiness,
  pushErrorDialog
} from '../../shared/navigation';

import {
  imageSelect,
  voting
} from '../../shared/helperFunc';

import { ImageHeader, BusinessGroupButton } from './helper/singleBusinessItems';

import { mainStyles } from 'app-styles';
import * as asyncKeys from "../../../redux/sagas/asyncKeys";

const marginTop = 10;

const listStates = ['list', 'multiple', 'small'];

const NotFollow = ({ followBusiness }) => (
  <View
    style={{
      marginTop: 40,
      marginBottom: 40,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Icon name="private" iconSize="size13" iconColor="blue" />
    <Text style={{ textAlign: 'center' }}>
      <TextBold fontSize="size9" color="gray">
        {strings.privateBusinessGuide}
      </TextBold>
      <TextBold fontSize="size9" color="blue" onPress={followBusiness}>
        {strings.follow}
      </TextBold>
      <TextBold fontSize="size9" color="gray">
        {strings.hit}
      </TextBold>
    </Text>
  </View>
);

class SingleBusinessContent extends React.Component {
  state = {


    selectedProductToCart: {},
    // types,

    showExtras: false,

    listState: 0,

  };

  nextListState = () => {
    this.setState((prevState) => ({
      listState: (prevState.listState + 1) % 3
    }));
  };

  removeProduct = (pId) => {
    pushConfirmChange(
      () => { },
      () => this.props.onRemoveProduct(pId),
      strings.confirmDeleteProduct,
      true
    );
    // Actions.dialogbox({
    //   dialogType: 'confirm',
    //   msg: strings.confirmDeleteProduct,
    //   onConfirm: () => this.removeProductConfirm(pId),
    //   loadingThen: true
    // });
  };

  startChatting = () => {

    if (this.props.business.user_id === this.props.userInfo.id) {
      return pushErrorDialog(strings.chatToHimself)

    }
    pushStartFromBusiness(this.props.business.id)
  };


  followBusiness = () => {
    if (this.props.showCaution === 'show') {
      Actions.dialogbox({
        dialogType: 'warning',
        onConfirm: this.props.followBusinessCB
      });
    } else {
      this.props.followBusinessCB();
    }
  };

  showExtras = () => {

    this.setState((prevState) => ({ showExtras: !prevState.showExtras }));
  };

  // onFollowBuisiness = (showCautionAgain) => {
  //   this.setState({ showWarning: false });
  //   this.props.setShowCaution(showCautionAgain);
  //   followBusinessById({ id: this.props.id });
  // };

  addProduct = () => {
    pushEditProduct({ id: this.props.id }, true);
  };



  componentDidMount() {
    this.props.getAsyncBookmark();
    this.props.getCatIdArrays(this.props.id);

    // console.log(this.props.getAsyncData());
  }

  renderExtraSuggested = ({ item, index }) => {
    return <SmallIconCard {...item} />;
  };

  render() {
    const { images, isFollowed, profile_status, ...extras } = this.props.business;
    const forcedOwner = this.props.business.user_id === this.props.userInfo.id;

    const isOwner = extras.isOwner || forcedOwner;

    const newLogo = this.props.newLogo ? this.props.newLogo : images["logo"];
    const newBanner = this.props.newBanner ? this.props.newBanner : images["banner"];
    return (
      <AnimationAux loading={this.props.loading}>
        <RetryAux
          dataLoaded={this.props.business.id !== -1}
          retry={this.props.tryAgain}
        >

          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              backgroundColor: '#fff'
            }}
          >
            <ScrollView>
              <ImageHeader
                voteBusiness={(vote) => voting({ bId: this.props.id, id: this.props.userInfo.id, vote })}
                isOwner={isOwner}
                banner={newBanner}
                vote={extras.vote}
                chooseBanner={() => imageSelect((uri) => this.props.onImageSelect(uri))} />
              <View style={{ paddingLeft: '3%', paddingRight: '3%' }}>
                <NumericDetail
                  images={newLogo}
                  {...extras}
                  extraStyle={{
                    alignSelf: 'center',
                    width: '100%',
                    marginTop
                  }}
                  chooseLogo={() => imageSelect((uri) => this.props.onImageSelect(uri, true))}
                  isOwner={isOwner}
                  startChatting={this.startChatting}
                  unfollowBusiness={this.props.unfollowBusiness}
                  showExtras={this.showExtras}
                  followBusiness={this.followBusiness}
                  addProduct={this.addProduct}
                  type={
                    isOwner
                      ? 'owner'
                      : isFollowed === 0
                        ? 'follow'
                        : 'chatFollow'

                  }
                />

                {isOwner ? (
                  <MainDetailEdit
                    {...extras}
                    containerStyle={{ marginTop }}
                    onChangeText={this.props.onChangeText}
                    followers={this.props.followers}
                  />
                ) : (
                    <MainDetail
                      {...extras}
                      containerStyle={{ marginTop }}
                      followers={this.props.followers}
                    />
                  )}

                <BusinessGroupButton
                  detailData={this.props.detailData}
                  containerStyle={{ marginTop }}
                  isOwner={isOwner}
                  submitEditBusiness={this.props.submitEditBusiness}
                  {...extras}
                />
              </View>
              {this.state.showExtras ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.props.suggestBusinesses}
                  horizontal
                  renderItem={this.renderExtraSuggested}
                  extraData={this.state}
                  contentContainerStyle={[
                    mainStyles.horizontalScrollContainer,
                    mainStyles.extraContainer,
                    { paddingBottom: 10 }
                  ]}
                />
              ) : null}
              {this.props.products.length > 0 ? (
                <View style={[mainStyles.topbarContainer, { marginTop }]}>
                  <TouchableOpacity onPress={this.nextListState}>
                    {this.state.listState === 0 ? (
                      <Icon name="menulist" style={mainStyles.bigIcons} />
                    ) : this.state.listState === 1 ? (
                      <Icon name="menuforth" style={mainStyles.bigIcons} />
                    ) : (
                          <Icon name="menuone" style={mainStyles.bigIcons} />
                        )}
                  </TouchableOpacity>
                  <ProductSearchbar
                    filterProduct={this.props.filterProduct}
                    placeholder={strings.filterHolderProduct}
                    containerStyle={{ maxWidth: '80%' }}
                  />
                </View>
              ) : null}
              <View style={mainStyles.flex}>

                {(profile_status === asyncKeys.PUBLIC || isFollowed || isOwner) ?
                  (<View style={{ width: '100%' }}>
                    <ProductLists
                      listState={this.state.listState}
                      listStates={listStates}
                      products={this.props.filteredProducts || this.props.products}
                      isOwner={isOwner}
                      onAddToCartPress={this.props.onAddToCartPress}
                      parentName={this.props.business.title}
                      removeProduct={this.removeProduct}
                    />
                  </View>
                  ) : (
                    <NotFollow followBusiness={this.followBusiness} />
                  )}
              </View>
            </ScrollView>
          </View>
        </RetryAux>
      </AnimationAux>
    );
  }
}

export default SingleBusinessContent;
 /* {isFollowed === 0 || isOwner ? ( */
// SingleBusiness.propTypes = {};
// SingleBusiness.defaultProps = {};

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     showCaution: state.user.showCaution,
//     catIdArrays: state.user.catIdArrays
//   };
// };

// const dispatchMapToProps = (dispatch) => {
//   return {
//     setShowCaution: (show) => dispatch(setShowCaution(show)),
//     getAsyncBookmark: () => dispatch(getAsyncBookmark()),
//     getCatIdArrays: (id) => dispatch(getCatIdArrays(id))

//     // getAsyncData: () => dispatch(getAsyncData())
//   };
// };

// export default connect(
//   mapStateToProps,
//   dispatchMapToProps
// )(SingleBusiness);

// SingleBusiness.propTypes = {
//   catIdArrays: PropTypes.arrayOf(PropTypes.number)
// };
// SingleBusiness.defaultProps = {
//   catIdArrays: null
// };
