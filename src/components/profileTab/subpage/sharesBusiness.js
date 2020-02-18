import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import {  TopCard } from 'AppComponentShared';
import   {mainStyles}  from 'app-styles';

const renderItems = ({ item, index }) => {
  return <TopCard key={item.businessId} {...item} followed />;
};

const ShareBusiness = (props) => {
  console.log(props);
  const data = props.data && props.data.map((key) => props.data[key]);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={renderItems}
      contentContainerStyle={mainStyles.horizontalScrollContainer}
    />
  );
};

export default ShareBusiness;
