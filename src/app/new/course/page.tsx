import Link from "next/link"
import { prisma } from "@/app/db"
import { redirect } from "next/navigation"

async function createCourse(data: FormData){
    "use server"
    const name = data.get("name")?.valueOf()
    const teacherID = data.get("teacher")?.valueOf()
    const departmentID = data.get("department")?.valueOf()
    if(typeof name !== "string" || name.length === 0){
        throw new Error("invalid name")
    }
    else if( typeof teacherID !== "string" || teacherID.length === 0){
        throw new Error("invalid teacherID")
    }
    else if( typeof departmentID !== "string" || departmentID.length === 0){
        throw new Error("invalid departmentID")
    }
   await prisma.course.create({ data:{ name, teacherID, departmentID}})
   redirect('/')
}

export default async function newTeacher() {
    const departments = await prisma.department.findMany()
    const teachers = await prisma.teacher.findMany()
    console.log(teachers)
    console.log(departments)
    return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Course</h1>
      </header>
      <form action={createCourse} className="flex gap-2 flex-col">
        <input 
            type="text"
            name="name"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label>Teacher:</label>
        <select name="teacher">
            {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>{teacher.firstName + " " + teacher.lastName}</option>
            ))}
        </select>
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