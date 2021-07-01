async function fetchUserData() {
    let res = await fetch('https://jsonplaceholder.typicode.com/users')
    let data = await res.json()
    return data;
}

async function fetchPostsData() {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await res.json();
    return data;
}

async function showPostData(userId, parentTag) {
    let data = await fetchPostsData()
    const userPosts = data.filter((post) => post.userId == userId);

    
    let posts = document.createElement('div');
    posts.id = 'posts';
    posts.className = 'break';
    
    for (el in userPosts) {
        let postTitle = document.createElement('h3');
        let postDesc = document.createElement('p');
        let postItem = document.createElement('div');
        postItem.className = 'post-item'
        postTitle.className = 'post-title'
        postDesc.className = 'post-text'
        postTitle.innerHTML = userPosts[el].title;
        postDesc.innerHTML = userPosts[el].body;
        postItem.appendChild(postTitle);
        postItem.appendChild(postDesc);
        posts.appendChild(postItem);
        parentTag.appendChild(posts);
    }
}

async function showUserInfo() {
    const data = await fetchUserData();

    for (el in data) {
        let namesElement = document.getElementById('names');
        let nameTag = document.createElement('span');
        nameTag.className = 'info'
        nameTag.setAttribute('value', data[el].id)
        namesElement.appendChild(nameTag);
        let nameEl = document.createElement('div');
        let emailEl = document.createElement('div');
        let button = document.createElement('button');
        let closeButton = document.createElement('button')

        nameEl.className = 'name';
        emailEl.className = 'email';
        button.className = 'button';
        closeButton.classList.add('button')
        closeButton.classList.add('active')
        nameEl.innerHTML = data[el].name
        emailEl.innerHTML = data[el].email
        button.innerHTML = 'Get User\'s Posts'
        closeButton.innerHTML = 'Close'
        nameTag.appendChild(nameEl)
        nameTag.appendChild(emailEl)
        nameTag.appendChild(button)


        button.addEventListener('click', () => {
            if (nameTag.children[3] === undefined && button.innerHTML === 'Get User\'s Posts') {
                let id = nameTag.getAttribute('value');
                showPostData(id, nameTag)
                button.innerHTML = 'Close'
            } else {
                button.innerHTML = 'Get User\'s Posts'
                let openObj = nameTag.childNodes[3];
                nameTag.removeChild(openObj)
            }
        })
    }
}

showUserInfo()




