import React from 'react';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600">
          Welcome to Talaysai Hotel, where every moment becomes a cherished memory.
          Our commitment to excellence and attention to detail ensures that your stay
          with us is nothing short of extraordinary.
        </p>
      </div>
    </div>
  );
};

export default About;