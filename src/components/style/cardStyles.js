import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import EStylesheet from 'react-native-extended-stylesheet';
import constants from 'src/res/constants.json';
import { smallIconW, productContainerW } from '../shared/dimen';

const { width } = Dimensions.get('window');

const mainStyles = EStylesheet.create({
  inputLabelInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0,
    width: '100%'
  },
  editableLarge: {
    alignSelf: 'flex-start',
    width: 0.75 * width,
    textAlignVertical: 'top',
    padding: 5,
    paddingBottom: 0,
    marginTop: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '$colorChatGray'
  },
  editable: {
    alignSelf: 'flex-start',
    
    textAlignVertical: 'top',
    padding: 5,
    paddingBottom: 0,
    marginTop: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '$colorChatGray'
  },
  horizontalDivider: {
    height: '70%',
    backgroundColor: '$colorChatGray',
    width: 1
  },
  costWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '$colorChatGray',
    padding: 5
  },
  snapShotContainer: {
    backgroundColor: '#fff',

    padding: 10,
    borderTopLeftRadius: constants.cardDoubleRadius,
    borderTopRightRadius: constants.cardDoubleRadius
  },
  absoluteSnapShot: {
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  snapShotWrapper: {
    borderRadius: constants.cardDoubleRadius,
    padding: 5,
    alignItems: 'center'
  },
  userCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  myBusinessTopWrapper: {
    borderTopRightRadius: constants.cardDoubleRadius,
    borderTopLeftRadius: constants.cardDoubleRadius,
    width: '100%',
    backgroundColor: '$colorGreen',
    padding: 5,
    textAlign: 'center',
    marginBottom: 5,
    color: '#fff'
  },
  myBusinessBottomWrapper: {
    borderBottomRightRadius: constants.cardDoubleRadius,
    borderBottomLeftRadius: constants.cardDoubleRadius,
    width: '100%',
    backgroundColor: '$colorPrimary',
    padding: 5,
    textAlign: 'center',
    marginTop: 5,
    color: '#fff'
  },
  myBusinessDeactive: {
    backgroundColor: '$colorMediuumLightGray'
  },
  myBusinessCardContainer: { backgroundColor: '$colorLightGray' },
  imageCardWrapper: {
    width: width * 0.8,
    aspectRatio: 2 / 1
  },
  imageCard: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  itemHeaderWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
    alignItems: 'flex-end'
  },
  itemShopTitle: {
    flex: 1,
    backgroundColor: '$colorLightGray',
    padding: constants.cardPadding,
    paddingRight: 0,
    borderTopLeftRadius: constants.cardRadius
  },
  imageOutsideWrapper: {
    alignItems: 'center',

    backgroundColor: '$colorLightGray',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  imageOutside: {
    marginBottom: 15
  },
  roundImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  itemDetailContainer: {
    marginTop: 5,
    borderBottomLeftRadius: constants.cardRadius,
    borderBottomRightRadius: constants.cardRadius,
    backgroundColor: '$colorLightGray',
    padding: 5
  },
  businessCardContainer: {
    margin: 10,

    width: width * 0.9,
    backgroundColor: '#fff'
  },
  smallBusinessCardContainer: {
    width: width * 0.8
  },
  businessFollow: {
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: '$colorChatGray'
  },
  businessNotFollow: {
    borderTopRightRadius: constants.cardDoubleRadius,
    borderBottomLeftRadius: constants.cardDoubleRadius
  },
  followBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  followBtns: {
    flexDirection: 'row',
    width: '100%',
    
    justifyContent: 'space-around'
  },
  nameDetailContainer: {
    width: 0,
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  moreDetailContainer: {
    alignSelf: 'flex-end'
  },
  cardInfoWrapper: {
    width: '100%',
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  businessImg: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35
  },
  businessImgWrapper: {
    padding: 1, //4
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'gray'
  },
  businessDetail: {
    // flexDirection: 'row'
  },
  ratingContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    padding: 10
  },
  bigFollowBtn: {
    padding: 5,
    borderBottomLeftRadius: 35,
    width: '100%',
    backgroundColor: '$colorPrimary'
  },
  smallFollowBtn: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '$colorPrimary',
    textAlign: 'center',
    color: '#fff'
  },

  productContainer: {
    width: productContainerW,
    margin: 10
  },
  recommendedContainer: {
    width: width * 0.8,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatContainer: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  recommendedDetail: {
    width: 0,
    flexGrow: 1,
    alignItems: 'flex-end',
    margin: 2
  },
  chatHeader: {
    width,
    backgroundColor: '#fff',
    padding: 5
  },

  smallIcon: {
    width: smallIconW,
    height: smallIconW,
    borderRadius: constants.mediumRadius,
    backgroundColor: '#fff',
    margin: width / 25,
    marginBottom: 5
  },
  smallNewsIcon: {
    width: 100,
    height: 60,
    borderRadius: constants.mediumRadius
  },
  specialOffer: {
    width: width * 0.9,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    borderRadius: constants.cardRadius
  },
  smallIconContainer: {
    borderRadius: 10,
    backgroundColor: '$colorLightGray',
    alignSelf: 'center'
  },
  smallIconWrapper: {
    borderRadius: 20,
    backgroundColor: '$colorLightGray'
  },
  productDetailHeader: {
    width: '100%',
    borderTopLeftRadius: constants.cardDoubleRadius,
    borderTopRightRadius: constants.cardDoubleRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '$colorLightGray',
    padding: constants.cardPadding / 2,
    marginBottom: 5
  },
  productFullContainer: {
    flex: 1,
    width: '100%'
  },
  selectedDotStyle: { backgroundColor: '$colorPrimary' },
  deselectedDotStyle: { backgroundColor: '$colorLightGray' },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '$colorLightBlue',
    padding: constants.cardPadding,
    paddingLeft: constants.cardDoublePadding,
    paddingRight: constants.cardDoublePadding
  },
  detailItemContainer: {
    width: '100%',
    backgroundColor: '$colorLightGray',
    padding: constants.cardPadding,
    paddingLeft: constants.cardDoublePadding,
    paddingRight: constants.cardDoublePadding,
    marginBottom: 5
  },
  itemSelectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
  },
  commentWrapper: {
    flexDirection: 'row-reverse',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderRadius: constants.borderRadius,
    padding: constants.cardPadding / 2
  },
  feedbackWrap: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  seeall: {
    margin: 10,
    marginTop: 0,
    textAlign: 'left'
  },

  searchInput: {
    flex: 1,
    padding: 0,
    paddingLeft: constants.smallPadding,
    paddingRight: constants.smallPadding
  },

  icons: {
    fontSize: RFValue(20)
  },
  bigIcons: {
    fontSize: RFValue(25)
  }
});

export default mainStyles;
