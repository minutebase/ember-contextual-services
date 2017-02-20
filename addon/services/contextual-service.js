import Service from 'ember-service';
import WeakMap from 'ember-weakmap/weak-map';
import { guidFor } from 'ember-metal/utils';
import getOwner from 'ember-owner/get';

const SERVICE_CACHE = new WeakMap();

export default Service.extend({
  serviceFor(model, context=null) {
    let key = this.serviceKey(model, context);
    if (SERVICE_CACHE.has(key)) {
      return SERVICE_CACHE.get(key);
    } else {
      let service = this.createServiceFor(model, context);
      SERVICE_CACHE.set(key, service);
      return service;
    }
  },

  serviceKey(model, context) {
    let name = this.contextualServiceScope(model);
    let id   = this.contextualServiceID(model);
    return `${name}:${id}:${context || "default"}`;
  },

  contextualServiceID(model) {
    return guidFor(model);
  },

  contextualServiceScope(model) {
    return model.constructor.modelName;
  },

  createServiceFor(model, context) {
    let serviceName;
    let scope = this.contextualServiceScope(model);

    if (context) {
      serviceName = `${scope}/${context}`;
    } else {
      serviceName = scope;
    }

    const ContextualServiceFactory = getOwner(this)._lookupFactory(`contextual-service:${serviceName}`);
    return ContextualServiceFactory.create({ model });
  }

});
