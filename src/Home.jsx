import React from "react";
import TwitterIcon from "./components/TwitterIcon";
import GithubIcon from "./components/GithubIcon";
import MediumIcon from "./components/MediumIcon";
import logoUrl from "/assets/logo.svg";
import bgUrl from "/assets/background.webp";


export default function Home() {
  return (
    <div className="bg-[#060606] text-zinc-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="py-2 px-12 h-18  text-lg flex flex-row space-x-8">
        </div>
        <div className="mx-auto max-w-7xl px-8 mt-24">
          <img className="mx-auto h-32" src={logoUrl} />
        </div>
        <div className="text-center mt-12 text-2xl">
          Collateral-free, Utility NFT Rental
        </div>
        <div className="flex flex-col space-y-4 max-w-xs sm:w-fit mx-auto mt-24">
          <a href="/app" className="primary-btn-dark text-center">
            Luanch App
          </a>
        </div>
      </div>
      <div className="h-screen max-w-[1920px] mt-12 mx-auto" style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
      }}>
      </div>
      <div className="flex flex-col max-w-2xl mx-auto mt-24 space-y-8 px-8">
        <div className="flex flex-row space-x-2">
          <div className="flex-1 text-xl">COLLATERAL-FREE</div>
          <div className="flex-1">Frictionless rentals. Simple and secure, as it should be!</div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="flex-1 text-xl">PLUG & PLAY</div>
          <div className="flex-1">A seamless integration experience for developers enabled by the SDK </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="flex-1 text-xl">WHITELABEL</div>
          <div className="flex-1">Build your own rental marketplace on top of our infrastructure and improve the user experience of your project </div>
        </div>
      </div>
      <div className="flex flex-col max-w-4xl mx-auto mt-20">
        <div className="flex-1 text-2xl text-center mb-12">Drop-in rental solution for utility NFTs</div>
        <div className="flex flex-row space-x-16">
          <div className="flex flex-col border border-zinc-100 p-8 space-y-2">
            <div className="flex-none text-xl">In-game Assets</div>
            <div className="flex-1">Accelerate the mass adoption of your Web3 game. Let’s smooth the onboarding hurdle!</div>
          </div>
          <div className="flex flex-col border border-zinc-100 p-8 space-y-2">
            <div className="flex-none text-xl">Exclusive Contents</div>
            <div className="flex-1">By renting NFTs, you can bring the recurring revenue to your beloved Web3 content business.</div>
          </div>
          <div className="flex flex-col border border-zinc-100 p-8 space-y-2">
            <div className="flex-none text-xl">And More</div>
            <div className="flex-1">Bring rental model to your IoT devices, WiFi access points, ride share bikes ...</div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-100 mt-20 max-w-4xl mx-auto py-4">
        <div className="flex flex-row space-x-2">
        </div>
        <div className="text-sm mt-4">2023 NFT Rent</div>
      </div>
    </div>
  );
}
