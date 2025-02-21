import React from 'react'
import PostForm from '../components/Post-Form/PostForm.jsx'
import Container from "../components/Container/Container.jsx"
export default function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}
