import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>E-commerce Platform</title>
        <meta name="description" content="Welcome to our e-commerce platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          color: '#333'
        }}>
          Welcome to E-commerce Platform
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          Your modern e-commerce solution with GraphQL API, multi-currency wallets, and OAuth2 authentication.
        </p>
      </main>
    </>
  )
}