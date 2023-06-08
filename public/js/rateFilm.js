const stars = document.querySelectorAll('.comment-stars>img')

function rateFilm(rate) {
    for(let i = 0; i < stars.length; i++) 
    {
        stars[i].style.filter = 'grayscale(100%) '
    }

    for (let i = 0; i < rate; i++) 
    {
        stars[i].style.filter = 'grayscale(0%)'
        stars[i].classList.add('active-star')
    
    }

}



function sendRate(e){
    console.log('started SendRate  ')
    e.preventDefault()
   
    const commentText=document.querySelector('#comment-text').value
    
    const author=document.querySelector('#comment_author').value
    const post=document.querySelector('#comment_post').value
    
    axios.post('/api/rate',{text:commentText,authorId:author,postId:post}).then(data=>{
        if(data.data){
            alert('Ваш комментарий добавлен!')
            setTimeout(() => {
               
            }, 10000);
            console.log('timeout 2 sec')
            location.reload()
            
        }
    })
 

 

}