import React from 'react';

import { FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import   {mainStyles}  from 'app-styles';
import PropTypes from 'prop-types';
import { getAsyncBookmark } from 'AppRedux';

import { ProductListCard } from '../../homeTab/shop/helper/productListCard';

class Bookmarks extends React.PureComponent {
  componentDidMount() {
    if (!this.props.bookmarks)
      this.props.getAsyncBookmark();
  }

  renderItems = ({ item }) => {

    return <ProductListCard {...item} isOverview />;
  };

  render() {
    const data = this.props.bookmarks && Object.keys(this.props.bookmarks).map(
      (key) => this.props.bookmarks[key]

    );

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={this.renderItems}
        contentContainerStyle={mainStyles.horizontalScrollContainer}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.user.profileAsync.bookmarks
  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    getAsyncBookmark: () => dispatch(getAsyncBookmark())
  };
};

Bookmarks.propTypes = {
  getAsyncBookmark: PropTypes.func,
  bookmarks: PropTypes.shape({})
};

Bookmarks.defaultProps = {
  getAsyncBookmark: () => { },
  bookmarks: {}
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(Bookmarks);
