import React,{useEffect,useState} from 'react'
import PostCard from "../components/PostCard/PostCard.jsx"
import service from '../appwrite/config.js'
import Container from '../components/Container/Container.jsx'

export default function AllPost() {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{

    },[])

    service.listBlogs([]).then((posts)=>{
        if(posts){
            setPosts(posts)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            { posts.map((post)=>{
                <div key={post.$id} className='p-4 w-1/4'>
                <PostCard  post={post}/>
                </div>
            })
            }
            </div>
        </Container>
      
    </div>
  )
}
