"use client"

import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { app } from "@/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Input() {

    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);

    const {data: session} = useSession();
    const imagePickRef = useRef(null);

    
    const addImageToPost = (e) => {
      const file = e.target.files[0];
      if(file){
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }

    useEffect(() => {
      if(selectedFile){
        uploadImageToStorage();
      }
    },[selectedFile]);

    const uploadImageToStorage = () => {
      setImageFileUploading(true);
      const storage = getStorage(app);
      const fileName = new Date().getDate() + '-' + selectedFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      });
    } 

    if(!session) return null

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-200 w-full">
        <img src={session.user.image} alt="user-img"
         className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />
         <div className="w-full divide-y divide-gray-200">
            <textarea 
            className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700" 
            placeholder="What's happening" rows={2}
            ></textarea>
            {
              selectedFile && (
                <img src={imageFileUrl} alt="post-img" className="w-full max-h-[250px] 
                object-cover cursor-pointer"/>
              )
            }

            <div className="flex items-center justify-between pt-2.5">
                <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500
                 hover:bg-sky-100 rounded-full cursor-pointer"
                 onClick={() => imagePickRef.current.click()}/>
                 <input hidden 
                        type="file" 
                        ref={imagePickRef} 
                        accept="image/*"
                        onChange={addImageToPost}/>
                <button className="bg-blue-400 rounded-full px-4 py-1.5 text-white font-bold
                 shadow-md hover:brightness-95 disabled:opacity-50">Post</button>
            </div>
         </div>
         
    </div>
  )
}
