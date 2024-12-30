import { select, templates } from './../settings.js';
import SongCategory from './SongCategory.js';

class AddSong {
  constructor(element, data){
    const thisAddSong = this;

    thisAddSong.data = data;
    thisAddSong.render(element);
    thisAddSong.initCategories();
  }

  render(element){
    const thisAddSong = this;

    const generatedHtml = templates.addSong();
    thisAddSong.dom = {};
    thisAddSong.dom.wrapper = element;
    thisAddSong.dom.wrapper.innerHTML = generatedHtml;
  }

  initCategories(){
    const thisAddSong = this;
    thisAddSong.dom.checkboxesWrapper = thisAddSong.dom.wrapper.querySelector(select.containerOf.checkboxesWrapper);

    for(let songCategory in thisAddSong.data){
      thisAddSong.songCategory = new SongCategory(thisAddSong.dom.checkboxesWrapper, thisAddSong.data[songCategory]);
    }
  }
}

export default AddSong;