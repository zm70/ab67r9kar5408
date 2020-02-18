/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { NotFound } from 'AppComponentShared';
import EStylesSheet from 'react-native-extended-stylesheet';
import { TextBold, Icon } from 'AppFonts';
import strings from 'src/res/strings.json';
import TopTabbar from '../layout/toptabbar';
import BusinessesList from '../../components/homeTab/shop/businessesList';
import { generalSearch } from "AppServices";
import { AnimationAux } from "AppAux";
import { pushSingleProduct, pushSingleBusiness } from "../shared/navigation";
import { Actions } from 'react-native-router-flux'

const WAITING_TYPE = 2000

class SearchDialog extends React.PureComponent {

    state = {
        searchResult: {},
        loading: false,
        searching: false,
        text: null
    }

    lastTimeSearch = 0;
    typingTimer = 0;

    renderSearchItem = (item) => (
        <TouchableOpacity key={item.id} style={{ padding: 10 }}
            onPress={() => {
                Actions.pop()
                //item is a product or business
                if (item.price || item.product_key) {
                    pushSingleProduct(item)
                } else {
                    pushSingleBusiness(item)
                }
            }}>
            <TextBold>{item.title || item.name}</TextBold>
            <View style={{ width: '100%', height: 1, backgroundColor: '#ddd' }} />
        </TouchableOpacity>
    )

    searchingBusiness = (text) => {
        if(text === '' ){
            return
        }
        this.typingTimer = Date.now()
        this.setState({ text })

        if (!this.state.loading ) {
            this.setState({ loading: true })
        }
        setTimeout(async () => {
            if (Date.now() - this.typingTimer > WAITING_TYPE / 2) {
                if (!this.state.searching) {
                    try {
                        this.setState({ searching: true })
                        const searchResult = await generalSearch(this.state.text)
                        this.setState({ loading: false, searching: false, searchResult })
                    } catch (err) {
                        console.log(err)
                        this.setState({ loading: false, searching: false,searchResult:{businesses:[],products:[]} })
                    }
                }
            }
        }, WAITING_TYPE)
    }

    checkAnyFound = () => {
        if (this.checkDoSearched()) {
            return this.state.searchResult.businesses.length > 0 || this.state.searchResult.products.length > 0
        }
        return false
    }

    checkDoSearched = () => (
        this.state.searchResult.businesses || this.state.searchResult.products
    )


    render() {
        return (
            <View style={{
                position: 'absolute', flex: 1, width: '100%',
                height: '100%'
            }}>

                <TopTabbar
                    searchingBusiness={this.searchingBusiness}
                    placeholder={strings.filterHolder}
                />

                <TouchableOpacity
                    onPress={Actions.pop}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', alignItems: 'center' }} >
                    <AnimationAux loading={this.state.loading} >
                        {!this.checkDoSearched() ? null
                            : this.checkAnyFound() ?
                                <ScrollView style={{ width: '100%', padding: 10, backgroundColor: '#fff' }} >
                                    {this.state.searchResult.businesses.length > 0
                                        ? <TextBold color="costGray" textStyle={{ textAlign: 'right' }}>
                                            {strings.businesses}
                                        </TextBold> : null}
                                    {this.state.searchResult.businesses.map(this.renderSearchItem)}

                                    {this.state.searchResult.products.length > 0
                                        ? <TextBold color="costGray" textStyle={{ textAlign: 'right' }}>
                                            {strings.products}
                                        </TextBold> : null}
                                    {this.state.searchResult.products.map(this.renderSearchItem)}


                                </ScrollView>
                                : <View style={{ width: '100%', padding: 10, backgroundColor: '#fff', alignItems: 'center' }} >
                                    <NotFound msg={strings.searchNotFound} />

                                </View>
                        }
                    </AnimationAux>
                </TouchableOpacity>

            </View>
        )
    }
};

export default SearchDialog;
