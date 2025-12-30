import Link from 'next/link';
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { createUser } from "slices/authSlice";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import { Button } from "components/Button";

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
				variant={`bg-violet-600 text-white text-sm py-2 px-6 hover:bg-violet-800`}
				onClick={loginWithGoogle}
			>
				Login
			</Button>
		);
	}

	function ProfileButton() {
		return (
			<Link href="/profile" onClick={() => extraFunction?.(false)}>
				<Image
					className={`rounded-full`}
					src={user?.photoURL}
					alt="profile"
					width={40}
					height={40}
				/>
			</Link>
		);
	}

	if (user) {
		return <ProfileButton />;
	}
	return <LoginButton />;
};