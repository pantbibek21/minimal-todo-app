import React from 'react';
import styles from './Button.module.scss';

function Button({ bgColor, color, margin, text }) {
	return (
		<button
			style={{
				backgroundColor: `${bgColor}`,
				color: `${color}`,
				margin: `${margin}`,
				text: `${text}`,
			}}
		>
			{text}
		</button>
	);
}

export default Button;
