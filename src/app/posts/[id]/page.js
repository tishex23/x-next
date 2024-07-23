import { app } from "@/firebase"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Post from "@/components/Post"
import Comments from "@/components/Comments";

export default async function PostPage({ params }) {

  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  data = {...querySnapshot.data(), id: querySnapshot.id};
  

  return (
    <div className="max-w-xl mx-auto border-l border-r min-h-screen">
        <div className="sticky top-0 z-50 bg-white flex py-2 px-3 border-b border-gray-200 items-center">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
            <HiArrowLeft className="h-5 w-5"/>
          </Link>
          <h2 className="sm:text-lg">Back</h2>
        </div>
        <Post post={data} id={data.id}/>
        <Comments id={params.id} />
    </div>
  )
}
