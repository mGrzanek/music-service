import { select, templates } from './../settings.js';

class Registration {
  constructor(element){
    const thisRegistration = this;
    
    thisRegistration.render(element);
    thisRegistration.getElements();
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
}


export default Registration;