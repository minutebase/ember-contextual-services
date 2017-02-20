import { moduleForComponent, test } from 'ember-qunit';
import run from 'ember-runloop';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-foo', 'Integration | Component | x foo', {
  integration: true
});

test('it renders', function(assert) {
  run(() => {
    let store = this.container.lookup('service:store');

    let person = store.createRecord('person', {
      firstName: 'Ted',
      lastName: 'Baker'
    });

    this.set('person', person);
  });

  this.render(hbs`{{x-foo person=person}}`);

  assert.equal(this.$('.full-name').text().trim(), 'Ted Baker');
  assert.equal(this.$('.initials').text().trim(), 'T.B');
});
