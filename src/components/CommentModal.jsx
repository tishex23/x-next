"use client"

import { useRecoilState } from "recoil"

import { modalState } from "../atom/modalAtom"


export default function CommentModal() {

    const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h4>commentModal</h4>
      {open && <h1>open</h1>}
    </div>
  )
}
