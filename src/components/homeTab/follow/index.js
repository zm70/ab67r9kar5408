import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { AnimationAux, RetryAux } from 'AppAux';
import { TextBold, Icon } from 'AppFonts';
import EStylesheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';
import { TopCard } from 'AppComponentShared';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomScrollView } from "../../shared/CustomScrollView";

const styles = EStylesheet.create({
  notfollowBusiness: {
    alignItems: 'center',
    backgroundColor: '$colorLightBlue',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    padding: 5
  },
  followBusiness: {
    alignItems: 'center',

    padding: 5,
    marginBottom: 5
  },
  notfoundText: { color: '$colorPrimary' },
  notfoundContainer: {
    paddingTop: '20%',
    paddingBottom: '20%',
    alignItems: 'center'
  },
  hugeIcon: {
    fontSize: RFValue(60),
    color: '$colorPrimary'
  }
});

@observer
class FollowBusiness extends React.PureComponent {
  componentDidMount() {
    this.fetchFollowBusiness();
    this.fetchSuggestBusiness();
  }

  fetchFollowBusiness = () => {
    this.props.store.fetchFollowBusiness();
  };

  fetchSuggestBusiness = () => {
    this.props.store.fetchSuggestBusinesses(this.props.catIdArrays);
  };

  renderItems = (item, onFollowCB) => {
    return <TopCard key={item.id} {...item} onFollowCB={onFollowCB} />;
  };

  renderFollowItems = (item) => {
    return <TopCard key={item.id} {...item} followed />;
  };

  render() {
    const {
      followLoading,
      suggestLoading,
      listFollowBusiness,
      listSuggestBusiness
    } = this.props.store;

    return (
      <CustomScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onRefresh={this.props.store.refreshing}
      >
        {listFollowBusiness.length === 0 ? (
          <View style={styles.notfoundContainer}>
            <Icon name="notfound" style={styles.hugeIcon} />
            <TextBold
              fontSize="size9"
              color="blue"
              textStyle={styles.notfoundText}
            >
              {strings.notfound}
            </TextBold>
          </View>
        ) : (
            <AnimationAux loading={followLoading}>
              <RetryAux
                dataLoaded={
                  listFollowBusiness[0] && listFollowBusiness[0].id !== -1
                }
                retry={this.fetchFollowBusiness}
              >
                <View style={styles.followBusiness}>
                  {listFollowBusiness.map(this.renderFollowItems)}
                </View>
              </RetryAux>
            </AnimationAux>
          )}
        {listSuggestBusiness.length > 0 ? <View style={styles.notfollowBusiness}>
          <TextBold fontSize="size8" textStyle={{ margin: 10 }}>
            {strings.recommendedBusiness}
          </TextBold>
          <AnimationAux loading={suggestLoading}>
            <RetryAux
              dataLoaded={
                true
              }
              retry={this.fetchSuggestBusiness}
            >
              {listSuggestBusiness.map((item) =>
                this.renderItems(item, this.props.store.followCB)
              )}
            </RetryAux>
          </AnimationAux>
        </View> : null}
      </CustomScrollView>
    );
  }
}
export default FollowBusiness;
