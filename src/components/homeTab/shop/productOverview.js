import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Icon } from 'AppFonts';
import { connect } from 'react-redux';
import { setBookmark } from '../../../redux/actions/action';
import {
  ProductListCard,
  ProductMultipleListCard,
  ProductSmallListCard
} from './helper/productListCard';

import   {mainStyles}  from 'app-styles';

const renderCards = ({ index, item }, renderIndex, { ...props }) => {
  switch (renderIndex) {
    case 0:
      return <ProductListCard {...item} {...props} />;
    case 1:
      return <ProductMultipleListCard {...item} {...props} />;
    case 2:
      return <ProductSmallListCard {...item} {...props} />;
  }
};

const createFlatList = ({ products, ...props }, numColumns, renderIndex) => {
  return (
    <FlatList
      key={renderIndex}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={products}
      numColumns={numColumns}
      renderItem={(items) => renderCards(items, renderIndex, { ...props })}
      contentContainerStyle={[
        mainStyles.verticalScrollContainer,
        { justifyContent: 'space-around', width: '100%' }
      ]}
    />
  );
};

const renderList = (props) => [
  createFlatList(props, 1, 0),
  createFlatList(props, 2, 1),
  createFlatList(props, 1, 2)
];

const ProductLists = (props) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    {renderList(props)[props.listState]}
  </View>
);

export default ProductLists;
// const mapStateToProps = (state) => {
//   console.log(state);
//   return {};
// };

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setBookmark: (product) => dispatch(setBookmark(product))
//   };
// };

// export default connect(
//   mapStateToProps,
//   dispatchStateToProps
// )(ProductLists);
