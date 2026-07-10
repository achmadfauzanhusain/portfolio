import Link from "next/link"

const Bitcoin = () => {
    return (
        <div className="relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto mt-16 md:mt-18">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
                Back
            </Link>

            <div className="mt-16">
                <h1 className="font-bold text-3xl md:text-4xl">Bitcoin</h1>
                <p className="text-lg opacity-50">My thoughts about bitcoin</p>

                <p className="mt-8 text-sm md:text-lg">
                    am not gonna explain bitcoin from finance perspective, 
                    because am from tech people and i think bitcoin is more about tech than finance.
                    am more interested on bitcoin after know bitcoin is built by math.
                    i think bitcoin is a nice example of how math can be used to solve real world problem, and how math can be used to create something that is valuable.
                    am very interested at math because bitcoin.
                    i think bitcoin not change paper money to bitcoin, but bitcoin change the way we think about money.
                </p>
            </div>

            <p className="text-sm md:text-lg mt-8">- fauzanhusain</p>
        </div>
    )
}

export default Bitcoin