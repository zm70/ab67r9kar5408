// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { AbrikaPage, MainpageTabbar } from 'AppComponent';
import strings from 'src/res/strings.json';

const styles = StyleSheet.create({
  flex: {
    flex: 1,

    justifyContent: 'center'
  }
});

class Tab5Screen extends PureComponent {
  constructor(props) {
    super(props);
  }

  openModal = () => { };

  render() {
    return (
      <View style={styles.flex}>
        <MainpageTabbar iconName="abrika" title={strings.abrika} />
        <AbrikaPage />
      </View>
    );
  }
}

Tab5Screen.propTypes = {};

export default connect()(Tab5Screen);
