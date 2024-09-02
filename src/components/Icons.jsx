"use client"

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart } from "react-icons/hi"

import { useSession, signIn } from "next-auth/react"
import { collection, doc, getFirestore, onSnapshot, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore"
import { app } from "@/firebase"
import { useEffect, useState } from "react"

import { useRecoilState } from "recoil"
import { modalState, postIdState } from "../atom/modalAtom"


export default function Icons({id, uid}) {

  const {data: session} = useSession();
  const db = getFirestore(app);

  const [isliked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const likePost = async () => {
    if (session) {
      if (isliked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
      }else{
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
      
    }else{
      signIn();
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db])

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  },[likes]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => {
      setComments(snapshot.docs)
    });

    return () => unsubscribe();
  }, [db, id]);

  const deletePost = async () => {
    if(window.confirm('Are you sure you want to delete this post?')){
      if (session?.user?.uid === uid) {
        await deleteDoc(doc(db, 'posts', id)).then(() => {
          console.log('post deleted');
          window.location.reload();
        }).catch((err) => {
          console.log('Error deleting post', err);
        });
      }else {
        alert('You are not authorized to delete this post');
      }
    }
  };

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <div className="flex items-center">
      <HiOutlineChat 
      onClick={() =>{
        if (!session) {
          signIn();
        }else{
          setOpen(!open);
          setPostId(id);
        }
      }}
      className="h-8 w-8 
      cursor-pointer rounded-full p-2
      transition duration-500 ease-in-out
      hover:text-sky-500 
      hover:bg-sky-100 " 
      />
      {comments.length > 0 && <span className="text-xs">{comments.length}</span>}
      </div>
      
      <div className="flex items-center">
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
      
      {session?.user.uid === uid && (
         <HiOutlineTrash 
         onClick={deletePost}
         className="h-8 w-8 
         cursor-pointer rounded-full p-2
         transition duration-500 ease-in-out
         hover:text-red-500 
         hover:bg-red-100 " 
         />
      )}
     
    </div>
  )
}
