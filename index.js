let page = 1;
const commentsList = document.getElementById('comments-list');
const BASE_URL = 'https://api.hiskio.com/v2/courses/349/feedbacks';

function getData() {
	fetch(`${BASE_URL}?page=${page}&column=created_at&sort=DESC&limit=6`)
		.then((response) => response.json())
		.then((results) => drawResults(results.data));
}

function drawResults(results) {
	const html = results
		.map(
			(result) =>
				`
      <li>
	  	<div class="comment-main-level">
	  		<!-- Avatar -->
	  		<div class="comment-avatar"><img src="${result.owner.avatar}" alt="" onerror="if (this.src != 'http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg') this.src = 'http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg';"></div>
	  		<!-- Contenedor del Comentario -->
	  		<div class="comment-box">
	  			<div class="comment-head">
	  				<h6 class="comment-name by-author">${result.owner.username}</a></h6>
	  				<span>${moment(moment(result.created_at).toArray()).fromNow()}</span>
	  				<i class="fa fa-heart"></i>
	  			</div>
	  			<div class="comment-content">
                    ${result.body}
	  			</div>
	  		</div>
	  	</div>
	  </li>
        `
		)
		.join('');
	page++;
	commentsList.innerHTML += html;
}

document.addEventListener('DOMContentLoaded', getData);
window.addEventListener('scroll', () => {
	if (
		document.documentElement.scrollTop +
			document.documentElement.clientHeight >=
		document.documentElement.scrollHeight
	) {
		setTimeout(() => {
			getData();
		}, 250);
	}
});
