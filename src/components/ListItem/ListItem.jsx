import React, { useEffect, useState } from 'react';
import styles from './ListItem.module.scss';
import EditDeleteIcon from '../ui/Icon/EditDeleteIcon';


const ListItem = ({data, handleDeleteItem, handleUpdateItem, updateItemStatus}) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckbox = ()=>{
		setIsChecked(prev=>{!prev});
		updateItemStatus();
	}

	useEffect(()=>{
		(data.status == "complete")? setIsChecked(true): setIsChecked(false);
	}, [data])

	return (
		
				<li>
					<div className={styles.left}>
						<div className={styles.checkboxWrapper}>
							<input type="checkbox" checked={isChecked} onChange={()=>{handleCheckbox()}} />
						</div>
						<div className={styles.description}>
							<h3 className={styles.listHeading}>{data.name}</h3>
							<p>
								<span className={styles.time}>{data.time}, </span>
								<span className={styles.date}>{data.date}</span>
							</p>
						</div>
					</div>

					<EditDeleteIcon handleDeleteItem = {handleDeleteItem} handleUpdateItem={handleUpdateItem}/>
				</li>
			
	);
};

export default ListItem;
