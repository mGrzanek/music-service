import { classNames, select, templates } from './../settings.js';
import Song from './Song.js';
import BaseSubpage from './BaseSubpage.js';

class Home extends BaseSubpage {
  constructor(element, data, categories, favoriteSongs, userStatus, template){
    super(data, template);
    const thisHome = this;
    thisHome.categories = categories;
    thisHome.activeCategoryLink = null;
    thisHome.render(element);
    thisHome.getElements();
    thisHome.initCategories();
    thisHome.initSongs(favoriteSongs, userStatus);
    thisHome.initActions();    
  }

  getElements(){
    const thisHome = this;

    thisHome.dom.categoriesLinks = thisHome.dom.wrapper.querySelector(select.containerOf.songsCategoriesLinks); 
    thisHome.dom.songsWrapper = thisHome.dom.wrapper.querySelector(select.home.songsWrapper);
  }

  initCategories(){
    const thisHome = this;
    
    for(let category of thisHome.categories){
      const linkHTML = templates.songCategoryLink(category);
      thisHome.dom.categoriesLinks.insertAdjacentHTML('beforeend', linkHTML);
    }
  }

  initSongs(favoriteSongs, userStatus){
    const thisHome = this;

    thisHome.dom.songsWrapper.innerHTML = '';

    for(let dataSong in thisHome.data){
      if(userStatus){
        thisHome.song = new Song(thisHome.dom.wrapper, thisHome.data[dataSong], favoriteSongs, userStatus);
      } else {
        if(!thisHome.data[dataSong].onlyLogged){
          thisHome.song = new Song(thisHome.dom.wrapper, thisHome.data[dataSong], favoriteSongs, userStatus);
        }
      } 
    }
  }

  initActions(){
    const thisHome = this;

    thisHome.dom.categoriesLinks.addEventListener('click', function(event){
      thisHome.filterSongsByCategory(event);
    });
  }

  filterSongsByCategory(event){
    const thisHome = this;
    const clickedElement = event.target;

    thisHome.dom.songsWrapper = thisHome.dom.wrapper.querySelector(select.containerOf.songsWrapper);

    if(clickedElement && clickedElement.tagName === 'A'){
      if(!clickedElement.classList.contains(classNames.links.active)){
        thisHome.removeActiveCategoryLinks();
        clickedElement.classList.add(classNames.links.active);
        thisHome.activeCategoryLink = clickedElement.innerHTML;
      } else {
        clickedElement.classList.remove(classNames.links.active);
        thisHome.activeCategoryLink = null;
      }
    }
    for(let song of thisHome.dom.songsWrapper.children){
      let categoryCurrent = song.querySelector(`${select.song.categoryId}="${thisHome.activeCategoryLink}"]`);
      if(thisHome.activeCategoryLink){
        if(!categoryCurrent){
          song.classList.toggle(classNames.songs.hidden);
        } 
      } else {
        song.classList.remove(classNames.songs.hidden);
      } 
    }
  }

  removeActiveCategoryLinks(){
    const thisHome = this;

    thisHome.dom.categoryLink = thisHome.dom.categoriesLinks.querySelectorAll(select.home.songCategoryLink);
    for(let link of thisHome.dom.categoryLink){
      if(link.classList.contains(classNames.links.active)){
        link.classList.remove(classNames.links.active);
      }
    }
  }
}
export default Home;