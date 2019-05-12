import React from 'react';
import DisplayError from '../DisplayError/DisplayError.js';

class Register extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      passwordValue: '',
      errorMessage: ''
    }
  }

  onNameChange = (event) => {
    this.setState({nameValue: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({emailValue: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({passwordValue: event.target.value});
  }

  onRegisterSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.nameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === "success") {
        this.props.onRouteChange('signin');
      } else {
        this.setState({errorMessage: 'error'});
      }
    })
    .catch(error => {
      this.setState({errorMessage: error})
    })
  }

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure" style={{textAlign: 'center'}}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name:</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="text" 
                      name="name"  
                      id="name"
                      onChange={this.onNameChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email:</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
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
                    value="Register"
                    onClick={this.onRegisterSubmit}/>
            </div>
            <div className="lh-copy mt3">
              <span className="f6 link dim black db"
                style = {{cursor: 'pointer'}} 
                onClick={() => this.props.onRouteChange('signin')}>Signin</span>
            </div>
            {
            this.state.errorMessage ?
            <DisplayError message={'Error registering. Your email is already used, name is blank or password is too short.'} /> :
            <div></div> 
            }
          </form>
        </main>
      </article>
    )
  }
  
} 

export default Register;
