import React, { Component } from 'react';
import ErrorBoun from '../assets/icons/errorboun.svg';
import { Link } from 'react-router-dom';

class ErrorBoundries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {

        if (this.state.hasError) {
            return (
                <section><div className="error404"><img src={ErrorBoun} /></div>
                    <Link to="./"><button className="errorbuttom">Return Home</button></Link></section>
            )
        }
        return this.props.children;
    }

}

export default ErrorBoundries