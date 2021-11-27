import { useRef, useEffect, useState } from 'react';

export default function useOutsideAlerter(initialShow) {
    const [show, setShow] = useState(initialShow);
    const ref = useRef(null);

    function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
			setShow(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside, true);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, [ref]);

    return {ref, show, setShow};
}
