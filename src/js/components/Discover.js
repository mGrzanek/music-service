import { select } from './../settings.js';
import BaseSubpage from './BaseSubpage.js';
import Song from './Song.js';

class Discover extends BaseSubpage {
  constructor(element, data, playedSongsCategories, favoriteSongs, userLogged, publicSongs, mainTemplate, songTemplate){
    super(data, mainTemplate);
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.dom.songsWrapper = thisDiscover.dom.wrapper.querySelector(select.discover.songsWrapper);
    thisDiscover.songRandom(userLogged, playedSongsCategories, favoriteSongs, publicSongs, songTemplate);
  }

  songRandom(userLogged, playedSongsCategories, favoriteSongs, publicSongs, songTemplate) {
    const thisDiscover = this;
    
    thisDiscover.dom.songsWrapper.innerHTML = '';
    if(userLogged){
      const currentValues = thisDiscover.calculateMaxParam(playedSongsCategories);
      if(currentValues.valueMax === 0){
        const randomNumber = Math.floor(Math.random() * thisDiscover.data.length);
        thisDiscover.song = new Song(thisDiscover.dom.wrapper, thisDiscover.data[randomNumber], favoriteSongs, userLogged, songTemplate);
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
        thisDiscover.song = new Song(thisDiscover.dom.wrapper, currentSongs[randomNumber], favoriteSongs, userLogged, songTemplate);
      }
    }
    if(!userLogged || userLogged === undefined ){
      const randomNumber = Math.floor(Math.random() * publicSongs.length);

      thisDiscover.song = new Song(thisDiscover.dom.wrapper, publicSongs[randomNumber], favoriteSongs, userLogged, songTemplate);
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