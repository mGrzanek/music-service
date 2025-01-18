import { classNames, select, settings } from './../settings.js';
import BaseSubpage from './BaseSubpage.js';
import Validator from './Validator.js';

class AddSong extends BaseSubpage{
  constructor(element, data, userStatus, mainTemplate, categoriesTemplate, privacyTemplate){
    super(data, mainTemplate);
    const thisAddSong = this;

    if(userStatus){
      thisAddSong.render(element);
      thisAddSong.getElements();

      for(let songCategories of thisAddSong.data){
        if(songCategories.categories){
          thisAddSong.initCategories(songCategories.categories, thisAddSong.dom.songCategories, categoriesTemplate);
        }
        if(songCategories.privacy){
          thisAddSong.initCategories(songCategories.privacy, thisAddSong.dom.privacyCategories, privacyTemplate);
        }
      }
      
      thisAddSong.initValidator();
      thisAddSong.checkedField = [];
      thisAddSong.initActions();
    } else {
      element.innerHTML = 'Only for subscribers!';
    }
  }

  getElements(){
    const thisAddSong = this;

    thisAddSong.dom.form = thisAddSong.dom.wrapper.querySelector(select.addSong.form);
    thisAddSong.dom.titleInput = thisAddSong.dom.form.querySelector(select.addSong.title);
    thisAddSong.dom.authorInput = thisAddSong.dom.form.querySelector(select.addSong.author);
    thisAddSong.dom.filePathInput = thisAddSong.dom.form.querySelector(select.addSong.filename);
    thisAddSong.dom.rankingInput = thisAddSong.dom.form.querySelector(select.addSong.ranking);
    thisAddSong.dom.checkboxes = thisAddSong.dom.form.querySelector(select.addSong.checkboxes);
    thisAddSong.dom.songCategories = thisAddSong.dom.checkboxes.querySelector(select.addSong.songCategories);
    thisAddSong.dom.privacyCategories = thisAddSong.dom.checkboxes.querySelector(select.addSong.privacyCategories);
    thisAddSong.dom.newSong = thisAddSong.dom.wrapper.querySelector(select.addSong.songAdded);
  }

  initValidator(){
    const thisAddSong = this;

    thisAddSong.titleValidation = new Validator(thisAddSong.dom.titleInput);
    thisAddSong.authorValidation = new Validator(thisAddSong.dom.authorInput);
    thisAddSong.filenameValidation = new Validator(thisAddSong.dom.filePathInput);
    thisAddSong.rankingValidtion = new Validator(thisAddSong.dom.rankingInput);
    thisAddSong.songCategoriesValidation = new Validator(thisAddSong.dom.songCategories);
    thisAddSong.privacyCategoriesValidation = new Validator(thisAddSong.dom.privacyCategories);
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
      clickedElement.nameAttribute = event.target.attributes.name.value;
      if(clickedElement && clickedElement.tagName === 'INPUT'){
        if(clickedElement.nameAttribute === 'categories'){
          thisAddSong.songCategoriesValidation.songCategoriesToggleClassValidate(clickedElement, thisAddSong.checkedField);
        } else if(clickedElement.nameAttribute === 'privacy'){
          thisAddSong.privacyCategoriesValidation.songCategoriesToggleClassValidate(clickedElement, thisAddSong.checkedField);
        }
      }
    });
  }

  addNewSong(){
    const thisAddSong = this;

    thisAddSong.dom.songCategoryInput = thisAddSong.dom.songCategories.querySelectorAll(select.addSong.category);
    thisAddSong.dom.songPrivacyInput = thisAddSong.dom.privacyCategories.querySelectorAll(select.addSong.privacy);

    const url = `${settings.db.url}/${settings.db.songs}`;
    const privacyCategory = [];
    let privacyValue;

    for(let privacy of thisAddSong.dom.songPrivacyInput){
      if(privacy.checked){
        privacyCategory.push(privacy.value);
        if(privacy.value === settings.privacyCategory.private){
          privacyValue = true;
        } else {
          privacyValue = false;
        }
      }
    }

    const payload = {
      title: thisAddSong.convertText(thisAddSong.dom.titleInput.value),
      author: thisAddSong.convertText(thisAddSong.dom.authorInput.value),
      filename: thisAddSong.dom.filePathInput.value,
      ranking: thisAddSong.dom.rankingInput.value,
      categories: [],
      onlyLogged: privacyValue
    };

    for(let category of thisAddSong.dom.songCategoryInput){
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
        && thisAddSong.songCategoriesValidation.validateSongCategories(payload.categories)
        && thisAddSong.privacyCategoriesValidation.validateSongCategories(privacyCategory)){
      fetch(url, options);

      thisAddSong.dom.newSong.innerHTML = 'New song added!';
      setTimeout(() => {
        thisAddSong.dom.newSong.innerHTML = '';
      }, '5000');

      for(let inputField of thisAddSong.dom.form.children){
        if(inputField.tagName === 'INPUT'){
          inputField.value = '';
          inputField.classList.remove(classNames.form.success);
        }
      }

      thisAddSong.dom.songCategories.classList.remove(classNames.form.success);
      thisAddSong.dom.privacyCategories.classList.remove(classNames.form.success);

      thisAddSong.dom.songCategoryInput.forEach(function(checkbox) {
        thisAddSong.uncheckInput(checkbox);
      });

      thisAddSong.dom.songPrivacyInput.forEach(function(radio) {
        thisAddSong.uncheckInput(radio);
      });

      const event = new Event('song-added', {bubbles: true});
      document.dispatchEvent(event);
    } else {
      alert('Please complete the form correctly!');
    }
  }

  uncheckInput(inputFile){
    if(inputFile.checked){
      inputFile.checked = false;
    }
  }
}

export default AddSong;