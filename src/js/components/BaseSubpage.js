// import utils from './../utils.js';

class BaseSubpage {
  constructor(data, templateValue){
    const thisBaseSubpage = this;

    thisBaseSubpage.data = data;
    thisBaseSubpage.dom = {};
    thisBaseSubpage.generatedHtml = templateValue;
  }
  render(element){
    const thisBaseSubpage = this;
    
    thisBaseSubpage.dom.wrapper = element;
    thisBaseSubpage.dom.wrapper.innerHTML = thisBaseSubpage.generatedHtml;
  }
}

export default BaseSubpage;