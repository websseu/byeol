import Image from "next/image";

export default function Home() {
  return (
    <section id="mainPage">
      <h1>
        <Image src="/starbucks.svg" alt="starbucks" width={1400} height={800} />
      </h1>
    </section>
  );
}
