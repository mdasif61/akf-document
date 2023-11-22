import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../public/images/akf logo.jpg'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true)

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            toast.error('please fill all fields')
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data, statusText } = await axios.post('http://localhost:5000/api/member/login', { email, password }, config)
            toast.success('login successfull');
            if (statusText == 'OK') {
                localStorage.setItem('jwtToken', data?.token)
                setLoading(false)
                navigate(from)
            }

        } catch (error) {
            toast.error('login failed, try again');
        }

    }

    return (
        <div className='bg-white flex min-h-screen w-full'>
            <div className='w-1/2 p-20 flex items-center justify-center'>
                <img src={logo} alt="" />
            </div>
            <form onSubmit={handleLogin} className='w-1/2 p-10 flex flex-col justify-center bg-gray-100 space-y-8 items-center'>
                <h1 className='text-xl font-bold text-black'>Login Now</h1>
                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Your Email</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="email" name="email" id="" placeholder='Enter Your Email' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Password</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="password" name="password" id="" placeholder='Password' />
                </div>

                <button disabled={loading} className='btn w-3/4 mx-auto'>Login</button>
                <p className='text-blue-500'>Are You New?<Link className='underline' to='/signup'>signup here</Link></p>
            </form>
        </div>
    );
};

export default Login;