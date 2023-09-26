import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/images/akf logo.jpg'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const navigate=useNavigate()

    const photoDetails = (photo) => {
        setLoading(true);
        if (photo === 'undefined') {
            toast.error('please select a image');
            return;
        }

        if(photo.type==='image/jpeg' || photo.type==='image/png'){
            const formData=new FormData();
            formData.append('file',photo);
            formData.append('upload_preset','akf_account');
            formData.append('cloud_name','ikbalhossain');
            fetch('https://api.cloudinary.com/v1_1/ikbalhossain/image/upload',{
                method:"POST",
                body:formData
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setPhoto(data.url.toString());
                setLoading(false)
            })
            .catch(error=>{
                console.log(error)
                setLoading(false)
            })
        }else{
            toast.error('please select a image');
            return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!name || !email || !password) {
            toast.error('Please fill all the feilds');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };

            const { data } = axios.post('http://localhost:5000/api/member/signup', { name, email, password,photo },config)

            toast.success('Signup Successfull');
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);
            navigate('/login')

        } catch (error) {
            toast.error('error signup')
        }

    }

    return (
        <div className='bg-white flex min-h-screen w-full'>
            <div className='w-1/2 p-20 flex items-center justify-center'>
                <img src={logo} alt="" />
            </div>
            <form onSubmit={handleSubmit} className='w-1/2 p-10 flex flex-col justify-center bg-gray-100 space-y-8 items-center'>
                <h1 className='text-xl font-bold text-black'>Signup Now</h1>
                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="name"><span className='font-semibold text-black'>Your Name</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="text" name="name" id="" placeholder='Enter Your Name' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Your Email</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="email" name="email" id="" placeholder='Enter Your Email' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Password</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="password" name="password" id="" placeholder='Password' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Photo</span></label><br />
                    <input onChange={(e) => photoDetails(e.target.files[0])} type="file" className="file-input file-input-bordered w-full focus:outline-none rounded-none bg-transparent" />
                </div>
                <button disabled={loading} type='submit' className='btn w-3/4 mx-auto'>Signup</button>
                <p className='text-blue-500'>Already Signup?<Link className='underline' to='/login'>login here</Link></p>
            </form>
        </div>
    );
};

export default Signup;