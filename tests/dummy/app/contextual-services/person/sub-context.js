import ContextualService from 'ember-contextual-services';
import computed from 'ember-computed';

export default ContextualService.extend({
  initials: computed('model.firstName', 'model.lastName', {
    get() {
      let firstName = this.get('model.firstName');
      let lastName  = this.get('model.lastName');
      return `${firstName[0]}.${lastName[0]}`;
    }
  })
});
