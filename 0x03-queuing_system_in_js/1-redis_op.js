'use strict';
// Import the required libraries using ES6 import syntax
import redis from 'redis';

// Create a Redis client
const client = redis.createClient()
  // Set up event handlers for the client
  .on('error', err => console.log(`Redis client not connected to the server: ${err}`))
  .on('ready', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, (error, reply) => {
        redis.print(`Reply: ${reply}`);
    });
}

function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, reply) => {
        console.log(reply);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
