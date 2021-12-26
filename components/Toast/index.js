import toast from 'react-hot-toast';

export default function showToast(message) {
    return toast.success(message, {
		style: {
			border: '1px solid #701B85',
			padding: '8px',
			color: '#701B85',
            borderRadius: 0
		},
		iconTheme: {
			primary: '#701B85',
			secondary: '#FFFAEE',
		},
	});
}