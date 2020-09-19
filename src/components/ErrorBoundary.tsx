import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback: ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { hasError: boolean; error: any | null } = {
    hasError: false,
    error: null,
  }
  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error,
    }
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
