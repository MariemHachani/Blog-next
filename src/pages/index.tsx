import Head from 'next/head'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import Link from 'next/link'

interface Props {
  posts : Post[]
}

export default function Home({posts}: Props) {
  console.log(
    posts
  )
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Header/>

      <div className='flex justify-between items-center bg-yellow-400 border border-y-black py-10 md:px-5 lg:px-5'>
      <div className='px-10 space-y-5'>
        <h1 className='text-6xl max-w-xl font-serif'> <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read and connect.</h1>
        <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
      </div>

      <img className='hidden  md:inline-flex h-32 lg:h-full' src="https://seeklogo.com/images/M/medium-logo-31646BE2FD-seeklogo.com.png" alt="" />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt="" />
              <div className='flex justify-between p-2 bg-white'>
                <div>
                <p>{post.title}</p>
                <p>{post.description} by {post.author.name} </p>
              </div>
              
              <img className='h-10 w-10 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

export const getServerSideProps = async () => {
const query = `*[_type == "post"]{
  _id, 
    title,
    author -> {
      name,
      image
    },
    description, 
    mainImage,
    slug
    
     }`;
     const posts = await sanityClient.fetch(query);
     return {
       props: {
         posts,
       },
     }

}