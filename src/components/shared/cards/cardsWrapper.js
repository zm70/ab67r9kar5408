import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';
import { TextBold } from 'AppFonts';
import strings from 'src/res/strings.json';
import   {cardStyles}  from 'app-styles';

const CardsWrapper = ({
  title,
  children,
  containerStyle,
  onSeeAllPress,
  loading
}) => {
  return (
    <View style={[containerStyle]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
          <>
            <TextBold
              key={0}
              fontSize="size6"
              textStyle={{ margin: 10, marginBottom: 0, textAlign: 'right' }}
            >
              {title}
            </TextBold>
            {children}
            <TouchableOpacity
              key={1} onPress={() => onSeeAllPress(title)}>
              <TextBold
                key={2}
                textStyle={cardStyles.seeall}
                color="darkGray"
                fontSize="size5"
              >
                {strings.seeall}
              </TextBold>
            </TouchableOpacity>
          </>
        )}
    </View>
  );
};

CardsWrapper.propTypes = {
  children: propTypes.element,
  title: propTypes.string,
  containerStyle: propTypes.shape({})
};
CardsWrapper.defaultProps = {
  containerStyle: {},
  title: '',
  children: null
};

export default CardsWrapper;
