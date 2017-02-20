import { moduleFor, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleFor('service:contextual-service', 'Unit | Service | contextual service', {
  needs: [
    'model:person',
    'contextual-service:person',
    'contextual-service:person/sub-context',
  ]
});

test('Looks up a service for the model', function(assert) {
  let service = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService = service.serviceFor(person);
    assert.equal(contextualService.get('fullName'), 'Bob Johnson');
  });
});

test('Model is available at `model`', function(assert) {
  let service = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService = service.serviceFor(person);
    assert.ok(contextualService.get('model') === person);
  });
});

test('Looking up a service for the same model returns the same service instance', function(assert) {
  let service = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService1 = service.serviceFor(person);
    let contextualService2 = service.serviceFor(person);

    assert.ok(contextualService1 === contextualService2);
  });
});

test('Looking up a service for a differnt model returns a new service instance', function(assert) {
  let service = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person1 = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });
    let person2 = store.createRecord('person', { firstName: 'Ted', lastName: 'Thompson' });

    let contextualService1 = service.serviceFor(person1);
    let contextualService2 = service.serviceFor(person2);

    assert.ok(contextualService1 !== contextualService2);
  });
});


test('Looks up a service for the model and sub-context', function(assert) {
  let service = this.subject();

  run(() => {
    let store = this.container.lookup('service:store');
    let person = store.createRecord('person', { firstName: 'Bob', lastName: 'Johnson' });

    let contextualService = service.serviceFor(person, 'sub-context');
    assert.equal(contextualService.get('initials'), 'B.J');
  });
});
