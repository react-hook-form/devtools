import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    visible: boolean;
    isCollapse: boolean;
    filterName: string;
  }
}
