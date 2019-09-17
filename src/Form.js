import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    let countries = [];
    this.state = {
      socialSecurityNumber: localStorage.getItem('socialSecurityNumber') ? localStorage.getItem('socialSecurityNumber') : '',
      phoneNumber: localStorage.getItem('phoneNumber') ? localStorage.getItem('phoneNumber') : '',
      email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
      country: localStorage.getItem('country') ? localStorage.getItem('country') : '',
      formErrors: {email: '', phoneNumber: '', socialSecurityNumber: ''},
      socialSecurityNumberValid: false,
      phoneNumberValid: false,
      emailValid: false,
      formValid: false,
      countries: countries
    }
    // if(!localStorage.getItem('countries')) {
      fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          countries.push(data[i].name);
        }
        console.log('Fetched countries list. Now caching the list');
        localStorage.setItem('countries', JSON.stringify(countries));
        this.setState({
          countries: JSON.parse(localStorage.getItem('countries'))
        });
      }).catch(console.log);
    // } else {
      // this.setState({
        // countries: JSON.parse(localStorage.getItem('countries'))
      // });
      // console.log('Countries list is already in the cache');
    // }
  }

  // Once the component get mounted, in this method, we read state from localStorage and set the attribute values
  componentDidMount() {
    let temp = {
      socialSecurityNumberValid: '',
      phoneNumberValid: '',
      emailValid: '',
      fieldValidationErrors: {
        socialSecurityNumber: '',
        phoneNumber: '',
        email: '',
        country: ''
      }
    }
    // Validate SSN if its set already
    if(this.state.socialSecurityNumber) {
      this.validateSSN('socialSecurityNumber', this.state.socialSecurityNumber, temp);
    }

    // Validate phone number if its set already
    if(this.state.phoneNumber) {
      this.validatePhoneNumber('phoneNumber', this.state.phoneNumber, temp);
    }

    // Validate email if its set already
    if(this.state.email) {
      this.validateEmail('email', this.state.email, temp);
    }

    // Set state once all the validations are done. Post that validateForm
    this.setState({
      formErrors: temp.fieldValidationErrors,
      socialSecurityNumberValid: temp.socialSecurityNumberValid,
      phoneNumberValid: temp.phoneNumberValid,
      emailValid: temp.emailValid
      // countries: localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')) : []
    }, this.validateForm);
  }

  // Called on every input from user and update the state and validate the form
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    localStorage.setItem(name, value);
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }

  validatePersonalIdentityNumber(a, b, c, d) {
    c='';
    for(b=d=0; b<10; b++)
        c += b !== 6 ? a[b]*(d++%2||2) : '';
    b=0;
    for(d in c)
        b += c[d]*1;
    // eslint-disable-next-line
    return b*9%10 == a[10]
  }

  // Validate SSN to be a valid Swedish SSN. Else set the error message to be displayed to the user.
  validateSSN(fieldName, value, temp) {
    if(!(value.match(/^\d{6}-\d{4}$/i) && this.validatePersonalIdentityNumber(value))) {
      temp.socialSecurityNumberValid = false;
      temp.fieldValidationErrors.socialSecurityNumber = 'Social Security Number is invalid';
    } else {
      temp.socialSecurityNumberValid = true;
      temp.fieldValidationErrors.socialSecurityNumber = '';
    }
    return temp;
  }

  validatePhoneNumber(fieldName, value, temp) {
    if(!value.match(/^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/i)) {
      temp.phoneNumberValid = false;
      temp.fieldValidationErrors.phoneNumber = 'Phone Number is invalid';
    } else {
      temp.phoneNumberValid = true;
      temp.fieldValidationErrors.phoneNumber = '';
    }
    return temp;
  }

  validateEmail(fieldName, value, temp) {
    if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      temp.emailValid = false;
      temp.fieldValidationErrors.email = 'Email is invalid';
    } else {
      temp.emailValid = true;
      temp.fieldValidationErrors.email = '';
    }
    return temp;
  }

  validateField(fieldName, value) {
    console.log('fieldName: ', fieldName);
    console.log('value: ', value);
    let temp = {
      socialSecurityNumberValid: this.state.socialSecurityNumberValid,
      phoneNumberValid: this.state.phoneNumberValid,
      emailValid: this.state.emailValid,
      fieldValidationErrors: {
        socialSecurityNumber: this.state.formErrors.socialSecurityNumber,
        phoneNumber: this.state.formErrors.phoneNumber,
        email: this.state.formErrors.email
      }
    }

    switch(fieldName) {
      case 'socialSecurityNumber':
        this.validateSSN(fieldName, value, temp);
        break;
      case 'phoneNumber':
        this.validatePhoneNumber(fieldName, value, temp);
        break;
      case 'email':
        this.validateEmail(fieldName, value, temp);
        break;
      case 'country':
        if(!value && value === 'Select your country')
          temp.fieldValidationErrors.country = 'Select your country';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: temp.fieldValidationErrors,
      socialSecurityNumberValid: temp.socialSecurityNumberValid,
      phoneNumberValid: temp.phoneNumberValid,
      emailValid: temp.emailValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.phoneNumberValid && this.state.socialSecurityNumberValid && this.state.country});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (e) => {
    console.log("Success");
    localStorage.removeItem('socialSecurityNumber');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('country');
    e.preventDefault();
  }

  render () {
    return (
      <form className="demoForm" onSubmit={this.handleSubmit}>
        <h2>Form</h2>
        <div className={`form-group ${this.errorClass(this.state.formErrors.socialSecurityNumber)}`}>
          <label htmlFor="socialSecurityNumber">Social Security Number</label>
          <input type="number" required className="form-control" name="socialSecurityNumber" placeholder="012345-6789" value={this.state.socialSecurityNumber} onChange={this.handleUserInput}  />
          <span>{this.state.formErrors.socialSecurityNumber}</span>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.phoneNumber)}`}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="number" required className="form-control" name="phoneNumber" placeholder="+46xxxxxxxxx" value={this.state.phoneNumber} onChange={this.handleUserInput} />
          <span>{this.state.formErrors.phoneNumber}</span>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleUserInput} />
          <span>{this.state.formErrors.email}</span>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="country">Country</label>
          <select value={this.state.country} required name="country" className="form-control" onChange={this.handleUserInput}>
            <option key="0">Select your country</option>
            {this.state.countries.map((country, key) => <option key={key} value={country}>{country}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
      </form>
    )
  }
}

export default Form;
