class ObjectMapper {
  static project(object, keys) {
    // If keys is just a string, we want it to pick just that field.
    if (!Array.isArray(keys) && typeof keys === 'string') {
      if (Object.keys(object).includes(keys)) return object[keys];
      return {};
    }
    /* The rest of the statement treats keys as an Array */
    if (!keys.length) return object;
    return keys.reduce((mapResult, field) => {
      if (object[field] === undefined) return mapResult;
      // @TODO Not very efficient returning new copy of object, is it?
      return Object.assign(mapResult, {[field]: object[field]});
    }, {});
  }

  static except(object, excludeKeys) {
    return Object.keys(object)
      .filter(key => !excludeKeys.includes(key))
      .reduce((mapResult, key) => {
        return Object.assign(mapResult, {[key]: object[key]});
      }, {});
  }
}

module.exports = ObjectMapper;
