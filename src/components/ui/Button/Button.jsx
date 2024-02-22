import React from 'react';
import styles from './Button.module.scss';

function Button({ bgColor, color, margin, text, handleAddItem }) {
	return (
		<button
			style={{
				backgroundColor: `${bgColor}`,
				color: `${color}`,
				margin: `${margin}`,
				text: `${text}`,
			}}
			onClick={handleAddItem}
		>
			{text}
		</button>
	);
}

export default Button;
