import React, { memo } from 'react';
import {
    CartItemContainer,
    ItemDetailsContainer,
    CartItemImage
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt="Item" />
        <ItemDetailsContainer>
            <span className="price">{name}</span>
            <span className="price">
                {quantity} x {price}
            </span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default memo(CartItem);