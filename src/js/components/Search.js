/* eslint-disable no-empty */
import { select, templates } from './../settings.js';
import Song from './Song.js';

class Search {
  constructor(element, data, categories, favoriteSongs, userStatus){
    const thisSearch = this;

    thisSearch.data = data;
    thisSearch.categories = categories;
    thisSearch.render(element);
    thisSearch.getElements();
    thisSearch.initActions(favoriteSongs, userStatus);
  }

  render(element){
    const thisSearch = this;
    
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.categories.unshift('');
    const generatedHtml = templates.search(thisSearch.categories);
    thisSearch.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisSearch = this;

    thisSearch.dom.formButton = thisSearch.dom.wrapper.querySelector(select.search.formButton);
    thisSearch.dom.input = thisSearch.dom.wrapper.querySelector(select.search.formInput);
    thisSearch.dom.subtitle = thisSearch.dom.wrapper.querySelector(select.search.subtitle);
    thisSearch.dom.songsWrapper = thisSearch.dom.wrapper.querySelector(select.containerOf.songsWrapper);
    thisSearch.dom.categoriesWrapper = thisSearch.dom.wrapper.querySelector(select.search.categoryInput);
    thisSearch.dom.form = thisSearch.dom.wrapper.querySelector(select.search.form);
  }

  initActions(favoriteSongs, userStatus){
    const thisSearch = this;

    thisSearch.dom.formButton.addEventListener('click', function(){
      thisSearch.addSearch(favoriteSongs, userStatus);
    });
  }

  clearSongs(){
    const thisSearch = this;

    thisSearch.dom.subtitle.innerHTML = '';
    thisSearch.dom.songsWrapper.innerHTML = '';
    for(let formField of thisSearch.dom.form.children){
      if(formField.tagName === 'INPUT' || formField.tagName === 'SELECT'){
        formField.value = '';
      }
    }
  }

  addSearch(favoriteSongs, userStatus){
    const thisSearch = this;

    thisSearch.dom.songsWrapper.innerHTML = '';
    thisSearch.inputValue =  thisSearch.dom.input.value;
    let songsAmount = 0;
    const categoryInput = thisSearch.dom.categoriesWrapper.value;
    const regex = new RegExp(thisSearch.inputValue, 'i');

    for(let songData in thisSearch.data){
      const author = thisSearch.data[songData].author;
      const title = thisSearch.data[songData].title;
      const songCategories = thisSearch.data[songData].categories;
      const fullName = `${author} - ${title}`;
      const songFinder = regex.test(fullName);
      let toRender = false;

      if(!userStatus || userStatus === undefined){
        if(!thisSearch.data[songData].onlyLogged){
          toRender = true;
        }
      } else {
        toRender = true;
      }
      
      if(toRender){
        if(categoryInput === '' && songFinder){
          thisSearch.song = new Song(thisSearch.dom.wrapper, thisSearch.data[songData], favoriteSongs, userStatus);
          songsAmount++;
          thisSearch.dom.subtitle.innerHTML = `We have found ${songsAmount} songs...`;
        } else {
          for(let category of songCategories){
            if(category === categoryInput && songFinder){
              thisSearch.song = new Song(thisSearch.dom.wrapper, thisSearch.data[songData], favoriteSongs, userStatus);
              songsAmount++;
              thisSearch.dom.subtitle.innerHTML = `We have found ${songsAmount} songs...`;
            } 
          }         
        }   
      } 
    }

    if(songsAmount > 0){
      thisSearch.dom.subtitle.innerHTML = `We have found ${songsAmount} songs...`;
    } else {
      thisSearch.dom.subtitle.innerHTML = 'Sorry, this song is not available.';
    }
  }
}

export default Search;