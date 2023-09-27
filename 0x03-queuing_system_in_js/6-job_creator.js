import kue from 'kue';
const queue = kue.createQueue();

const job = queue.create('push_notification_code', {
    phoneNumber: '2348104388928'
  , message: 'Send me a code here'
}).save((err) => {
   if(!err) console.log(job.id);
});

job.on('complete', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification job failed'));
