//imports the components and states
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Modal from '../Modal/Modal';
import Dialog from '../Dialog/Dialog';
import Button from '../ui/Button/Button';
import ListItem from '../ListItem/ListItem';
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdAlert } from "react-icons/io";

//parent component having all the global states
function Home() {
	const [items, setItems] = useState(fetchLocalStorageItem());
	const [addItemDialog, setAddItemDailog] = useState(false);
	const [updateItemDialog, setUpdateItemDailog] = useState(false);
	const [updateData, setUpdateData] = useState();
	const [currentUpdateId, setCurrentUpdateId] = useState(0);
	const [listStatus, setListStatus] = useState('all');
	const [errorMsg, setErrorMsg] = useState();
	const [isError, setIsError] = useState(false);
	const [icon, setIcon] = useState();

	//icons to append in error or success message
	const successIcon = <FaCircleCheck style={{color: 'rgb(129, 201, 21)', fontSize: '24px'}} />;
	const failedIcon = <IoMdAlert style={{color: 'red', fontSize: '24px'}} />

	//items filtered from local storage, initally shows "all" items
	let filteredItems = items.filter(item => {
		if(listStatus == 'all'){
			return true;
		}
		return (item.status == listStatus);
	});

	//saves items to local storage everytime our list "items" array gots modified
	useEffect(() => {
		// Sync the `items` state with local storage
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]); // Depend on `items` to run this effect

	//deletes the items
	const handleDeleteItem = deleledId => {
		let updatedItems = items.filter(item => item.id != deleledId);
		setItems(sortListItemsArray(updatedItems));
		setError("Item deleted successfully!")
		setIcon(successIcon);
	};

	//shows the dialog on "Add Item" button click
	const handleAddItem = () => {
		setAddItemDailog(true);
	};

	// sorts the input array with id
	function sortListItemsArray(arr) {
		let newArr = [];
		arr.forEach((item, index) => {
			item.id = index;
			newArr.push(item);
		});

		return newArr;
	}

	// handles add list item
	const handleAddTask = data => {
		if(data.name == ''){
			setError("Cannot add empty item!");
			setIcon(failedIcon);
			return false;
		}

		// adds id with one greater than previous items
		let newId = ((items.length == 0) ? 0 : (items[0].id + 1));
		let newItem = { ...data, id: newId };
		
		//updates the global list "items" state, also triggers useEffect
		setItems(prevItems=>{
			let newArr = sortListItemsArray([newItem, ...prevItems]);
			return newArr;
		});
		
		setError("Item added succesfully!");
		setIcon(successIcon);
		setAddItemDailog(false);
	};

	// handles 'update item" click, provide data in states to render in dailog
	const handleUpdateItem = updateId => {
		setCurrentUpdateId(updateId);
		setUpdateData(items[updateId]);
		setUpdateItemDailog(true);
	};

	// handles when data is updated
	const handleUpdateSubmit = (title, status)=>{
		//get the current update id and update with data
		if(title == items[currentUpdateId].name){
			setError("Cannot update! Same value detected!");
			setIcon(failedIcon);
		}
		else {
			// console.log("We recieved your data ");
			// console.log(title, status, currentUpdateId);
			let pastStatus = items[currentUpdateId].status;
			items[currentUpdateId].status = (status == undefined || status == '')? pastStatus : status;
			items[currentUpdateId].name = title;
			// let newUpdatedArray = sortListItemsArray(items);
			setItems([...items]);
			setUpdateItemDailog(false);		
			setError("Item updated successfully!")
			setIcon(successIcon);
		}
		
	}

	// add status from checkbox and triggers useEffect to save items
	const updateItemStatus = (id) => {
		let newStatus = ((items[id].status == "uncomplete") || (items[id].status == "inprogress")) ? "complete" : "uncomplete";
		items[id].status = newStatus;
		setItems([...items]);
	}

	// closes the dailog box
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

	// fetches the local storage items
	function fetchLocalStorageItem(){
		let localStorageItems = JSON.parse(localStorage.getItem('items') || "[]");
		if(localStorageItems.length == 0){
			return [];
		}
		return localStorageItems;
	}

	// filters list items based on status value
	function handleListStatusChange(currentStatus){
		setListStatus(currentStatus);
		// console.log("current List status: " + currentStatus);
		 filteredItems = items.filter(item => item.status == currentStatus);
		// console.log("Filtered Items: " + JSON.stringify(filteredItems));
		
	}

	// sets error or success message
	function setError(err){
		setErrorMsg(err)
		setIsError(true);
		setTimeout(()=>{setIsError(false);},3000)
	}

	// dummy placeholder while there are no items
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
						<select name="select" id="filter" value={listStatus} onChange={(e)=>{handleListStatusChange(e.target.value)}}>
							<option value="all">All</option>
							<option value="inprogress">Inprogress</option>
							<option value="uncomplete">Incomplete</option>
							<option value="complete">Complete</option>
						</select>
					</form>
				</div>

				<div className={styles.listWrapper}>
					<ul>
						{
						filteredItems.map(item => (
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

					{filteredItems.length == 0 ? placeholderText : ''}
				</div>

				{addItemDialog && <Modal>{addItemDialogBox}</Modal>}
				{updateItemDialog && <Modal>{updateItemDialogBox}</Modal>}

				{isError && <div className={styles.errorWrapper} style={{bottom: "20px"}}>
				{icon}	<p className={styles.errorMsg}>{errorMsg}</p>
				</div>}
			</div>
		</>
	);
}

export default Home;
