const newz_key = "cbd14a15b2454f5d973a7126e4f09f90";
const url ="https://newsapi.org/v2/everything?q=";                 
window.addEventListener("load", ()=> addnews("world"));
addnews= async (query)=>{
   const news = await fetch(`${url}${query}&apiKey=${newz_key}`)
   const data=  await news.json()
   console.log(data);
   bindData(data.articles);
}
bindData=(articles)=>{
    let cardContainer = document.getElementById("card-container");
    let cards =document.getElementById("template-cards");
 
    cardContainer.innerHTML =" ";
    articles.forEach(article=>{
        if(!article.urlToImage) return ;
     let clonecards=cards.content.cloneNode(true);
     filldataincard(clonecards,article);
     cardContainer.appendChild(clonecards);
    })
    
}
function filldataincard(clonecards,article){
    const newstitle=clonecards.querySelector("#newstitle");
    const newsdesc=clonecards.querySelector("#newsdesc");
    const newssource=clonecards.querySelector("#newssource");
    const newsImg= clonecards.querySelector("#newsimage");
    newsImg.src = article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newssource.innerHTML=`${article.source.name}   ||   Date:${date}`; 
    clonecards.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })




}
const searchbar=document.getElementById("find");
const btn= document.getElementById("btn");
let currentnav= null;
function onNavClick(id){
    addnews(id);
    navitem=document.getElementById(id);
    currentnav?.classList.remove('active');
    currentnav=navitem;
    currentnav.classList.add('active');
    searchbar.value='';

}

btn.addEventListener("click",()=>{
    let query=searchbar.value;
    if(!query) return;
    addnews(query);
    currentnav.classList.remove('active');
    currentnav=null;
})
function reload(){
    window.location.reload();
}

