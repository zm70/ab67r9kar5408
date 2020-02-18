import React from 'react';
import { View, Linking, FlatList, RefreshControl, LayoutAnimation } from 'react-native';
import { TextBold, ButtonBold, Icon } from 'AppFonts';
import { AnimationAux, RetryAux } from 'AppAux';
import {
  getMyBusiness,
  getCategories,
  deleteBusiness
} from 'AppServices';
import { Actions } from 'react-native-router-flux';
import { setupMyBusiness, addNewToMyBusiness } from "AppRedux";
import strings from 'src/res/strings.json';
import colors from 'src/res/colors.json';
import { MyJobCard } from './createdBusinessCard';
import { connect } from "react-redux";
import { mainStyles } from 'app-styles';
import CreateBusinessWrapper from './createBusinessWrapper';
import { defaultBusiness } from '../../../models/business';
import { pushEditBusiness, successUpdateDialog, pushErrorDialog, errorUpdateDialog } from '../../shared/navigation';
import { androidSimpleAnimation } from "../../shared/helperFunc";


androidSimpleAnimation();

class MyBusiness extends React.Component {
  state = {
    loading: false,
    createNewBusiness: false,
    structuredCategory: []
  };

  startCreatingBusiness = () => {
    this.fetchCategorires();

    this.setState({ loading: true, createNewBusiness: true });
  };

  onDelete = (business_key) => {
    Actions.dialogbox({
      dialogType: 'confirm',
      msg: strings.confirmDeleteBusiness,
      onConfirm: () => this.onDeleteConfirm(business_key),
      // loadingThen: true
    });
  };

  onDeleteConfirm = (business_key) => {
    // Actions.refresh({ dialogType: 'loading', msg: '', loadingThen: false });
    deleteBusiness(business_key)
      .then((res) => {
        LayoutAnimation.linear();

        const mBusiness = this.props.mBusiness.filter(business => business.business_key !== business_key);

        this.props.setupMyBusiness(mBusiness);
        // this.setState({ mBusiness })

        // successUpdateDialog(strings.successDeleteBusiness);
      })
      .catch((err) => {
        pushErrorDialog(err)
      });
  };

  renderCreatedJob = ({ item, index }) => {
    return (
      <MyJobCard
        {...item}
        onDelete={() => this.onDelete(item.business_key)}
        onManage={() => pushEditBusiness(item)}
      />
    );
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({ loading: true });
    this.fetchMyBusiness();
  }

  componentWillUnmount() { }

  retryRequest = () => {
    if (this.state.createNewBusiness) {
    } else {
      this.fetchMyBusiness();
    }
  };



  fetchCategorires = async () => {
    try {
      const structuredCategory = await getCategories();

      this.setState({ structuredCategory, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  fetchMyBusiness = () => {
    this.setState({ loading: true })
    getMyBusiness()
      .then(({ data }) => {
        if (data.data) {
          this.props.setupMyBusiness(data.data);
          this.setState({

            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  addNewBusinessToList = (business) => {
    LayoutAnimation.linear();
    this.props.addNewToMyBusiness([business])
    // this.setState(prevState => ({ mBusiness: [business, ...prevState.mBusiness] }), () => console.log(this.state.mBusiness))
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AnimationAux loading={this.state.loading}>
          {this.state.createNewBusiness ? (
            <CreateBusinessWrapper
              addNewBusinessToList={this.addNewBusinessToList}
              structuredCategory={this.state.structuredCategory}
              exitCreate={() => this.setState({ createNewBusiness: false })}
            />
          ) : (
              <>
                {this.props.mBusiness.length > 0 ? (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={this.fetchMyBusiness}
                      />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    data={this.props.mBusiness}
                    renderItem={this.renderCreatedJob}
                    contentContainerStyle={{ flexGrow: 1 }}
                  />
                ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        marginBottom: 30,
                        flex: 0
                      }}
                    >
                      <Icon name="nothing_abrika" size={100} color={colors.blue} />

                      <TextBold fontSize="size9" color="blue">
                        {strings.noBusinessYet}
                      </TextBold>
                    </View>
                  )}

                <ButtonBold
                  containerStyle={[
                    mainStyles.nextButton,
                    { width: '70%', alignSelf: 'center', marginTop: 10 }
                  ]}
                  textStyle={{ marginBottom: 3 }}
                  onPress={this.startCreatingBusiness}
                  color="white"
                  fontSize="size8"
                >
                  {strings.createNewBusiness}
                </ButtonBold>
                <TextBold
                  fontSize="size7"
                  weight="light"
                  textStyle={{ textAlign: 'center' }}
                >
                  {strings.touchToCreate}
                </TextBold>
              </>
            )}
        </AnimationAux>
      </View>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    mBusiness: state.shop.mBusiness
  };
};

const dispatchStateToProps = (dispath) => {
  return {
    setupMyBusiness: (mBusiness) => dispath(setupMyBusiness(mBusiness)),
    addNewToMyBusiness: (mBusiness) => dispath(addNewToMyBusiness(mBusiness)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(MyBusiness);
