import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const port = 1245;
const host = '127.0.0.1';

// Create a Redis client and promisify Redis functions
const client = redis.createClient();
const clientGet = promisify(client.get).bind(client);
const clientSet = promisify(client.set).bind(client);

// Initialize the number of available seats to 50
let numberOfAvailableSeats = 50;

// Initialize the reservationEnabled flag to true
let reservationEnabled = true;

const reserveSeat = async (number, available_seats) => {
  await clientSet(available_seats, number.toString());
  numberOfAvailableSeats = number;
}
const queue = kue.createQueue();

app.get('/available_seats', async (req, res) => {
  res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', async (req, res) => {
  if (reservationEnabled === false) {
    res.json({ status: 'Reservation are blocked' });
  } else {
    const job = queue.create('reserve_seat')
    .save((error) => {
      if (!error) res.json({ status: 'Reservation failed' });
    });
    job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
    job.on('failed', (errorMessage) => console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`));
    job.on('progress', () => res.json({ status: 'Reservation in process' }));
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
