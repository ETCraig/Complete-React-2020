import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_zyYiLZ7YPabozfiUTIOOsOnf004qHzqDwC';

    const onToken = token => {
        alert('Payment Successful!');
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onTokenF}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;