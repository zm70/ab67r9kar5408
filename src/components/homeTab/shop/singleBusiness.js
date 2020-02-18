import React from 'react';

import { LayoutAnimation } from "react-native";
import PropTypes from 'prop-types';

import { Actions } from "react-native-router-flux";
import {
  panelSuggestBusinesses,
  getListProducts,
  getFollowers,
  getPageSingleBusiness,
  getBusinessById,
  deleteProduct,
  followBusinessById,
  unfollowBusinessById,
  getDetailBusiness
} from 'AppServices';
// import ObservableSingleBusinessStore from './singleBusinessMobx';
import {
  setShowCaution, getAsyncBookmark, getCatIdArrays,
  addCreatedProductsToMyBusiness, setupProductsOfMyBusiness,
  newFollowedBusiness
} from 'AppRedux';
import { connect } from 'react-redux';
import {
  editMyBusiness, checkIsPersian,
  toEnglishConverter,
  httpSuggestBusinesses
} from "AppServices";
import SingleBusinessContent from './singleBusinessContent';
import {
  setupUpdateField,
  defaultSingleBusiness,
  businessObjDefault
} from '../../../models/business';
import { updateObject } from 'AppUtils';
import ImgToBase64 from 'react-native-image-base64';
// import RNFS from 'react-native-fs';
import strings from "src/res/strings.json";
import {
  pushEditProduct,
  pushConfirmChange,
  prepareTicket,
  successUpdateDialog, errorUpdateDialog, startLoadingDialog, pushErrorDialog
} from '../../shared/navigation';

import {
  imageSelect,
  resizeImage,
  androidSimpleAnimation,
  commonError
} from '../../shared/helperFunc';

androidSimpleAnimation();


