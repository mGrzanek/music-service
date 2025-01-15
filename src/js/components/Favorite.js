import { select, templates } from './../settings.js';
import BaseSubpage from './BaseSubpage.js';
import Song from './Song.js';

class Favorite extends BaseSubpage {
  constructor(element, data, favoriteSongs, userStatus){
    super(data, templates.favorite());
    const thisFavorite = this;

    if(userStatus){
      thisFavorite.favoriteSongs = favoriteSongs;
      thisFavorite.render(element);
      thisFavorite.dom.songsWrapper = thisFavorite.dom.wrapper.querySelector(select.favorite.songsWrapper);
      thisFavorite.showFavorites(favoriteSongs, userStatus);
    } else {
      element.innerHTML = 'Only for subscribers!';
    }
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