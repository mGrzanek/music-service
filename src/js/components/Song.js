/* eslint-disable no-undef */
import { classNames, select, templates } from './../settings.js';
import utils from './../utils.js';


class Song {
  constructor(mainWrapper, data, favoriteSongs, userStatus){
    const thisSong = this;
    
    thisSong.data = data;
    thisSong.userStatus = userStatus;
    thisSong.render(mainWrapper);
    thisSong.initAudioPlayer();
    thisSong.updateFavorite(userStatus, favoriteSongs);
    thisSong.initActions();
  }
  render(mainWrapper){
    const thisSong = this;

    const generatedHtml = templates.songs(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHtml);
    thisSong.dom = {};
    thisSong.dom.mainWrapper = mainWrapper;
    thisSong.dom.wrapper = thisSong.dom.mainWrapper.querySelector(select.containerOf.songsWrapper);
    thisSong.dom.wrapper.appendChild(thisSong.element);
    thisSong.dom.audioPlayer = thisSong.element.querySelector(select.containerOf.audioWrapper);
    thisSong.dom.favoriteIcon = thisSong.element.querySelector(select.song.favoriteIcon);
  }

  initAudioPlayer(){
    const thisSong = this;
    
    new GreenAudioPlayer(thisSong.dom.audioPlayer, { 
      showTooltips: true, 
      showDownloadButton: false, 
      enableKeystrokes: true, 
      stopOthersOnPlay: true 
    });
  }

  initActions(){
    const thisSong = this;
    thisSong.dom.playBtn = thisSong.dom.audioPlayer.querySelector(select.song.playBtn);

    thisSong.dom.playBtn.addEventListener('click', function(){
      const event = new CustomEvent('played-song', {
        bubbles: true,
        detail: {songCategories: thisSong.data.categories}
      });
      thisSong.element.dispatchEvent(event);
    });

    thisSong.dom.favoriteIcon.addEventListener('click', function(){
      if(!thisSong.userStatus || thisSong.userStatus === undefined){
        alert('Available to subscribers only.');

      } else if(thisSong.userStatus){
        thisSong.dom.favoriteIcon.classList.toggle(
          classNames.songs.favorite,
          !thisSong.dom.favoriteIcon.classList.contains(classNames.songs.favorite)
        );
        const event = new CustomEvent('update-favorite', {
          bubbles: true,
          detail: {songId: thisSong.data.id}
        });
        thisSong.element.dispatchEvent(event);
      }
      
    });
  }

  updateFavorite(userStatus, favoriteSongArr){
    const thisSong = this;

    if(userStatus === undefined || !userStatus || favoriteSongArr === undefined){
      thisSong.dom.favoriteIcon.classList.remove(classNames.songs.favorite);
    } else if(!favoriteSongArr.includes(thisSong.data.id)){
      thisSong.dom.favoriteIcon.classList.remove(classNames.songs.favorite);
    } else {
      thisSong.dom.favoriteIcon.classList.add(classNames.songs.favorite);
    }
  }
}

export default Song;