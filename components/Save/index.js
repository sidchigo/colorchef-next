import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import styles from 'components/Colorcards/Colorcard.module.css';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from 'lib/firebase';
import {
	doc,
	increment,
	writeBatch
} from 'firebase/firestore';

// components
import AuthCheck from 'components/AuthCheck';
import showToast from 'components/Toast';
import { useAuthState } from 'react-firebase-hooks/auth';

const Save = ({ data }) => {
	const paletteId = data.join("-");
	const [user] = useAuthState(auth);
	const docId = `${user?.uid}_${paletteId}`;
	const saveRef = doc(db, "saves", docId);
	const paletteRef = doc(db, "palettes", paletteId);

	const [saved] = useDocument(saveRef);

	const savePalette = async () => {
		let type = "quoteCard";
		switch (data.length) {
			case 2:
				type = "quoteCard";
				break;
			case 3:
				type = "goldenRatio";
				break;
			case 6:
				type = "darkPalette";
				break;
			default:
				type = "quoteCard";
		}

		const batch = writeBatch(db);
		const saveRef = doc(db, "saves", docId);
		const userRef = doc(db, "users", user?.uid);

		batch.set(paletteRef, { totalSaves: increment(1), type });
		batch.update(userRef, { savedPalettes: increment(1) });
		batch.set(saveRef, { userId: user?.uid, paletteId, type });

		await batch.commit();
		showToast("Palette saved!");
	};

	const unSavePalette = async () => {
		const batch = writeBatch(db);
		const userRef = doc(db, "users", user?.uid);
		batch.update(paletteRef, { totalSaves: increment(-1) });
		batch.update(userRef, { savedPalettes: increment(-1) });
		batch.delete(saveRef);

		await batch.commit();
	};

	return (
		<AuthCheck
			fallback={
				<button
					className={`${styles.SVGButton}`}
					onClick={() => toast.error("Please login to save")}
				>
					<svg
						className="h-6 w-6 hover:text-violet-600"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						stroke="currentColor"
					>
						<path
							strokeWidth={2}
							d="M11.6414 13.4163L4.5 20.7677V2.5H19.5V20.7677L12.3586 13.4163L12 13.0471L11.6414 13.4163Z"
						/>
					</svg>
				</button>
			}
		>
			<button
				className={`${styles.SVGButton}`}
				onClick={() =>
					saved?.exists() ? unSavePalette() : savePalette()
				}
			>
				<svg
					className="h-6 w-6 hover:text-violet-600"
					viewBox="0 0 24 24"
					fill={saved?.exists() ? "currentColor" : "none"}
					xmlns="http://www.w3.org/2000/svg"
					stroke="currentColor"
				>
					<path
						strokeWidth={2}
						d="M11.6414 13.4163L4.5 20.7677V2.5H19.5V20.7677L12.3586 13.4163L12 13.0471L11.6414 13.4163Z"
					/>
				</svg>
			</button>
		</AuthCheck>
	);
};

export default Save;
