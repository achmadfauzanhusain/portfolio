import Link from "next/link"

const TempusAI = () => {
    return (
        <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-16 md:mt-18">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
                Back
            </Link>

            <div className="mt-16">
                <h1 className="font-bold text-3xl md:text-4xl">Tempus AI</h1>
                <p className="text-sm md:text-lg opacity-50">My thoughts about Tempus AI</p>

                <p className="mt-8 text-sm md:text-lg">
                    i think tempus ai is good company because he integrating ai into healthcare.
                    so the company now like do many aqcuisition to integrate ai into healthcare.
                    and tempus ai is used to help doctors to make decision, and help patients to get better treatment.
                    tempus ai is using by many country right now, before its just united states, but now many country using it.
                </p>
            </div>

            <p className="text-sm md:text-lg mt-8">- fauzanhusain</p>
        </div>
    )
}

export default TempusAI