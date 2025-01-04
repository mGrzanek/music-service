/* eslint-disable no-undef */
import { select, templates } from './../settings.js';
import utils from './../utils.js';


class Song {
  constructor(mainWrapper, data){
    const thisSong = this;
    
    thisSong.data = data;
    thisSong.render(mainWrapper);
    thisSong.initAudioPlayer();
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
}

export default Song;