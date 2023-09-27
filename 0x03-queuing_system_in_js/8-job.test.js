import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';
import { expect } from 'chai';

describe('createPushNotificationsJobs', function () {
  let queue;

  // Before running the tests, create a new queue and enter test mode
  before(function () {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  // After running the tests, clear the queue and exit test mode
  after(function () {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', function () {
    expect(() => createPushNotificationsJobs(null, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs in the queue', function () {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '1234567890',
        message: 'Another message'
      }
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check if two jobs were created in the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Check if the jobs have the correct type
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
  });
});
