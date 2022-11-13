import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, provider } from 'lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { createUser } from 'slices/authSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

// components
import { Button } from 'components/Button';


export const Auth = ({ extraFunction }) => {
	const [user] = useAuthState(auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user !== null) {
			dispatch(createUser(user));
		}
	}, [user, dispatch]);

	function LoginButton() {
		const loginWithGoogle = async () => {
			try {
				await signInWithPopup(auth, provider);
				extraFunction?.(false);
			} catch (err) {
				console.log(err);
			}
		};

		return (
			<Button
				variant={`bg-violet-600 border-2 border-violet-600 hover:bg-violet-800 hover:border-violet-800 text-white w-[200px]`}
				onClick={loginWithGoogle}
			>
				Login
			</Button>
		);
	}

	function ProfileButton() {
		return (
			<Link href="/profile">
				<a onClick={() => extraFunction?.(false)}>
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

	if (user) {
		return <ProfileButton />;
	}
	return <LoginButton />;
};