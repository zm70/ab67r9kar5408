import React from 'react';
import { Dimensions, View } from 'react-native';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
  Bubble,
  MessageText,
  Time,
  MessageImage,
  Day
} from 'custom-react-native-gifted-chat';
import moment from 'moment-jalaali'

import { RetryAux, AnimationAux } from "AppAux";
import { addTicketToList } from "AppRedux";
import { ButtonBold, TextBold, fontStyles } from 'AppFonts';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { dateToEnglishConverter,jsCoreDateCreator } from 'AppUtils'
import { getTicketById, replyTicket, createTicket, getCustomerTicket } from 'AppServices';
const { width } = Dimensions.get('window');
const styles = EStyleSheet.create({
  sendButton: {
    backgroundColor: '$colorPrimary',
    borderRadius: 50,
    padding: 0,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10
  },
  textInput: {
    flex: 1,
    padding: 5,
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: '#adafb1',
    borderWidth: 1,

    fontWeight: 'normal'
  },
  imageMessage: { width: width * 0.7, aspectRatio: 1 / 1 },
  iconClip: { color: '$colorPrimary', margin: 10, fontSize: 25 },
  dayContainer: {},
  dayText: {
    backgroundColor: '$colorLightGray',
    borderRadius: 20,
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,

    borderColor: '#939598',
    textAlign: 'center'
  }
});

class Chatting extends React.Component {
  state = {
    messages: [],
    // isCreater: true,
    // title: '',
    category: '',
    created_at: '',
    priority: '',
    status: '',
    anotherSide: '',
    loading: false,
    ticketLoadedOrNotExist: false
  };

  formateDate = (date) => {
    if (date.includes('پیش')) {
      let minusDate;
      if (date.includes('ثانیه')) {
        minusDate = +date.split(' ')[0] * 1000;
      }
      if (date.includes('دقیقه')) {
        minusDate = +date.split(' ')[0] * 1000 * 60;
      }
      if (date.includes('ساعت')) {
        minusDate = +date.split(' ')[0] * 1000 * 60 * 60;
      }
      if (date.includes('روز')) {
        minusDate = +date.split(' ')[0] * 1000 * 60 * 60 * 24;
      }
      const a = new Date(Date.now() - minusDate);
      const formatedDate = a instanceof Date ? a : new Date();
      return formatedDate;
    }
    return date;
  };

  formatMassage = (_id, createdAt, text, user, formattedDate) => ({
    _id,
    sent: true,
    createdAt: formattedDate || this.formateDate(createdAt),
    text,
    user
  });

