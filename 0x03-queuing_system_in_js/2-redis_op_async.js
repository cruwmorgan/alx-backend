'use strict';
// Import the required libraries using ES6 import syntax
import redis from 'redis';
import util from 'util';

// Create a Redis client
const client = redis.createClient()
  // Set up event handlers for the client
  .on('error', err => console.log(`Redis client not connected to the server: ${err}`))
  .on('ready', () => console.log('Redis client connected to the server'));

const newGet = util.promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, (error, reply) => {
        redis.print(`Reply: ${reply}`);
    });
}

function displaySchoolValue(schoolName) {
  const reply = await newGet(schoolName);
  console.log(reply);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
