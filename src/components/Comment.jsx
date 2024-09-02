"use client"

import { HiDotsHorizontal, HiHeart , HiOutlineHeart} from "react-icons/hi"
import { useState, useEffect } from "react";
import { getFirestore, setDoc, doc, deleteDoc, serverTimestamp, onSnapshot, collection } from "firebase/firestore";
import { app } from "@/firebase";
import { useSession, signIn } from "next-auth/react";

export default function Comment({ comment, commentId, originalPostId }) {

  const [isliked, setIsliked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);
  const {data: session} = useSession();

  const likePost = async () => {
    if (session) {
      if (isliked) {
        await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid));
      }else{
        await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
      
    }else{
      signIn();
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db])

  useEffect(() => {
    setIsliked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  },[likes]);

  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10">
        <img src={comment?.userImg} alt="user-image"
        className="w-9 h-9 rounded-full mr-4"  
        />
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-sm truncate">{comment?.name}</h4>
                    <span className="text-xs truncate">@{comment?.username}</span>
                </div>
                <HiDotsHorizontal className="text-sm" />
            </div>
                <p className="text-gray-900 text-xs my-3">{comment?.comment}</p>

            <div className="flex items-center space-x-1">   
              {isliked ? (
                <HiHeart 
                onClick={likePost}
                className="h-8 w-8 text-red-500
                cursor-pointer rounded-full p-2
                transition duration-500 ease-in-out
                hover:text-red-500
                hover:bg-red-100  " 
                />
              ): (
                <HiOutlineHeart 
                onClick={likePost}
                className="h-8 w-8 
                cursor-pointer rounded-full p-2
                transition duration-500 ease-in-out
                hover:text-red-500
                hover:bg-red-100  " 
                />
              )}
              {likes.length > 0 && <span className={`text-xs ${isliked && 'text-red-600'}`}>{likes.length}</span>}
          </div>
        </div>
    </div> 
  )
}

