import { templates } from './../settings.js';
import Song from './Song.js';

class Home {
  constructor(element, data){
    const thisHome = this;
    
    thisHome.data = data;
    thisHome.render(element);
    thisHome.initSongs();
  }
  render(element){
    const thisHome = this;

    const generatedHtml = templates.home();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHtml;
    
  }

  initSongs(){
    const thisHome = this;

    for(let dataSong in thisHome.data){
      thisHome.song = new Song(thisHome.dom.wrapper, thisHome.data[dataSong]);
    }
  }
}
export default Home;