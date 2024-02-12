import axios from 'axios'
import {useState} from "react";

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
      const rs = await axios.post('http://localhost:3001/contact', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Message sent!')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="flex flex-col w-full px-9">
      <form className="flex flex-col items-center justify-center w-full gap-6" onSubmit={hdlSubmit}>
        <label className="w-full">
          <span className="text-[#8B8E99] text-sm">ชื่อ</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            name="name"
            value={input.name}
            onChange={ hdlChange }
          />
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <label className="w-full">
            <span className="text-[#8B8E99] text-sm">อีเมล</span>
            <input
              type="email"
              className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
              name="email"
              value={input.email}
              onChange={ hdlChange }
            />
          </label>
          <label className="w-full">
            <span className="text-[#8B8E99] text-sm">โทรศัพท์</span>
            <input
              type="tel"
              className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={ hdlChange }
            />
          </label>
        </div>
        <label className="w-full">
          <span className="text-[#8B8E99] text-sm">ข้อความ</span>
          <textarea 
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]" name="message" cols="30" rows="10" value={input.message} onChange={hdlChange} />
        </label>
        
        <div className="flex w-full gap-5 ">
          <button type="submit" className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground">ส่งข้อความ</button>
        </div>
      </form>
    </div>
  );
}
