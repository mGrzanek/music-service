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

  validateName(name){
    const regex = /^[A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]{2,}$/;

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