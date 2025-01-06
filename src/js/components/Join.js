import { classNames, select, settings, templates } from '../settings.js';
import Validator from './Validator.js';

class Join {
  constructor(element, callback){
    const thisJoin = this;
    
    thisJoin.convertText = callback;
    thisJoin.render(element);
    thisJoin.getElements();
    thisJoin.initValidator();
    thisJoin.initActions();
  }

  render(element){
    const thisJoin = this;

    const generatedHtml = templates.join();
    thisJoin.dom = {};
    thisJoin.dom.wrapper = element;
    thisJoin.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisJoin = this;

    thisJoin.dom.form = thisJoin.dom.wrapper.querySelector(select.join.form);
    thisJoin.dom.inputName = thisJoin.dom.form.querySelector(select.join.name);
    thisJoin.dom.inputSurname = thisJoin.dom.form.querySelector(select.join.surname);
    thisJoin.dom.inputEmail = thisJoin.dom.form.querySelector(select.join.email);
    thisJoin.dom.inputPassword = thisJoin.dom.form.querySelector(select.join.password);
    thisJoin.dom.newAccount = thisJoin.dom.wrapper.querySelector(select.join.newAccount);
    thisJoin.loginWrapper = document.querySelector(select.containerOf.loginWrapper);
  }

  initActions(){
    const thisJoin = this;

    thisJoin.dom.inputName.addEventListener('input', function(){
      thisJoin.nameValidation.nameToggleClassValidate(thisJoin.dom.inputName.value);
    });

    thisJoin.dom.inputSurname.addEventListener('input', function(){
      thisJoin.surnameValidation.nameToggleClassValidate(thisJoin.dom.inputSurname.value);
    });

    thisJoin.dom.inputEmail.addEventListener('input', function(){
      thisJoin.emailValidation.emailToggleClassValidate(thisJoin.dom.inputEmail.value);
    });

    thisJoin.dom.inputPassword.addEventListener('input', function(){
      thisJoin.passwordValidation.passwordToggleClassValidate(thisJoin.dom.inputPassword.value);
    });

    thisJoin.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisJoin.addUser();
    });
  }

  initValidator(){
    const thisJoin = this;

    thisJoin.nameValidation = new Validator(thisJoin.dom.inputName);
    thisJoin.surnameValidation = new Validator(thisJoin.dom.inputSurname);
    thisJoin.emailValidation = new Validator(thisJoin.dom.inputEmail);
    thisJoin.passwordValidation = new Validator(thisJoin.dom.inputPassword);
  }

  addUser(){
    const thisJoin = this;

    const url = settings.db.url + '/' + settings.db.users;

    const payload = {
      name: thisJoin.convertText(thisJoin.dom.inputName.value),
      surname: thisJoin.convertText(thisJoin.dom.inputSurname.value),
      email: thisJoin.dom.inputEmail.value,
      password: thisJoin.dom.inputPassword.value,
      playedSongs: {}  
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    if(thisJoin.nameValidation.validateName(payload.name)
      && thisJoin.surnameValidation.validateName(payload.surname)
      && thisJoin.emailValidation.validateEmail(payload.email)
      && thisJoin.passwordValidation.validatePassword(payload.password)){
      fetch(url, options);

      for(let inputField of thisJoin.dom.form.children){
        if(inputField.tagName === 'INPUT'){
          inputField.value = '';
          inputField.classList.remove(classNames.form.success);
        }
      }

      const event = new Event('user-added', {bubbles: true});
      document.dispatchEvent(event);

      thisJoin.dom.newAccount.innerHTML = 'Thanks for joining us! Now you can log in to your account.';
      setTimeout(() => {
        thisJoin.dom.newAccount.innerHTML = '';
      }, '5000');
    }
  }
}

export default Join;