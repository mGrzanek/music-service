import { select, settings, templates } from './../settings.js';
import SongCategory from './SongCategory.js';
import Validator from './Validator.js';

class AddSong {
  constructor(element, data){
    const thisAddSong = this;

    thisAddSong.data = data;
    thisAddSong.render(element);
    thisAddSong.getElements();
    thisAddSong.initCategories();
    thisAddSong.initValidator();
    thisAddSong.checkedCategories = [];
    thisAddSong.initActions();
  }

  render(element){
    const thisAddSong = this;

    const generatedHtml = templates.addSong();
    thisAddSong.dom = {};
    thisAddSong.dom.wrapper = element;
    thisAddSong.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisAddSong = this;

    thisAddSong.dom.form = thisAddSong.dom.wrapper.querySelector(select.addSong.form);
    thisAddSong.dom.titleInput = thisAddSong.dom.form.querySelector(select.addSong.title);
    thisAddSong.dom.authorInput = thisAddSong.dom.form.querySelector(select.addSong.author);
    thisAddSong.dom.filePathInput = thisAddSong.dom.form.querySelector(select.addSong.filename);
    thisAddSong.dom.rankingInput = thisAddSong.dom.form.querySelector(select.addSong.ranking);
    thisAddSong.dom.checkboxes = thisAddSong.dom.form.querySelector(select.addSong.checkboxes);
  }

  initCategories(){
    const thisAddSong = this;

    for(let songCategory in thisAddSong.data){
      thisAddSong.songCategory = new SongCategory(thisAddSong.dom.checkboxes, thisAddSong.data[songCategory]);
    }
  }

  initValidator(){
    const thisAddSong = this;

    thisAddSong.titleValidation = new Validator(thisAddSong.dom.titleInput);
    thisAddSong.authorValidation = new Validator(thisAddSong.dom.authorInput);
    thisAddSong.filenameValidation = new Validator(thisAddSong.dom.filePathInput);
    thisAddSong.rankingValidtion = new Validator(thisAddSong.dom.rankingInput);
    thisAddSong.categoriesValidation = new Validator(thisAddSong.dom.checkboxes);
  }

  initActions(){
    const thisAddSong = this;

    thisAddSong.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisAddSong.addNewSong();
    });

    thisAddSong.dom.titleInput.addEventListener('input', function(){
      thisAddSong.titleValidation.songNameToggleClassValidate(thisAddSong.dom.titleInput.value);
    });
  
    thisAddSong.dom.authorInput.addEventListener('input', function(){
      thisAddSong.authorValidation.songNameToggleClassValidate(thisAddSong.dom.authorInput.value);
    });

    thisAddSong.dom.filePathInput.addEventListener('input', function(){
      thisAddSong.filenameValidation.songFilenameToggleClassValidate(thisAddSong.dom.filePathInput.value);
    });

    thisAddSong.dom.rankingInput.addEventListener('input', function(){
      thisAddSong.rankingValidtion.songRankingToggleClassValidate(thisAddSong.dom.rankingInput.value);
    });
    
    thisAddSong.dom.checkboxes.addEventListener('change', function(event){
      const clickedElement = event.target;
      thisAddSong.categoriesValidation.songCategoriesToggleClassValidate(clickedElement, thisAddSong.checkedCategories);
    });
  }

  addNewSong(){
    const thisAddSong = this;

    thisAddSong.dom.categoryInput = thisAddSong.dom.checkboxes.querySelectorAll(select.addSong.category);
    
    const url = `${settings.db.url}/${settings.db.songs}`;

    const payload = {
      title: thisAddSong.dom.titleInput.value,
      author: thisAddSong.dom.authorInput.value,
      filename: thisAddSong.dom.filePathInput.value,
      ranking: thisAddSong.dom.rankingInput.value,
      categories: []
    };

    for(let category of thisAddSong.dom.categoryInput){
      if(category.checked){
        payload.categories.push(category.value);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };
   
    if(thisAddSong.titleValidation.validateSong(payload.title)
        && thisAddSong.authorValidation.validateSong(payload.author)
        && thisAddSong.filenameValidation.validateSongFilename(payload.filename)
        && thisAddSong.rankingValidtion.validateSongRanking(payload.ranking)
        && thisAddSong.categoriesValidation.validateSongCategories(payload.categories)){
      fetch(url, options);
    }
  }
}

export default AddSong;