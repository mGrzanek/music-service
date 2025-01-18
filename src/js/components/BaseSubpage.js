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

  initHbsTemplate(templateContent, templateData){
    const template = Handlebars.compile(templateContent);
    const html = template(templateData);
    return html;
  }

  initCategories(categoriesData, categoriesWrapper, categoriesTemplate){
    const thisBaseSubpage = this;

    for(let category of categoriesData){
      const categoryHtml = thisBaseSubpage.initHbsTemplate(categoriesTemplate, category);
      console.log('categoryHtml', categoryHtml);
      categoriesWrapper.insertAdjacentHTML('beforeend', categoryHtml);
    }
  }

  convertText(text){
    let newText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    return newText;
  }
}

export default BaseSubpage;