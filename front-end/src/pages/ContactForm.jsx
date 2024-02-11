import axios from 'axios'
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'

export default function ContactForm() {
  const [input, setInput] = useState({
    name : '', 
    email : '',
    phoneNumber: '',
    message: ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:3001/auth/register', {...input, phoneNumber: "phoneasdasdad"})
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="w-4/6 border rounded">
      <div className="mb-5 text-3xl">Contact Form</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="w-full max-w-xs input input-bordered"
            name="name"
            value={input.name}
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="w-full max-w-xs input input-bordered"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            type="tel"
            className="w-full max-w-xs input input-bordered"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={ hdlChange }
          />
        </label>
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <textarea name="message" cols="30" rows="10" value={input.message} onChange={hdlChange} />
        <label className="w-full max-w-xs form-control">

        </label>
        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