  formatWholeMessageData = (rawMessages) => {
    // console.log(rawMessages)
    // const fullName = `${this.props.user.fname} ${this.props.user.lname}`;
    // console.log(fullName)
    // const convertedToEn = moment(rawMessages.created_at, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss')
    // const convertedString = dateToEnglishConverter(convertedToEn)

    // const convertedDate = new Date(convertedString)

    const fullName = `${this.props.user.fname} ${this.props.user.lname}`;
   
    const convertedToEn = moment(rawMessages.created_at, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss')
    const convertedString = dateToEnglishConverter(convertedToEn)
    console.log(convertedString,'hererer2')
    const convertedDate = jsCoreDateCreator(convertedString)

    const messages = [this.formatMassage(
      -10,
      rawMessages.created_at,
      rawMessages.message, {
      _id: fullName === rawMessages.creator ? 1 : 2,
      name: rawMessages.creator,
      avatar: ''
    },
      convertedDate)];
    // const messages = [
    //   this.formatMassage(-1, rawMessages.created_at, rawMessages.message, {
    //     _id: fullName === rawMessages.creator ? 1 : 2,
    //     name: rawMessages.creator,
    //     avatar: ''
    //   })
    // ];

    const comments =
      (rawMessages.comments &&
        rawMessages.comments.map((msg, index) =>
          this.formatMassage(index, msg.updated_at, msg.comment, {
            _id: fullName === msg.name ? 1 : 2,
            name: msg.name,
            avatar: ''
          })
        )) ||
      [];

    messages.push(...comments);
    console.log(messages);

    this.setState({

      messages: messages.reverse(),
      // title: rawMessages.business_receiver && rawMessages.business_receiver[1],
      // category: rawMessages.category,
      created_at: rawMessages.created_at,
      priority: rawMessages.priority,
      status: rawMessages.status,
      anotherSide:
        rawMessages.creator === fullName
          ? rawMessages.user_receiver
          : rawMessages.creator
      // isCreater: rawMessages.creator === fullName
    });
  }

  fetchTicketById = async (ticketID) => {
    // console.log(this.props.bId);
    this.setState({ loading: true })
    try {
      let rawMessages = await getTicketById(ticketID)
      console.log(rawMessages)
      //find a way to create ticket if not exist maybe this is not the way
      if (rawMessages.status_code === 422) {

      } else {
        this.formatWholeMessageData(rawMessages.data)
      }
      this.setState({ loading: false, ticketLoadedOrNotExist: true })

    } catch (err) {


      this.setState({ loading: false })

    };
  };

  createNewTicket = async (message) => {
    try {
      const { data } = await createTicket({
        business_id: this.props.bId,
        message: message.text
      });

      this.props.addTicketToList([data.data])
      console.log(data)
      this.formatWholeMessageData(data.data)

    } catch (err) {
      console.log(err)
    }
  }

  findTicketFromList = (messages) => {
    // console.log(messages || this.props.ticketList);
    // console.log(this.props.bId)
    const wholeMessages = messages || this.props.ticketList
    const ticket = wholeMessages.findIndex(t => {
      if (t.business_receiver && t.business_receiver[0]) {
        return t.business_receiver[0] == this.props.bId
      }
      if (t.business_receiver) {
        return t.business_receiver == this.props.bId
      }
    })
    console.log(ticket, wholeMessages[ticket])
    // console.log(this.props.bId, ticket, wholeMessages, wholeMessages[ticket])
    if (ticket === -1) {
      return null;
    }
    return wholeMessages[ticket].id
  }

  fetchTickets = () => {
    this.setState({ loading: true });
    // getSellerTicket()
    getCustomerTicket()
      .then((messages) => {
        this.props.addTicketToList(messages);
        const ticketID = this.findTicketFromList(messages);
        if (!ticketID) {
          return this.setState({ loading: false });
        }

        this.setState({ loading: false, ticketID });
        this.fetchTicketById(ticketID);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {

    if (this.props.ticketList.length === 0) {

      this.fetchTickets()
    } else {
      let ticketID;

      if (this.props.bId) {
        ticketID = this.findTicketFromList(null);
      } else {
        ticketID = this.props.ticketID;
      }
      if (ticketID) {
        this.setState({ ticketID })
        console.log(ticketID)
        this.fetchTicketById(ticketID);
      }

    }
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      console.log(this.state.messages)
    });
  }

  imageSelect = async () => {
    ImagePicker.showImagePicker(
      { noData: true, mediaType: 'photo' },
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };

          const messages = {
            _id: 3,
            createdAt: new Date(),
            user: {
              _id: 1
            },
            received: true,
            image: response.uri
          };
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          console.log(source);
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages)
          }));
        }
      }
    );
  };

  render() {
    return (
      <AnimationAux
        loading={this.state.loading}
      >

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'flex-end', padding: 5 }}>
            <TextBold fontSize="size7">{this.state.anotherSide}</TextBold>
            {/* <TextBold fontSize="size7">{this.state.title}</TextBold> */}
          </View>
          <GiftedChat
            showUserAvatar={false}
            locale="fa"
            messages={this.state.messages}
            onSend={async (messages) => {
              if (this.state.ticketID) {
                this.onSend(messages);
                const res = await replyTicket(messages[0].text, this.state.ticketID);
                console.log(res)
              } else {
                this.createNewTicket(messages[0])
              }
            }}
            user={{
              _id: 1
            }}
            renderAvatar={() => { }}
            renderActions={(props) => (
              <ButtonBold
                iconName="clip"
                iconStyle={styles.iconClip}
                onPress={this.imageSelect}
              />
            )}
            renderMessageImage={(props) => (
              <MessageImage {...props} imageStyle={styles.imageMessage} />
            )}
            renderInputToolbar={(props) => (
              <InputToolbar {...props} containerStyle={{ padding: 5 }} />
            )}
            renderTime={(props) => (
              <Time
                {...props}
                textStyle={{
                  left: [fontStyles.light, { color: '#000' }],
                  right: [fontStyles.light, { color: '#fff' }]
                }}
              />
            )}
            renderComposer={(props) => (
              <Composer
                {...props}
                textInputStyle={[styles.textInput, fontStyles.medium]}
                placeholder=""
              />
            )}
            renderBubble={(props) => (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: { flexDirection: 'row' },
                  right: { flexDirection: 'row' }
                }}
              />
            )}
            renderSend={(props) => (
              <Send {...props} alwaysShowSend containerStyle={styles.sendButton}>
                <TextBold fontSize="size9" color="white">
                  ارسال
              </TextBold>
              </Send>
            )}
            renderDay={(props) => (
              <Day
                {...props}
                textStyle={[styles.dayText, fontStyles.medium]}
                containerStyle={styles.dayContainer}
              />
            )}
            renderMessageText={(props) => {
              return (
                <MessageText
                  {...props}
                  containerStyle={{
                    left: { maxWidth: width * 0.7 },
                    right: { maxWidth: width * 0.7 }
                  }}
                />
              );
            }}
          />
        </View>
      </AnimationAux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user.userInfo,
    ticketList: state.shop.ticketList
  };
};


const dispatchMapToProps = dispatch => {
  return {
    addTicketToList: (ticketList) => dispatch(addTicketToList(ticketList))
  }
}

export default connect(mapStateToProps, dispatchMapToProps)(Chatting);
