import fs from 'fs';
import path from 'path';

// Define paths for our data files
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Type definitions
export interface User {
  username: string;
  password: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

// Initialize storage with data from files or empty defaults
let users: { [key: string]: User } = {};
let messages: Message[] = [];

// Load data from files if they exist
try {
  if (fs.existsSync(USERS_FILE)) {
    const userData = fs.readFileSync(USERS_FILE, 'utf8');
    users = JSON.parse(userData);
  }

  if (fs.existsSync(MESSAGES_FILE)) {
    const messageData = fs.readFileSync(MESSAGES_FILE, 'utf8');
    messages = JSON.parse(messageData);
  }
} catch (error) {
  console.error('Error loading data:', error);
}

// Save data to files
const saveUsers = () => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

const saveMessages = () => {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
};

// User management functions
export const addUser = (username: string, password: string): boolean => {
  if (users[username]) {
    return false; // User already exists
  }

  users[username] = { username, password };
  saveUsers();
  return true;
};

export const getUser = (username: string): User | null => {
  return users[username] || null;
};

export const getAllUsers = (): { username: string }[] => {
  return Object.values(users).map(user => ({ username: user.username }));
};

// Message management functions
export const addMessage = (message: Message): void => {
  messages.push(message);
  saveMessages();
};

export const getMessagesForUser = (username: string): Message[] => {
  return messages.filter(msg => msg.from === username || msg.to === username);
};

// Export users and messages for backward compatibility
export { users, messages };
