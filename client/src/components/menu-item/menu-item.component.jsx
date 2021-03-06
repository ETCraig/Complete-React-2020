import React from 'react';
import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
} from './menu-item.styles';
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
    <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImageContainer className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
        <ContentContainer className="content">
            <ContentTitle>{title.toUpperCase()}</ContentTitle>
            <ContentSubtitle>Shop Now</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
);

export default withRouter(MenuItem);