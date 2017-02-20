import computed from 'ember-computed';
import getOwner from 'ember-owner/get';

export default function(propertyName, context) {
  return computed(propertyName, {
    get() {
      let contextualService = getOwner(this).lookup(`service:contextual-service`);
      return contextualService.serviceFor(this.get(propertyName), context);
    }
  });
}
