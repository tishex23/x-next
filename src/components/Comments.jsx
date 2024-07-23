"use client"

import { useState, useEffect } from "react"
import { app } from "@/firebase"
import { collection, onSnapshot, orderBy, query, getFirestore } from "firebase/firestore";
import Comment from "./Comment"

export default function Comments({ id }) {

    const db = getFirestore(app);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments' ), 
                orderBy('timestamp', 'desc')
            ), 
            (snapshot) => {
                setComments(snapshot.docs);
            }
        );
    }, [db, id])

  return (
    <div>
        {comments.map((comment) => (
            <Comment key={comment.id} id={comment.id} comment={comment.data()} />
        ))}
    </div>
  )
}
