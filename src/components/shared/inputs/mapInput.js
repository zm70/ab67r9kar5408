import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';

import { Icon, ButtonBold } from 'AppFonts';
import PropTypes from 'prop-types';
import { mapRegionConstraint } from "../helperFunc";
import MapboxGL from '@mapbox/react-native-mapbox-gl';
// import CedarMaps from '@cedarstudios/react-native-cedarmaps';
// import Mapbox from '@cedarstudios/react-native-mapbox-gl';
// import Mapir from 'mapir-react-native-sdk';

import {
  requestPermission,
  redirectToMap
} from '../../shared/helperFunc';
const { width, height } = Dimensions.get('window');
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

class MapInput extends React.Component {
  state = {
    selected: false,
    region: {
      geometry: {
        coordinates: [51.622548, 35.82573]
      }
    },
    centerCoordinate: [51.622548, 35.82573]
  };

  searchOnMap = () => {
    const bodyReq = {
      $select: 'poi',
      $filter: 'province eq تهران',
      text: 'سهروردی',
      location: {
        type: 'Point',
        coordinates: [51.3361930847168, 35.7006311416626]
      }
    };

    // fetch('https://map.ir/search', {
    //   method: 'POST',
    //   headers: {
    //     'x-api-key': this.key,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(bodyReq)
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  componentDidMount() {
    // requestPermission(this.getMyLocation);
    requestPermission(() => { });
  }

  // onMapSelect = (e) => {
  //   // const lat = e.nativeEvent.coordinate.latitude;
  //   // const long = e.nativeEvent.coordinate.longitude;
  //   // this.props.onMapSelect(lat, long);
  //   this.map.animateToRegion(
  //     {
  //       ...e.nativeEvent.coordinate,
  //       latitudeDelta,
  //       longitudeDelta
  //     },
  //     100
  //   );
  //   setTimeout(() => {
  //     this.props.onSelect();
  //     this.props.onMapSelect(
  //       this.state.region.latitude,
  //       this.state.region.longitude
  //     );
  //   }, 500);
  // };

  onConfirm = () => {
    this.props.onSelect();
    this.props.onMapSelect(
      this.state.region.geometry.coordinates[1],
      this.state.region.geometry.coordinates[0]
    );
  };

  onRegionDidChange = (region) => {
    this.props.onMapSelect(
      region.geometry.coordinates[1],
      region.geometry.coordinates[0]
    );
    this.setState({ region });
  };

  onDidFinishLoadingMap = () => {
    console.log(this.props.flyTo);

    if (this.props.flyTo.length > 1) {
      if (!mapRegionConstraint([+this.props.flyTo[0], +this.props.flyTo[1]])) {
        return
      }
      const flyTo = this.props.flyTo.map((coord) => +coord);
      this.map.flyTo(flyTo);
    }
  };

  startRegionChanging = () => {
    this.props.requireConfirm && this.props.requireConfirm();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: 0.9 * width,
          height: 0.5 * width,
          justifyContent: 'center'
        }}
      >
        <MapboxGL.MapView
          rotateEnabled={false}
          pitchEnabled={false}
          onRegionWillChange={this.startRegionChanging}
          onRegionDidChange={this.onRegionDidChange}
          zoomLevel={12}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          ref={(c) => (this.map = c)}
          centerCoordinate={this.state.centerCoordinate}
          style={{ flex: 1 }}
        />

        <View
          style={{
            position: 'absolute',
            alignSelf: 'center'
          }}
        >
          <Icon name="marker" iconColor="blue" iconSize="size12" />
          <Icon
            name="marker"
            style={{ color: 'transparent' }}
            iconSize="size12"
          />
        </View>
      </View>
    );
  }
}

export default MapInput;

MapInput.propTypes = {
  value: PropTypes.shape({ lat: PropTypes.number, long: PropTypes.number }),
  flyTo: PropTypes.shape([])
};

MapInput.defaultProps = {
  value: {
    lat: 35.82573,
    long: 51.522548
  },
  flyTo: []
};

{
  /* <ButtonBold
onPress={this.onConfirm}
color="white"
fontSize="size7"
containerStyle={[
  mainStyles.defaultButton,
  { width: '50%', marginTop: 10, alignSelf: 'center' }
]}
>
{strings.confirm}
</ButtonBold> */
}
{
  /* <Searchbar
          containerStyle={[styles.mapInputWrapper, { elevation: 3 }]}
          placeholder={this.props.placeholder}
        /> */
}
{
  /* <MapView
onMapReady={this.onMapReady}
ref={(refs) => (this.map = refs)}
style={{
  flex: 1,
  width: 0.9 * width,
  height: 0.7 * width
}}
initialRegion={this.state.region}
onPress={this.onMapSelect}
onRegionChange={this.onRegionChange}
/> */
}
