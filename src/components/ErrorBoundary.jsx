import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // You can also log this to a service like Sentry here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          background: '#1a1a1a', 
          color: '#fff', 
          height: '100vh', 
          overflow: 'auto',
          fontFamily: 'monospace',
          zIndex: 99999,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%'
        }}>
          <h2 style={{ color: '#ff4444' }}>CRASH DETECTED</h2>
          <h3 style={{ marginBottom: '10px' }}>{this.state.error && this.state.error.toString()}</h3>
          <details style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#aaa' }}>
            <summary>Stack Trace</summary>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;