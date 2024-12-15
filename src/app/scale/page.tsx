import { Metadata } from 'next';
import Hero from '../components/hero';

export const metadata: Metadata = {
  title: 'Scale',
};

export default function ScalePage() {
  return (
    <Hero 
      altTxt="Scale Image"
      content="Scale Your Application"
      bgColor={{
        from: 'from-green-400',
        via: 'via-emerald-500',
        to: 'to-teal-600'
      }}
    />
  );
}
