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

  initCategories(categoriesData, categoriesWrapper, initTemplateCb, categoriesTemplate){
    for(let category of categoriesData){
      const categoryHtml = initTemplateCb(categoriesTemplate, category);
      console.log('categoryHtml', categoryHtml);
      categoriesWrapper.insertAdjacentHTML('beforeend', categoryHtml);
    }
  }
}

export default BaseSubpage;