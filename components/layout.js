import { Poppins } from 'next/font/google'
import Head from 'next/head'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['200', '400', '600', '800']
})
 
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fauzan Husain</title>
        <meta property="og:title" content="Fauzan Husain" />
        <meta property="og:description" content="Fullstack Web3 Javascript Developer and Interested About Cryptography Mathematics." />
        <meta property="og:url" content="https://fauzanhusain.com" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Fullstack Web3 Javascript Developer and Interested About Cryptography Mathematics." />
        <meta property="og:image" content="https://fauzanhusain.com" />
      </Head>
      <main className={`${poppins.className}`}>{children}</main>
    </>
  )
}