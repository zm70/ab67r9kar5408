// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Alert } from 'react-native';
import { connect } from 'react-redux';
import { AnimationAux, RetryAux } from 'AppAux';
import { axios } from 'AppServices';
import { getCategories } from 'AppServices'
import { CategoryPage, MainpageTabbar } from 'AppComponent';
import StyleSheet from 'react-native-extended-stylesheet'
import strings from 'src/res/strings.json';

const styles = StyleSheet.create({
  flex: {
    flex: 1,

  }
});

class Tab2Screen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    structuredCategory: [],
    loading: true
  }

  componentDidMount() {

    this.loadingCategories()

  }

  loadingCategories = async () => {
    this.setState({ loading: true })
    try {
      const structuredCategory = await getCategories();

      this.setState({ structuredCategory, loading: false })
    }
    catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  openModal = () => { };

  render() {

    return (
      <View style={styles.flex}>
        <MainpageTabbar iconName="stack" title={strings.category} />

        <AnimationAux
          loading={this.state.loading}>
          <RetryAux
            dataLoaded={this.state.structuredCategory.length > 0}
            retry={this.loadingCategories}>
            <CategoryPage
              structuredCategory={this.state.structuredCategory}
              retry={this.loadingCategories}
              loading={this.state.loading} />
          </RetryAux>
        </AnimationAux>

      </View>
    );
  }
}

Tab2Screen.propTypes = {};

export default connect()(Tab2Screen);
