"use client"

import { useRecoilState } from "recoil"

import { modalState, postIdState } from "../atom/modalAtom"

import Modal from 'react-modal';
import { HiX } from "react-icons/hi";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { app } from "@/firebase";
import { getFirestore, doc, onSnapshot, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function CommentModal() {

    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const {data: session} = useSession();
    const db = getFirestore(app);
    const router = useRouter();

    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
      if (postId !== "") {
        const postRef = doc(db, 'posts', postId);
        const unsubscribe = onSnapshot(postRef, (snapshot) => {
          if (snapshot.exists()) {
            setPost(snapshot.data());
          } else {
            console.log('post does not exist');
          }
        });
        return () => unsubscribe();
      }
    },[postId])

    const sendComment = async () => {
      addDoc(collection(db, 'posts', postId, 'comments'), {
        name: session.user.name,
        username: session.user.username,
        userimg: session.user.image,
        comment: input,
        timestamp: serverTimestamp(),
      }).then(() => {
        setInput("");
        setOpen(false);
        router.push(`/posts/${postId}`);
      }).catch((err) => {
        console.log('Error sending comment', err);
      });
    }

  return (
    <div>
      {open && (
      <Modal 
        isOpen={open} 
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="max-w-lg w-[90%] absolute top-24 left-[50%]
        translate-x-[-50%] bg-white border-2 border-gray-200
        rounded-xl shadow-md"
      >
        <div className="p-4">
          <div className="border-b border-gray-200 py-2 px-1.5">
            <HiX className="text-2xl text-gray-700 hover:bg-gray-200
            rounded-full cursor-pointer" 
            onClick={closeModal}
            />
          </div>
          <div className="p-2 flex items-center relative space-x-1">
            <span 
              className="w-0.5 h-full bg-gray-200 
              absolute top-11 left-8 z-[-1]"
            />
            <img 
              src={post?.profileImg} 
              alt="user-image" 
              className="w-11 h-11 rounded-full mr-4" 
            />
            <h4 className="font-bold sm:text-[16px] text-[15px]
            hover:underline truncate">
              {post?.name}
            </h4>
            <span className="text-sm sm:text-[15px] truncate">
              @{post?.username}
            </span>
          </div>
          <p className="text-gray-500 sm:text-[16px] text-[15px] ml-16 mb-2">
            {post?.text}
          </p>
          <div className="flex p-3 space-x-3">
            <img
              src={session?.user?.image}
              alt="user-image"
              className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95" 
            />
            <div>
              <div>
                <textarea className="w-full border-none outline-none
                 tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500"
                 placeholder="Whats happening"
                 rows={2} 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}>
                 </textarea>
              </div>
              <div className="flex items-center justify-end pt-2.5 ">
                <button className="bg-blue-400 text-white px-4 py-1.5 
                rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                disabled={input.trim() === ""}
                onClick={sendComment}>
                   Reply 
                </button>

              </div>
            </div>
          </div>
        </div>
        
      </Modal>)}
    </div>
  )
}
