/*Dear Professor Carter,
I'm very sorry that I continued to use Project 02, even though I understand it doesn't meet the HTML page count requirement. I just didn’t want to give up the JavaScript content I had already developed.
Many of the elements and features in my project are different from what we covered in class, because I couldn’t find the tools I needed in the in-class code to create the kind of experience I envisioned. So I spent a lot of time after class exploring on my own, watching many tutorials to achieve the effects I wanted.
I’ve done my best to revise the feedback you gave me on Project 02, and I also worked hard on the p5.js part.
Thank you so much for all your help and support this semester. I’m especially grateful for the opportunity you gave me to join the 327 course — I’ve learned a lot!

Wish you have a happy summer!

Take care, 
Josie */
// Get container for description page content
let content = document.querySelector('.des_con')
// home button
let home_btn = document.querySelector('.home_btn')

// Run after the page has finished loading
window.onload = function () {
    // If dayState (mode status) is missing from localStorage
    if (localStorage.getItem('dayState') == null) {
        // Default to day mode background color
        content.style.background = '#83A7C1'
    } else {
        //  Read the saved mode state
        let dayState = localStorage.getItem('dayState')
        if (dayState == 'sun') {
            // If day mode, set day background
            content.style.background = '#83A7C1'
        } else {
            // else set night background
            content.style.background = '#2C3136'
        }
    }
}

// Go to game.html when clicking the home button
home_btn.onclick = function () {
    location.href = './game.html'
}
