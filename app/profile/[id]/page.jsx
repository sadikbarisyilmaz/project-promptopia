"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/${userName}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (userName) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post.id);
        setPosts(filteredPosts);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
