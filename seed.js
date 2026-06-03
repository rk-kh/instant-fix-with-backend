// seed.js
// Run this ONCE to add sample services to the database
// Command: node seed.js

const mongoose = require('mongoose');
const Service  = require('./models/Service');

// Connect to database
mongoose.connect('mongodb://localhost:27017/homeservice')
  .then(() => console.log('Connected to MongoDB...'));

// Sample services to insert
const sampleServices = [
  {
    name: 'AC Repair & Service',
    description: 'Installation, repair and maintenance of all AC brands by certified technicians.',
    price: 'Starting from Rs. 1,500',
    image: 'https://images.unsplash.com/photo-1631693747744-23fcb6e2c08a?w=500&q=80'
  },
  {
    name: 'Electrician',
    description: 'Wiring, socket installation, panel repair and all electrical work done safely.',
    price: 'Starting from Rs. 800',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80'
  },
  {
    name: 'Plumbing',
    description: 'Pipe leaks, tap repair, drain cleaning and full bathroom fitting services.',
    price: 'Starting from Rs. 1,000',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80'
  },
  {
    name: 'Home Cleaning',
    description: 'Deep cleaning of rooms, kitchen, bathroom and sofa shampooing.',
    price: 'Starting from Rs. 2,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'
  },
  {
    name: 'Mobile Repair',
    description: 'Screen replacement, battery change and water damage repair for all phone brands.',
    price: 'Starting from Rs. 500',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80'
  },
  {
    name: 'Carpentry',
    description: 'Furniture assembly, door repair, cabinet fixing and custom woodwork.',
    price: 'Starting from Rs. 1,200',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80'
  }
];

// Delete existing services and insert new ones
async function seedDatabase() {
  await Service.deleteMany({});               // clear old data
  await Service.insertMany(sampleServices);   // insert new data
  console.log('✅ Database seeded with', sampleServices.length, 'services!');
  mongoose.connection.close();                // close connection when done
}

seedDatabase();
