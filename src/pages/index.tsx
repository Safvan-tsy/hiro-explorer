import { HomeClient } from '@/app/HomeClient';
import { Meta } from '@/components/meta-head';
import { FC } from 'react';

const Home: FC = () => {
  console.log('[DEBUG] rendering home page');
  return (
    <>
      <Meta />
      <HomeClient />
    </>
  );
};

export default Home;
