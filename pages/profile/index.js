import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import { Button } from 'components/Button';
import AuthCheck from 'components/AuthCheck';
import { Colorcard } from 'components/Colorcards/Colorcard';

// firebase
import { collection, query, where, doc, getDocs, onSnapshot, limit, startAfter } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from 'lib/firebase';

// actions
import { logout } from 'slices/authSlice';

const Profile = () => {
	const [currentUser, setCurrentUser] = useState({});
	const [active, setActive] = useState('quoteCard');
	const [cards, setCards] = useState([]);
	const [start, setStart] = useState();
	const [showMore, setShowMore] = useState(false);
	const dispatch = useDispatch();

	const tabs = [
		{
			id: 'quoteCard',
			title: 'Color generation',
			content: cards,
		},
		{
			id: 'goldenRatio',
			title: 'Golden ratio',
			content: cards,
		},
		{
			id: 'darkPalette',
			title: 'Dark palette',
			content: cards,
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
					setStart(snapshot.docs[snapshot.docs.length - 1]);
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					})
					setCards(saveData);
				});
			}
		});
	}, []);

	const getNextResults = (type) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, 'saves');
				if (start !== undefined) {
					const q = query(
						saveRef,
						where('userId', '==', user?.uid),
						where('type', '==', type),
						limit(12),
						startAfter(start)
					);
					onSnapshot(q, (snapshot) => {
						let saveData = [...cards];
						setStart(snapshot.docs[snapshot.docs.length - 1]);
						snapshot.forEach((doc) => {
							saveData.push(doc.data());
						});
					});
				} else {
					setShowMore(true);
				}
			}
		});
		
	}

	const getPaletteData = (type) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, 'saves');
				const q = query(
					saveRef,
					where('userId', '==', user?.uid),
					where('type', '==', type),
					limit(12)
				);
				onSnapshot(q, (snapshot) => {
					let saveData = [];
					setStart(snapshot.docs[snapshot.docs.length - 1]);
					snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setCards(saveData);
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
		getPaletteData(tabId);
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
			<div className="flex justify-around overflow-x-auto space-x-12 no-scrollbar py-10">
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
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
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
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
			<div className={`flex justify-center my-4`}>
				{tabs.map((tab) => {
					if (tab.id === active) {
						return (
							tab.content.length !== 0 &&
							tab.content.length % 12 === 0 &&
							!showMore && (
								<Button
									key={tab.id}
									variant={`bg-violet-500 hover:bg-violet-600 text-white`}
									onClick={() => getNextResults(tab.id)}
								>
									Show more -&gt;
								</Button>
							)
						);
					}
				})}
			</div>
			{showMore && (
				<div className={`flex justify-center italic my-4`}>Fin</div>
			)}
		</AuthCheck>
	);
};

export default Profile;
