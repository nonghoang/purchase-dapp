import Radium from 'radium'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { SystemLayout } from 'decorators/Layout'
import Form from './Form'
import style from './style'

import AuthRequired from 'components/AuthRequired'

@connect(state => ({
  web3: state.session.web3,
  contract: state.session.contract
}))
@AuthRequired
@SystemLayout
@Radium
class Contract extends React.Component {
  constructor(props) {
    super(props)

    this._processDeposit = this._processDeposit.bind(this)
  }

  render() {
    return (
      <div style={style.wrapper}>
        <Helmet>
          <title>Contracts</title>
        </Helmet>
        <div style={style.signUp}>
          <Form onSubmit={this._processDeposit} />
        </div>
      </div>
    )
  }

  _processDeposit(data) {
    const { web3, contract } = this.props

    contract.sendMoney(data.address, data.shopId, data.amount, (err, result) => {
      if (err) {
        console.log('error', err)
      }
      console.log('Deposit success', result)
    })
  }
}

export default Contract
