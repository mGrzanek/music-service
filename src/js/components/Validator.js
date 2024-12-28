import { classNames } from './../settings.js';

class Validator {
  constructor(element){
    const thisValidator = this;

    thisValidator.getElements(element);
  }

  getElements(element){
    const thisValidator = this;

    thisValidator.dom = {};
    thisValidator.dom.wrapper = element;
  }

  nameToggleClassValidate(name){
    const thisValidator = this;

    const regex = /^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,}$/;

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      name && regex.test(name)
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      !name || !regex.test(name)
    );
  }

  emailToggleClassValidate(email){
    const thisValidator = this;

    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      email && regex.test(email)
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      !email || !regex.test(email)
    );
  }

  passwordToggleClassValidate(password){
    const thisValidator = this;

    const regex = /^.{8,}$/;

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      password && regex.test(password)
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      !password || !regex.test(password)
    );
  }

  validateName(name){
    const regex = /^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,}$/;

    if(name && regex.test(name)){
      return true;
    } else {
      alert('Incorrect your name!');
    }
  }

  validateEmail(email){
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if(email && regex.test(email)){
      return true;
    } else {
      alert('Incorrect your e-mail!');
    }
  }

  validatePassword(password){
    const regex = /^.{8,}$/;

    if(password && regex.test(password)){
      return true;
    } else {
      alert('Password must contain at least 8 characters!');
    }
  }
}

export default Validator;