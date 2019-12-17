import React from 'react';
import {
    HeaderContainer,
    LogoContainer,
    OptionContainer,
    OptionLink,
    OptionButton
} from './header.styles';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    <OptionButton as="div" onClick={signOutStart}>
                        SIGN OUT
                    </OptionButton>
                    :
                    <OptionLink to='/signIn'>
                        SIGN IN
                    </OptionLink>
            }
            <CartIcon />
        </OptionContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);