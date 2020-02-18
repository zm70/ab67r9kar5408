import React from 'react';
import { View, ScrollView, Image, Text, RefreshControl } from 'react-native';
import propTypes from 'prop-types';
import EStylesheet from 'react-native-extended-stylesheet';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings';
import { AnimationAux, RetryAux } from 'AppAux';
import { Actions } from 'react-native-router-flux';
import {
  getProductById,
  getMyProductById,
  likeProduct,
  dislikeProduct,
  createOpinios
} from 'AppServices';
import { connect } from 'react-redux';

import {

  CustomViewPager,
  CustomSearchbar,
  Comments,
  Costs
} from 'AppComponentShared';

import {
  SingleProductButton,
  SingleProductCompare
} from '../../../shared/cards/helper/followButtons';
import { ProductFeature } from '../helper/singleBusinessItems';
import { startLoadingDialog, successUpdateDialog, errorUpdateDialog } from "../../../shared/navigation";

const styles = EStylesheet.create({
  searchInputWrapper: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '$colorLightGray',
    width: '100%'
  },

  seprator: {
    borderBottomWidth: 2,
    borderBottomColor: '$colorChatGray'
  }
});

class SingleProduct extends React.Component {
  state = {
    message: '',
    costs: [],
    comments: [],
    completeProductData: {},
    loading: false
  };

  fetchLikeOrDislikeProduct = async (liked) => {
    try {
      let res;
      if (liked) {
        res = await dislikeProduct({ pro_id: this.props.product.id, user_id: this.props.user.id })
        console.log(res)
      } else {
        res = await likeProduct({ pro_id: this.props.product.id, user_id: this.props.user.id })
        console.log(res)
      }

      return res.data.success

    } catch (err) {
      return false
    }

    return likeProduct({ pro_id: this.props.product.id, user_id: this.props.user.id })
      .then((res) => {
        return true
      })
      .catch((err) => {
        return false
      });
  };

  fetchSingleProduct = () => {
    this.setState({ loading: true });

    getProductById(this.props.product.id, this.props.product.name || 'fake')
      .then((completeProductData) => {
        const costs = [
          { key: 0, title: strings.cost, value: completeProductData.price },
          {
            key: 1,
            title: strings.discount,
            value: completeProductData.discount || 0
          },
          {
            key: 2,
            title: strings.oldCost,
            value:
              +completeProductData.price *
              (1 - completeProductData.discount / 100)
          }
        ];
        this.setState({
          costs,
          comments: completeProductData.comments || [],
          completeProductData
        });
        console.log(completeProductData);
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    this.fetchSingleProduct();
    // setTimeout(() => {
    //   this.go(2);
    // }, 4000);
  }

  sendComment = (text) => {
    if (text === '') {
      return;
    }
    const message = text;
    text = ''
    startLoadingDialog(strings.loadingCommentSubmit)

    return createOpinios({
      message,
      user_id: this.props.user.id,
      product_id: this.props.product.id
    })
      .then((res) => {
        const comments = this.state.comments
        comments.push({
          id: this.props.user.id,
          lname: this.props.user.lname,
          message,
          name: this.props.user.fname

        })
        successUpdateDialog(strings.successMessageUpdate)
        this.setState({ comments })
        return true
      })
      .catch((err) => {
        errorUpdateDialog(err)
        return false
      });
  };

  render() {
    const { costs } = this.state;
    const discountTextColor =
      costs.length > 0 && +costs[1].value === 0 ? 'costGray' : 'red';
    return (
      <AnimationAux loading={this.state.loading}>
        <RetryAux dataLoaded={true} retry={this.fetchSingleProduct}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.fetchSingleProduct}
                />
              }>
              <CustomViewPager
                {...this.state.completeProductData}
                likeOrDislikeAProduct={this.fetchLikeOrDislikeProduct}
              />
              <View style={{ alignItems: 'center', padding: 10 }}>
                <SingleProductButton {...this.state.completeProductData} />

                <View
                  style={[styles.seprator, { width: '100%', marginTop: 5 }]}
                />

                <Costs costs={costs} discountTextColor={discountTextColor} />

                {/* <SingleProductCompare /> */}

                <ProductFeature {...this.state.completeProductData} />

                <CustomSearchbar
                  actionText={strings.send}
                  containerStyle={{ marginTop: 20 }}
                  placeholder="نظر خود را در مورداین محصول بیان کنید"
                  sendComment={this.sendComment}
                  onChangeText={(message) => this.setState({ message })}
                />

                <ButtonBold
                  fontSize="size5"
                  containerStyle={{ alignSelf: 'flex-start' }}
                >
                  {strings.allComments}
                </ButtonBold>

                {this.state.comments.map((comment) => (
                  <Comments {...comment} />
                ))}
              </View>
            </ScrollView>
          </View>
        </RetryAux>
      </AnimationAux>
    );
  }
}

SingleProduct.propTypes = {
  title: propTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo
  };
};

export default connect(mapStateToProps)(SingleProduct);
