// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import css from './LoginForm.module.css';
// import toast from 'react-hot-toast';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, loginError } = this.props;
    return (
      <form name='loginForm' onSubmit={this.onSubmit}>
        <div className={css['form-group-collection']}>
          <div className={css['form-group']}>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              onChange={(e) => this.setState({ email: e.target.value })}
              value={email}
              placeholder='Enter Email'
            />
          </div>

          <div className={css['form-group']}>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              onChange={(e) => this.setState({ password: e.target.value })}
              value={password}
              placeholder='Enter Password'
            />
          </div>
        </div>

        <input type='submit' value='Login' />

        <div className={css.message}>
          {isLoginPending && <div>Please wait...</div>}
          {isLoginSuccess && <div>Successfully Logged In.</div>}
          {loginError && <div>{loginError.message}</div>}
        </div>
      </form>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: '',
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
