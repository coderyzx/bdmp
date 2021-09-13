import { AuthClient } from 'uih-uplus-auth-client'; // '../../../node_modules/uih-uplus-auth-client/src/index';//
import AuthConfig from './authConfig.js';

const authClient = new AuthClient(AuthConfig);

export default authClient;
