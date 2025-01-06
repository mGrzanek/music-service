/* eslint-disable no-undef */
import { select, templates } from './../settings.js';
import utils from './../utils.js';


class Song {
  constructor(mainWrapper, data){
    const thisSong = this;
    
    thisSong.data = data;
    thisSong.render(mainWrapper);
    thisSong.initAudioPlayer();
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
  }
}

export default Song;