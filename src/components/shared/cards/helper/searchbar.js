import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EStylesheet from 'react-native-extended-stylesheet';
import { ButtonBold, TextInputBold, TextBold } from 'AppFonts';
import   {mainStyles,cardStyles}  from 'app-styles';

import { Actions } from 'react-native-router-flux';

const styles = EStylesheet.create({
  searchInputWrapper: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '$colorLightGray',
    width: '100%'
  },
  topSearchbar: {
    height: '100%',
    flex: 1,
    maxWidth: '75%',
    backgroundColor: 'white'
  },
  searchbarWrapper: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchIcon: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchIconWrapper: {
    backgroundColor: '$colorPrimary',
    padding: 3,
    paddingLeft: 7,
    paddingRight: 7,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'center',
    height: '100%'
  },
  fullScreenbar: {
    width: '100%',
    backgroundColor: '$colorLightGray'
  }
});

export const ProductSearchbar = (props) => {
  const [value, setText] = useState('');
  return (
    <View
      style={[
        styles.searchbarWrapper,
        styles.topSearchbar,
        props.containerStyle
      ]}
    >
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          mainStyles.filterButton,
          styles.searchIcon
        ]}
        iconName="search"
        iconColor="white"
        iconSize="size10"
      />

      <TextInputBold

        color={value ? 'black' : 'gray'}
        fontSize={value ? 'size7' : 'size3'}
        textStyle={[
          cardStyles.searchInput,
          value ? null : { textAlign: 'center' }
        ]}

        placeholder={props.placeholder}
        onChangeText={(text) => props.filterProduct(text)}
      >
        {value}
      </TextInputBold>

    </View>
  );
};

export const TopSearchbar = (props) => {
  const [value, setText] = useState('');
  return (
    <View
      style={[
        styles.searchbarWrapper,
        styles.topSearchbar,
        props.containerStyle
      ]}
    >
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
          mainStyles.filterButton,
          styles.searchIcon
        ]}
        iconName="search"
        iconColor="white"
        iconSize="size10"
      />
      {props.searchingBusiness ?
        <TextInputBold

          color={value ? 'black' : 'gray'}
          fontSize='size3'
          textStyle={[
            cardStyles.searchInput,
            value ? null : { textAlign: 'center' }
          ]}
          autoFocus
          placeholder={props.placeholder}
          onChangeText={(text) => props.searchingBusiness(text)}
        >
          {value}
        </TextInputBold>
        : <TextBold
          onPress={Actions.search}
          color={'gray'}
          fontSize={'size2'}
          textStyle={[
            cardStyles.searchInput,
            value ? null : { textAlign: 'center' }
          ]}


        >
          {props.placeholder}
        </TextBold>}
    </View>
  );
};



export const SimpleSearchbar = (props) => (
  <View style={[styles.searchInputWrapper, props.containerStyle]}>
    <TextInputBold
      weight="bold"
      fontSize="size2"
      placeholder={props.placeholder}
      textStyle={{ textAlign: 'center' }}
      onChangeText={(text) => props.filterMessage(text)}
    />
  </View>
);

export const CustomSearchbar = (props) => {

  const [value, setText] = useState('');
  return (
    <View
      style={[
        styles.searchbarWrapper,
        styles.fullScreenbar,
        props.containerStyle
      ]}
    >
      <ButtonBold
        containerStyle={styles.searchIconWrapper}
        color="white" fontSize="size7"
        onPress={async () => {
          const succeed = await props.sendComment(value)
          if (succeed) {
            setText('')
          }

        }}
      >
        {props.actionText}
      </ButtonBold>
      <TextInputBold

        multiline
        color={value ? 'black' : 'gray'}
        fontSize={value ? 'size7' : 'size3'}
        textStyle={[
          cardStyles.searchInput,
          value ? null : { textAlign: 'center' }
        ]}
        placeholder={props.placeholder}
        onChangeText={(text) => setText(text)}
      >
        {value}
      </TextInputBold>
    </View>
  );
};

const propstype = {
  placeholder: PropTypes.string,
  containerStyle: PropTypes.shape({})
};

const defaulprops = {
  placeholder: '',
  containerStyle: {}
};

SimpleSearchbar.propTypes = {
  ...propstype
};
SimpleSearchbar.defaultProps = {
  ...defaulprops
};
CustomSearchbar.propTypes = {
  ...propstype
};
CustomSearchbar.defaultProps = {
  ...defaulprops
};
TopSearchbar.propTypes = {
  ...propstype
};
TopSearchbar.defaultProps = {
  ...defaulprops
};
