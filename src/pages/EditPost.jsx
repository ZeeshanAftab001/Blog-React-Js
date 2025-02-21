import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../components/Post-Form/PostForm'
import Container from '../components/Container/Container'
import service from '../appwrite/config'

export default function EditPost() {

    const [posts,setPosts]=useState(null)
    const {slug}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(slug){
            service.getBlog(slug).then((post)=>{
                setPosts(post)
            })
        }
        else{
            navigate('/')
        }
    },[navigate,slug])

  return posts? (
    <div>
        <Container>
            <PostForm  post={posts}/>
        </Container>
    </div>
  ) :null
    
}
