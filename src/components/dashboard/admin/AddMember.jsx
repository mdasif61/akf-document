import SideBar from "../../SideBar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddMember = () => {

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate()

    const photoDetails = (photo) => {
        setLoading(true);
        if (photo === 'undefined') {
            toast.error('please select a image');
            return;
        }

        if (photo.type === 'image/jpeg' || photo.type === 'image/png') {
            const formData = new FormData();
            formData.append('file', photo);
            formData.append('upload_preset', 'akf_account');
            formData.append('cloud_name', 'ikbalhossain');
            fetch('https://api.cloudinary.com/v1_1/ikbalhossain/image/upload', {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPhoto(data.url.toString());
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
        } else {
            toast.error('please select a image');
            return;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {
            name,
            email,
            password,
            photo,
        }

        if (!name || !email || !password) {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:5000/api/member/signup', userInfo, config);

            if (response.status === 201) {
                toast.success('Signup Successful');
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                console.log(response.data._id)
                const blankData = {
                    name: response?.data?.name,
                    mobile: '',
                    date: '',
                    share: '',
                    fee: '',
                    ifound: '',
                    penalty: '',
                    total: '',
                    month: '',
                    account: '',
                    year: '',
                    userId: response.data._id
                }

                await axios.post('http://localhost:5000/api/member/members', blankData)
                    .then(res => {
                        if (res.data._id) {
                            // console.log(res.data._id)
                        }
                    }).catch(err => {
                        console.log(err)
                    })

                setLoading(false);
                navigate('/login');
            }
        } catch (error) {
            toast.error('Error during signup');
        }
    };

    return (
        <SideBar>
            <div className='bg-white flex items-center justify-center flex-col min-h-screen w-full'>
                <form onSubmit={handleSubmit} className='w-10/12 mx-auto p-10 flex flex-col justify-center bg-gray-50 border-gray-200 border space-y-8 items-center'>
                    <h1 className='text-xl font-bold text-black'>Add Member</h1>
                    <div className='md:w-3/4 w-full h-12 mx-auto'>
                        <label htmlFor="name"><span className='font-semibold text-black'>Member Name</span></label><br />
                        <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="text" name="name" id="" placeholder='Enter Your Name' />
                    </div>

                    <div className='md:w-3/4 w-full h-12 mx-auto'>
                        <label htmlFor="email"><span className='font-semibold text-black'>Member Email</span></label><br />
                        <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="email" name="email" id="" placeholder='Enter Your Email' />
                    </div>

                    <div className='md:w-3/4 w-full h-12 mx-auto'>
                        <label htmlFor="email"><span className='font-semibold text-black'>Member Password</span></label><br />
                        <input className='px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold' type="password" name="password" id="" placeholder='Password' />
                    </div>

                    <div className='md:w-3/4 w-full h-12 mx-auto'>
                        <label htmlFor="email"><span className='font-semibold text-black'>Member Photo</span></label><br />
                        <input onChange={(e) => photoDetails(e.target.files[0])} type="file" className="file-input file-input-bordered w-full focus:outline-none rounded-none bg-transparent" />
                    </div>
                    <button disabled={loading} type='submit' className='btn md:w-3/4 w-full mx-auto'>Add Member</button>
                </form>
            </div>
        </SideBar>
    );
};

export default AddMember;