import Head from 'next/head';
import Login from '../components/Login';

function Index() {
  return (
    <>
      <Head>
        <title>Login / Hackatweet</title>
      </Head>
      <Login />
    </>
  );
}

export default Index;
