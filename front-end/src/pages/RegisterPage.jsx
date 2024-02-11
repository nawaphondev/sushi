import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className='flex flex-row items-center h-screen justify-evenly'>
      <img src="/login.png" alt="" />
      <RegisterForm />
    </div>
  )
}
