'use strict';
// Import the required libraries using ES6 import syntax
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();
// Set up event handlers for the client
client.on("error", (error) => {
  if (error) console.log(`Redis client not connected to the server: ${error}`)
}).on('ready', () => {
  console.log('Redis client connected to the server');
});

const name = 'HolbertonSchools';
const values = {'Portland': 50,
               'Seattle': 80,
               'New York': 20,
               'Bogota': 20,
               'Cali': 40,
               'Paris': 2}

for (const [key, val] of Object.entries(values)) {
  client.HSET(name, key, val, (error, reply) =>
    redis.print((`Reply: ${reply}`))
  );
}

client.hGetAll(name, (error, object) => console.log(object));
