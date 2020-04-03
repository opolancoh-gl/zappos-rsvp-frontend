function getEnvironmentAPIInfo(env) {
  const ENVIRONMENT_VARIABLES = {
    development: {
      port: 3001,
    },
    production: {},
  };
  return ENVIRONMENT_VARIABLES[env];
}

window.$app = {
  setLogInVerifier(verifier) {
    this.verifier = verifier;
  },
  async isLoggedIn() {
    const loggedIn = await this.verifier();
    return loggedIn;
  },
  apiInfo: {
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    basepath: '/api/v1/',
    ...getEnvironmentAPIInfo(
      window.location.hostname === 'localhost' ? 'development' : 'production',
    ),
  },
  getApiURL() {
    const { apiInfo } = this;
    return `${apiInfo.protocol}//${apiInfo.hostname}:${apiInfo.port}${apiInfo.basepath}`;
  },
};
