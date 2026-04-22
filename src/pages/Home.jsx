import React from 'react';
import Hero from '@/components/home/Hero';
import WhyUs from '@/components/home/WhyUs';
import AssetCategories from '@/components/home/AssetCategories';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TrustCounters from '@/components/home/TrustCounters';
import Testimonials from '@/components/home/Testimonials';
import HalalPromise from '@/components/home/HalalPromise';
import LeadCapture from '@/components/home/LeadCapture';
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <AssetCategories />
      <FeaturedProjects />
      <TrustCounters />
      <HalalPromise />
      <Testimonials />
      <LeadCapture />
      <FAQ />
    </>
  );
}