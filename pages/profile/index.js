import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// components
import { Button } from "components/Button";
import AuthCheck from "components/AuthCheck";
import { Colorcard } from "components/Colorcards/Colorcard";
import Loader from "components/Loader";
import PulseProfileLoader from "components/PulseProfileLoader";

// firebase
import {
	collection,
	query,
	where,
	doc,
	onSnapshot,
	limit,
	startAfter,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "lib/firebase";

// actions
import { logout } from "slices/authSlice";
import Meta from "components/Meta";

const Profile = () => {
	const [currentUser, setCurrentUser] = useState({});
	const [active, setActive] = useState("quoteCard");
	const [cards, setCards] = useState([]);
	const [start, setStart] = useState();
	const [showMore, setShowMore] = useState(false);
	const [status, setStatus] = useState("loading");
	const dispatch = useDispatch();

	const tabs = [
		{
			id: "quoteCard",
			title: "Color generation",
			content: cards,
		},
		{
			id: "goldenRatio",
			title: "Golden ratio",
			content: cards,
		},
		{
			id: "darkPalette",
			title: "Dark palette",
			content: cards,
		},
	];

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, "users", user?.uid);
				onSnapshot(userRef, (doc) => {
					setCurrentUser(doc.data());
				});

				const saveRef = collection(db, "saves");
				const q = query(
					saveRef,
					where("userId", "==", user?.uid),
					where("type", "==", "quoteCard"),
					limit(12)
				);
				onSnapshot(q, async (snapshot) => {
					let saveData = [];
					setStatus("loading");
					setStart(snapshot.docs[snapshot.docs.length - 1]);
					await snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setStatus("idle");
					setCards(saveData);
				});
			}
		});
	}, []);

	const getNextResults = (type) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, "saves");
				if (start !== undefined) {
					const q = query(
						saveRef,
						where("userId", "==", user?.uid),
						where("type", "==", type),
						limit(12),
						startAfter(start)
					);
					onSnapshot(q, async (snapshot) => {
						console.log(cards);
						let saveData = [...cards];
						console.log(saveData);
						setStart(snapshot.docs[snapshot.docs.length - 1]);
						await snapshot.forEach((doc) => {
							saveData.push(doc.data());
						});
						setCards(saveData);
					});
				} else {
					setShowMore(true);
				}
			}
		});
	};

	const getPaletteData = (type) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const saveRef = collection(db, "saves");
				const q = query(
					saveRef,
					where("userId", "==", user?.uid),
					where("type", "==", type),
					limit(12)
				);
				onSnapshot(q, async (snapshot) => {
					let saveData = [];
					setStatus("loading");
					setStart(snapshot.docs[snapshot.docs.length - 1]);
					await snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setCards(saveData);
					setStatus("idle");
				});
			}
		});
	};

	const logOut = async () => {
		dispatch(logout());
		await signOut(auth);
	};

	const handleClick = (tabId) => {
		setActive(tabId);
		getPaletteData(tabId);
	};

	return (
		<AuthCheck
			fallback={
				<div className={`flex justify-center pt-10`}>
					<Link href="/">
						You need to login first to view this page.
					</Link>
				</div>
			}
		>
			<div className="flex flex-row justify-center py-4 md:py-10 gap-6">
				{Object.keys(currentUser).length !== 0 ? (
					<>
						<Head>
							<title>{currentUser.name}&apos;s profile</title>
							<Meta
								title="Profile page"
								url="/profile"
								image={"/images/hero.png"}
								description="View your favorite palettes. All your palettes at one place"
							/>
						</Head>
						<Image
							className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover"
							src={currentUser.photo}
							alt=""
						/>
						<div className="flex flex-col justify-evenly items-start">
							<div className="font-bold text-2xl sm:text-4xl">
								{currentUser.name}
							</div>
							<div>
								Saved Palettes{" "}
								<span className="font-bold text-gray-600">
									{currentUser.savedPalettes ?? 0}
								</span>
							</div>
							<Button
								variant={`bg-gray-800 text-white text-sm py-2 px-6 hover:bg-gray-900`}
								onClick={logOut}
							>
								Logout
							</Button>
						</div>
					</>
				) : (
					<PulseProfileLoader />
				)}
			</div>
			<div
				className={`
					flex md:justify-center overflow-x-auto 
					space-x-4 md:space-x-8 no-scrollbar 
					py-4 md:py-6 px-4
					sticky top-[48px] md:top-0 md:relative bg-white z-10
				`}
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`
							${active === tab.id ? "bg-gray-300 text-gray-800" : "bg-gray-100 text-gray-700"}
							flex flex-shrink-0 justify-center
							rounded-full w-[180px] sm:w-[200px] p-4
							hover:bg-gray-300
						`}
						onClick={() => handleClick(tab.id)}
					>
						{tab.title}
					</button>
				))}
			</div>
			{status === "loading" ? (
				<div className="flex justify-center">
					<Loader />
				</div>
			) : cards.length === 0 ? (
				<div className="text-center">
					No palette saved. Save palettes to get started
				</div>
			) : (
				<div
					className={`
								mx-4 sm:mx-10 grid grid-cols-1 
								sm:grid-cols-2 lg:grid-cols-3 
								xl:grid-cols-4 gap-8 mt-3 mb-3
								min-h-[500px]
							`}
				>
					{tabs.map((tab) => {
						if (tab.id === active) {
							return tab.content.map((doc) => (
								<Colorcard
									key={doc.paletteId}
									colorData={doc.paletteId.split("-")}
									isQuote
								/>
							));
						}
					})}
				</div>
			)}
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
