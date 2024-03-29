import { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoun from '../assets/icons/errorboun.svg';

class ErrorBoundries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="sectionClass">
          <div className="error404"><img src={ErrorBoun} /></div>
          <h5>Oops I'm sorry! Something went wrong.</h5>
          <Link to="./"><button className="errorbuttom">Return Home</button></Link>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundries;
