import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex flex-row items-center h-screen justify-evenly'>
      <img src="/login.png" alt="" />
      <LoginForm />
    </div>
  )
}
