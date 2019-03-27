import { connect } from 'react-redux'
import React, { Component } from 'react'

export default function connectWithStore(store, WrappedComponent, ...args) {
    let ConnectedWrappedComponent = connect(...args)(WrappedComponent)
    console.log("store" + store)
    return function (props) {
      return <ConnectedWrappedComponent {...props} store={store} />
    }
  }