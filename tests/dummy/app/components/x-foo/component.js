import Component from '@ember/component';
import { serviceFor } from 'ember-contextual-services';

export default Component.extend({
  person: null,

  personService: serviceFor('person'),
  subContextService: serviceFor('person', 'sub-context')
});
