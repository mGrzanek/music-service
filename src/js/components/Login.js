import { select } from './../settings.js';
import BaseSubpage from './BaseSubpage.js';

class Login extends BaseSubpage{
  constructor(element, data, template){
    super(data, template);
    const thisLogin = this;

    thisLogin.render(element);
    thisLogin.getElements();
    thisLogin.initActions();
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
            favoriteSongs: thisLogin.data[dataUser].favoriteSongs
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