import { classNames, select, templates } from './../settings.js';
import Song from './Song.js';

class Home {
  constructor(element, data, categories){
    const thisHome = this;
    
    thisHome.data = data;
    thisHome.categories = categories;
    thisHome.activeCategoryLink = null;
    thisHome.render(element);
    thisHome.initCategories();
    thisHome.initSongs();
    thisHome.initActions();
  }
  render(element){
    const thisHome = this;

    const generatedHtml = templates.home();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHtml;
    thisHome.dom.categoriesLinks = thisHome.dom.wrapper.querySelector(select.containerOf.songsCategoriesLinks); 
    
  }

  initCategories(){
    const thisHome = this;
    
    for(let category of thisHome.categories){
      const linkHTML = templates.songCategoryLink(category);
      thisHome.dom.categoriesLinks.insertAdjacentHTML('beforeend', linkHTML);
    }
  }

  initSongs(){
    const thisHome = this;

    for(let dataSong in thisHome.data){
      thisHome.song = new Song(thisHome.dom.wrapper, thisHome.data[dataSong]);
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
          song.classList.add(classNames.songs.hidden);
        } else {
          song.classList.remove(classNames.songs.hidden);
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