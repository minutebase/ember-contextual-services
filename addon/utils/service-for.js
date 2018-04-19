import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default function(propertyName, context) {
  return computed(propertyName, {
    get() {
      let contextualService = getOwner(this).lookup(`service:contextual-service`);
      return contextualService.serviceFor(this.get(propertyName), context);
    }
  });
}
