import React, { Component } from 'react';
import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from './error-boundary.styles';

class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            errorThrown: false
        }
    }

    static getDerivedStateFromError(error) {
        return { errorThrown: true }
    }

    componentDidCatch(error, info) {
        console.log(`Error: ${error}`);
    }

    render() {
        if (this.state.errorThrown) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
                    <ErrorImageText>Sorry This Page Is Broken.</ErrorImageText>
                </ErrorImageOverlay>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;