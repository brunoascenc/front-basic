window.addEventListener('load', function () {
  const loader = document.querySelector('.loader-container');
  loader.className += ' hidden';
});

//fetch data
async function getInstaFeed() {
  try {
    const response = await fetch(
      'https://us-central1-squid-apis.cloudfunctions.net/test-front-basic'
    );
    const data = await response.json();

    showInstaFeed(data);
  } catch (error) {
    showError(error);
  }
}
getInstaFeed();

//display data
function showInstaFeed(feedItems) {
  let output = '';

  for (let post of feedItems) {
    output += `
      <div class="col-8 col-sm-auto pt-2">
        <a href=${post.link} class="post">
          <img
            src=${post.imagens.thumbnail.url} 
            style="width:${post.imagens.thumbnail.width}px;
            height:${post.imagens.thumbnail.height}px"
            alt=${post.legenda}
           />
          <div class="post-info">
            <div class="users">${
              post.metadados.users_in_photo
                ? post.metadados.users_in_photo.map((users) => {
                    return `<span>@${users.user.username}</span>`;
                  })
                : ''
            }</div>
            <span><i class="fas fa-heart"></i> ${post.upvotes}</span>
            <span><i class="fas fa-comment"></i> ${post.comentarios}</span>
            <span><i class="fas fa-calendar-alt"></i>
              ${moment(post.criadoEm).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </a>
      </div>
      `;
  }
  document.getElementById('insta-feed').innerHTML = output;
}

//handle error
function showError(error) {
  let errorMessage = error;
  document.querySelector('.error-container').classList.toggle('show-error');
  document.querySelector('.error').innerHTML = errorMessage;
}
