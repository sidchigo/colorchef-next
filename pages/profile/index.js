import React from 'react';

const Profile = () => {
    const user = {
        Name:"John Doe",
        paletteSaved:"84",
        ImageURL:"https://images.unsplash.com/photo-1640340520222-26fe9f3bdc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }



	return (
        <div>
            <div className="flex flex-row justify-center pt-10 pb-10 gap-6">
                <img className="h-48 w-48 rounded-full" src={user.ImageURL} alt="" />
                <div className='flex flex-col'>
                    <div className='pt-16 font-bold text-4xl'>   
                        {user.Name}
                    </div>
                    <div className=' pt-5 px-4'>
                        Saved Palette <span className='font-bold text-gray-600'>{user.paletteSaved}</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center sm:gap-3 md:gap-32 lg:gap-60  pt-10 pb-10'>
                <button className='focus:border-b-[3px] border-gray-400 text-gray-300 focus:text-gray-600 pb-1'>
                    Color generation
                </button>
                <button className='focus:border-b-[3px] border-gray-400 text-gray-300 focus:text-gray-600 pb-1'>
                    Golden ratio
                </button>
                <button className='focus:border-b-[3px] border-gray-400 text-gray-300 focus:text-gray-600 pb-1'>
                    Dark palette
                </button>
            </div>
        </div>
        
	);
};

export default Profile;