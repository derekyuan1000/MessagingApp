/**
 * This file is used on the server side only to interact with PostgreSQL
 * Add the "use server" directive to ensure this code only runs on the server
 */
"use server";

// We'll implement a solution that avoids pg installation issues
// Instead, we'll use a more compatible approach for Render.com deployment

import fs from 'fs';
import path from 'path';

// Define paths for local development data storage
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Function to read data from file or initialize empty data
const readJsonFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
  return null;
};

// Function to write data to file
const writeJsonFile = (filePath: string, data: any) => {
  try {
    const dirName = path.dirname(filePath);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    return false;
  }
};

// Database operations - these will be replaced with PostgreSQL queries on Render
export async function queryDatabase(operation: string, params?: any) {
  // This is where we would connect to PostgreSQL on Render.com
  // For local development we'll use file system storage

  // For production (Render.com) we'd use something like:
  // if (process.env.DATABASE_URL) {
  //   const { Pool } = require('pg');
  //   const pool = new Pool({
  //     connectionString: process.env.DATABASE_URL,
  //     ssl: { rejectUnauthorized: false }
  //   });
  //   return await pool.query(operation, params);
  // }

  // File-based operations for local development
  switch (operation) {
    case 'GET_USERS':
      return { rows: Object.values(readJsonFile(USERS_FILE) || {}) };

    case 'GET_USER':
      const users = readJsonFile(USERS_FILE) || {};
      const user = users[params?.username];
      return { rows: user ? [user] : [] };

    case 'ADD_USER':
      const allUsers = readJsonFile(USERS_FILE) || {};
      if (allUsers[params?.username]) {
        return { rowCount: 0 }; // User already exists
      }
      allUsers[params?.username] = {
        username: params?.username,
        password: params?.password
      };
      writeJsonFile(USERS_FILE, allUsers);
      return { rowCount: 1 };

    case 'GET_MESSAGES':
      const messages = readJsonFile(MESSAGES_FILE) || [];
      const filteredMessages = params?.username
        ? messages.filter((msg: any) =>
            msg.from === params.username || msg.to === params.username)
        : messages;
      return { rows: filteredMessages };

    case 'ADD_MESSAGE':
      const allMessages = readJsonFile(MESSAGES_FILE) || [];
      allMessages.push(params);
      writeJsonFile(MESSAGES_FILE, allMessages);
      return { rowCount: 1 };

    default:
      return { rows: [], rowCount: 0 };
  }
}

export async function initDatabase() {
  // Initialize local files if they don't exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    writeJsonFile(USERS_FILE, {});
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    writeJsonFile(MESSAGES_FILE, []);
  }

  return true;
}
