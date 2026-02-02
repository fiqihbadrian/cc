// referensi https://github.com/JastinXyz/cvmaker
import Image from "next/image";

export default function Home() {
  return (
    <main className="default-font flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to CV Marker!</h1>
        <p className="text-lg">Create Your CV</p>
      </div>
      <div className=" p-25 w-96 bg-base-100 shadow-xl ">
        <div className="card-body items-center text-center ">
          <h2 className="card-title">Create Your CV</h2>
          <p>Input your data to create a professional CV.</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn text-black hover:text-red p-10 border-full">Start Now</button>
          </div>
        </div>
      </div>
    </main>
  );
}
