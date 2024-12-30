import { select, templates } from './../settings.js';

class Login {
  constructor(element, data){
    const thisLogin = this;

    thisLogin.data = data;
    thisLogin.render(element);
    thisLogin.getElements();
    thisLogin.initActions();
  }
  render(element){
    const thisLogin = this;

    thisLogin.dom = {};
    thisLogin.dom.wrapper = element;
    const generatedHtml = templates.login();
    thisLogin.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisLogin = this;

    thisLogin.dom.form = thisLogin.dom.wrapper.querySelector(select.login.form);
    thisLogin.dom.email = thisLogin.dom.form.querySelector(select.login.email);
    thisLogin.dom.password = thisLogin.dom.form.querySelector(select.login.password);
  }

  initActions(){
    const thisLogin = this;

    thisLogin.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisLogin.loginUser();
    });
  }

  loginUser(){
    const thisLogin = this;
    const userEmail = thisLogin.dom.email.value;
    const userPassword = thisLogin.dom.password.value;

    for(let dataUser in thisLogin.data){
      if(userEmail === thisLogin.data[dataUser].email
        && userPassword === thisLogin.data[dataUser].password){
        console.log('Hello!');
        const event = new CustomEvent('logged', {
          detail: {user: thisLogin.data[dataUser].name}
        });
        document.dispatchEvent(event);
      } else {
        console.log('Invalid user!');
      }
    }
  }
}

export default Login;