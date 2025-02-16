import React from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/config'
export default function PostCard(
    {
        $id,title,featuredImage
    }
) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-grey-100 rounded-xl p-4'>
            <div className='justify-center w-full mb-4'>

                <div>
                    <img src={service.previewFile(featuredImage)} alt="" className='rounded-xl'/>
                </div>
                <h2 className='text-2xl text-black'>{title}</h2>
            </div>

        </div>
    </Link>
  )
}
