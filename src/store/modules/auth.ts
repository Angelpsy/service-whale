import {
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import { RootState } from '@/store/types';
import AuthApi from '@/api/auth';

interface AuthState {
  _isAuth: boolean;
}

export const authState: AuthState = {
  _isAuth: false,
};

const getters: GetterTree<AuthState, RootState> = {
  isAuth(state): boolean {
    return state._isAuth;
  },
};

export const mutations: MutationTree<AuthState> = {
  login(state: AuthState) {
    state._isAuth = true;
  },
  logout(state: AuthState) {
    state._isAuth = false;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  checkAuth() {
    // Здесь должен быть метод запроса любого эндпоинта до апи (удобней до данных пользователя),
    // чтобы проверять есть ли авторизация с предыдущего захода
    // вызывается один раз при заходе в приложение
  },
  async login({ commit }, data: Parameters<typeof AuthApi.sendLogin>[0]) {
    try {
      await AuthApi.sendLogin(data);
      commit('login');
    } catch (e) {
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      await AuthApi.logout();
      commit('logout');
    } catch (e) {
      console.log(e);
    }
  },
};

const namespaced = true;

const auth: Module<AuthState, RootState> = {
  namespaced,
  state: authState,
  getters,
  mutations,
  actions,
};

export default auth;
