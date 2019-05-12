import React from 'react';
import DisplayError from '../DisplayError/DisplayError.js';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        emailValue: '',
        passwordValue: '',
        errorMessage: ''
      }
    }

    onUserChange = (event) => {
      this.setState({emailValue: event.target.value});
    }

    onPasswordChange = (event) => {
      this.setState({passwordValue: event.target.value})
    }

    onSubmitClick = (event) => {
      event.preventDefault();
      // request to backend
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.emailValue,
          password: this.state.passwordValue
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({errorMessage: ''});
        if (data.id) {
          this.props.getProfile(data.id);
          this.props.onRouteChange('home');
        } else {
          this.setState({errorMessage: 'errorSigningIn'});
        }
      })
      .catch(err => {
        this.setState({errorMessage: err});
      })
    }

    render() {
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80 ">
            <form className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onUserChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}/>
                </div>
              </fieldset>
              <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                      type="submit" 
                      value="Sign in"
                      onClick={this.onSubmitClick}/>
              </div>
              <div className="lh-copy mt3">
                <span className="f6 link dim black db"
                    style = {{cursor: 'pointer'}} 
                    onClick={() => this.props.onRouteChange('register')}>Register</span>
              </div>
              {this.state.errorMessage ?
              <DisplayError message={'Error signing in. Please check username and password.'} /> :
              <div></div>
              }
            </form>
          </main>
        </article>
      );
    }  
} 

export default SignIn;
