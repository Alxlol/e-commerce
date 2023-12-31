import { writable, get } from 'svelte/store';

function formatTimestamp(timestamp) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const date = new Date(timestamp);
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	const ordinal = (day) =>
		day % 10 === 1 && day !== 11
			? `${day}st`
			: day % 10 === 2 && day !== 12
			? `${day}nd`
			: day % 10 === 3 && day !== 13
			? `${day}rd`
			: `${day}th`;

	return `${hours}:${minutes} - ${month} ${ordinal(day)} ${year}`;
}

export const reviews = writable([
	{
		id: 1,
		name: 'Osbaldo Beahan',
		body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, quam.',
		reactions: 4,
		time: '22:06 - August 28th 2023',
		img: 'https://randomuser.me/api/portraits/men/5.jpg',
		liked: false
	},
	{
		id: 2,
		name: 'Gary Neville',
		body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, quam.',
		reactions: 6,
		time: '22:06 - August 28th 2023',
		img: 'https://randomuser.me/api/portraits/men/15.jpg',
		liked: false
	},
	{
		id: 3,
		name: 'Lorem Name',
		body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, quam.',
		reactions: 1,
		time: '22:06 - August 28th 2023',
		img: 'https://randomuser.me/api/portraits/women/63.jpg',
		liked: false
	}
]);

export function addComment(comment) {
	reviews.update((reviews) => {
		return [
			{
				id: reviews.length + 1,
				name: 'Guest User',
				body: comment,
				reactions: 0,
				time: formatTimestamp(Date.now()),
				img: 'https://randomuser.me/api/portraits/lego/2.jpg',
				liked: false
			},
			...reviews
		];
	});
}

export function likeComment(comment) {
	let items = get(reviews);
	let itemId = comment.id;
	let commentIndex = items.findIndex((item) => {
		return item.id == itemId;
	});

	reviews.update((items) => {
		const newArray = items;
		newArray[commentIndex] = {
			...newArray[commentIndex],
			reactions: newArray[commentIndex].reactions + 1,
			liked: true
		};
		return newArray;
	});
}
