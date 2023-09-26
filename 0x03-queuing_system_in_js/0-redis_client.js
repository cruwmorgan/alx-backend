// Import the required libraries using ES6 import syntax
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Set up event handlers for the client
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Attempt to connect to the Redis server
client.ping((err, response) => {
  if (err) {
    console.error(`Redis client not connected to the server: ${err}`);
  } else {
    console.log('Redis server is running');
  }

  // Close the client connection
  client.quit();
});

