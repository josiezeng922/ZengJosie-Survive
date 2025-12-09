/*Dear Professor Carter,
I'm very sorry that I continued to use Project 02, even though I understand it doesn't meet the HTML page count requirement. I just didn’t want to give up the JavaScript content I had already developed.
Many of the elements and features in my project are different from what we covered in class, because I couldn’t find the tools I needed in the in-class code to create the kind of experience I envisioned. So I spent a lot of time after class exploring on my own, watching many tutorials to achieve the effects I wanted.
I’ve done my best to revise the feedback you gave me on Project 02, and I also worked hard on the p5.js part.
Thank you so much for all your help and support this semester. I’m especially grateful for the opportunity you gave me to join the 327 course — I’ve learned a lot!

Wish you have a happy summer!

Take care, 
Josie */
let home_btn = document.querySelector('.home_btn')  
let sun = document.querySelector('.sun')            
let moon = document.querySelector('.moon')          
let content = document.querySelector('.home_con')   
let dayState = 'sun'                                 

// Function to run after the page has fully loaded
window.onload = function () {
    // Check if a day/night mode is already saved in localStorage
    if (localStorage.getItem('dayState') == null) {
        // If no mode is saved, use the default day mode
        dayState = 'sun'
        localStorage.setItem('dayState', 'sun')
        content.style.background = '#83A7C1'         
        sun.classList.add('icon_active')             // Highlight the sun icon
        moon.classList.remove('icon_active')         // cancle highlight
    } else {
        
        dayState = localStorage.getItem('dayState')

        if (dayState == 'sun') {
            // day mode
            sun.classList.add('icon_active')
            moon.classList.remove('icon_active')
            content.style.background = '#83A7C1'
        } else {
            // night mode
            sun.classList.remove('icon_active')
            moon.classList.add('icon_active')
            content.style.background = '#2C3136'     // set night background
        }
    }
}

// On sun icon click, activate day mode
sun.onclick = function () {
    sun.classList.add('icon_active')                
    moon.classList.remove('icon_active')            
    dayState = 'sun'                               
    localStorage.setItem('dayState', 'sun')         // save 
    content.style.background = '#83A7C1'            // change the background color
}

//On moon icon click, activate night mode
moon.onclick = function () {
    sun.classList.remove('icon_active')             
    moon.classList.add('icon_active')             
    dayState = 'moon'                                
    localStorage.setItem('dayState', 'moon')        
    content.style.background = '#2C3136'            
}

// On home btn back to describe.html
home_btn.onclick = function () {
    location.href = './html/describe.html'
}
