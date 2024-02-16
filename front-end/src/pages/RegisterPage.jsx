import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className='flex flex-row items-center flex-grow w-8/12 mx-auto justify-evenly'>
      <img src="/login.png" alt="" />
      <RegisterForm />      
    </div>
  )
}
