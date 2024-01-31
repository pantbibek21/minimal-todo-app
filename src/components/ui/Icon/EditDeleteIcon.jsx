import React from 'react';
import styles from './EditDeleteIcon.module.scss';
import { MdDelete, MdEdit } from 'react-icons/md';

const EditDeleteIcon = ({handleClick}) => {
	return (
		<>
			<div className={styles.iconWrapper}>
				<span><MdDelete className={styles.icon} /></span>
				<span onClick={handleClick}>	<MdEdit className={styles.icon}/></span>
			</div>
		</>
	);
};

export default EditDeleteIcon;
