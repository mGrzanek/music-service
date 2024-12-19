import { select, templates } from './../settings.js';
import Song from './Song.js';

class Discover {
  constructor(element, data){
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.render(element);
    thisDiscover.songRandom();
  }

  render(element){
    const thisDiscover = this;

    const generatedHtml = templates.discover();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHtml;
    thisDiscover.dom.songsWrapper = thisDiscover.dom.wrapper.querySelector(select.discover.songsWrapper);
  }

  songRandom() {
    const thisDiscover = this;

    thisDiscover.dom.songsWrapper.innerHTML = '';

    const randomNumber =  Math.floor(Math.random() * thisDiscover.data.length);

    thisDiscover.song = new Song(thisDiscover.dom.wrapper, thisDiscover.data[randomNumber]);
  }
}

export default Discover;