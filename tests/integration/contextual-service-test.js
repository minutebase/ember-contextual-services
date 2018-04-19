import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | contexual-service', function(hooks) {
  setupRenderingTest(hooks);

  module('Using a component', function() {
    test('it renders the data from the service', async function(assert) {
      run(() => {
        let store = this.owner.lookup('service:store');

        let person = store.createRecord('person', {
          firstName: 'Ted',
          lastName: 'Baker'
        });

        this.set('person', person);
      });

      await render(hbs`{{x-foo person=person}}`);

      assert.equal(find('.full-name').textContent.trim(), 'Ted Baker');
      assert.equal(find('.initials').textContent.trim(), 'T.B');
    });
  });

  module('Using a helper', function() {

    test('it renders the data from the service', async function(assert) {
      run(() => {
        let store = this.owner.lookup('service:store');

        let person = store.createRecord('person', {
          firstName: 'Ted',
          lastName: 'Baker'
        });

        this.set('person', person);
      });

      await render(hbs`
        {{#with (contextual-service person) as |personService|}}
          <span class="full-name">{{personService.fullName}}</span>
        {{/with}}

        {{#with (contextual-service person 'sub-context') as |personService|}}
          <span class="initials">{{personService.initials}}</span>
        {{/with}}
      `);

      assert.equal(find('.full-name').textContent.trim(), 'Ted Baker');
      assert.equal(find('.initials').textContent.trim(), 'T.B');
    });

  });

});
