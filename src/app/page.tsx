import { prisma } from "./db"
import Link from "next/link"



export default async function Home() {
  const todos = await prisma.todo.findMany()
  const schools = await prisma.school.findMany()
  const buildings = await prisma.building.findMany()
  const departments = await prisma.department.findMany()
  const teachers = await prisma.teacher.findMany()
  const courses = await prisma.course.findMany()
  console.log(courses)
  console.log(schools)
  console.log(buildings)
  console.log(departments)
  console.log(teachers)
  return (
   <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new/school"
      >
        School
      </Link>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new/building"
      >
        Building
      </Link>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new/department"
      >
        Department
      </Link>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new/teacher"
      >
        Teacher
      </Link>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new/course"
      >
        Course
      </Link>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new"
      >
        New
      </Link>
    </header>
      <label>schools:</label>
      <ul className="pl-4">
        {schools.map( school =>(
          <>
            <li key={school.id}>{school.name}</li>
            <li  key={school.id}>{school.address}</li>
            <li  key={school.id}>{school.phone}</li>
          </>
          
        ))}
      </ul>
      <br/>
      <label>buildings:</label>
      <ul className="pl-4">
        {buildings.map( building =>(
          <>
            <li key={building.id}>{building.name}</li>
            <li  key={building.id}>{building.address}</li>
          </>
          
        ))}
      </ul>
      <br/>
      <label>Departments: </label>
      <ul className="pl-4">
        {departments.map( dept =>(
            <li key={dept.id}>{dept.name}</li>          
        ))}
      </ul>
      <br/>
      <label>Teachers: </label>
      <ul className="pl-4">
        {teachers.map( teacher =>(
            <li key={teacher.id}>{teacher.firstName +" "+teacher.lastName}</li>
        ))}
      </ul>
      <br/>
      <label>Courses: </label>
      <ul className="pl-4">
        {courses.map( course =>(
            <li key={course.id}>{course.name}</li>
        ))}
      </ul>
   </>
  )
}
