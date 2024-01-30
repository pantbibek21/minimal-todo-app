import React from 'react';
import styles from './EditDeleteIcon.module.scss';
import { MdDelete, MdEdit } from 'react-icons/md';

const EditDeleteIcon = () => {
	return (
		<>
			<div className={styles.iconWrapper}>
				<MdDelete className={styles.icon} />
				<MdEdit className={styles.icon}/>
			</div>
		</>
	);
};

export default EditDeleteIcon;
