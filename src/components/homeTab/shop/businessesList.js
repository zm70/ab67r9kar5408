import React from 'react';
import { View, FlatList } from 'react-native';
import { TopCard, NotFound } from 'AppComponentShared';
import { mainStyles } from 'app-styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import strings from 'src/res/strings.json';
import { createDeepLinkingHandler } from 'react-native-deep-link';
import { addCurrentUserToChannel } from 'AppRedux';

const handleInvitationToChannel = ({ params: { channelId } }) => ({
  dispatch
}) => {
  console.log(channelId);
  // addCurrentUserToChannel is a redux-thunk action,
  // which was defined somewhere in the code.
  dispatch(addCurrentUserToChannel(channelId));
};

const schemes = [
  {
    name: 'example',
    routes: [
      {
        expression: '/channels/:channelId',
        callback: handleInvitationToChannel
      }
    ]
  }
];

const renderShops = ({ item }) => {
  return <TopCard key={item.id} {...item}  />;
};

const BusinessesList = ({ shops }) => {
  const businesses = shops.map(s => s.item || s)
  return (
    <View style={mainStyles.flex}>
      {businesses && businesses.length > 0
        ? <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={businesses}
          renderItem={renderShops}
          contentContainerStyle={{ width: '100%', alignItems: 'center' }}
        />
        : <NotFound msg={strings.businessNotFound} />}
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
const withDeepLinking = createDeepLinkingHandler(schemes);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withDeepLinking
)(BusinessesList);

// export default BusinessesList;
