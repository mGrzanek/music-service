import { templates } from './../settings.js';

class Discover {
  constructor(element, data){
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.render(element);
  }

  render(element){
    const thisDiscover = this;

    const generatedHtml = templates.discover();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHtml;
  }
}

export default Discover;