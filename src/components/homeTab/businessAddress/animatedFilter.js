import React from 'react';
import { View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import   {mainStyles}  from 'app-styles';
import { FilterCard } from 'AppComponentShared';
import {styles} from './styles';

const { height } = Dimensions.get('window');

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedFilter = ({
  searchExpand,
  expandSearchView,
  buttonAnimated,
  titles,
  onFilter
}) => (
  <Animated.View style={[styles.bottomSearchContainer]}>
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        padding: searchExpand ? 0 : 10,
        justifyContent: searchExpand ? 'flex-start' : 'center'
      }}
    >
      <AnimatedButton
        onPress={expandSearchView}
        style={[
          mainStyles.defaultButton,

          {
            transform: [{ scaleX: buttonAnimated }],
            width: '100%'
          }
        ]}
        activeOpacity={0.7}
      >
        <TextBold
          textStyle={{ textAlign: 'center' }}
          fontSize="size7"
          color="blue"
        >
          {strings.targetedSearch}
        </TextBold>
      </AnimatedButton>
      <View pointerEvents="none" style={{ position: 'absolute' }}>
        <TextBold
          textStyle={{
            textAlign: 'center'
          }}
          fontSize="size7"
          color="white"
        >
          {strings.targetedSearch}
        </TextBold>
      </View>
    </View>

    {searchExpand ? (
      <FilterCard
        titles={titles}
        height={height * 0.5}
        onFilter={onFilter}
        containerStyle={{ height: height * 0.5 }}
      />
    ) : null}
  </Animated.View>
);

export default AnimatedFilter;
