import React from 'react';
import {
  View,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

// import CedarMaps from '@cedarstudios/react-native-cedarmaps';
// import Mapbox from '@cedarstudios/react-native-mapbox-gl';
import { allBusinessesCoordinates } from 'AppServices'
import { mainStyles, cardStyles } from 'app-styles';
import strings from 'src/res/strings.json';
import colors from 'src/res/colors.json';

import { ShopScanCard } from 'AppComponentShared';
import AnimatedFilter from './animatedFilter';
import { UserMarker, ShopMarker } from './helper';
import {
  requestPermission,
  // enableLocation,
  redirectToMap
} from '../../shared/helperFunc';
import { pushErrorDialog } from '../../shared/navigation';
// import Mapir from 'mapir-react-native-sdk';

const longitudeDelta = 0.008;
const latitudeDelta = 0.005;
const defaultLat = 35.732573;
const defaultLong = 51.422548;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}



// const item = {
//   uri:
//     'https://previews.123rf.com/images/vectorgift/vectorgift1608/vectorgift160800109/61622829-sale-discount-background-for-the-online-store-shop-promotional-leaflet-promotion-poster-banner-vecto.jpg',
//   followers: 4800,
//   disocunted: 143,
//   products: 545,
//   newProduct: 25,
//   name: 'فروشگاه لوازم خانگی لوکس',
//   field: ' طراحی و تولید انواع لوازم لوکس منزل دکوری و مجسمه و...',
//   phone: ' تلفن :۰۹۱۲۴۳۷۶۵۶۳',
//   rating: 3,
//   lat: 35.82573,
//   long: 51.542548
// };

class BusinessAddress extends React.Component {
  state = {
    centerCoordinate: [defaultLong, defaultLat],
    featureLine: MapboxGL.geoUtils.makeFeature({
      type: 'LineString',
      coordinates: [[defaultLong, defaultLat], [defaultLong, defaultLat]]
    }),

    // markers: [{ latitude: 51.422548, longitude: 35.732573 }],
    business: [],
    selectedMarker: {
      lat: 35.82573,
      long: 51.542548
    },
    userPlace: {
      latitude: 35.87573,
      longitude: 51.542548
    },
    test: MapboxGL.geoUtils.makeFeature({
      type: 'Point',
      coordinates: [defaultLong, defaultLat]
    }),
    showDetail: false,
    zoomLevel: 10,
    searchExpand: false,
    buttonAnimated: new Animated.Value(0.4)

    // featureCollection: Mapbox.geoUtils.makeFeatureCollection()
  };

  titles = [
    { key: 0, title: strings.state },
    { key: 1, title: strings.city },
    { key: 2, title: strings.businessType },
    { key: 3, title: strings.category }
  ];

  fetchAllBusinesses = () => {
    allBusinessesCoordinates()
      .then(business => {
        this.setState({ business })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    requestPermission();
    this.fetchAllBusinesses();
  }

  expandSearchView = () => {
    const toValue = this.state.searchExpand ? 0.4 : 1;
    Animated.timing(this.state.buttonAnimated, {
      toValue,
      useNativeDriver: true
    }).start();

    LayoutAnimation.linear();

    this.setState({ searchExpand: toValue === 0.4 ? 0 : 1 });
  };

  search = () => { };

  onMarkerPress = (item) => {
  
    const featureLine = MapboxGL.geoUtils.makeFeature({
      type: 'LineString',
      coordinates: [[+item.long, +item.lat], [+item.long, +item.lat - 2]]
    });

    this.setState(
      {
        showDetail: true,
        selectedMarker: item,
        featureLine,
        zoomLevel: 10
      },
      () => this.map.flyTo([+item.long, +item.lat - 0.1], 1000)
    );
  };

  // onPress = async (e) => {
  //   console.log(e);
  //   const feature = MapboxGL.geoUtils.makeFeature(e.geometry);
  //   feature.id = `${Date.now()}`;

  //   this.setState({
  //     featureCollection: MapboxGL.geoUtils.addToFeatureCollection(
  //       this.state.featureCollection,
  //       feature
  //     )
  //   });
  // };

  onSourceLayerPress = (e) => {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  };

  onRegionChange = (e) => {
    // this.setState({ region });

    if (this.state.showDetail) {
      if (
        e.properties.visibleBounds[0][1] < +this.state.selectedMarker.lat ||
        e.properties.visibleBounds[1][1] > +this.state.selectedMarker.lat ||
        e.properties.visibleBounds[0][0] < +this.state.selectedMarker.long ||
        e.properties.visibleBounds[1][0] > +this.state.selectedMarker.long
      ) {
        this.setState({ showDetail: false, selectedMarker: {} });
      }
    } else if (this.state.searchExpand) {
      this.expandSearchView();
    }
  };

  onFilter = (filteredBusiness) => {
    if (filteredBusiness.length === 0) {
      pushErrorDialog(strings.failedFind)
      return
    }
    const business = filteredBusiness.map((item) => {
      if (!+item.long || !+item.lat) {

        return
      }
      const feature = MapboxGL.geoUtils.makeFeature({
        coordinates: [+item.long, +item.lat],
        type: 'Point'
      });
      feature.id = `${Date.now()}`;
      return { ...item, feature };
    });
    console.log(business);
    this.setState({ business, searchExpand: false, zoomLevel: 12 });
    this.map.flyTo([+business[0].long - 0.005, +business[0].lat], 1000);
  };

  onMapPress = () => {
   
    this.setState({ showDetail: false, selectedMarker: {} },()=>{
      setTimeout(()=>{
        this.setState({ showDetail: false, selectedMarker: {} });
      },100)
     
    });
  }
  // addMarker(coordinates) {
  //   this.setState({
  //     markers: [
  //       ...this.state.markers,
  //       { latitude: coordinates[0], longitude: coordinates[1] }
  //     ]
  //   });
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          onPress={this.onMapPress}
          rotateEnabled={false}
          pitchEnabled={false}
          onRegionDidChange={this.onRegionChange}
          showUserLocation={true}
          // userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          zoomLevel={this.state.zoomLevel}
          ref={(c) => (this.map = c)}
          centerCoordinate={this.state.centerCoordinate}
          style={{ flex: 1 }}
        >
          {this.state.showDetail ? (
            <MapboxGL.ShapeSource
              id="symbolLinelayer1"
              shape={this.state.featureLine}
            >
              <MapboxGL.LineLayer
                id="linelayer1"
                style={{ lineColor: colors.lightBlue, lineWidth: 4 }}
              />
            </MapboxGL.ShapeSource>
          ) : null}
          {this.state.business.map((item) => {
            if (item.lat) {
              return (
                <MapboxGL.PointAnnotation
                  key={item.id}
                  id={`${item.id}`}
                  coordinate={[+item.long, +item.lat]}
                  title={'title'}
                  onSelected={() => this.onMarkerPress(item)}
                >
                  <ShopMarker uri={item && item.images && item.images.logo} showDetail={this.state.showDetail} />
                  <MapboxGL.Callout title={item.title} />
                </MapboxGL.PointAnnotation>
              );
            }
          })}
        </MapboxGL.MapView>

        {this.state.searchExpand && !this.state.showDetail ? (
          <TouchableOpacity
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            onPress={this.expandSearchView}
          />
        ) : null}
        {!this.state.showDetail ? (
          <AnimatedFilter
            onFilter={this.onFilter}
            searchExpand={this.state.searchExpand}
            expandSearchView={this.expandSearchView}
            buttonAnimated={this.state.buttonAnimated}
            titles={this.titles}
          />
        ) : null}
        {this.state.showDetail ? (
          <ShopScanCard
            {...this.state.selectedMarker}
            containerStyle={[
              mainStyles.backLightBlue,
              cardStyles.absoluteSnapShot
            ]}
          />
        ) : null}
      </View>
    );
  }
}
export default BusinessAddress;

