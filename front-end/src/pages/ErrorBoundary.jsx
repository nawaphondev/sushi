import { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";


export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center flex-grow w-8/12 mx-auto'>
      <h1>Error Boundary</h1>
      <p>{error.message}</p>
      <Link to='/'>กลับหน้าหลัก</Link>
    </div>
  )
}
