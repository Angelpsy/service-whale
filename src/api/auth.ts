import instance from './instance';

const Api = {
  sendLogin({ login, password }: { login: string; password: string }) {
    const params = new URLSearchParams();
    params.append('j_username', login);
    params.append('j_password', password);
    return instance.post('/j_spring_security_check', params,
      {
        headers: {
          'FROM-ANGULAR': 'true',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => response.data.data);
  },
  logout() {
    return instance.get('/j_spring_security_logout');
  },
};

export default Api;
