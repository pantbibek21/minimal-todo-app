import React, { useState } from 'react';
import styles from './Home.module.scss';
import Modal from '../Modal/Modal';
import Dialog from '../Dialog/Dialog';
import Button from '../ui/Button/Button';
import ListItem from '../ListItem/ListItem';

const listItems = [
	{
		name: 'Different Types of Data',
		time: '7:34 AM',
		date: '01/30/2024',
		id: 1,
	},
	{
		name: 'Different Types of Function',
		time: '7:34 AM',
		date: '01/30/2024',
		id: 2,
	},
	{
		name: 'Different Types of Class',
		time: '7:34 AM',
		date: '01/30/2024',
		id: 3,
	},
];

function Home() {
	const [items, setItems] = useState(listItems);
	const [addItemDialog, setAddItemDailog] = useState(false);
	const [updateItemDialog, setUpdateItemDailog] = useState(false);


	const addItemDialogBox = (
		<Dialog heading={'Add TODO'} mainBtnText={'Add Task'} />
	);

	const updateItemDialogBox = (
		<Dialog heading={'Update TODO'} mainBtnText={'Update Task'} />
	);

	const handleDeleteItem = (deleledId)=>{
		let updatedItems = items.filter(item=> item.id != deleledId);
		setItems(updatedItems);
	}

	const handleAddItem = ()=>{
		setAddItemDailog(true);
	}

	const handleUpdateItem = ()=>{
		setUpdateItemDailog(true);
	}

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.mainHeading}>TODO LIST</h1>

				<div className={styles.header}>
					<Button
						bgColor={'#646ff0'}
						color={'rgba(255, 255, 255, 0.904)'}
						margin={'margin: 12px 10px 0px 0px'}
						text={'Add Task'}
						handleAddItem={handleAddItem}
					></Button>

					<form>
						<select name="select" id="filter">
							<option value="all">All</option>
							<option value="incomplete">Incomplete</option>
							<option value="complete">Complete</option>
						</select>
					</form>
				</div>

				<div className={styles.listWrapper}>
					<ul>
						{items.map(item => (
							<ListItem data={item} key={item.id} handleDeleteItem = {()=>{handleDeleteItem(item.id)}} handleUpdateItem={handleUpdateItem}/>
						))}
					</ul>
				</div>

				{addItemDialog && <Modal>{addItemDialogBox}</Modal> }
				{updateItemDialog && <Modal>{updateItemDialogBox}</Modal>}
				
			</div>
		</>
	);
}

export default Home;
