import { createStore } from 'redux';

export interface ApplicationState {
  loadding: boolean;
  showDetail?: 'EDIT' | 'UPDATE' | 'CREATE';
  showSidebar: boolean;
  user: any;
}

const initialState: ApplicationState = {
  loadding: false,
  showDetail: undefined,
  showSidebar: true,
  user: null,
};

const changeState = (state = initialState, { type, ...rest }: Record<string, any>) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'clear':
      return initialState;
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
