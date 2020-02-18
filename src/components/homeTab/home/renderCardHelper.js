/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from "react";
import {
    CardsWrapper,
    CarouselImage,
    SpecialOffer,
    TopCard, ProductCard, RecommendedCard, SmallIconCard, NewsCard
} from "AppComponentShared";
import { mainStyles, cardStyles } from 'app-styles';
import {
    pushBusinessList,
    pushProductList,
    pushSingleBusiness,
    pushSingleProduct
} from '../../shared/navigation';



import { ScrollView, Dimensions, FlatList, View, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { pageW, productContainerW, smallIconW } from '../../shared/dimen';
// import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window');



const renderCards = ({ index, item }) => ({
    tops: (
        <TopCard
            containerStyle={[cardStyles.smallBusinessCardContainer, { margin: 0 }]}
            {...item.item}
            onFollowCB={item.onFollowCB}
        />
    ),
    followedProduct: (
        <ProductCard {...item} onItemPress={() => pushSingleProduct(item)} />
    ),
    recommended: (
        <RecommendedCard {...item} onItemPress={() => pushSingleBusiness(item)} />
    ),
    icon: <SmallIconCard {...item} onPress={() => pushSingleBusiness(item)} />,
    icon2: <SmallIconCard {...item} imageContainer={mainStyles.backGray} onPress={() => pushSingleBusiness(item)} />,

    news: (
        <NewsCard
            title={item.title}
            uri={{ uri: item.uri }}
            content={item.content}
        />
    )
});



const createFlatList = (horizontal, data, numColumns, renderIndex, state) => {

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            horizontal={horizontal}
            numColumns={numColumns}
            renderItem={(items) => renderCards(items)[renderIndex]}
            extraData={state}
            contentContainerStyle={mainStyles.horizontalScrollContainer}
        />
    );
};

export const renderWholeCards = (section, index, state, onFollowCB) => {
    if (
        state.loadIndex < index ||
        !section.items ||
        section.items.length === 0
    ) {
        return null;
    }
    let sectionView;
    let childIndex;
    let parentIndex;
    let containerStyle;

    switch (section.key) {
        case 'selections':
            containerStyle = mainStyles.backGray;
            sectionView = (
                <CarouselImage
                    key={section.key + index}
                    businesses={{ items: section.items, renderIndex: section.key }}

                />
            );
            // parentIndex = ;
            // childIndex = ;
            break;
        case 'recommended':
            containerStyle = mainStyles.backGray;
            sectionView = (
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {createFlatList(true, section.items, 3, section.key, state)}
                </ScrollView>
            );
            break;

        case 'special':
            containerStyle = mainStyles.cardWrapper;
            sectionView = (
                <SpecialOffer uri={{ uri: section.uri }} key={section.key + index} />
            );
            break;
        default:
            let itemWidth = smallIconW * 1.25;
            let sliderWidth = width;
            let items = section.items
            let firstItem =  Math.floor(section.items.length / 2)
            console.log(firstItem)
            if (section.key === 'followedProduct') {

                items = section.items.selectedItems
                itemWidth = productContainerW * 1.1;

                containerStyle = mainStyles.cardWrapper;
            } else if ((section.key === 'icon') || section.key === 'news'
            ) {
                sliderWidth = width - 30;

                // containerStyle = cardStyles.smallIconContainer
                containerStyle = [
                    mainStyles.backGray,
                    { borderRadius: 20, margin: 15 }
                ];

            } else if (section.key === 'icon2') {
                sliderWidth = width - 30;
                containerStyle = { margin: 15 };
            } else if (section.key === 'tops') {
                itemWidth = 0.8 * width
                containerStyle = mainStyles.backGray;
            }
            sectionView = (
                <Carousel
                    firstItem={firstItem}
                    data={items}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    renderItem={(item) => renderCards(item)[section.key]}
                />

            );
    }
    

    return (
        <CardsWrapper
            key={section.key + index}
            title={section.title}
            containerStyle={containerStyle}
            onSeeAllPress={() => {
                if (section.key === 'followedProduct') {
                    alert(4);
                    pushProductList(section.items.wholeItems)
                } else {
                    pushBusinessList(section.items)
                }
            }}
        >
            {sectionView}
        </CardsWrapper>
    );
};
//  {<Carousel
// data={items}
// sliderWidth={sliderWidth}
// itemWidth={itemWidth}
// loop
// renderItem={(item) => renderCards(item)[section.key]}
//  /> }