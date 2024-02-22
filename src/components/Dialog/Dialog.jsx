import React from 'react';
import styles from './Dialog.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../ui/Button/Button';

function Dialog({ heading, mainBtnText, closeDailog }) {

	return (
		<div className={styles.wrapper}>
			<h3>{heading}</h3>
			<form>
				<div className={styles.field}>
					<label htmlFor="title">Title</label>
					<input type="text" id="title" />
				</div>

				<div className={styles.field}>
					<label htmlFor="select">Status</label>
					<select id="select">
						<option value="incomplete">Incomplete</option>
						<option value="complete">Complete</option>
					</select>
				</div>
				<Button
					bgColor={'#646ff0'}
					color={'rgba(255, 255, 255, 0.904)'}
					text={mainBtnText}
				></Button>

				<Button bgColor={'#cccdde'} color={'#646681'} text={'Cancel'}></Button>
			</form>

			<div className={styles.cross} onClick={closeDailog}>
				<IoClose className={styles.closeIcon} />
			</div>
		</div>
	);
}

export default Dialog;
