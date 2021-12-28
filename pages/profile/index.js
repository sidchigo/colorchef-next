import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import { Button } from 'components/Button';
import AuthCheck from 'components/AuthCheck';
import { Colorcard } from 'components/Colorcards/Colorcard';

// firebase
import { collection, query, where, doc, getDocs, onSnapshot, limit } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from 'lib/firebase';

// actions
import { logout } from 'slices/authSlice';

const Profile = () => {
	const [currentUser, setCurrentUser] = useState({});
	const [active, setActive] = useState('quoteCard');
	const [cards, setCards] = useState([]);
	const [ratios, setRatios] = useState([]);
	const [palettes, setPalettes] = useState([]);
	const dispatch = useDispatch();

	const tabs = [
		{
			id: 'quoteCard',
			title: 'Color generation',
			content: cards
		},
		{
			id: 'goldenRatio',
			title: 'Golden ratio',
			content: ratios
		},
		{
			id: 'darkPalette',
			title: 'Dark palette',
			content: palettes
		},
	];

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, 'users', user?.uid);
				onSnapshot(userRef, (doc) => {
					setCurrentUser(doc.data());
				});

				const saveRef = collection(db, 'saves');
				const q = query(
					saveRef, 
					where('userId', '==', user?.uid), 
					where('type', '==', 'quoteCard'),
					limit(12)
				);
				onSnapshot(q, (snapshot) => {
					let saveData = [];
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					})
					setCards(saveData);
				});
			}
		});
	}, []);

	const getQuoteCard = () => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, 'saves');
				const q = query(
					saveRef,
					where('userId', '==', user?.uid),
					where('type', '==', 'quoteCard'),
					limit(12)
				);
				onSnapshot(q, (snapshot) => {
					let saveData = [];
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setCards(saveData);
				});
			}
		});
	}

	const getGoldenRatio = () => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, 'saves');
				const q = query(
					saveRef,
					where('userId', '==', user?.uid),
					where('type', '==', 'goldenRatio'),
					limit(12)
				);
				onSnapshot(q, (snapshot) => {
					let saveData = [];
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setRatios(saveData);
				});
			}
		});
	}

	const getDarkPalette = () => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, 'saves');
				const q = query(
					saveRef,
					where('userId', '==', user?.uid),
					where('type', '==', 'darkPalette'),
					limit(12)
				);
				onSnapshot(q, (snapshot) => {
					let saveData = [];
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setPalettes(saveData);
				});
			}
		});
	}

	const logOut = async () => {
		dispatch(logout());
		await signOut(auth);
	};

	const handleClick = (tabId) => {
		setActive(tabId);
		switch(tabId) {
			case 'quoteCard':
				getQuoteCard();
				break;
			case 'goldenRatio':
				getGoldenRatio();
				break;
			case 'darkPalette':
				getDarkPalette();
				break;
			default:
				getQuoteCard();
		}
	}

	return (
		<AuthCheck
			fallback={
				<div className={`flex justify-center pt-10`}>
					<Link href="/">
						<a>You need to login first to view this page.</a>
					</Link>
				</div>
			}
		>
			<div className="flex flex-row justify-center pt-10 pb-10 gap-6">
				<img
					className="h-40 w-40 rounded-full object-cover"
					src={currentUser?.photo}
					alt=""
				/>
				<div className="flex flex-col justify-evenly items-start">
					<div className="font-bold text-4xl">
						{currentUser?.name}
					</div>
					<div className="">
						Saved Palettes{' '}
						<span className="font-bold text-gray-600">
							{currentUser?.savedPalettes ?? 0}
						</span>
					</div>
					<Button
						variant={`hidden bg-gray-800 lg:block text-white text-sm py-2 px-6 hover:bg-gray-900`}
						onClick={logOut}
					>
						Logout
					</Button>
				</div>
			</div>
			<div className="flex justify-center sm:gap-3 md:gap-32 lg:gap-60  pt-10 pb-10">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`
							${
								active === tab.id
									? 'border-gray-600 text-gray-600'
									: 'border-gray-300 text-gray-300'
							}
							border-b-[3px] pb-1
							hover:border-gray-600 hover:text-gray-600
						`}
						onClick={() => handleClick(tab.id)}
					>
						{tab.title}
					</button>
				))}
			</div>
			<div className="mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
				{tabs.map((tab) => {
					if (tab.id === active) {
						return tab.content.map((doc) => (
							<Colorcard
								key={doc.paletteId}
								colorData={doc.paletteId.split('-')}
								isQuote
							/>
						));
					}
				})}
			</div>
		</AuthCheck>
	);
};

export default Profile;
