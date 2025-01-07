import { templates } from './../settings.js';
import Song from './Song.js';

class Favorite {
  constructor(element, data, favoriteSongs, userStatus){
    const thisFavorite = this;

    thisFavorite.data = data;
    console.log('data favorite', thisFavorite.data);
    thisFavorite.render(element);
    thisFavorite.showFavorites(favoriteSongs, userStatus);
  }
  render(element){
    const thisFavorite = this;

    const generatedHtml = templates.favorite();
    thisFavorite.dom = {};
    thisFavorite.dom.wrapper  = element;
    thisFavorite.dom.wrapper.innerHTML = generatedHtml;
  }

  showFavorites(favoriteSongs, userStatus){
    const thisFavorite = this;
    console.log('favoriteSongs', favoriteSongs);
    console.log('userStatus', userStatus);
  
    if(userStatus){
      for(let favoriteSongId of favoriteSongs){
        console.log('favorite songid', favoriteSongId);
        for(let songData in thisFavorite.data){
          console.log('song Data Id', thisFavorite.data[songData].id);
          if(favoriteSongId === thisFavorite.data[songData].id){
            thisFavorite.song = new Song(thisFavorite.dom.wrapper, thisFavorite.data[songData]);
          }
        }
      }
    }
  }
}
export default Favorite;