import React, { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import service from '../appwrite/config';
import PostCard from '../components/PostCard/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetching blogs when the component mounts
        const fetchBlogs = async () => {
            try {
                const blogs = await service.listBlogs(); // Fetching the blog data
                if (blogs && blogs.documents) {
                    setPosts(blogs.documents); // Setting the posts if documents exist
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs(); // Calling the fetchBlogs function inside useEffect
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} /> {/* Passing post as props */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
