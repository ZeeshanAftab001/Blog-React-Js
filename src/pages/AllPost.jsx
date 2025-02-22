import React, { useEffect, useState } from 'react';
import PostCard from "../components/PostCard/PostCard.jsx";
import service from '../appwrite/config.js';
import Container from '../components/Container/Container.jsx';

export default function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetching posts when the component mounts
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await service.listBlogs([]); // Adjust based on API structure
                if (fetchedPosts) {
                    setPosts(fetchedPosts); // Updating state with fetched posts
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        
        fetchPosts(); // Calling the fetchPosts function inside useEffect
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => {
                        // Returning PostCard component for each post
                        return (
                            <div key={post.$id} className="p-4 w-1/4">
                                <PostCard post={post} />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}
