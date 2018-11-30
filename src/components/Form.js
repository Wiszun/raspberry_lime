import React, { Component } from 'react'
import Loader from './generalUI/Loader'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../store/actions/authActions'
import { closeBackdrop } from '../store/actions/UIActions'

class Form extends Component {
  state = {
    login: '',
    password: '',
    authSuccessful: false,
    emailError: '',
    passwordError: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  authSuccessful = () => {
    this.setState({authSuccessful: true});
  }

  componentDidMount () {
   if(this.props.error) {
     this.props.clearErrors();
   }
  }

  formValidation = (login, password) => {
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(login)) {
      this.props.authenticate(login, password);
    } else {
      this.setState({emailError: true});
    }
  }

  submitForm = (e) => {
      let {login, password} = this.state;
      e.preventDefault();
      this.formValidation(login, password);
  }

    render () {
      if(this.state.authSuccessful) {
        this.props.closeBackdrop();
        return <Redirect to="/about/" />
      }
      let {email, password, emailError} = this.state;
      let {message, status} = this.props;
      let emailErrorResult = null;
      if(emailError) (
        emailErrorResult = <p className="erorrMessage">Invalid E-mail format</p>
      );
      let formContent = (
        <React.Fragment>
        <h1>Are you a Raspberry Knight?</h1>
          <form action="">
            <input
              type="email"
              name="email"
              id="login"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            {emailErrorResult}
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Log in"
              name="submit"
              className="button purpleButton"
              onClick={this.submitForm}
            />
          </form>
        </React.Fragment>
      );
      if(this.props.loading) {
        formContent = (<Loader />)
      }
      if(message.length > 0) {
        let resultButton = null;
        if(status === 'error') {
          resultButton = (
            <div className="button purpleButton" onClick={this.props.retrySubmition}>Retry</div>
          )
        } else {
          resultButton = (
            <React.Fragment>
              <div className="button purpleButton" onClick={this.authSuccessful}>Explore Raspberry</div>
              <div className="button purpleButton" onClick={this.props.logOut}>Log out</div>
            </React.Fragment>
          )
        }
        formContent = (
          <div className="resultFields">
            <p className="resultMessage">{message}</p>
            {resultButton}
          </div>
        )
      }
      return (
        <div id="form" style={this.props.style}>
          {formContent}
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    message: state.auth.message,
    status: state.auth.status,
    error: state.auth.error,
    redirect: state.ui.redirect,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password) => dispatch(actions.auth(email, password)),
    retrySubmition: (() => dispatch(actions.retryAuth())),
    logOut: (() => dispatch(actions.logOut())),
    clearErrors: (() => dispatch(actions.clearErrors())),
    closeBackdrop: () => dispatch(closeBackdrop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
