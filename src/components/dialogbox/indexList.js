import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropsTypes, { string } from 'prop-types';
import { ButtonBold, TextBold } from 'AppFonts';
import { mainStyles } from 'app-styles';
import * as stringKeys from '../shared/navigationKeys'

import Dialog, {

  DialogContent,
  SlideAnimation
} from 'react-native-popup-dialog';
import colors from 'src/res/colors.json';
import strings from 'src/res/strings.json';
import styles from './style';


class DialogBoxList extends React.Component {
  state = {
    dialogType: '',
    loadingThen: false,
    visible: false,
    msg: '',
    goToOrderingPage: false
  };

  componentDidMount() {
    this.setState({ visible: true });

  }

  exitDialogbox = () => {
    this.setState({ visible: false });
    // if (this.props.dialogType !== 'loading') this.setState({ visible: false });
  };

  onDismiss = () => {
    // if (!this.state.loadingThen) {
    Actions.pop();
    // }
    this.props.popCallback && this.props.popCallback();
    this.state.goToOrderingPage && Actions.jump('tabCart');
  };

  renderList = ({ index, item }) => {
    if (this.props.dialogType == stringKeys.DETAILS) {
      return this.renderDetailList(item)
    } else if (this.props.dialogType == stringKeys.FOLLOWERS) {
      return this.renderFollowersList(item)
    }


  }

  renderDetailList = (item) => {
    if(!item.value){
      return null
    }
    if (item.label == "title") {
      return <TextBold fontSize="size8" >{item.value}</TextBold>
    }
    return (<Text>
      <TextBold fontSize="size5" color="chatGray" textStyle={{ textAlign: 'right' }}>{strings[item.label]} : </TextBold>
      <TextBold fontSize="size7" textStyle={{ textAlign: 'right' }}>{item.value}</TextBold>
    </Text>)
  }
  
  renderFollowersList = (item) => (
    <View>
      <TextBold fontSize="size7" >{item.fname} {item.lname}</TextBold>
      <View style={{ width: '100%', height: 1, backgroundColor: '#ddd' }} />
    </View>
  )

  render() {
    const { data, stillVisible = true } = this.props;


    return (
      <Dialog
      animationDuration={100}
        dialogStyle={styles.commonDialogWrapper}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        onDismiss={this.onDismiss}
        visible={this.state.visible && stillVisible}
        onTouchOutside={this.exitDialogbox}
        onHardwareBackPress={() => {
          this.exitDialogbox();
          return true;
        }}

      >
        <DialogContent style={[styles.simpleListWrapper]}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={this.renderList}
            extraData={this.state}
            contentContainerStyle={mainStyles.horizontalScrollContainer}
          />
        </DialogContent>

      </Dialog>
    );
  }
}

export default DialogBoxList;
