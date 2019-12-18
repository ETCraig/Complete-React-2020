import React, { useState } from 'react';
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const { email, password } = credentials;

    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="password"
                    required
                />
                <ButtonsBarContainer>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton
                        type="button"
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        {' '}Sign In With Google{' '}
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);