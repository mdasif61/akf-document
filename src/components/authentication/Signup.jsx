import { Link } from 'react-router-dom';
import logo from '../../../public/images/akf logo.jpg'

const Signup = () => {
    return (
        <div className='bg-white flex min-h-screen w-full'>
            <div className='w-1/2 p-20 flex items-center justify-center'>
                <img src={logo} alt="" />
            </div>
            <form className='w-1/2 p-10 flex flex-col justify-center bg-gray-100 space-y-8 items-center'>
                <h1 className='text-xl font-bold text-black'>Signup Now</h1>
                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="name"><span className='font-semibold text-black'>Your Name</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="text" name="" id="" placeholder='Enter Your Name' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Your Email</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="email" name="" id="" placeholder='Enter Your Email' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Password</span></label><br />
                    <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="password" name="" id="" placeholder='Password' />
                </div>

                <div className='w-3/4 h-12 mx-auto'>
                    <label htmlFor="email"><span className='font-semibold text-black'>Photo</span></label><br />
                    <input type="file" className="file-input file-input-bordered w-full focus:outline-none rounded-none bg-transparent" />
                </div>
                <button className='btn w-3/4 mx-auto'>Signup</button>
                <p className='text-blue-500'>Already Signup?<Link className='underline' to='/login'>login here</Link></p>
            </form>
        </div>
    );
};

export default Signup;