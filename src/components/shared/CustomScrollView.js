import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const MIN_VEL = 0.1;

export const CustomScrollView = ({
    children,
    onScrollUp = () => { },
    onScrollDown = () => { },
    hideTopTabbar = null,
    ...props
}) => {

    let offset = 0;
    let counter = 0;
    let couldChange = true;
    return (<ScrollView

        refreshControl={
            <RefreshControl
                refreshing={false}
                onRefresh={props.onRefresh}
            />
        }
        // onScroll={({ nativeEvent }) => {
        //     const currentY = nativeEvent.contentOffset.y;
        //     console.log(currentY, offset, nativeEvent.velocity.y)
        //     if (!couldChange) {
        //         return
        //     }
        //     if (nativeEvent.velocity.y < MIN_VEL && Math.abs(currentY - offset) > 50) {
        //         return
        //     }
        //     if (currentY < 8 && hideTopTabbar) {
        //         hideTopTabbar && onScrollUp();

        //     } else {
        //         if (Math.abs(currentY - offset) > 10) {
        //             if (offset > currentY) {
        //                 hideTopTabbar && onScrollUp()

        //             } else {
        //                 !hideTopTabbar && onScrollDown()
        //             }

        //         }
        //     }

        //     offset = currentY
        //     couldChange = false;
        //     setTimeout(() => {
        //         couldChange = true
        //     }, 200)
        //     // if (
        //     //     this.state.scrollHeight &&
        //     //     this.state.scrollHeight -
        //     //     this.state.visibleHeight -
        //     //     nativeEvent.contentOffset.y <
        //     //     50
        //     // ) {
        //     //     // this.setState((prevState) => ({
        //     //     //   loadIndex: prevState.loadIndex + 1
        //     //     // }));
        //     // }
        // }}
        {...props}>
        {children}
    </ScrollView>)
};
