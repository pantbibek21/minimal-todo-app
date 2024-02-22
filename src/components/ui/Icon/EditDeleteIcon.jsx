import React from 'react';
import styles from './EditDeleteIcon.module.scss';
import { MdDelete, MdEdit } from 'react-icons/md';

const EditDeleteIcon = ({handleUpdateItem, handleDeleteItem}) => {

	return (
		<>
			<div className={styles.iconWrapper}>
				<span onClick={handleDeleteItem}><MdDelete className={styles.icon} /></span>
				<span onClick={handleUpdateItem}>	<MdEdit className={styles.icon}/></span>
			</div>
		</>
	);
};

export default EditDeleteIcon;
