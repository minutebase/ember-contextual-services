import { moduleFor, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleFor('helper:contextual-service', 'Unit | Helper | contextual-service', {
  needs: [
    'model:person',
    'service:contextual-service',
    'contextual-service:person',
    'contextual-service:person/sub-context',
  ]
});

test('Looks up a service for the model passed into the helper', function(assert) {
  let helper = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService = helper.compute([person]);

    assert.equal(contextualService.get('fullName'), 'Bob Johnson');
  });
});

test('Looks up a service for the model and sub-context passed into the helper', function(assert) {
  let helper = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService = helper.compute([person, 'sub-context']);

    assert.equal(contextualService.get('initials'), 'B.J');
  });
});
