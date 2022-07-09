import _ from 'lodash';

export function proxyToObject<T extends Record<string, any>>(proxy: T) {
  return Reflect.ownKeys(proxy).reduce((perv, key) => {
    perv[key as keyof T] = proxy[key as keyof T];
    return perv;
  }, {} as T);
}

export function nestToFlat<V>(
  flatKeys: string[],
  obj: object,
  defaultValue?: V,
) {
  return flatKeys.reduce((perv, name) => {
    // nested field may be `undefined`
    perv[name] = _.get(obj, name) || defaultValue;
    return perv;
  }, {} as Record<string, V>);
}
