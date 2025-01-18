import { classNames, select, settings } from '../settings.js';
import BaseSubpage from './BaseSubpage.js';
import Validator from './Validator.js';

class Join extends BaseSubpage{
  constructor(element, userEmails, template){
    super(userEmails, template);
    const thisJoin = this;
    
    thisJoin.userEmails = userEmails;
    thisJoin.render(element);
    thisJoin.getElements();
    thisJoin.initValidator();
    thisJoin.initActions();
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
      playedSongs: {},
      favoriteSongs: []
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    for(let email of thisJoin.userEmails){
      if(email !== payload.email){
        if(thisJoin.nameValidation.validateName(payload.name)
          && thisJoin.surnameValidation.validateName(payload.surname)
          && thisJoin.emailValidation.validateEmail(payload.email)
          && thisJoin.passwordValidation.validatePassword(payload.password)){
          fetch(url, options);    
          thisJoin.dom.newAccount.innerHTML = 'Thanks for joining us! Now you can log in to your account.';
          setTimeout(() => {
            thisJoin.dom.newAccount.innerHTML = '';
            thisJoin.unsignFields(classNames.form.success);
          }, '5000');
          const event = new Event('user-added', {bubbles: true});
          document.dispatchEvent(event);
        }
      } else {
        alert('This user already exists!');
        thisJoin.unsignFields(classNames.form.success);
      }
    }  
  }
  unsignFields(color){
    const thisJoin = this;

    for(let inputField of thisJoin.dom.form.children){
      if(inputField.tagName === 'INPUT'){
        inputField.value = '';
        inputField.classList.remove(color);
      }
    }
  }
}

export default Join;