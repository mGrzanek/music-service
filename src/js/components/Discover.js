import { select, templates } from './../settings.js';
import Song from './Song.js';

class Discover {
  constructor(element, data, playedSongsCategories, favoriteSongs, userLogged, publicSongs){
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.render(element);
    thisDiscover.songRandom(userLogged, playedSongsCategories, favoriteSongs, publicSongs);
  }

  render(element){
    const thisDiscover = this;

    const generatedHtml = templates.discover();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHtml;
    thisDiscover.dom.songsWrapper = thisDiscover.dom.wrapper.querySelector(select.discover.songsWrapper);
  }

  songRandom(userLogged, playedSongsCategories, favoriteSongs, publicSongs) {
    const thisDiscover = this;

    thisDiscover.dom.songsWrapper.innerHTML = '';
    if(!userLogged || userLogged === undefined ){
      const randomNumber = Math.floor(Math.random() * publicSongs.length);

      thisDiscover.song = new Song(thisDiscover.dom.wrapper, publicSongs[randomNumber], favoriteSongs, userLogged);
    } else if(userLogged){
      const currentValues = thisDiscover.calculateMaxParam(playedSongsCategories);
      if(currentValues.valueMax === 0){
        const randomNumber = Math.floor(Math.random() * thisDiscover.data.length);
        thisDiscover.song = new Song(thisDiscover.dom.wrapper, thisDiscover.data[randomNumber], favoriteSongs, userLogged);
      } else {
        let currentSongs = [];
        for(let songData in thisDiscover.data){
          for(let category of thisDiscover.data[songData].categories){
            if(category === currentValues.valueParam){
              currentSongs.push(thisDiscover.data[songData]);
            }
          }
        }
        const randomNumber = Math.floor(Math.random() * currentSongs.length);
        thisDiscover.song = new Song(thisDiscover.dom.wrapper, currentSongs[randomNumber], favoriteSongs, userLogged);
      }
    }
  }

  calculateMaxParam(params){
    const values = {
      valueMax: 0,
      valueParam: null
    };
    for(let param in params){
      if(params[param].amount > values.valueMax){
        values.valueMax = params[param].amount;
        values.valueParam = param;
      }
    }
    return values;
  }
}

export default Discover;