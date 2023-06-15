import Head from "next/head";
import { useRouter } from "next/router";

interface ServerTime {
  toLocaleString: () => string;
}

/**
 * Calculates the time difference between the server time and client time.
 * @param {Date} serverTime - The server time.
 * @param {Date} clientTime - The client time.
 * @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (
  serverTime: Date,
  clientTime: Date
) => {
  // Calculate the time difference
  const timeDiff = Math.abs(serverTime.getTime() - clientTime.getTime());

  // Calculate the number of seconds in the time difference
  const seconds = Math.floor(timeDiff / 1000) % 60;

  // Calculate the number of minutes in the time difference
  const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;

  // Calculate the number of hours in the time difference
  const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;

  // Calculate the number of days in the time difference
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

interface HomeProps {
  serverTime: ServerTime;
}

export default function Home({ serverTime }: HomeProps) {
  const router = useRouter();
  const clientTime = new Date();

  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  const timeDifference = calculateTimeDifference(serverTime, clientTime);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">{serverTime.toLocaleString()}</span>
          </p>
          <p>
            Time diff: <span className="serverTime">{timeDifference}</span>
          </p>
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const serverTime = new Date();
  return {
    props: {
      serverTime,
    },
  };
}