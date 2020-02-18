import { observable, toJS } from 'mobx';
import {
  listFollowBusiness,
  httpSuggestBusinesses,
  followBusinessById,
  panelSuggestBusinesses
} from 'AppServices';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import strings from 'src/res/strings.json';
import { productDefault } from '../../../models/followProducts';
import { showCaution } from '../../../redux/sagas/asyncKeys';
import { checkCautianMsg } from "../../shared/helperFunc";
import { onFollowCB } from "../../shared/serviceImpl";
import { successUpdateDialog, errorUpdateDialog } from "../../shared/navigation";

class ObservableFollows {
  @observable listFollowBusiness = [productDefault];
  @observable listSuggestBusiness = [productDefault];

  @observable followLoading = false;
  @observable suggestLoading = false;

  refreshing = () => {
    // this.followLoading = true;
    // this.suggestLoading = true;
    this.fetchSuggestBusinesses();
    this.fetchFollowBusiness();
  };

  fetchFollowBusiness() {
    this.followLoading = true;
    this.listFollowBusiness = [productDefault]
    listFollowBusiness()
      .then((listFollowBusiness) => {

        this.followLoading = false;
        if (listFollowBusiness) this.listFollowBusiness = listFollowBusiness;
      })
      .catch((err) => {
        this.followLoading = false;
        console.log(err);
      });
  }

  fetchSuggestBusinesses = (catIdArrays) => {
    this.suggestLoading = true;
    const categories = [...new Set(catIdArrays)];
    this.listSuggestBusiness = [productDefault];
    if (__DEV__)
      console.log(categories.join(','));

    panelSuggestBusinesses(categories.join(','))
      .then((listSuggestBusiness) => {
        this.suggestLoading = false;

        if (listSuggestBusiness) this.listSuggestBusiness = listSuggestBusiness;
      })
      .catch((err) => {
        this.suggestLoading = false;
        console.log(err);
      });
  };

  // fetchSuggestBusinesses(id) {
  //   this.suggestLoading = true;
  //   httpSuggestBusinesses(id)
  //     .then((listSuggestBusiness) => {
  //       this.suggestLoading = false;
  //       if (listSuggestBusiness) this.listSuggestBusiness = listSuggestBusiness;
  //     })
  //     .catch((err) => {
  //       this.suggestLoading = false;
  //       console.log(err);
  //     });
  // }

  // followBusiness = async (showCautionAgain, id, bId) => {
  //   const showCautionAgainStorage =
  //     showCautionAgain || (await AsyncStorage.getItem(showCaution));

  //   if (showCautionAgainStorage === 'notshow') {
  //     this.followCB(false, id, bId);
  //   } else {
  //     Actions.dialogbox({
  //       visible: true,
  //       dialogType: 'warning',
  //       onConfirm: (setShowCaution) => this.followCB(setShowCaution, id, bId)
  //     });
  //   }
  // };

  

  followCB = async (showCautionAgain, body) => {

    try {
      const res = await onFollowCB(showCautionAgain, body)
      if (res) {

        const followedIndex = this.listSuggestBusiness.findIndex(
          (item) => item.id === body.bId

        );
        if (followedIndex > -1) {
          const newFollowedBusiness = this.listSuggestBusiness.splice(
            followedIndex,
            1
          );

          this.listFollowBusiness.push(newFollowedBusiness[0]);
        }
      }

    } catch (err) {
      errorUpdateDialog(err)
      console.log(err)
    }
  };


}

const ObservableFollowsStore = new ObservableFollows();

export default ObservableFollowsStore;
