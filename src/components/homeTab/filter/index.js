import React from 'react';
import { View } from 'react-native';
import { TextBold } from 'AppFonts';
import { FilterCard } from 'AppComponentShared';
import propTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { pushBusinessList } from '../../shared/navigation';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: '$colorPrimary'
  },
  filterContainer: {
    width: '100%',
    alignSelf: 'center'
  }
});

import strings from 'src/res/strings.json';

class FilterPage extends React.PureComponent {
  state = {
    expandedIndex: -1
  };

  onFilter = (businesses) => {
    pushBusinessList(businesses)

  };

  render() {
    return (
      <View style={styles.container}>
        <TextBold color="blue" fontSize="size8">
          {strings.filterTitle}
        </TextBold>
        <FilterCard
          onFilter={this.onFilter}

        />
        <View style={{ height: 1 }} />
      </View>
    );
  }
}

FilterPage.propTypes = {
  uri: propTypes.shape({})
};
FilterPage.defaultProps = {
  uri: {}
};

export default FilterPage;
