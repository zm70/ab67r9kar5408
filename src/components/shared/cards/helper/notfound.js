import React from 'react';

import { TextBold, Icon } from "AppFonts";

const NotFound = ({ msg }) => {
    return (
        <>
            <Icon name="notfound" iconColor="blue" iconSize="size13" key="icon" />
            <TextBold fontSize="size8" color="gray" key="text">
                {msg}
            </TextBold>
        </>
    );
};

export default NotFound;
