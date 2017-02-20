# ember-contextual-services

Services, for instances.

## Installation

```
ember install ember-contextual-services
```

## Usage

First define an instance service for an object type, eg for an ember-data `Person`:

```javascript
// app/contextual-services/person.js
import ContextualService from 'ember-contextual-services';
import computed from 'ember-computed';

export default ContextualService.extend({
  fullName: computed('model.firstName', 'model.lastName', function() {
    return [this.get('model.firstName'), this.get('model.lastName')].join(' ');
  })
});
```

Then we can inject the `contextual-service` service and fetch the instance service for an object using `serviceFor`:

```javascript
// app/components/x-person/component.js
import Component from 'ember-component';
import service from 'ember-service/inject';

export default Component.extend({
  contextualService: service(),
  person: null,

  doSomething() {
    const personService = this.get('contextualService').serviceFor(this.get('person'));
    personService.get('fullName');
  }
});
```

Or in templates we can use the `contextual-service` helper:

```handlebars
{{get (contextual-service person) 'fullName'}}
```

For simple properties, this is a bit overkill, but where it comes into its own is in conjunction with ember-concurrency:

```javascript
// app/contextual-services/person.js
import ContextualService from 'ember-contextual-services';
import { task, timeout } from 'ember-concurrency';

export default ContextualService.extend({
  debouncedSave: task(function * () {
    yield timeout(1000)
    yield this.get('model').save();
  }).restartable();
});
```

## Contexts

`serviceFor` takes a 2nd parameter as a "context" so you can split out functionality for an object type across separate files.

For example `serviceFor(person, 'display')` will lookup the service from `app/contextual-services/person/display.js` instead of just `app/contextual-services/person.js`.

## Service lookup

By default `serviceFor` will use the ember-data `modelName` in order to find the service.

You can change this by extending the service and overriding `contextualServiceScope`:

```javascript
import ContextualServicesService from 'ember-contextual-services/services/contextual-service';
export default ContextualServicesService.extend({
  contextualServiceScope(model) {
    return 'foo';
  }
});
```

serviceFor uses the `guid` as the id so that the same service instance is returned each time for the same object.

Again this can be changed by overriding `contextualServiceID`, for example using the `id` instead:

```javascript
import ContextualServicesService from 'ember-contextual-services/services/contextual-service';
export default ContextualServicesService.extend({
  contextualServiceID(model) {
    return model.get('key');
  }
});
```
