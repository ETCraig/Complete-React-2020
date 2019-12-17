import React, { useState } from 'react';
import './sign-in.styles.scss';

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
        <div className="sign-in">
            <h2>I already have an account</h2>
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
                <div className="button">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton
                        type="button"
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        {' '}Sign In With Google{' '}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);