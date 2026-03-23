import { Component } from "react";
import './ErrorBoundary.css';

class ErrorBoundary extends Component{
  constructor(props){
    super(props)
    this.state = { hasError: false, error: null};
  }

  static getDerivedStateFormError(error){
    return { hasError: true, error};
  }

  componentDidCatch(error, info){
    console.error('Error Boundary :', error, info);
  }

  render(){
    if(this.state.hasError){
      return(
        <div className="error-boundary">
          <div className="error-boundary_content">
            <span className="error-boundary_icon">🚀</span>
            <h2 className="error-boundary_title">
              Houston, we have a problem
            </h2>
            <p className="error-boundary_message">
              Something crashed unexpectedly.
            </p>
            <button
              className="error-boundary_btn"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;