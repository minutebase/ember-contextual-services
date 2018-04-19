import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  contextualService: service(),

  compute([model, context]) {
    return this.get('contextualService').serviceFor(model, context);
  }
});
