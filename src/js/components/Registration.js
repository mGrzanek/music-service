import { select, settings, templates } from './../settings.js';

class Registration {
  constructor(element){
    const thisRegistration = this;
    
    thisRegistration.render(element);
    thisRegistration.getElements();
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

    thisRegistration.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisRegistration.addUser();
    });
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