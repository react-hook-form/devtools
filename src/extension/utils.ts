import get from 'lodash/get';

export function proxyToObject<T extends Record<string, any>>(proxy: T) {
  return Reflect.ownKeys(proxy).reduce((prev, key) => {
    prev[key as keyof T] = proxy[key as keyof T];
    return prev;
  }, {} as T);
}

export function nestToFlat<V>(
  flatKeys: string[],
  obj: object,
  defaultValue?: V,
) {
  return flatKeys.reduce((prev, name) => {
    // nested field may be `undefined`
    prev[name] = get(obj, name) || defaultValue;
    return prev;
  }, {} as Record<string, V>);
}