// {!this.state.showDetail && this.state.searchExpand ? (
//   <TouchableOpacity
//     onPress={this.expandSearchView}
//     style={{

//       position: 'absolute',
//       width: '100%',
//       height: '100%'
//     }}
//   />
// ) : null}
// <Mapir
//           accessToken={AppConfig.apiConfig.mapkey}
//           zoomLevel={13}
//           userTrackingMode={0}
//           centerCoordinate={[51.399863, 35.789938]}
//           showUserLocation={true}
//           style={{ flex: 1 }}
//           onUserLocationUpdate={(loc) => console.log(loc)}
//         >
//           <Mapir.Marker
//             id={'1'}
//             coordinate={[51.399863, 35.789938]}
//           ></Mapir.Marker>
//         </Mapir>
// <CedarMaps
// onPress={this.onPress}
// showUserLocation
// clientId={'cruise-9753209486483433839'}
// clientSecret={
//   'bnIRxGNydWlzZb8f5WcZPqRBQLR5E8HLAPukJaRzLxz8UAgXp30Sgq7P'
// }
// mapStyle={'style://streets-light'}
// zoomLevel={15}
// centerCoordinate={[51.4093, 35.7546]}
// style={{ flex: 1 }}
// >
// <Mapbox.ShapeSource
//   id="symbolLocationSource"
//   hitbox={{ width: 70, height: 70 }}
//   onPress={this.onSourceLayerPress}
//   shape={this.state.featureCollection}
// >
//   <Mapbox.SymbolLayer
//     id="symbolLocationSymbols"
//     minZoomLevel={1}
//     style={styles.icon}
//   />
// </Mapbox.ShapeSource>
// <Mapbox.PointAnnotation id={'1'} coordinate={this.state.coords} />
// </CedarMaps>

{
  /* <MapView
          ref={(refs) => (this.map = refs)}
          style={{ flex: 1, width: '100%' }}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.business.map((item) =>
            item.lat ? (
              <MapView.Marker
                onPress={(e) => this.onMarkerPress(e, item)}
                coordinate={{ latitude: +item.lat, longitude: +item.long }}
              >
                <ShopMarker
                  uri={item.images && item.images.logo && item.images.logo.path}
                  showDetail={this.state.showDetail}
                />
              </MapView.Marker>
            ) : null
          )}

          <MapView.Marker
            coordinate={this.state.userPlace}
            ref={(ref) => (this.userPlace = ref)}
            anchor={{ x: 0.15, y: this.state.marginBottom }}
            rotation={180}
          >
            <UserMarker />
          </MapView.Marker>

          {this.state.showDetail ? (
            <MapView.Polyline
              coordinates={[
                {
                  latitude: +this.state.selectedMarker.lat + 0.01,
                  longitude: +this.state.selectedMarker.long
                },

                {
                  latitude: +this.state.selectedMarker.lat - 2,
                  longitude: this.state.region.longitude
                }
              ]}
              strokeColor={colors.lightBlue} // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={6}
            />
          ) : null}
        </MapView> */
}
