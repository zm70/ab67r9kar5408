import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { ChatCard, SimpleSearchbar } from 'AppComponentShared';
import { getSellerTicket, getCustomerTicket } from 'AppServices';
import { addTicketToList, setupTicketList } from "AppRedux";
import { connect } from 'react-redux'
import strings from 'src/res/strings.json';
import { AnimationAux, RetryAux } from 'AppAux';
import { Icon, TextBold } from 'AppFonts';
import { mainStyles } from 'app-styles';
import { pushChatPage } from '../../shared/navigation';

class ChatPage extends React.PureComponent {
  state = { loading: false, filteredTicket: [], loadingError: false };

  renderCards = ({ item, index }) => {

    return (
      <ChatCard
        fullName={this.state.fullName}
        key={item.id}
        item={item}
        onItemPress={() => pushChatPage(item.id)}
      />
    );
  }

  fetchTickets = () => {
    this.setState({ loading: true, loadingError: false });
    // getSellerTicket()
    
      getCustomerTicket()
        .then((messages) => {

          this.setState({ loading: false });
          if (this.props.ticketList.length === 0) {
          this.props.addTicketToList(messages)
        } else {
          this.props.setupTicketList(messages)

          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false, loadingError: true });
        });
    
  };

  filterMessage = (text) => {
    const filteredTicket = this.props.ticketList.filter(msg =>
      ((msg.creator && msg.creator.includes(text)) ||
        (msg.user_receiver && msg.user_receiver.includes(text))))
    this.setState({ filteredTicket })
  }

  componentDidMount() {

    if (this.props.ticketList.length === 0) {
      this.fetchTickets();
    }
    this.setState({
      fullName: `${this.props.user.fname} ${this.props.user.lname}`
    })
  }

  render() {
    return (
      <AnimationAux loading={this.state.loading}>
        <RetryAux
          dataLoaded={!this.state.loadingError}
          retry={this.fetchTickets}
        >


          <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#fff' }}>
            <SimpleSearchbar
              filterMessage={this.filterMessage}
              placeholder={strings.searchHolderChat}
              containerStyle={{ width: '90%', alignSelf: 'center',height:40,justifyContent:'center' }}
            />
            {this.props.ticketList.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      this.fetchTickets();
                    }}
                  />
                }
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: 'gray'
                    }}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.filteredTicket.length > 0 ? this.state.filteredTicket : this.props.ticketList}
                renderItem={this.renderCards}
                contentContainerStyle={[mainStyles.verticalScrollContainer, {}]}
              />

            ) : (

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >

                  <Icon name="notfound" iconColor="blue" iconSize="size13" />
                  <TextBold fontSize="size8" color="gray">
                    {strings.noTicket}
                  </TextBold>
                </View>
              )}
          </View>
        </RetryAux>
      </AnimationAux >
    );
  }
}

const mapToStateToProps = state => {
  return {
    user: state.user.userInfo,
    ticketList: state.shop.ticketList
  }
}

const dispatchMapToProps = dispatch => {
  return {
    addTicketToList: (ticketList) => dispatch(addTicketToList(ticketList)),
    setupTicketList: (ticketList) => dispatch(setupTicketList(ticketList)),
  }
}

export default connect(mapToStateToProps, dispatchMapToProps)(ChatPage);
