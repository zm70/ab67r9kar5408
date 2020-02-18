import React from "react";
import businessListStore from "../../components/homeTab/follow/followMobx";
import { FollowBusiness } from 'AppComponent'
import { useSelector, useDispatch } from 'react-redux'
import { GET_RECOMMENDAR_CAT_ID_ARRAYS } from '../../redux/actions/actionType'

export const Tab1InternalTabs = props => {
    const dispatch = useDispatch();

    const catIdArrays = useSelector((state) => state.user.catIdArrays);
    // if (catIdArrays.length === 0) {
    //     dispatch({
    //         type: GET_RECOMMENDAR_CAT_ID_ARRAYS,
    //         catIdArray: -100
    //     })
    // }

    return <FollowBusiness store={businessListStore} catIdArrays={catIdArrays} />
}

