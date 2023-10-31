import Ayarlar from '@/src/components/Ayarlar/Ayarlar'
import Head from 'next/head'
import React from 'react'

const ayarlar = () => {
  return (
    <>
      <Head>
        <title>Pengona Software</title>
        <meta name="description" content="Generated by Pengona" />
      </Head>
      <main className="w-full flex flex-col lg:px-8 lg:py-16 md:px-6 md:py-12 px-0 bg-blue-gray-100 min-h-full  ">
        <Ayarlar/>
      </main>
    </>
  )
}

export default ayarlar