import { templates } from './../settings.js';

class Login {
  constructor(element, data){
    const thisLogin = this;

    thisLogin.data = data;
    thisLogin.render(element);
  }
  render(element){
    const thisLogin = this;

    thisLogin.dom = {};
    thisLogin.dom.wrapper = element;
    const generatedHtml = templates.login();
    thisLogin.dom.wrapper.innerHTML = generatedHtml;
  }
}

export default Login;