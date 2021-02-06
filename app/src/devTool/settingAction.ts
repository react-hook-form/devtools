export function setVisible(state: any, payload: any) {
  return {
    ...state,
    visible: payload,
  };
}

export function setCollapse(state: any, payload: any) {
  return {
    ...state,
    isCollapse: payload,
  };
}
