import Head from 'next/head';
import Home from '../components/Home';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home / Hackatweet</title>
      </Head>
      <Home />
    </>
  );
}

export default HomePage;
