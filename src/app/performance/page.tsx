import Hero from '../components/hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'performance',
};
export default function Page() {
  return (
    <Hero 
      altTxt="Home Image"
      content="Professional Cloud Hosting"
      bgColor={{
        from: 'from-red-500',
        via: 'via-orange-500',
        to: 'to-yellow-500'
      }}
    />
  );
}
