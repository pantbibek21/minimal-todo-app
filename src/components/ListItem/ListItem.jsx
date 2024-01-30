import React from 'react';
import styles from './ListItem.module.scss';
import EditDeleteIcon from '../ui/Icon/EditDeleteIcon';


const ListItem = () => {
	return (
		
				<li>
					<div className={styles.left}>
						<div className={styles.checkboxWrapper}>
							<input type="checkbox" />
						</div>
						<div className={styles.description}>
							<h3 className={styles.listHeading}>Different Types of Data</h3>
							<p>
								<span className={styles.time}>7:21 AM, </span>
								<span className={styles.date}>01/30/2024</span>
							</p>
						</div>
					</div>

					<EditDeleteIcon />
				</li>
			
	);
};

export default ListItem;
