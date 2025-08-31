// src/ErrorBoundary.jsx
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }
  static getDerivedStateFromError(error){ return { hasError: true, error } }
  componentDidCatch(error, info){ this.setState({ info }) }

  render(){
    if (this.state.hasError){
      return (
        <div style={{
          padding: '16px',
          background: '#111827',
          color: 'white',
          minHeight: '100vh',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans'
        }}>
          <h1 style={{fontSize:'20px', fontWeight:700, marginBottom:'8px'}}>App error</h1>
          <div style={{whiteSpace:'pre-wrap', opacity:.9}}>
            {String(this.state.error)}
          </div>
          {this.state.info?.componentStack && (
            <pre style={{ marginTop:'12px', opacity:.75 }}>
{this.state.info.componentStack}
            </pre>
          )}
          <p style={{marginTop:'16px', opacity:.7}}>
            Tip: open DevTools → Console to see details.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
