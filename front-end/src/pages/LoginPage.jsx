import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex flex-row items-center flex-grow w-8/12 mx-auto justify-evenly'>
      <img src="/login.png" alt="" />
      <LoginForm />
    </div>
  )
}
