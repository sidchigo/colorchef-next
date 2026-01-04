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

const TABS = [
	{
		id: "cinemaPalette",
		index: 1,
		route: "/cinema",
		title: "Cinema",
	},
	{
		id: "goldenRatio",
		index: 2,
		route: "/golden-ratio",
		title: "Golden Ratio",
	},
	{
		id: "quoteCard",
		index: 3,
		route: "/colors",
		title: "Colors",
	},
	{
		id: "darkPalette",
		index: 4,
		route: "/dark-palette",
		title: "Dark Palette",
	},
];

const Profile = () => {
	const [currentUser, setCurrentUser] = useState({});
	const [active, setActive] = useState(1);
	const [cards, setCards] = useState([]);
	const [start, setStart] = useState();
	const [showMore, setShowMore] = useState(false);
	const [status, setStatus] = useState("loading");
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, "users", user?.uid);
				onSnapshot(userRef, (doc) => {
					setCurrentUser(doc.data());
					console.log("User:", doc.data());
				});

				const saveRef = collection(db, "saves");
				const q = query(
					saveRef,
					where("userId", "==", user?.uid),
					where("type", "==", TABS[0].id),
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
					console.log({ saveData });
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
				console.log({ q, type });
				onSnapshot(q, async (snapshot) => {
					let saveData = [];
					setStatus("loading");
					setStart(snapshot.docs[snapshot.docs.length - 1]);
					await snapshot.forEach((doc) => {
						saveData.push(doc.data());
					});
					setCards(saveData);
					console.log({ saveData });
					setStatus("idle");
				});
			}
		});
	};

	const logOut = async () => {
		dispatch(logout());
		await signOut(auth);
	};

	const handleClick = (tabId, tabIndex = 1) => {
		setActive(tabIndex);
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
							alt="currentUser.name"
							width={144}
							height={144}
						/>
						<div className="flex flex-col justify-evenly items-start">
							<div className="font-bold text-2xl sm:text-4xl">
								{currentUser.name}
							</div>
							<div>
								Saved Palettes:
								<span className="font-bold text-gray-600">
									&nbsp;{currentUser.savedPalettes ?? 0}
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
			{currentUser?.savedPalettes?.length !== 0 ? (
				<>
					<h3 className="flex justify-center text-lg">
						Palette Collection
					</h3>
					<div
						className={`
					flex md:justify-center overflow-x-auto 
					space-x-4 md:space-x-8 no-scrollbar 
					py-4 md:py-6 px-4
					sticky top-[48px] md:top-0 md:relative bg-white z-10
				`}
					>
						{TABS.map((tab) => (
							<button
								key={tab.id}
								className={`
							${
								active === tab.index
									? "bg-gray-300 text-gray-800"
									: "bg-gray-100 text-gray-700"
							}
							flex flex-shrink-0 justify-center
							rounded-full w-[180px] sm:w-[200px] p-4
							hover:bg-gray-300
						`}
								onClick={() => handleClick(tab.id, tab.index)}
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
							Explore{" "}
							<Link
								href={
									TABS.filter(
										(tab) => tab.index === active
									)[0].route
								}
								className="text-violet-600"
							>
								{
									TABS.filter(
										(tab) => tab.index === active
									)[0].title
								}
							</Link>
							&nbsp;and save palettes to get started.
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
							{TABS.map((tab) => {
								if (tab.index === active) {
									return cards.map((doc) => (
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
						{TABS.map((tab) => {
							if (tab.index === active) {
								return (
									cards.length !== 0 &&
									cards.length % 12 === 0 &&
									!showMore && (
										<Button
											key={tab.id}
											variant={`bg-violet-500 hover:bg-violet-600 text-white`}
											onClick={() =>
												getNextResults(tab.id)
											}
										>
											Show more -&gt;
										</Button>
									)
								);
							}
						})}
					</div>
					{showMore && (
						<div className={`flex justify-center italic my-4`}>
							Fin
						</div>
					)}
				</>
			) : (
				<div className="flex justify-center my-4">
					Explore Colorchef and save palettes and see your collection
					here.
				</div>
			)}
		</AuthCheck>
	);
};

export default Profile;
