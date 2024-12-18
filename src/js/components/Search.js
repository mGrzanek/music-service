import { templates } from './../settings.js';

class Search {
  constructor(element, data){
    const thisSearch = this;

    thisSearch.data = data;
    thisSearch.render(element);
  }

  render(element){
    const thisSearch = this;
    
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    const generatedHtml = templates.search();
    thisSearch.dom.wrapper.innerHTML = generatedHtml;
    console.log(thisSearch.dom.wrapper);
  }
}

export default Search;