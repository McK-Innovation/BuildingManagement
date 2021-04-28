import Keycloak from "keycloak-js";

const key = {
    url: 'https://buildingsensedemo.mckenneys.tech/auth/',
    realm: 'testAnalyticsRealm',
    clientId: 'react',
    sslRequired: "external",
    publicClient: true,
    confidentialPort: 0,
}

 const keycloak = new Keycloak(key)
export default keycloak

