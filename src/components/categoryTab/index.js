import React from 'react';
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  RefreshControl
} from 'react-native';
import propTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ButtonBold, TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import { pushBusinessListCategory } from '../shared/navigation';
import { filterCategories } from 'AppServices';
import { Actions } from "react-native-router-flux";
import { startLoadingDialog, noFoundDialog, errorUpdateDialog } from '../shared/navigation'
const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  radius: {
    borderRadius: 8,
    margin: 10,
    padding: 5,
    paddingBottom: 8,
    textAlignVertical: 'center',
    width: '25%',
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: '$colorPrimary',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonContainer2: {
    justifyContent: 'center',
    backgroundColor: '$colorLightGray',
    width: '100%',
    margin: 4,
    alignItems: 'center'
  },
  buttonContainer3: {
    justifyContent: 'center',
    backgroundColor: '$colorLightBlue',
    width: '100%',
    margin: 4,
    alignItems: 'center'
  },

  texts: { textAlign: 'center', alignItems: 'center' },
  filterContainer: {
    width: '100%',
    alignSelf: 'center'
  }
});

class CategoryTab extends React.PureComponent {
  state = {
    expandIndex: []
  };

  componentDidMount() { }

  onItemPress = (id, widthAnim) => {
    // const shrinkIndex = this.props.structuredCategory.findIndex(
    //   (cat) => cat.parent.id === this.state.expandIndex
    // );

    // if (shrinkIndex !== -1) {
    //   // const shrinkExpandedAnimation = this.props.structuredCategory[shrinkIndex]
    //   //   .widthAnim;

    //   Animated.parallel([
    //     // Animated.timing(shrinkExpandedAnimation, {
    //     //   toValue: 0
    //     // }),
    //     Animated.timing(widthAnim, {
    //       toValue: 1
    //     })
    //   ]).start();
    // } else {


    const currentAnimation = widthAnim._value;

    Animated.timing(widthAnim, {
      toValue: 1 - currentAnimation
    }).start();

    if (currentAnimation === 0) {
      this.setState((prevState) => ({
        expandIndex: [...prevState.expandIndex, id]
      }));
    } else {
      const expandIndex = this.state.expandIndex.filter(
        (item) => item !== id
      );
      // const expandIndex = this.state.expandIndex.splice(selectedIndex, 1);
      // console.log(expandIndex);

      this.setState((prevState) => ({
        expandIndex
      }));
    }
  };

  pushInterval;

  onChildPress = (cat) => {
    if (Actions.currentScene == "dialogbox") {
      return;
    }
    startLoadingDialog()
    filterCategories(cat)
      .then((shops) => {
        if (shops.length > 0) {
          Actions.refresh({
            stillVisible: false,
            dialogType: '',
            popCallback: () => {
              this.pushInterval = setInterval(() => {
                
                if (Actions.currentScene != "dialogbox") {
                  console.log('exist yet')
                  pushBusinessListCategory(shops)
                  clearInterval(this.pushInterval)
                }
              }, 10)
            }
          });
          // Actions.pop();
        } else {
          noFoundDialog(strings.noData)
          // Actions.refresh({ dialogType: 'alert', msg: strings.failedFind });
        }
      })
      .catch((err) => {
        errorUpdateDialog(err)
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            width: '100%'
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.props.retry}
            />
          }
        >
          {this.props.structuredCategory.map(
            ({ parent, children, widthAnim }) => (
              <Animated.View
                style={{
                  alignItems: 'center',
                  width: widthAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width * 0.4, width * 0.85]
                  })
                }}
                key={parent.id}
              >
                <ButtonBold
                  onPress={() => this.onItemPress(parent.id, widthAnim)}
                  key={`key${parent.id}`}
                  textStyle={[styles.texts]}
                  containerStyle={[styles.radius, styles.buttonContainer]}
                  color={'white'}
                  weight="medium"
                  fontSize="size8"
                >
                  {parent.name}
                </ButtonBold>

                {children &&
                  this.state.expandIndex.includes(parent.id) &&
                  children.map((subCat) => (
                    <ButtonBold
                      onPress={() => this.onChildPress(subCat.slug)}
                      textStyle={[styles.texts]}
                      key={`${subCat.name}+${parent.id}`}
                      textStyle={[
                        styles.radius,
                        subCat.name.includes('سایر')
                          ? styles.buttonContainer3
                          : styles.buttonContainer2
                      ]}
                      fontSize="size7"
                    >
                      {subCat.name}
                    </ButtonBold>
                  ))}
              </Animated.View>
            )
          )}
        </ScrollView>
      </View>
    );
  }
}

CategoryTab.propTypes = {
  uri: propTypes.shape({})
};
CategoryTab.defaultProps = {
  uri: {}
};

export default CategoryTab;
