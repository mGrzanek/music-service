import { select, settings, templates } from './../settings.js';
import Validator from './Validator.js';

class Registration {
  constructor(element){
    const thisRegistration = this;
    
    thisRegistration.render(element);
    thisRegistration.getElements();
    thisRegistration.initValidator();
    thisRegistration.initActions();
  }

  render(element){
    const thisRegistration = this;

    const generatedHtml = templates.registration();
    thisRegistration.dom = {};
    thisRegistration.dom.wrapper = element;
    thisRegistration.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisRegistration = this;

    thisRegistration.dom.form = thisRegistration.dom.wrapper.querySelector(select.registration.form);
    thisRegistration.dom.inputName = thisRegistration.dom.form.querySelector(select.registration.name);
    thisRegistration.dom.inputSurname = thisRegistration.dom.form.querySelector(select.registration.surname);
    thisRegistration.dom.inputEmail = thisRegistration.dom.form.querySelector(select.registration.email);
    thisRegistration.dom.inputPassword = thisRegistration.dom.form.querySelector(select.registration.password);
  }

  initActions(){
    const thisRegistration = this;

    thisRegistration.dom.inputName.addEventListener('input', function(){
      thisRegistration.nameValidation.nameToggleClassValidate(thisRegistration.dom.inputName.value);
    });

    thisRegistration.dom.inputSurname.addEventListener('input', function(){
      thisRegistration.surnameValidation.nameToggleClassValidate(thisRegistration.dom.inputSurname.value);
    });

    thisRegistration.dom.inputEmail.addEventListener('input', function(){
      thisRegistration.emailValidation.emailToggleClassValidate(thisRegistration.dom.inputEmail.value);
    });

    thisRegistration.dom.inputPassword.addEventListener('input', function(){
      thisRegistration.passwordValidation.passwordToggleClassValidate(thisRegistration.dom.inputPassword.value);
    });

    thisRegistration.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisRegistration.addUser();
    });
  }

  initValidator(){
    const thisRegistration = this;

    thisRegistration.nameValidation = new Validator(thisRegistration.dom.inputName);
    thisRegistration.surnameValidation = new Validator(thisRegistration.dom.inputSurname);
    thisRegistration.emailValidation = new Validator(thisRegistration.dom.inputEmail);
    thisRegistration.passwordValidation = new Validator(thisRegistration.dom.inputPassword);
  }

  addUser(){
    const thisRegistration = this;

    const url = settings.db.url + '/' + settings.db.users;

    const payload = {
      name: thisRegistration.dom.inputName.value,
      surname: thisRegistration.dom.inputSurname.value,
      email: thisRegistration.dom.inputEmail.value,
      password: thisRegistration.dom.inputPassword.value   
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    fetch(url, options);
  }
}


export default Registration;