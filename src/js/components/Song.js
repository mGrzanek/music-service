/* eslint-disable no-undef */
import { select, templates } from './../settings.js';
import utils from './../utils.js';


class Song {
  constructor(data){
    const thisSong = this;
    thisSong.data = data;
    thisSong.render();
    thisSong.initAudioPlayer();
  }
  render(){
    const thisSong = this;

    const generatedHtml = templates.songs(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHtml);
    thisSong.dom = {};
    thisSong.dom.wrapper = document.querySelector(select.containerOf.songsWrapper);
    thisSong.dom.wrapper.appendChild(thisSong.element);
    thisSong.dom.audioPlayer = thisSong.element.querySelector(select.containerOf.audioWrapper);

    console.log(thisSong.dom.audioPlayer); 
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