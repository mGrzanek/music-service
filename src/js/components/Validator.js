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

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
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

  songNameToggleClassValidate(name){
    const thisValidator = this;
    const regex = /^[^\s].*$/;

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      name && regex.test(name)
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      !name || !regex.test(name)
    );
  }

  songFilenameToggleClassValidate(filename){
    const thisValidator = this;
    const regex = /^.+(\.mp3|\.wav|\.flac|\.aac|\.ogg|\.wma)$/;
    
    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      filename && regex.test(filename)
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      !filename || !regex.test(filename)
    );
  }

  songCategoriesToggleClassValidate(element, categoriesArr){
    const thisValidator = this;

    if(element 
      && element.type === 'checkbox' 
      || element.type === 'radio'){
      if(element.checked){
        categoriesArr.push(element);
      } else {
        const elementToRemove = categoriesArr.indexOf(element);
        categoriesArr.splice(elementToRemove, 1);
      }
    } 

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.success,
      categoriesArr.length > 0
    );

    thisValidator.dom.wrapper.classList.toggle(
      classNames.form.error,
      categoriesArr.length === 0
    );
  }

  validateSong(name){
    const regex = /^[^\s].*$/;

    if(name && regex.test(name)){
      return true;
    } else {
      return false;
    }
  }

  validateSongFilename(filename){
    const regex = /^.+(\.mp3|\.wav|\.flac|\.aac|\.ogg|\.wma)$/;

    if(filename && regex.test(filename)){
      return true;
    } else {
      alert('Invalid filename! Must contain extension .mp3, .wav, .flac, .aac, .ogg or .wma');
    }
  }

  validateSongCategories(categoriesArr){
    const thisValidator = this;

    thisValidator.songCategoriesToggleClassValidate(thisValidator.dom.wrapper, categoriesArr);
    if(categoriesArr.length > 0){
      return true;
    } else {
      alert('At least one field must be selected!');
    }
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