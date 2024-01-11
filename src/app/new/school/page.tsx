import Link from "next/link"
import { prisma } from "@/app/db"
import { redirect } from "next/navigation"

async function createSchool(data: FormData){
    "use server"
    const name = data.get("name")?.valueOf()
    const address = data.get("address")?.valueOf()
    const phone = data.get("phone")?.valueOf()
    if(typeof name !== "string" || name.length === 0){
        throw new Error("invalid name")
    }
    else if( typeof address !== "string" || address.length === 0){
        throw new Error("invalid address")
    }
    else if (typeof phone !== "string" || phone.length ===0){
        throw new Error("invalid PHone")
    }
   await prisma.school.create({ data:{ name, address, phone}})
   redirect('/')
}

export default function newSchool() {
    return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">School</h1>
      </header>
      <form action={createSchool} className="flex gap-2 flex-col">
        <input 
            type="text"
            name="name"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <input 
            type="text"
            name="address"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <input 
            type="text"
            name="phone"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
            <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
            <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
        </div>
      </form>
    </>
    )
}