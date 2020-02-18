import React from 'react';
import { View } from 'react-native';
import { Subpage } from 'AppComponent';
import SingleBusiness from '../../components/homeTab/shop/singleBusiness';
import BusinessesList from '../../components/homeTab/shop/businessesList';
import ProductsList from '../../components/homeTab/shop/productList';
import FilterPage from '../../components/homeTab/filter';
import Chatting from '../../components/homeTab/chat/chatting';
import CreateProduct from '../../components/homeTab/shop/createProduct/createProduct';
import SingleProduct from '../../components/homeTab/shop/singleProduct/singleProduct';
import * as navigationKeys from "../../components/shared/navigationKeys";

export default class Tab1Subpage extends React.Component {
  componentDidMount() {

  }

  getPage = () => {
    console.log(this.props);
    switch (this.props.parentKey) {
      case navigationKeys.FILTER_PAGE:
        return <FilterPage {...this.props.data} />;
      case navigationKeys.BUSINESS_PAGE:
        if (this.props.childKey === navigationKeys.BUSINESS_SUB_EDIT) {
          return <SingleBusiness {...this.props.data} />;
        } else if (this.props.childKey === navigationKeys.BUSINESS_SUB_SINGLE) {
          return <SingleBusiness {...this.props.data} />;
        }
      //  else if (this.props.childKey === 1) {
      //   return <SingleProduct {...this.props.data} />;
      // }
      case navigationKeys.LIST_PAGE:
        if (this.props.childKey === navigationKeys.LIST_SUB_BUSINESS) {
          return <BusinessesList {...this.props.data} />;
        }
        if (this.props.childKey === navigationKeys.LIST_SUB_PRODUCT) {
          return <ProductsList {...this.props.data} />;
        }

      case navigationKeys.PRODUCT_PAGE:
        if (this.props.childKey === navigationKeys.PRODUCT_SUB_EDIT) {
          return <CreateProduct {...this.props.data} />;
        } else if (this.props.childKey === navigationKeys.PRODUCT_SUB_SINGLE) {
          return <SingleProduct {...this.props.data} />;
        }
      case navigationKeys.CHAT_PAGE:
        return <Chatting {...this.props.data} />;

      default:
        <View />;
    }
  };

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
