import React, { useState, useEffect } from 'react';
import styles from './Dialog.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../ui/Button/Button';
import EditDeleteIcon from '../ui/Icon/EditDeleteIcon';

function Dialog({
	heading,
	mainBtnText,
	closeDailog,
	handleAddTask,
	updateData,
	handleUpdateSubmit,
}) {

	const [title, setTitle] = useState();
	const [optionValue, setOptionValue] = useState('inprogress'); 
	
	useEffect(() => {
		setTitle(updateData?.name || '');
		setOptionValue(updateData?.status || 'inprogress');
	}, [updateData]);

	const handleSubmit = e => {
		e.preventDefault();

		if (updateData == undefined) {
			let date = getCurrentFormattedDate();
			let time = getCurrentTime();
			

			let data = {
				name: title,
				time: time,
				date: date,
				status: optionValue,
			};
			// console.log(data);
			handleAddTask(data);
		} else {
			handleUpdateSubmit(title, optionValue);
		}
	};

	function getCurrentFormattedDate() {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const currentDate = new Date();
		const month = months[currentDate.getMonth()];
		const day = currentDate.getDate();
		const year = currentDate.getFullYear();

		const formattedDate = `${month} ${day}, ${year}`;

		return formattedDate;
	}

	function getCurrentTime() {
		const currentDate = new Date();
		const options = { timeZone: 'Asia/Kathmandu' };
		const localTime = currentDate.toLocaleTimeString('en-US', options);
		return localTime;
	}

	return (
		<div className={styles.wrapper}>
			<h3>{heading}</h3>
			<form>
				<div className={styles.field}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="select">Status</label>
					<select
						id="select"
						value={optionValue}
						onChange={e => setOptionValue(e.target.value)}
					>
						<option value="inprogress">Inprogress</option>{' '}
						{/* Corrected the value to match the state initialization */}
						<option value="uncomplete">Uncomplete</option>
						<option value="complete">Complete</option>
					</select>
				</div>
				<Button
					bgColor={'#646ff0'}
					color={'rgba(255, 255, 255, 0.904)'}
					text={mainBtnText}
					onClick={handleSubmit}
				></Button>

				<Button
					bgColor={'#cccdde'}
					color={'#646681'}
					text={'Cancel'}
					onClick={closeDailog}
				></Button>
			</form>

			<div className={styles.cross} onClick={closeDailog}>
				<IoClose className={styles.closeIcon} />
			</div>
		</div>
	);
}

export default Dialog;
