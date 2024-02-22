import React from 'react';
import styles from './Button.module.scss';

function Button({ bgColor, color, margin, text, onClick }) {
	return (
		<button
			style={{
				backgroundColor: `${bgColor}`,
				color: `${color}`,
				margin: `${margin}`,
				text: `${text}`,
			}}
			onClick={onClick}
		>
			{text}
		</button>
	);
}

export default Button;
