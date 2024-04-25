import { WsClient } from './wsClient';

const wsClient = new WsClient(`${import.meta.env.VITE_BASE_URL}/room`);

export default wsClient;
