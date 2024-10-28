import React from 'react';
import Hero from '../components/home/Hero';
import Facilities from '../components/home/Facilities';
import RoomsList from '../components/home/RoomsList';
import Reviews from './components/home/Reviews'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Facilities />
      <RoomsList />
      <Testimonials />
    </div>
  );
};

export default Home;