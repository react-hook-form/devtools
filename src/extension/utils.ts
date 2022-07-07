export function proxyToObject<T extends Record<string, any>>(proxy: T) {
  return Reflect.ownKeys(proxy).reduce((perv, key) => {
    perv[key as keyof T] = proxy[key as keyof T];
    return perv;
  }, {} as T);
}
