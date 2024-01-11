import Link from "next/link"
import { prisma } from "@/app/db"
import { redirect } from "next/navigation"

async function createTeacher(data: FormData){
    "use server"
    const firstName = data.get("firstName")?.valueOf()
    const lastName = data.get("lastName")?.valueOf()
    const departmentID = data.get("department")?.valueOf()
    if(typeof firstName !== "string" || firstName.length === 0){
        throw new Error("invalid firstName")
    }
    else if( typeof lastName !== "string" || lastName.length === 0){
        throw new Error("invalid lastName")
    }
    else if( typeof departmentID !== "string" || departmentID.length === 0){
        throw new Error("invalid departmentID")
    }
   await prisma.teacher.create({ data:{ firstName, lastName, departmentID}})
   redirect('/')
}

export default async function newTeacher() {
    const departments = await prisma.department.findMany()
    console.log(departments)
    return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Teacher</h1>
      </header>
      <form action={createTeacher} className="flex gap-2 flex-col">
        <input 
            type="text"
            name="firstName"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <input 
            type="text"
            name="lastName"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label>Department:</label>
        <select name="department">
            {departments.map(department => (
                <option key={department.id} value={department.id}>{department.name}</option>
            ))}
        </select>
        <div className="flex gap-1 justify-end">
            <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
            <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
        </div>
      </form>
    </>
    )
}