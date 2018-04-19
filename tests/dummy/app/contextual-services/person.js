import ContextualService from 'ember-contextual-services';
import { computed } from '@ember/object';

export default ContextualService.extend({
  fullName: computed('model.{firstName,lastName}', {
    get() {
      let firstName = this.get('model.firstName');
      let lastName  = this.get('model.lastName');
      return `${firstName} ${lastName}`;
    }
  })
});
