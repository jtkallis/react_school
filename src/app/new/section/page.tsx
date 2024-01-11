import Link from "next/link"
import { prisma } from "@/app/db"
import { redirect } from "next/navigation"

async function createSection(data: FormData){
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

export default async function newSection() {
    const courses = await prisma.course.findMany()
    const buildings = await prisma.building.findMany()
    const teachers = await prisma.teacher.findMany()
    const days = [{rank: 1, day: 'Mon'},{rank: 2, day:'Tues'},{rank: 3, day: 'Wed'},
        {rank: 4, day: 'Thurs'},{rank:5 , day: 'Fri'}]
    console.log(teachers)
    console.log(buildings)
    console.log(courses)
    return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Section</h1>
      </header>
      <form action={createSection} className="flex gap-2 flex-col">
      <label>Days:</label>
        <select name="section">
            {days.map(day => (
                <option key={day.rank} value={day.day}>{day.day}</option>
            ))}
        </select>
        <label>Course:</label>
        <select name="section">
            {courses.map(couse => (
                <option key={couse.id} value={couse.id}>{couse.name}</option>
            ))}
        </select>
        <label>Building:</label>
        <select name="department">
            {buildings.map(building => (
                <option key={building.id} value={building.id}>{building.name}</option>
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