class SingleBusiness extends React.Component {
  state = {
    newLogo: null,
    newBanner: null,
    suggestBusinesses: [],
    loading: false,
    business: { ...defaultSingleBusiness },
    bodyRequest: [],
    detailData: [],
    followers: [],
    filteredProducts: null,
    suggestedLoaded: false,
    showAddProduct: false,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (!this.state.suggestedLoaded && this.props.catIdArrays.length > 0) {
  //     this.setState({ suggestedLoaded: true });
  //     const categories = [...new Set(this.props.catIdArrays)];
  //     if (__DEV__)
  //       console.log(categories.join(','));
  //     this.fetchSuggestBusinesses(categories.join(','));
  //   }
  // }

  fetchBusinesProduct = () => {
    // getListProducts(this.props.id)
    getListProducts(this.props.id)
      .then((productList) => {

        this.props.setupProducts(productList)
        // this.setState({
        //   products
        // });
      })
      .catch((err) => {
        commonError(err);
      });
  };

  fetchSuggestBusinesses = (catIdArrays) => {
    httpSuggestBusinesses(this.props.id)
      .then((suggestBusinesses) => {
        this.setState({ suggestBusinesses })
      })
      .catch((err) => {
        console.log(err);
      });
    // panelSuggestBusinesses(catIdArrays)
    //   .then((suggestBusinesses) => {
    //     this.setState({ suggestBusinesses });
    //   })
    //   .catch((err) => {
    //     commonError(err);
    //   });
  };

  fetchFollowers = () => {
    getFollowers(this.props.id)
      .then((followers) => {
        this.setState({ followers });
      })
      .catch((err) => {
        commonError(err);
      });
  };

  getSingleBusiness = () => {
    this.setState({ loading: true });

    if (this.props.isOwner) {
      getBusinessById(this.props.business_key)
        // getBusinessById('Abrk-8002744')
        .then((business) => {
          const bodyRequest = setupUpdateField(business);
          this.setState({
            bodyRequest,
            business: { ...business, isOwner: true },
            loading: false
          });
        })
        .catch((err) => {
          this.setState({ loading: false });
          commonError(err);
        });
    } else {
      getPageSingleBusiness(this.props.id, this.props.title)
        // getPageSingleBusiness(20, 'لورم راد زن')
        .then((business) => {
          // const bodyRequest = setupUpdateField(business);
          console.log(business)
          this.setState({
            // bodyRequest,
            business: { ...business },
            loading: false
          });
        })
        .catch((err) => {
          this.setState({ loading: false });
          commonError(err);
        });
    }
  };



  fetchDetailBusiness = () => {
    getDetailBusiness(this.props.id)

      .then((detailData) => {
        this.setState({ detailData })
      })
      .catch((err) => {
        commonError(err);
      });

  }

  onRemoveProduct = (pId) => {
    Actions.refresh({
      dialogType: 'loading',
      msg: '',
      loadingMsg: strings.loadingMsgSubmit,
      loadingThen: false
    });
    deleteProduct(pId)
      .then((res) => {
        // successUpdateDialog(strings.successDeleteProduct)
        Actions.refresh({ stillVisible: false });
        LayoutAnimation.linear();

        const productList = this.props.productList.filter(
          (product) => product.id != pId
        );
        console.log(productList)
        this.props.setupProducts(productList);
        // this.setState({ products });
      })
      .catch((err) => {
        pushErrorDialog(err)
      });
  };

  submitEditBusiness = () => {
    startLoadingDialog()
    editMyBusiness(this.state.bodyRequest, this.state.business.id)
      .then(({ data }) => {
        console.log(data)
        successUpdateDialog(strings.successUpdate)
      })
      .catch((err) => {
        errorUpdateDialog(err)
      });
  };

  updateBodyRequest = (newVal) => {
    this.setState(
      (prevState) => ({
        bodyRequest: updateObject(prevState.bodyRequest, {
          ...newVal
        })
      }),
      () => console.log(this.state.bodyRequest)
    );
  }

  onChangeText = (text, anyError, name) => {
    const newVal = {};
    let newText = text;
    if (
      (name === 'phone' ||
        name === 'mobile' ||
        name === 'card_number')
    ) {
      newText = toEnglishConverter(text);
    }
    newVal[name] = newText;

    this.updateBodyRequest(newVal)
  };


  onImageSelect = async (uri, isLogo) => {

    try {
      let sizeW = 300;
      let sizeH = 300;
      if (!isLogo) {
        sizeW = 600;
        sizeH = 400;
      }
      const resizedImage = await resizeImage(uri, sizeW, sizeH);
      const base64Raw = await ImgToBase64.getBase64String(resizedImage);
      // const base64Raw = await RNFS.readFile(resizedImage, 'base64')

      const base64 = `data:image/png;base64,${base64Raw}`

      const newVal = {};
      let name = '';
      if (isLogo) {
        name = 'logo';
        this.setState({ newLogo: base64 });
      } else {
        name = 'banner';
        this.setState({ newBanner: base64 });

      }
      newVal[name] = [{ path: base64 }];
      console.log(newVal);
      this.setState(
        (prevState) => ({
          bodyRequest: updateObject(prevState.bodyRequest, {
            images: updateObject(prevState.bodyRequest.images, {
              ...newVal
            })
          })
        }),
        () => console.log(this.state.bodyRequest)
      );

    } catch (err) {
      commonError(err)
    }
  };

  onAddToCartPress = (product) => {
    this.setState({
      showAddProduct: true,
      selectedProductToCart: product
    });
  };

  followBusinessCB = () => {
    Actions.refresh({ stillVisible: false });
    followBusinessById({ bId: this.props.id, id: this.props.userInfo.id })
      .then((res) => {
        this.props.newFollowedBusiness(this.props.id)
        this.setState((prevState) => ({
          business: updateObject(prevState.business, {
            isFollowed: 1,
            followersCount:res.data.followersCount
          })
        }));
        // Actions.pop();
      })
      .catch((err) => {
        pushErrorDialog(err)
      });
  }

  unfollowBusiness = () => {
    unfollowBusinessById({ bId: this.props.id, id: this.props.userInfo.id })
      .then((res) => {
        this.setState((prevState) => ({
          business: updateObject(prevState.business, {
            isFollowed: 0,
            followersCount:res.data.followersCount
          })
        }));
        // Actions.pop();
      })
      .catch((err) => {
        pushErrorDialog(err)
      });
  }

  filterProduct = (searchText) => {
    if (searchText === "") {
      this.setState({ filteredProducts: null });
      return;
    }
    const filteredProducts = this.props.productList.filter(
      (product) => product.name.includes(searchText)
    );
    this.setState({ filteredProducts });
  }


  componentDidMount() {
    this.fetchBusinesProduct();
    this.fetchFollowers();
    this.getSingleBusiness();
    this.fetchDetailBusiness();
    this.fetchSuggestBusinesses();
  }

  render() {
    console.log(this.state.business)
    return (
      <SingleBusinessContent
        suggestBusinesses={this.state.suggestBusinesses}
        submitEditBusiness={this.submitEditBusiness}
        {...this.props}
        tryAgain={this.getSingleBusiness}
        products={this.props.productList}
        onRemoveProduct={this.onRemoveProduct}
        loading={this.state.loading}
        onAddToCartPress={this.onAddToCartPress}
        onImageSelect={this.onImageSelect}
        onChangeText={this.onChangeText}
        followers={this.state.followers}
        newBanner={this.state.newBanner}
        newLogo={this.state.newLogo}
        business={this.state.business}
        filterProduct={this.filterProduct}
        filteredProducts={this.state.filteredProducts}
        detailData={this.state.detailData}
        followBusinessCB={this.followBusinessCB}
        userInfo={this.props.userInfo}
        unfollowBusiness={this.unfollowBusiness}
      />
    );
  }
}

SingleBusiness.propTypes = {};
SingleBusiness.defaultProps = {};


const mapStateToProps = (state) => {
  console.log(state);
  return {
    showCaution: state.user.showCaution,
    catIdArrays: state.user.catIdArrays,
    productList: state.shop.myBuseinessProductList,
    userInfo: state.user.userInfo
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    setShowCaution: (show) => dispatch(setShowCaution(show)),
    getAsyncBookmark: () => dispatch(getAsyncBookmark()),
    getCatIdArrays: (id) => dispatch(getCatIdArrays(id)),
    addNewProduct: (productList) => dispatch(addCreatedProductsToMyBusiness(productList)),
    setupProducts: (productList) => dispatch(setupProductsOfMyBusiness(productList)),
    newFollowedBusiness: (id) => dispatch(newFollowedBusiness(id))

    // getAsyncData: () => dispatch(getAsyncData())
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(SingleBusiness);

SingleBusiness.propTypes = {
  catIdArrays: PropTypes.arrayOf(PropTypes.number),
  productList: PropTypes.arrayOf(PropTypes.shape({}))
};
SingleBusiness.defaultProps = {
  catIdArrays: null,
  productList: []
};

// export default SingleBusiness;
