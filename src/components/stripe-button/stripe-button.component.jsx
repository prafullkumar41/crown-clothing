import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price *100;
    const publishabeleKey = 'pk_test_51H54N7KYN8FBWn6ifvPqMdS0gnj28HvWn0VNw1lFSSnNETktPdJxrVKVg5WHgfr77JbcECBDc4j0X3XewU4zee8A006KeORYIf'
    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CROWN CLOTHING LTD...'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description ={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token = {onToken}
            stripeKey={publishabeleKey}     
        
        />
    )
}

export default StripeCheckoutButton;