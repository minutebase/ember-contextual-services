import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x foo', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
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
