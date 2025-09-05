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
//       console.log(data)
//     )
//     .catch((err) =>
//       console.log(err)
//     );


const loadCategoryAsync = async () => {
    try {
        const res = await fetch("https://news-api-fs.vercel.app/api/categories");
    const data = await res.json();
    console.log(data);
    } catch (err) {
        console.log(err);
    }
    
}

loadCategoryAsync()