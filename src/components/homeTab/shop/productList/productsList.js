import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import propTypes from 'prop-types';

import strings from 'src/res/strings';
import { ProductDetailCard, SimpleSearchbar } from 'AppComponentShared';


const ProductPage = (props) => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>
      <SimpleSearchbar placeholder={strings.searchHolderProductFollow} />
      <ProductDetailCard />
    </ScrollView>
  </View>
);

ProductPage.propTypes = {
  title: propTypes.string.isRequired
};

export default ProductPage;
