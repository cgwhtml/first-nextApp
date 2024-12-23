import Hero from './components/hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'home',
};
export default function Page() {
  return (
    <Hero 
      altTxt="Home Image"
      content="Professional Cloud Hosting"
      bgColor={{
        from: 'from-indigo-600',
        via: 'via-pink-600',
        to: 'to-purple-700'
      }}
    />
  );
}
