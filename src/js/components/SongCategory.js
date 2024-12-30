import { templates } from './../settings.js';
import utils from './../utils.js';


class SongCategory {
  constructor(wrapper, data){
    const thisSongCategory = this;

    thisSongCategory.data = data;
    thisSongCategory.render(wrapper);
  }

  render(wrapper){
    const thisSongCategory = this;

    const generatedHtml = templates.songCategories(thisSongCategory.data);
    thisSongCategory.element = utils.createDOMFromHTML(generatedHtml);
    thisSongCategory.dom = {};
    thisSongCategory.dom.wrapper = wrapper;
    thisSongCategory.dom.wrapper.appendChild(thisSongCategory.element);
  }
}

export default SongCategory;