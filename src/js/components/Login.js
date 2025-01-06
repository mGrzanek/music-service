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

    thisLogin.dom.message = thisLogin.dom.wrapper.querySelector(select.login.message);
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
    let userEmail = thisLogin.dom.email.value;
    let userPassword = thisLogin.dom.password.value;

    for(let dataUser in thisLogin.data){
      if(userEmail === thisLogin.data[dataUser].email
        && userPassword === thisLogin.data[dataUser].password){
        const event = new CustomEvent('logged', {
          bubbles: true,
          detail: {
            userId: thisLogin.data[dataUser].id,
            userName: thisLogin.data[dataUser].name, 
            userPlayedSongs: thisLogin.data[dataUser].playedSongs,
          }
        });
        document.dispatchEvent(event);
      } else {
        thisLogin.dom.message.innerHTML = 'This user does not exist.';
        setTimeout(() => {
          thisLogin.dom.message.innerHTML = '';
        }, '5000');
      }
    }
    thisLogin.dom.email.value = '';
    thisLogin.dom.password.value = '';
  }
}

export default Login;