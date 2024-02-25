import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Modal from '../Modal/Modal';
import Dialog from '../Dialog/Dialog';
import Button from '../ui/Button/Button';
import ListItem from '../ListItem/ListItem';

// const listItems = [
// 	{
// 		name: 'Different Types of Data',
// 		time: '7:34 AM',
// 		date: '01/30/2024',
// 		status: 'complete',
// 		id: 2,
// 	},
// 	{
// 		name: 'Different Types of Function',
// 		time: '7:34 AM',
// 		date: '01/30/2024',
// 		status: 'uncomplete',
// 		id: 1,
// 	},
// 	{
// 		name: 'Different Types of Class',
// 		time: '7:34 AM',
// 		date: '01/30/2024',
// 		status: 'inprogress',
// 		id: 0,
// 	},
// ];

function Home() {
	// const [localStorageItems, setLocalStorageItems] = useState(fetchLocalStorageItem());
	const [items, setItems] = useState(fetchLocalStorageItem());
	const [addItemDialog, setAddItemDailog] = useState(false);
	const [updateItemDialog, setUpdateItemDailog] = useState(false);
	const [updateData, setUpdateData] = useState();
	const [currentUpdateId, setCurrentUpdateId] = useState(0);

	useEffect(() => {
		// Sync the `items` state with local storage
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]); // Depend on `items` to run this effect

	const handleDeleteItem = deleledId => {
		let updatedItems = items.filter(item => item.id != deleledId);
		
		setItems(sortListItemsArray(updatedItems));
	};

	const handleAddItem = () => {
		setAddItemDailog(true);
	};

	function sortListItemsArray(arr) {
		let newArr = [];
		arr.forEach((item, index) => {
			item.id = index;
			newArr.push(item);
		});

		return newArr;
	}

	const handleAddTask = data => {
		if(data.name == ''){
			console.log("Error: Task cannot be empty");
			return false;
		}

		let newId = ((items.length == 0) ? 0 : (items[0].id + 1));
		let newItem = { ...data, id: newId };
		
		setItems(prevItems=>{
			let newArr = sortListItemsArray([newItem, ...prevItems]);
			return newArr;
		});

		setAddItemDailog(false);
	};

	const handleUpdateItem = updateId => {
		setCurrentUpdateId(updateId);
		setUpdateData(items[updateId]);
		setUpdateItemDailog(true);
	};

	const handleUpdateSubmit = (title, status)=>{
		//get the current update id and update with data
		if(title == '' || title == undefined){
			console.log("Your data is empty, man ");
		}
		else {
			console.log("We recieved your data ");
			console.log(title, status, currentUpdateId);
			let pastStatus = items[currentUpdateId].status;
			items[currentUpdateId].status = (status == undefined || status == '')? pastStatus : status;
			items[currentUpdateId].name = title;
			// let newUpdatedArray = sortListItemsArray(items);
			setItems([...items]);
			setUpdateItemDailog(false);		
		}
		
	}

	const updateItemStatus = (id) => {
		let newStatus = ((items[id].status == "uncomplete") || (items[id].status == "inprogress")) ? "complete" : "uncomplete";
		items[id].status = newStatus;
		setItems([...items]);
	}

	const closeDailog = e => {
		e.preventDefault();
		setAddItemDailog(false);
		setUpdateItemDailog(false);
	};

	const addItemDialogBox = (
		<Dialog
			heading={'Add TODO'}
			mainBtnText={'Add Task'}
			closeDailog={closeDailog}
			handleAddTask={handleAddTask}
		/>
	);

	const updateItemDialogBox = (
		<Dialog
			heading={'Update TODO'}
			mainBtnText={'Update Task'}
			closeDailog={closeDailog}
			updateData = {updateData}
			handleUpdateSubmit = {handleUpdateSubmit}
		/>
	);

	function fetchLocalStorageItem(){
		let localStorageItems = JSON.parse(localStorage.getItem('items') || "[]");
		if(localStorageItems.length == 0){
			return [];
		}
		return localStorageItems;
	}

	const placeholderText = <div className={styles.placeholder}>
	<span>No Todos</span>
</div>;

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
						onClick={handleAddItem}
					></Button>

					<form>
						<select name="select" id="filter">
							<option value="all">All</option>
							<option value="inprogress">Inprogress</option>
							<option value="uncomplete">Incomplete</option>
							<option value="complete">Complete</option>
						</select>
					</form>
				</div>

				<div className={styles.listWrapper}>
					<ul>
						{items.map(item => (
							<ListItem
								data={item}
								key={item.id ?? 0}
								handleDeleteItem={() => {
									handleDeleteItem(item.id ?? 0);
								}}
								handleUpdateItem={() => {
									handleUpdateItem(item.id ?? 0);
								}}
								updateItemStatus = {()=>{updateItemStatus(item.id ?? 0)}}
								
							/>
						))}
					</ul>

					{items.length == 0 ? placeholderText : ''}
				</div>

				{addItemDialog && <Modal>{addItemDialogBox}</Modal>}
				{updateItemDialog && <Modal>{updateItemDialogBox}</Modal>}
			</div>
		</>
	);
}

export default Home;
