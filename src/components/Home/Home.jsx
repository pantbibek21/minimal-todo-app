import React from 'react';
import styles from './Home.module.scss';
import Modal from '../Modal/Modal';
import Dialog from '../Dialog/Dialog';
import Button from '../ui/Button/Button';

function Home() {
	const dialogForAddingItem = (
		<Dialog heading={'Add TODO'} mainBtnText={'Add Task'} />
	);
	const dialogForUpdatingItem = (
		<Dialog heading={'Update TODO'} mainBtnText={'Update Task'} />
	);

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.mainHeading}>TODO LIST</h1>
				<div className={styles.header}>
					<Button 
						bgColor={'#646ff0'}
						color={'rgba(255, 255, 255, 0.904)'}
            margin={'margin: 12px 10px 0px 0px;'}
						text={'Add Task'}
					></Button>

					<form>
						<select name="select" id="filter">
							<option value="all">All</option>
							<option value="incomplete">Incomplete</option>
							<option value="complete">Complete</option>
						</select>
					</form>
				</div>
			</div>
		</>
	);
}

export default Home;
