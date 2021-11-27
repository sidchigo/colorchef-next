import styles from './button.module.css';

const Button = ({ variant, children, style, onClick }) => {
    return (
		<button 
			className={`px-4 py-2 ${variant}`} 
			style={style}
			onClick={onClick}
		>{children}</button>
	);
}

export default Button;