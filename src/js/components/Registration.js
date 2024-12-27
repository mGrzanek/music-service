import { templates } from './../settings.js';

class Registration {
  constructor(element){
    const thisRegistration = this;
    
    thisRegistration.render(element);
  }

  render(element){
    const thisRegistration = this;

    const generatedHtml = templates.registration();
    thisRegistration.wrapper = element;
    thisRegistration.wrapper.innerHTML = generatedHtml;
  }
}


export default Registration;