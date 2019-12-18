import React, { useState } from 'react';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { signUpStart } from '../../redux/user/user.actions';

import { connect } from 'react-redux';

const SignUp = ({ signUpStart }) => {
    const [credentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = credentials;

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords Don't Match!");
            return
        }

        signUpStart({ displayName, email, password });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </SignUpContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: credentials => dispatch(signUpStart(credentials))
});

export default connect(null, mapDispatchToProps)(SignUp);