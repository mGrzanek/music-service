import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(data){
    const thisSong = this;
    thisSong.data = data;
    thisSong.render();
  }
  render(){
    const thisSong = this;

    const generatedHtml = templates.songs(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHtml);
    thisSong.dom = {};
    thisSong.dom.wrapper = document.querySelector(select.containerOf.songsWrapper);
    thisSong.dom.wrapper.appendChild(thisSong.element);
  }
}

export default Song;