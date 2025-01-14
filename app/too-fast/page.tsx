const Page = () => {
  return (
    <>
      <main className="root-container flex min-h-screen flex-col items-center justify-center">
        <h1 className="font-bebas-neue text-4xl font-bold text-light-100">
          Whoa, Slow Down There, Speedy!
        </h1>
        <p className="mt-3 max-w-lg text-center text-xl text-white">
          Looks like you&apos;ve been a little too eager.
          <br />
          We&apos;ve put a temporary pause on your excitement. <br />
          Chill for a bit, and try again shortly
        </p>
      </main>
    </>
  );
};

export default Page;
