import { io } from 'socket.io-client';

const socket = io('http://192.168.8.100:5000');

export default socket;
