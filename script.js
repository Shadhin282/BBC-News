// promise -> pending, resolve(success), reject(error)

// const url = "https://news-api-fs.vercel.app/api/categories";

// const loadCategory = () => {
//   fetch("https://news-api-fs.vercel.app/api/categories")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// .catch((err)=> console.log(err))
// };

// loadCategory();

// fetch("https://news-api-fs.vercel.app/api/categories")
//     .then((res) => {
//       res.json();
//     })
//     .then((data) =>
//       console.log(data.categories)
//     )
//     .catch((err) =>
//       console.log(err)
//     );

// const loadCategoryAsync = async () => {
//     try {
//         const res = await fetch("https://news-api-fs.vercel.app/api/categories");
//     const data = await res.json();
//     console.log(((data.categories)[0].title));
//     } catch (err) {
//         console.log(err);
//     }

// }

// loadCategoryAsync()

const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("news-container");
const bookmarContainer = document.getElementById("bookmark-container");
const bookmarkCount = document.getElementById("bookmarCount");
const newsDetailsModal = document.getElementById("news-details-modal");
const modalContainer = document.getElementById("modal-container");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
    //   data.categories;

      const categories = data.categories;
        showCategory(categories);
      });
      
    // });
};

const showCategory = (categories) => {
     // categories.forEach((cat) => {

        //   categoryContainer.innerHTML += `
        //     <li class="hover:border-b-4 border-red-700 cursor-pointer">${cat.title}</li>
        //     `;
        for (const category of categories) {
            categoryContainer.innerHTML += `
             <li id=${category.id} class="hover:border-b-4 border-red-700 cursor-pointer">${category.title}</li>
            `;
    }
    
    categoryContainer.addEventListener("click", (e) => {
        // console.log(e.target)
        
        const allLi = document.querySelectorAll('li')
        allLi.forEach(li => li.classList.remove("border-b-4"))
        if (e.target.localName === 'li') {
            showloading()
            // console.log(e.target)
             
            e.target.classList.add("border-b-4")
            loadNewsByCategory(e.target.id)
           
        }
    })
}

const loadNewsByCategory = (id) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            showNewsByCategory(data.articles
            )
            // const dataArticle = data.articles;
            // dataArticle.forEach(news => {
            //     const inLi = document.createElement('span');
            //     inLi.innerHTML = `
            //         <p> ${news.title} </p>
            //     `;

        }).catch((err)=> {
             showError()
            })
        }


const showNewsByCategory = (articles) => {
    // console.log(articles)
    if (articles.length === 0) {
        showEmpty();
        return;
        
    }
    newsContainer.innerHTML = '';
    // const allLi = document.querySelectorAll('.news')
    //     allLi.forEach(li => li.style.display = 'none')
    articles.forEach(article => {
        newsContainer.innerHTML += `
        <div class='news rounded-xl border-1 border-gray-200 p-4 space-y-2'>
            <div>
            <img src="${article.image.srcset[5].url}" />
            </div>
           <div id=${article.id} class="">
             <h1 class="font-bold">${article.title}</h1>
            <p>${article.time}</p>
             
                <button class="border-1 border-gray-300 rounded-sm bg-red-400 text-white px-1 text-md ">Bookmark</button>
                <button class="border-1 border-gray-300 rounded-sm bg-red-400 text-white px-2 text-md">Details</button>
             
           </div>
        </div>
        `;
    })
}
let bookmarks = [];
newsContainer.addEventListener("click", (e) => {
    // if (e.target.localName !=='div') {
    //      console.log(e.target)
    // }
    if (e.target.innerText === 'Bookmark') {
        // console.log("bookmark clicked")
        // console.log(e.target.parentNode.id)
        // console.log(e.target.parentNode.children[1].innerText)
        handleBookmark(e);
    }
    if (e.target.innerText === 'Details') {
        // console.log("bookmark clicked")
        // console.log(e.target.parentNode.id)
        // console.log(e.target.parentNode.children[1].innerText)
        handleViewDetails(e);
    }

})

const handleBookmark = (e) => {
    const title = e.target.parentNode.children[0].innerText;
        const id = e.target.parentNode.id;
        bookmarks.push({
            title: title,
            id: id
        })
    // console.log(bookmarks);
    showBookmarks(bookmarks)
}

const showBookmarks = (bookmarks) => {
    // console.log(bookmarks)
    bookmarContainer.innerHTML = '';
    bookmarks.forEach(bookmark => {
       
        bookmarContainer.innerHTML += `

        <div class="border-1 mb-2">
        <h1>${bookmark.title}</h1>
        <button onclick="handleDeleteBookmark('${bookmark.id}')"  class="btn">Delete</button>
        </div>

        `;
    })
    bookmarkCount.innerText = bookmarks.length;
};

const handleDeleteBookmark = (bookmarkId) => {
    // console.log(bookmarkId)
    // console.log(bookmarks)
    const filteredBookmark = bookmarks.filter
        (bookmark => bookmark.id !== bookmarkId);
    console.log(filteredBookmark)
     bookmarks = filteredBookmark
    showBookmarks(bookmarks)
}

const handleViewDetails = (e)=>{
    const id = e.target.parentNode.id;
    // newsDetailsModal.showModal()
    fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then(res => res.json())
    .then(data => {
        showDetailsNews(data.article);
    }).catch( err => {
        console.log(err);
    })

}

const showDetailsNews = (article)=>{
        newsDetailsModal.showModal()

        modalContainer.innerHTML = `
            <h1>${article.title}</h1>
            <img src="${article.images[0].url}" />
            <p>${article.content.join(" ")} </p>
        `;
}

const showloading = () => {
    newsContainer.innerHTML = `
        <div class="text-center">
                <h1>loading....</h1>
            </div>
    `;
}
const showError = () => {
    newsContainer.innerHTML = `
        <div class="text-center">
                <h1>Error....</h1>
            </div>
    `;
}

const showEmpty = () => {
     newsContainer.innerHTML = `
        <div class="text-center">
                <h1>hosw Empty....</h1>
            </div>
    `;
}

loadCategory();
loadNewsByCategory('main')
