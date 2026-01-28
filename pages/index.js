import { Baloo_2 } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const baloo = Baloo_2({ 
  subsets: ['latin'], 
  weight: ['400', '600', '800']
})

export default function Home() {
  return (
    <div className="pb-10 md:pb-14">
      {/* Board */}
      <div className="flex justify-center items-center relative h-screen bg-[url('/doodle.webp')] bg-cover bg-left">
        <div className="absolute inset-0 bg-gradient-to-b z-0" />

        <div className="relative z-10 text-white w-fit mx-auto">
          <h1 className={`${baloo.className} text-shadow-custom tracking-[-6px] font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[160px] text-center`}>
            Fauzan Husain
          </h1>

          <div className="flex justify-between mt-[-9px] md:-[-12px] leading-3 md:leading-3 2xl:leading-4 w-full text-xs sm:text-sm md:text-base 2xl:text-xl font-bold">
            <p className='text-shadow-custom'>Fullstack Javascript <br /> Developer</p>
            <p className='text-shadow-custom'>Blockchain <br /> Developer</p>
          </div>
        </div>
      </div>

      {/* social media */}
      <div>
        <div className="flex justify-center gap-6 sm:gap-12 mt-12">
          <Link href="https://www.instagram.com/_fauzanhusain/">
            <Image src="/icon/instagram.png" width={30} height={0} className="w-[20px] sm:w-[25px] 2xl:w-[40px]" alt="Instagram" />
          </Link>
          <Link href="https://www.github.com/achmadfauzanhusain">
            <Image src="/icon/github.png" width={30} height={0} className="w-[20px] sm:w-[25px] 2xl:w-[40px]" alt="GitHub" />
          </Link>
          <Link href="https://wa.me/6289684053091">
            <Image src="/icon/whatsapp.png" width={30} height={0} className="w-[20px] sm:w-[25px] 2xl:w-[40px]" alt="Portfolio" />
          </Link>
          <Link href="https://www.linkedin.com/in/achmadfauzanhusain">
            <Image src="/icon/linkedin.png" width={30} height={0} className="w-[20px] sm:w-[25px] 2xl:w-[40px]" alt="LinkedIn" />
          </Link>
        </div>
      </div>

      {/* projects */}
      <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-16 md:mt-18">
        {/* Judul */}
        <h1
          className={`${baloo.className} text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold`}
        >
          {"REAL PROJECTS".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all hover:bg-[#9694FF] hover:text-white hover:rounded-full duration-200 hover:scale-125 hover:rotate-6 cursor-pointer"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="text-xs md:text-sm 2xl:text-lg text-gray-600">
          Projects that I only want to showcase
        </p>

        {/* Grid Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6 mt-8">
          <Link
            href="https://grants-dao-two.vercel.app/"
            className="bg-[url('/projects/grants.webp')] relative rounded-xl overflow-hidden shadow-lg group min-h-[300px] md:min-h-[400px] bg-cover bg-top md:bg-center p-2 md:p-3 flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Text */}
            <div className="relative z-10">
              <p className={`${baloo.className} mt-2 font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 text-white transition-all duration-300`}>
                Grants Dao
              </p>
              <p className="text-xs md:text-sm opacity-0 group-hover:opacity-75 mt- leading-5 text-white transition-all duration-300">
                Grants DAO is a decentralized organization that manages pooled funds to finance community projects or initiatives through a member voting mechanism.
              </p>
            </div>
          </Link>
          <Link
            href="https://github.com/achmadfauzanhusain/virgo-app-server"
            className="bg-[url('/projects/virgo.webp')] relative rounded-xl overflow-hidden shadow-lg group min-h-[300px] md:min-h-[400px] bg-cover bg-top md:bg-center p-2 md:p-3 flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Text */}
            <div className="relative z-10">
              <p className={`${baloo.className} mt-2 font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 text-white transition-all duration-300`}>
                Virgo
              </p>
              <p className="text-xs md:text-sm opacity-0 group-hover:opacity-75 mt- leading-5 text-white transition-all duration-300">
                Virgo adalah aplikasi sosial media yang memungkinkan pengguna untuk berbagi momen, foto, dan video dengan teman-teman mereka, serta menjelajahi konten dari pengguna lain. tapi ini hanya kode backend.
              </p>
            </div>
          </Link>
          <Link
            href="https://kebunmu.vercel.app/"
            className="bg-[url('/projects/kebunmu.webp')] relative rounded-xl overflow-hidden shadow-lg group min-h-[300px] md:min-h-[400px] bg-cover bg-top md:bg-center p-2 md:p-3 flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Text */}
            <div className="relative z-10">
              <p className={`${baloo.className} mt-2 font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 text-white transition-all duration-300`}>
                Kebunmu
              </p>
              <p className="text-xs md:text-sm opacity-0 group-hover:opacity-75 mt- leading-5 text-white transition-all duration-300">
                Kebunmu is an application that allows users to efficiently manage their gardens, fertilize, monitor plant growth, and is integrated with Gemini AI.
              </p>
            </div>
          </Link>
          <Link
            href="https://github.com/achmadfauzanhusain/fauzanchenko-smartcontract"
            className="bg-[url('/projects/nft-marketplace.webp')] relative rounded-xl overflow-hidden shadow-lg group min-h-[300px] md:min-h-[400px] bg-cover bg-top md:bg-center p-2 md:p-3 flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Text */}
            <div className="relative z-10">
              <p className={`${baloo.className} mt-2 font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 text-white transition-all duration-300`}>
                NFT Marketplace
              </p>
              <p className="text-xs md:text-sm opacity-0 group-hover:opacity-75 mt- leading-5 text-white transition-all duration-300">
                NFT Marketplace is a platform that allows users to buy & mint NFT fauzanchenko
              </p>
            </div>
          </Link>
          <Link
            href="https://github.com/achmadfauzanhusain/tokenMaster-smartcontract"
            className="bg-[url('/projects/tokenmaster.webp')] relative rounded-xl overflow-hidden shadow-lg group min-h-[300px] md:min-h-[400px] bg-cover bg-top md:bg-center p-2 md:p-3 flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Text */}
            <div className="relative z-10">
              <p className={`${baloo.className} mt-2 font-bold text-lg md:text-2xl opacity-0 group-hover:opacity-100 text-white transition-all duration-300`}>
                TokenMaster Smart Contract
              </p>
              <p className="text-xs md:text-sm opacity-0 group-hover:opacity-75 mt- leading-5 text-white transition-all duration-300">
                TokenMaster is a smart contract for purchasing event tickets, allowing users to buy event tickets using ERC721 tokens.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* e-certificate */}
      <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-20 md:mt-28">
        <h1
          className={`${baloo.className} text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold`}
        >
          {"E-Certificate".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all hover:bg-[#9694FF] hover:text-white hover:rounded-full duration-200 hover:scale-125 hover:rotate-6 cursor-pointer"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="text-xs md:text-sm 2xl:text-lg text-gray-600">
          Certificate from the training I attended
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {/* Card 1 */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-4 bg-[#D9D9D9]/30 p-3 rounded-lg">
            {/* Gambar */}
            <div className="basis-1/2 md:basis-auto">
              <Image
                src="/certificate/certificate-1.webp"
                width={200}
                height={0}
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* Teks */}
            <div className="flex flex-col justify-between basis-1/2 md:basis-auto mt-1">
              <div>
                <h2 className="text-sm 2xl:text-xl font-semibold">
                  Bootcamp: Fullstack Javascript Developer
                </h2>
                <p className="text-xs 2xl:text-lg mt-1 2xl:mt-3 opacity-60">
                  In this bootcamp we learn to create and develop
                  <br className="hidden lg:block" />
                  top up game voucher applications using mongodb,
                  <br className="hidden lg:block" />
                  expressjs, reactjs, and nodejs.
                </p>
              </div>
              <div className="mt-4">
                <Image
                  src="/tech/tech1.png"
                  width={200}
                  height={0}
                  className="w-[140px] md:w-[170px] 2xl:w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-4 bg-[#D9D9D9]/30 p-3 rounded-lg">
            {/* Gambar */}
            <div className="basis-1/2 md:basis-auto order-none sm:order-2 md:order-none">
              <Image
                src="/certificate/certificate-2.webp"
                width={200}
                height={0}
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* Teks */}
            <div className="flex flex-col justify-between basis-1/2 md:basis-auto mt-1 order-none sm:order-1 md:order-none">
              <div>
                <h2 className="text-sm 2xl:text-xl font-semibold">
                  Bootcamp: CSS Introduction
                </h2>
                <p className="text-xs 2xl:text-lg mt-1 2xl:mt-3 opacity-60">
                  In this bootcamp, we are only taught HTML and CSS.
                </p>
              </div>
              <div className="mt-4">
                <Image
                  src="/tech/tech2.png"
                  width={200}
                  height={0}
                  className="w-[60px] md:w-[70px] 2xl:w-[90px]"
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-4 bg-[#D9D9D9]/30 p-3 rounded-lg">
            {/* Gambar */}
            <div className="basis-1/2 md:basis-auto">
              <Image
                src="/certificate/certificate-3.webp"
                width={200}
                height={0}
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* Teks */}
            <div className="flex flex-col justify-between basis-1/2 md:basis-auto mt-1">
              <div>
                <h2 className="text-sm 2xl:text-xl font-semibold">
                  Bootcamp: Backend Javascript Developer
                </h2>
                <p className="text-xs 2xl:text-lg mt-1 2xl:mt-3 opacity-60">
                  In this bootcamp I learned by working on several tasks,
                  <br className="hidden lg:block" />
                  and the final project was to create an API project
                  <br className="hidden lg:block" />
                  that connects to the database.
                </p>
              </div>
              <div className="mt-4">
                <Image
                  src="/tech/tech1.png"
                  width={200}
                  height={0}
                  className="w-[140px] md:w-[170px] 2xl:w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* art */}
      <div className="bg-[url('/fauzanhusain.webp')] bg-cover bg-center w-full h-[100px] sm:h-[150px] md:h-[250px] mt-14 md:mt-20"></div>

      {/* internship */}
      <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-12 md:mt-28">
        <h1
          className={`${baloo.className} text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold`}
        >
          {"Internship".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all hover:bg-[#9694FF] hover:text-white hover:rounded-full duration-200 hover:scale-125 hover:rotate-6 cursor-pointer"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="text-xs md:text-sm 2xl:text-lg text-gray-600">
          My internship in tech company
        </p>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-6'>
          <div className='hover:bg-[#0A66C2] shadow-xl hover:text-white hover:border transition-all duration-300 cursor-pointer text-black p-3 sm:p-6 rounded-xl'>
            <h1 className='text-xs sm:text-sm 2xl:text-sm font-bold'>PT TRANS NASIONAL TEKNOLOGI</h1>
            <p className='opacity-60 text-xs 2xl:text-lg mt-1 font-semibold'>3 month</p>
            <Image src="/tech/tech1.png" width={200} height={0} className='mt-2' />
          </div>
          <div className='hover:bg-[#0A66C2] shadow-xl hover:text-white hover:border transition-all duration-300 cursor-pointer text-black p-3 sm:p-6 rounded-xl'>
            <h1 className='text-xs sm:text-sm 2xl:text-sm font-bold'>CMLABS</h1>
            <p className='opacity-60 text-xs 2xl:text-lg mt-1 font-semibold'>2 month</p>
            <Image src="/tech/tech1.png" width={200} height={0} className='mt-2' />
          </div>
        </div>
      </div>

      {/* footer */}
      {/* <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-20 md:mt-28">
          <p className='text-center text-sm text-white'>follow my:</p>

          <div className='flex justify-center gap-12 mt-10'>
            <Link href="https://www.instagram.com/_fauzanhusain/">
              <Image src="/icon/instagram.png" width={30} height={0} className='2xl:w-[40px]' />
            </Link>
            <Link href="https://www.linkedin.com/in/achmadfauzanhusain">
              <Image src="/icon/linkedin.png" width={30} height={0} className='2xl:w-[40px]' />
            </Link>
            <Link href="https://github.com/achmadfauzanhusain">
              <Image src="/icon/github.png" width={30} height={0} className='2xl:w-[40px]' />
            </Link>
          </div>
      </div> */}
    </div>
  )
}
