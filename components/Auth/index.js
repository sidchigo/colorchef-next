import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, provider, db } from 'lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { createUser } from 'slices/authSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

// components
import { Button } from 'components/Button';

const loginWithGoogle = async () => {
	try {
		await signInWithPopup(auth, provider);
	} catch (err) {
		console.log(err);
	}
};

export const Auth = () => {
	const [user] = useAuthState(auth);
	const dispatch = useDispatch();

	useEffect(() => {
        let mounted = true;
		if (user !== null && mounted) {
			dispatch(createUser(user));
		}

        return () => {
            mounted = false
        };
	}, []);

	function LoginButton() {
		return (
			<Button
				variant={`bg-violet-600 text-white text-sm py-2 px-6 hover:bg-violet-800`}
				onClick={loginWithGoogle}
			>
				Login
			</Button>
		);
	}

	function ProfileButton() {
		return (
			<Link href="/profile">
				<a>
					<img
						className={`rounded-full`}
						src={user?.photoURL}
						alt="profile"
						width={40}
						height={40}
					/>
				</a>
			</Link>
		);
	}

	return user ? <ProfileButton /> : <LoginButton />;
};