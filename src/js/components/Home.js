import { templates } from './../settings.js';

class Home {
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
  }
  render(element){
    const thisHome = this;

    const generatedHtml = templates.home();
    console.log(generatedHtml);
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHtml;
    
  }
}
export default Home;