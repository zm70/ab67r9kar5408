import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { mainStyles, cardStyles } from 'app-styles';
import { Actions } from "react-native-router-flux";
import { getPageSingleBusiness } from "AppServices";
import { ShopScanCard, CustomTouchable } from 'AppComponentShared';
import { startLoadingDialog, errorUpdateDialog } from "../../shared/navigation";
import qrcode from '../../../assets/images/qrscan.png';

class BarcodePage extends React.Component {
  state = {
    scanned: false,
    reload: false,
    business: {}
  };

  fetchBusiness = async (id, title) => {
    try {
      startLoadingDialog();
      const business = await getPageSingleBusiness(id, title)
      this.setState({
        scanned: true,
        business
      });
      Actions.refresh({ stillVisible: false })
    } catch (err) {
      errorUpdateDialog(err);
    }

  }

  onSuccess = (e) => {

    const regex = /text=.*&/
    let result = regex.exec(e.data)
    if (!result || result.length === 0) {
      this.resetScreen()
    }
    result = result[0]
    result = result.replace("text=", "")
    result = result.replace("&", "")
    const [id, title] = result.split("*")
    
    this.fetchBusiness(id, title)

  };

  handleOnMainViewPress = () => {
    if (this.state.scanned) {
      this.resetScreen()

    }
  }

  resetScreen = () => {
    this.setState({ reload: true, scanned: false }, () => {
      this.setState({ reload: false })
    })
  }

  render() {
    return (
      <View style={mainStyles.flex}>
        {/* {!this.state.reload ? ( */}
        <CustomTouchable
          onPress={this.handleOnMainViewPress}
          style={[mainStyles.flex]} >

          < QRCodeScanner
            onRead={this.onSuccess}
            showMarker={true}
            customMarker={() => (
              <Image
                source={qrcode}
                style={{ width: '50%' }}
                resizeMode="center"
              />
            )
            }
            bottomContent={
              this.state.scanned ? (

                <ShopScanCard
                  {...this.state.business}
                  containerStyle={[
                    { backgroundColor: 'rgba(0,0,0,0.4)' },
                    cardStyles.absoluteSnapShot
                  ]}

                />

              ) : null
            }
          />

        </CustomTouchable>
        {/* )
          : null
        } */}
      </View>
    );
  }
}
export default BarcodePage;
