import Link from "next/link"
import { prisma } from "@/app/db"
import { redirect } from "next/navigation"

async function createDepartment(data: FormData){
    "use server"
    const name = data.get("name")?.valueOf()
    if(typeof name !== "string" || name.length === 0){
        throw new Error("invalid name")
    }
   await prisma.department.create({ data:{ name }})
   redirect('/')
}

export default function newDepartment() {
    return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Department</h1>
      </header>
      <form action={createDepartment} className="flex gap-2 flex-col">
        <input 
            type="text"
            name="name"
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