import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Service | contextual service', function(hooks) {
  setupTest(hooks);

  test('Looks up a service for the model', function(assert) {
    let service = this.owner.lookup('service:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService = service.serviceFor(person);
      assert.equal(contextualService.get('fullName'), 'Bob Johnson');
    });
  });

  test('Model is available at `model`', function(assert) {
    let service = this.owner.lookup('service:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService = service.serviceFor(person);
      assert.ok(contextualService.get('model') === person);
    });
  });

  test('Looking up a service for the same model returns the same service instance', function(assert) {
    let service = this.owner.lookup('service:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService1 = service.serviceFor(person);
      let contextualService2 = service.serviceFor(person);

      assert.ok(contextualService1 === contextualService2);
    });
  });

  test('Looking up a service for a differnt model returns a new service instance', function(assert) {
    let service = this.owner.lookup('service:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person1 = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });
      let person2 = store.createRecord('person', { firstName: 'Ted', lastName: 'Thompson' });

      let contextualService1 = service.serviceFor(person1);
      let contextualService2 = service.serviceFor(person2);

      assert.ok(contextualService1 !== contextualService2);
    });
  });


  test('Looks up a service for the model and sub-context', function(assert) {
    let service = this.owner.lookup('service:contextual-service');

    run(() => {
      let store = this.owner.lookup('service:store');
      let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

      let contextualService = service.serviceFor(person, 'sub-context');
      assert.equal(contextualService.get('initials'), 'B.J');
    });
  });
});
