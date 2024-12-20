/* eslint-disable no-empty */
import { select, templates } from './../settings.js';
import Song from './Song.js';

class Search {
  constructor(element, data){
    const thisSearch = this;

    thisSearch.data = data;
    thisSearch.render(element);
    thisSearch.getElements();
    thisSearch.initActions();
  }

  render(element){
    const thisSearch = this;
    
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    const generatedHtml = templates.search();
    thisSearch.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisSearch = this;

    thisSearch.dom.formButton = thisSearch.dom.wrapper.querySelector(select.search.formButton);
    thisSearch.dom.input = thisSearch.dom.wrapper.querySelector(select.search.formInput);
    thisSearch.dom.subtitle = thisSearch.dom.wrapper.querySelector(select.search.subtitle);
    thisSearch.dom.songsWrapper = thisSearch.dom.wrapper.querySelector(select.containerOf.songsWrapper);
  }

  initActions(){
    const thisSearch = this;

    thisSearch.dom.formButton.addEventListener('click', function(event){
      event.preventDefault();
      thisSearch.addSearch();
    });
  }

  addSearch(){
    const thisSearch = this;

    thisSearch.dom.songsWrapper.innerHTML = '';
    thisSearch.inputValue =  thisSearch.dom.input.value;
    let songsAmount = 0;
    const regex = new RegExp(thisSearch.inputValue, 'i');

    for(let songData in thisSearch.data){
      const author = thisSearch.data[songData].author;
      const title = thisSearch.data[songData].title;
      const fullName = `${author} - ${title}`;

      const songFinder = regex.test(fullName);

      if(songFinder){
        thisSearch.song = new Song(thisSearch.dom.wrapper, thisSearch.data[songData]);
        songsAmount++;
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