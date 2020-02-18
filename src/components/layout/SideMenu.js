// @flow

import * as React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Badge } from 'react-native-elements';
import { UserInfo } from 'AppComponentShared';
import { connect } from 'react-redux';
import { TextBold, Icon, fontStyles, ButtonBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import styles from './styles';

class SideMenu extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  titles = [
    { key: 0, title: strings.bookmarks, content: strings.bookmarksDetail },
    {
      key: 1,
      title: strings.recentSearch,
      content: strings.recentSearchDetail
    },
    {
      key: 2,
      title: strings.shares,
      content: strings.sharesDetail
    },
    {
      key: 3,
      title: strings.orders,
      content: strings.ordersDetail
    },
    {
      key: 4,
      title: strings.responds,
      content: strings.respondsDetail
    },
    {
      key: 5,
      title: strings.adReports,
      content: strings.adReportsDetail
    },
    {
      key: 6,
      title: strings.settings,
      content: strings.settingsDetail
    },
    {
      key: 7,
      title: strings.updates,
      content: strings.updatesDetail
    }
  ];

  renderItem = ({ key, title, content }) => {
    return (
      <TouchableOpacity key={key} style={styles.sideItem}>
        <Icon name="back" iconColor="black" iconSize="size8" />

        <View style={{ marginRight: 5, flex: 1 }}>
          <TextBold weight="medium" fontSize="size7">
            {title}
          </TextBold>
          <TextBold fontSize="size4" color="gray" weight="medium">
            {content}
          </TextBold>
        </View>
        <Badge
          value={2}
          status="error"
          textStyle={[{ color: '#fff' }, fontStyles.bold]}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.sideMenuWrapper}>
        <ButtonBold
          fontSize="size8"
          iconName2="back"
          weight="medium"
          iconColor="black"
          iconSize="size10"
          containerStyle={styles.sideheader}
          onPress={Actions.drawerClose}
        >
          {strings.close}
        </ButtonBold>

        <UserInfo
          uri={{
            uri:
              'https://previews.123rf.com/images/vectorgift/vectorgift1608/vectorgift160800109/61622829-sale-discount-background-for-the-online-store-shop-promotional-leaflet-promotion-poster-banner-vecto.jpg'
          }}
          name="علی مفرد"
          field="تهران-تهران"
        />

        <ScrollView>
          <TextBold
            color="red"
            weight="medium"
            fontSize="size7"
            textStyle={styles.sideCodeWrapper}
          >
            کد 215646
          </TextBold>
          {this.titles.map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {};

export default connect()(SideMenu);
