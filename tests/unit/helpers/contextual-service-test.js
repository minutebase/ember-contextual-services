import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Helper | contextual-service', function(hooks) {
  setupTest(hooks);

  test('Looks up a service for the model passed into the helper', function(assert) {
    let helper = this.owner.lookup('helper:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService = helper.compute([person]);

      assert.equal(contextualService.get('fullName'), 'Bob Johnson');
    });
  });

  test('Looks up a service for the model and sub-context passed into the helper', function(assert) {
    let helper = this.owner.lookup('helper:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService = helper.compute([person, 'sub-context']);

      assert.equal(contextualService.get('initials'), 'B.J');
    });
  });
});
