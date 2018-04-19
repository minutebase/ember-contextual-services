import Service from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { getOwner } from '@ember/application';

const SERVICE_CACHE = {};

export default Service.extend({
  serviceFor(model, context=null) {
    let key = this.serviceKey(model, context);
    if (SERVICE_CACHE[key]) {
      return SERVICE_CACHE[key];
    } else {
      let service = this.createServiceFor(model, context);
      SERVICE_CACHE[key] = service;
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

    const ContextualServiceFactory = this.serviceFactory(serviceName);
    return ContextualServiceFactory.create({ model });
  },

  serviceFactory(serviceName) {
    const lookupName = `contextual-service:${serviceName}`;
    const owner = getOwner(this);
    if (owner.factoryFor) {
      return owner.factoryFor(lookupName);
    } else {
      return owner._lookupFactory(lookupName);
    }
  }

});
