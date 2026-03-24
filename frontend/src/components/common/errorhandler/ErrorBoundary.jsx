import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './Common.module.css';

/**
 * Error Boundary — catches unexpected React crashes
 * Displays friendly error UI with reload option
 * Must be a class component (React requirement)
 * @param {React.ReactNode} children Wrapped app content
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorBoundaryContent}>
            <FontAwesomeIcon
              icon={faRocket}
              className={styles.errorBoundaryIcon}
              size="3x"
            />
            <h2 className={styles.errorBoundaryTitle}>
              Houston, we have a problem
            </h2>
            <p className={styles.errorBoundaryMessage}>
              Something crashed unexpectedly.
            </p>
            <button
              className={styles.primaryBtn}
              onClick={() => window.location.reload()}
            >
              <FontAwesomeIcon icon={faRotate} size="sm" />
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