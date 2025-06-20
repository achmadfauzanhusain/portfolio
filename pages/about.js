import Link from "next/link"
import Image from "next/image"

const About = () => {
    return (
        <div className="pb-10 md:pb-14">
            <div className="relative w-[90%] sm:w-[90%] lg:w-[80%] mx-auto mt-10 md:mt-20">
                <div className="flex gap-6">
                    <Link href="/">
                        <p className="text-3xl md:text-4xl 2xl:text-6xl text-white font-bold">X</p>
                    </Link>
                    <h1 className="text-3xl md:text-4xl 2xl:text-6xl text-white font-bold">ABOUT ME</h1>
                </div>

                {/* content */}
                <div className="mt-10 md:mt-14 text-white/80 text-sm md:text-base">
                    <p className="md:w-[75%] leading-loose 2xl:leading-loose 2xl:text-xl">
                        Hi! I’m Achmad Fauzan Husain — Graduated from high school majoring in software engineering and continued studies at Telkom University in the same field. Started
learning software development in the second grade of junior high school and completed an internship in the second grade of vocational
high school. Currently pursuing studies while attending a bootcamp. Curious about backend technologies like Node.js and Express.js.
Typically builds projects using React.js, Next.js, Tailwind CSS, Axios, Node.js, Express.js, MongoDB, JWT, and Firebase
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-5">
                        <Image
                            src="/about.jpeg"
                            width={200}
                            height={0}
                            className="flex-1 w-full max-h-[400px] rounded-2xl object-cover object-bottom"
                            alt="About me image"
                        />

                        <div className="flex justify-between gap-4 flex-col flex-1 leading-loose 2xl:leading-loose 2xl:text-xl">
                            <div>
                                <p className="mt-4 2xl:mt-0">
                                    I started learning web development by myself back in junior high school (around 8th grade), then went on to study software engineering in vocational high school.
                                </p>
                                <p className="mt-8">
                                    Now, I’m majoring in Software Engineering at <span className="font-semibold">Telkom University</span>.
                                </p>
                                <p className="mt-8">
                                    I also joined a fullstack web development bootcamp at <span className="font-semibold">Harisenin.com</span>, where I specialized in backend development to deepen my skills in building scalable and efficient server-side applications.
                                </p>
                                <p className="mt-8">Outside of coding, I enjoy sports and watching movies every now and then.</p>
                            </div>

                            <div className="mb-12">
                                <p className="text-sm">follow my:</p>
                                <div className="flex gap-10 mt-5">
                                    <Link href="https://www.instagram.com/_fauzanhusain/">
                                        <Image src="/icon/instagram.png" width={25} height={0} className="2xl:w-[35px]" alt="Instagram" />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/achmadfauzanhusain">
                                        <Image src="/icon/linkedin.png" width={25} height={0} className="2xl:w-[35px]" alt="LinkedIn" />
                                    </Link>
                                    <Link href="https://github.com/achmadfauzanhusain">
                                        <Image src="/icon/github.png" width={25} height={0} className="2xl:w-[35px]" alt="GitHub" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About