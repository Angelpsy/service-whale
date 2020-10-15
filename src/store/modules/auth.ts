import { Module, GetterTree } from 'vuex';
import { RootState } from '@/store/types';

const getters: GetterTree<null, RootState> = {
  isAuth(): boolean {
    return false; // TODO: is rootState.user.user !== null
  },
};

const namespaced = true;

const auth: Module<null, RootState> = {
  namespaced,
  getters,
};

export default auth;
