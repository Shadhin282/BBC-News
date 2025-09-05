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
            e.target.classList.remove('border-b-4')
            console.log(e.target)
             
            e.target.classList.add("border-b-4")
           
        }
    })
}
loadCategory();
