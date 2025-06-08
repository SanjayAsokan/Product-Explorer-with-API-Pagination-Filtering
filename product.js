let products = [];
let currentPage = 1;
let productsPerPage = 8;
let currentFilter = "";
let currentSort = "";

const producterContainer = document.getElementById("product-container");
const pageNum = document.getElementById('page-num');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const sortSelect = document.getElementById('sort');
const filterSelect  = document.getElementById('filter');

async function fetchproduct(){
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();

    const categories = [...new Set(products.map(p=>p.category))];
    categories.forEach(pro=>{
        const option = document.createElement("option");
        option.value = pro;
        option.textContent =pro;
        filterSelect.appendChild(option);
    });
    renderProducts();
}

function renderProducts(){
    let filtered = [...products];
    //filter
    if(currentFilter){
        filtered = filtered.filter(p=>p.category === currentFilter);
    }
    //sort
    if(currentSort=="low"){
        filtered.sort((a, b)=> a.price - b.price);
    }else if(currentSort === " high"){
        filtered.sort((a, b)=> b.price - a.price);
    }
    else{
        filtered.sort((a, b)=>a.title.localeCompare(b.title));
    }

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageItems = filtered.slice(start, end);

    producterContainer.innerHTML="";
    pageItems.forEach(p=>{
        const div = document.createElement('div');
        div.className = "product-card";
        div.innerHTML = `
        <img src="${p.image}" />
        <h4>${p.title}</h4>
        <p>₹${p.price}</p>
        <small>${p.category}</small>
        `;
        producterContainer.appendChild(div);
    });

    pageNum.textContent = `page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= filtered.length;
}

prevBtn.addEventListener('click', ()=>{
    currentPage--;
    renderProducts();
});

nextBtn.addEventListener('click',()=>{
    currentPage++;
    renderProducts();
});

sortSelect.addEventListener('change', ()=>{
    currentSort = sortSelect.value;
    currentPage = 1;
    renderProducts();
});

filterSelect.addEventListener('change',()=>{
    currentFilter = filterSelect.value;
    currentPage = 1;
    renderProducts();
});

fetchproduct();

