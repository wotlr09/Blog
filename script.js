document.getElementById('create-post').addEventListener('submit', function (e) {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const mediaFile = document.getElementById('media').files[0];
    const postsSection = document.getElementById('posts');
    
    const postId = new Date().getTime();
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-author', author);
    postElement.setAttribute('data-post-id', postId);

    let postContent = `<strong>${author}</strong><p>${content}</p>`;

    if (mediaFile) {
        const fileURL = URL.createObjectURL(mediaFile);
        if (mediaFile.type.startsWith('image/')) {
            postContent += `<img src="${fileURL}" alt="첨부 이미지">`;
        } else if (mediaFile.type.startsWith('video/')) {
            postContent += `<video controls src="${fileURL}"></video>`;
        }
    }

    postElement.innerHTML = postContent;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function () {
        const loggedInUser = document.getElementById('author').value;
        if (loggedInUser === postElement.getAttribute('data-author')) {
            postsSection.removeChild(postElement);
        } else {
            alert('자신이 작성한 게시물만 삭제할 수 있습니다.');
        }
    });

    postElement.appendChild(deleteButton);
    postsSection.appendChild(postElement);

    document.getElementById('create-post').reset();
});