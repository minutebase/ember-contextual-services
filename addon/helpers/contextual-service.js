import Helper from 'ember-helper';
import service from 'ember-service/inject';

export default Helper.extend({
  contextualService: service(),

  compute([model, context]) {
    return this.get('contextualService').serviceFor(model, context);
  }
});
