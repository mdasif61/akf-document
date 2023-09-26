import { Link } from 'react-router-dom';
import logo from '../../../public/images/akf logo.jpg'

const Login = () => {
    return (
        <div className='bg-white flex min-h-screen w-full'>
            <div className='w-1/2 p-20 flex items-center justify-center'>
                <img src={logo} alt="" />
            </div>
            <form className='w-1/2 p-10 flex flex-col justify-center bg-gray-100 space-y-8 items-center'>
                <h1 className='text-xl font-bold text-black'>Login Now</h1>
                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Your Email</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="email" name="" id="" placeholder='Enter Your Email' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Password</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="password" name="" id="" placeholder='Password' />
                </div>

                <button className='btn w-3/4 mx-auto'>Login</button>
                <p className='text-blue-500'>Are You New?<Link className='underline' to='/signup'>signup here</Link></p>
            </form>
        </div>
    );
};

export default Login;