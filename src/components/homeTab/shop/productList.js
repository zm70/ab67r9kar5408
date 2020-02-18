import React from 'react';
import { View, FlatList } from 'react-native';
import   {mainStyles}  from 'app-styles';
import {  NotFound } from 'AppComponentShared';
import strings from 'src/res/strings.json';
import { ProductListCard } from "./helper/productListCard";

const renderProducts = ({ item }) => {
  console.log('items');
  console.log(item);
  return <ProductListCard key={item.id} {...item} />;
};

const ProductsList = ({ products }) => {
  return (
    <View style={mainStyles.flex}>
      {products && products.length > 0 ? <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={{ width: '100%', alignItems: 'center' }}
      />
        : <NotFound msg={strings.productNotFound} />}
    </View>
  );
};


export default ProductsList;

// export default BusinessesList;
