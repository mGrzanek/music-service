import { select, templates } from './../settings.js';
import Song from './Song.js';

class Favorite {
  constructor(element, data, favoriteSongs, userStatus){
    const thisFavorite = this;

    thisFavorite.data = data;
    thisFavorite.favoriteSongs = favoriteSongs;
    if(userStatus){
      thisFavorite.render(element);
      thisFavorite.showFavorites(favoriteSongs, userStatus);
    } else {
      element.innerHTML = 'Only for subscribers!';
    }
  }
  render(element){
    const thisFavorite = this;

    const generatedHtml = templates.favorite();
    thisFavorite.dom = {};
    thisFavorite.dom.wrapper  = element;
    thisFavorite.dom.wrapper.innerHTML = generatedHtml;
    thisFavorite.dom.songsWrapper = thisFavorite.dom.wrapper.querySelector(select.favorite.songsWrapper);
  }

  showFavorites(favoriteSongs, userStatus){
    const thisFavorite = this;

    thisFavorite.dom.songsWrapper.innerHTML = '';
  
    if(userStatus){
      if(favoriteSongs === undefined){
        favoriteSongs = [];
      } else {
        for(let favoriteSongId of favoriteSongs){
          for(let songData in thisFavorite.data){
            if(favoriteSongId === thisFavorite.data[songData].id){
              thisFavorite.song = new Song(thisFavorite.dom.wrapper, thisFavorite.data[songData], favoriteSongs, userStatus);
            }
          }
        }
      }
    }
  }
}
export default Favorite;