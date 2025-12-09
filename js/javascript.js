/*Dear Professor Carter,
I'm very sorry that I continued to use Project 02, even though I understand it doesn't meet the HTML page count requirement. I just didn’t want to give up the JavaScript content I had already developed.
Many of the elements and features in my project are different from what we covered in class, because I couldn’t find the tools I needed in the in-class code to create the kind of experience I envisioned. So I spent a lot of time after class exploring on my own, watching many tutorials to achieve the effects I wanted.
I’ve done my best to revise the feedback you gave me on Project 02, and I also worked hard on the p5.js part.
Thank you so much for all your help and support this semester. I’m especially grateful for the opportunity you gave me to join the 327 course — I’ve learned a lot!

Wish you have a happy summer!

Take care, 
Josie */
let over_title = document.querySelector('.over_title')
let game_over = document.querySelector('.game_over')

let money = 0; 
let physicalStrength = 0; 
let health = 0; 
let mood = 0; // 4 status

let moneyNum = 200; // default money
let physicalStrengthNum = 100;  // default phy
let healthNum = 100;        // default health
let moodNum = 100;      // default mood

// get the popup
let pop_btn = document.querySelector('.pop_btn')
let pop_text = document.querySelector('.pop_text')
let pops = document.querySelector('.pop')


// day1 btn
let btn1 = document.querySelector('.btn1')
let btn2 = document.querySelector('.btn2')
let btn3 = document.querySelector('.btn3')

// everyday's popup
let day1 = document.querySelector('.day1')
let day2 = document.querySelector('.day2')
let day3 = document.querySelector('.day3')
let day4 = document.querySelector('.day4')
let day5 = document.querySelector('.day5')

let dayNumber = 1

let colorState = ''
let WhichMusic = 1 // play the music 1-day 2-night
// initial setup on page load
window.onload = function () {
    let game_con_left = document.querySelector('.game_con_left')
    let game_con_right = document.querySelector('.game_con_right')
    // If dayState (mode state) is not saved in localStorage
    if (localStorage.getItem('dayState') == null) {
        // default day background
        colorState = '#83A7C1'
        game_con_left.style.background = '#83A7C1'
        game_con_right.style.background = '#83A7C1'
        WhichMusic = 1
    } else {
        // retrieve the stored theme mode
        let dayState = localStorage.getItem('dayState')
        if (dayState == 'sun') {

            colorState = '#83A7C1'
            game_con_left.style.background = '#83A7C1'
            game_con_right.style.background = '#83A7C1'
            WhichMusic = 1
        } else {
            
            colorState = '#2C3136'
            game_con_left.style.background = '#2C3136'
            game_con_right.style.background = '#2C3136'
            WhichMusic = 2
        }
    }

    moneyNum = moneyNum - 50
    openTextTip('Still living in the original house, you need to prepay $50')
    updateNum()
}


// Button 1 click event- Physical labor for income
btn1.onclick = function () {
    // phy-30
    physicalStrengthNum = physicalStrengthNum - 30;
    // money+60
    money = money + 60;

    // clear day1's activestatus
    day1.classList.remove('days_active');

    // Delay 500ms before updating to Day2
    setTimeout(() => {
        // day2 begin
        day2.classList.add('days_active');
        // text
        openTextTip('Old knee injury, but at least able to make ends meet');
        // update the number
        updateNum();
        // set day2
        dayNumber = 2;
    }, 500);

    // update day1's number
    updataDay(1);
}

// Button 2 click event
btn2.onclick = function () {
    // phy-15
    physicalStrengthNum = physicalStrengthNum - 15;
    
    moneyNum = moneyNum + 60;

    // remove day1
    day1.classList.remove('days_active');

    
    setTimeout(() => {
        // activate day2
        day2.classList.add('days_active');
        // text- deducted 40 (money)
        openTextTip('I was deducted $40 because I broke the plate');
        // money-40
        moneyNum = moneyNum - 40;
        
        updateNum();
        // set day2
        dayNumber = 2;
    }, 500);

    
    updataDay(1);
}

// Button 3 click event: Take a high-interest loan
btn3.onclick = function () {
    
    physicalStrengthNum = physicalStrengthNum + 10;
    //get loan-500
    moneyNum = moneyNum + 500;
    // Mood-40 due to heavy psychological burden
    moodNum = moodNum - 40;

    
    day1.classList.remove('days_active');

    // Deduct $200 immediately for loan interest
    money = money - 200;

    
    setTimeout(() => {
        day2.classList.add('days_active');
        
        openTextTip('The creditor charges $200 per day as interest');
        
        updateNum();
        
        dayNumber = 2;
    }, 500);

    
    updataDay(1);
}

// day2's buttons
let btn4 = document.querySelector('.btn4')  // 24 hr fast food restaurant
let btn5 = document.querySelector('.btn5')  // hotel
let btn6 = document.querySelector('.btn6')  // street

// 24hr fast food
btn4.onclick = function () {
    moodNum = moodNum - 10          
    healthNum = healthNum - 10      
    physicalStrengthNum = physicalStrengthNum - 10  
    day2.classList.remove('days_active')  

    setTimeout(() => {
        day3.classList.add('days_active')  
        openTextTip('Kicked out by the restaurant staff')  // show alert
        updateNum()  
        dayNumber = 3  // now day3
    }, 500)

    updataDay(2)  
}

// choose hotel
btn5.onclick = function () {
    moneyNum = moneyNum - 50  
    physicalStrengthNum = physicalStrengthNum + 20  
    day2.classList.remove('days_active')  

    setTimeout(() => {
        day3.classList.add('days_active')  
        openTextTip('A thief sneaked in and stole $30 from you')  
        moneyNum = moneyNum - 30  
        updateNum()  
        dayNumber = 3  
    }, 500)

    updataDay(2)  
}

// choose street (random event: Safe or robbed)
btn6.onclick = function () {
    moodNum = moodNum - 20  
    physicalStrengthNum = physicalStrengthNum + 20  
    day2.classList.remove('days_active')  

    //randomly return 0 (safe) or 1 (robbed)
    if (getRandomZeroOrOne() == 0) {
        // if 0- robbed
        setTimeout(() => {
            day3.classList.add('days_active') 
            openTextTip('A shadow passed while you slept. By morning, your money was gone')  
            moneyNum = 0  

            //Game over
            updateNum() 
            game_over.classList.add('Your money was stolen by a thief and the game failed')  // show failure prompt when the money number is 0
            dayNumber = 3  
        }, 500)
    } else {
        // if 1-nothing happen
        setTimeout(() => {
            day3.classList.add('days_active')  
            openTextTip('The night was quiet — you were safe')  
            updateNum() 
            dayNumber = 3  
        }, 500)
    }

    updataDay(2)  
}


// Get a random number: return 0 or 1
function getRandomZeroOrOne() {
    return Math.random() < 0.5 ? 0 : 1;
}

// day3's buttons
let btn7 = document.querySelector('.btn7')  // btn 7-buy instant noddles
let btn8 = document.querySelector('.btn8')  // btn 8-get bread
let btn9 = document.querySelector('.btn9')  // btn 9-continue straving

// buy instant noodles
btn7.onclick = function () {
    moneyNum = moneyNum - 10  
    healthNum = healthNum - 15  // health -15 due to poor nutrition
    day3.classList.remove('days_active')  // Clear Day 3 active status

    setTimeout(() => {
        day4.classList.add('days_active')  
        openTextTip('You purchased bread')  
        updateNum()  
        dayNumber = 4  
    }, 500)

    updataDay(3)  
}

// Caught stealing bread and fined
btn8.onclick = function () {
    day3.classList.remove('days_active')  // Clear Day 3 active status

    setTimeout(() => {
        day4.classList.add('days_active')  
        moneyNum = moneyNum - 100  // fined 100(money-100)
        openTextTip('Caught and fined $100')  
        updateNum()  
        dayNumber = 4  
    }, 500)

    updataDay(3)  
}

// continuing straving
btn9.onclick = function () {
    day3.classList.remove('days_active')  // Clear Day 3 active status
    moodNum = moodNum - 30  // mood-30

    setTimeout(() => {
        day4.classList.add('days_active')  // active day4
        physicalStrengthNum = physicalStrengthNum - 50  // Energy drops by 50 (fainted from lack of food)
        openTextTip('You fainted due to not consuming protein for three consecutive days')  // display prompt
        updateNum()  
        dayNumber = 4  
    }, 500)

    updataDay(3)  // update day3
}

// day4's btn(2 choices)
let btn10 = document.querySelector('.btn10')  //Button 10: Pay for uncle’s surgery
let btn11 = document.querySelector('.btn11')  //Button 11: No Pay
let dayFourState = false  // Used to record whether the player chose to pay for uncle’s surgery

// Button 10 click event: Sacrifice health for uncle’s surgery
btn10.onclick = function () {
    healthNum = healthNum - 50  
    moodNum = moodNum + 20      
    dayFourState = true         // Pay for surgery
    day4.classList.remove('days_active')  

    setTimeout(() => {
        day5.classList.add('days_active')  // active day5
        openTextTip('Uncle\'s surgery was very successful')  // surgery succeed
        updateNum()       
        dayNumber = 5     
    }, 500)

    updataDay(4)  
}

// Button 11 click event: No surrgery
btn11.onclick = function () {
    moodNum = moodNum - 40  
    dayFourState = false    // record no surgery
    day4.classList.remove('days_active')

    setTimeout(() => {
        day5.classList.add('days_active')  // to day5
        openTextTip('You are feeling very down')  
        updateNum()
        dayNumber = 5
    }, 500)

    updataDay(4)
}

// day5's buttons(4 choices)
let btn12 = document.querySelector('.btn12')  // btn12- buy safety rope to avoid falling
let btn13 = document.querySelector('.btn13')  // btn13- risk falling without safety equipment
let btn14 = document.querySelector('.btn14')  // btn14- get into a fight with a stranger
let btn15 = document.querySelector('.btn15')  // btn15- collapse on the street from exhaustion

let gameDay = false  // whether the last day（depend on whether buy the safety rope）

// btn2 click event: Buy safety rope to avoid falling
btn12.onclick = function () {
    gameDay = true  // set to last day
    moneyNum = moneyNum - 30  // cost 30 to buy

    setTimeout(() => {
        openTextTip('Guaranteed safety and received $500')  
        moneyNum = moneyNum + 500  
    })
}

// btn13 click event: Fell to death due to not buying safety rope
btn13.onclick = function () {
    moneyNum = 0  // dead
    setTimeout(() => {
        game_over.classList.add('over_active')  // show game over
        over_title.innerHTML = 'The game is over, you fell dead'  
    }, 500)
}

// btn14 click event: Lose energy after arguing with someone
btn14.onclick = function () {
    physicalStrengthNum = physicalStrengthNum - 60  
    setTimeout(() => {
        openTextTip('Stop fighting with people')  
    }, 500)
}

// btn15 click event: Collapse on the street (depends on Day 4 surgery choice)
btn15.onclick = function () {
    game_over.classList.add('over_active')  // game over

    if (dayFourState) {
        // If surgery was done on Day 4, uncle saves you
        over_title.innerHTML = 'You fainted from hunger on the street, rescued by your uncle, and won the game'
    } else {
        // or game over
        over_title.innerHTML = 'You fainted from hunger on the street, the game failed'
    }
}


// close the tip popup shown at the start of each day
pop_btn.onclick = function () {
    pops.classList.remove('pop_active')  // close the popup

    if (!gameDay) {
        // If not the last day, continue showing the medicine reminder
        setTimeout(() => {
            med_pop.classList.add('med_pop_active')  // show the medicine's popup
        }, 500)
    } else {
        // if last day, update the number
        updateNum()
    }
}

// Daily medicine prompt buttons (Yes / No)
let med_btn1 = document.querySelector('.med_btn1')  // buy  
let med_btn2 = document.querySelector('.med_btn2')  // do not buy
let med_pop = document.querySelector('.med_pop')    // popup

// click "buy" btn
med_btn1.onclick = function () {
    moneyNum = moneyNum - 30          
    med_pop.classList.remove('med_pop_active')  // close popup
    updateNum()                      // update the number
}

// click "btn2(do not buy)"
med_btn2.onclick = function () {
    healthNum = healthNum - 20       
    med_pop.classList.remove('med_pop_active')  
    updateNum()                      
}

// update 4 status
function updateNum() {
    let n1 = document.querySelector('.n1')  // health
    let n2 = document.querySelector('.n2')  // phy
    let n3 = document.querySelector('.n3')  // mood
    let n4 = document.querySelector('.n4')  // money

    moneyNum = moneyNum + money  // money variable: treated as daily income, add to player's total balance

    // If it's the last day and win conditions are met, show the victory screen
    if (gameDay) {
        game_over.classList.add('over_active')
        over_title.innerHTML = 'You won, victory'
    }
    
    //Check all failure conditions: if any value is zero or below, trigger game over
    if (moneyNum <= 0) {
        game_over.classList.add('over_active')
        over_title.innerHTML = 'Your money is depleted, the game has failed'
    }
    if (physicalStrengthNum <= 0) {
        game_over.classList.add('over_active')
        over_title.innerHTML = 'Your stamina is exhausted, the game has failed'
    }
    if (healthNum <= 0) {
        game_over.classList.add('over_active')
        over_title.innerHTML = 'Your health is exhausted, the game has failed'
    }
    if (moodNum <= 0) {
        game_over.classList.add('over_active')
        over_title.innerHTML = 'Your mood is exhausted, the game has failed'
    }

    // Update the displayed values on the page
    n4.innerHTML = moneyNum
    n2.innerHTML = physicalStrengthNum
    n1.innerHTML = healthNum
    n3.innerHTML = moodNum
}

// Delayed popup: display text prompt after 500 milliseconds
function openTextTip(text) {
    setTimeout(() => {
        pops.classList.add('pop_active')  // popup active
        pop_text.innerHTML = text          // Set the text content of the popup
    }, 500)
}

// Update the day indicator on the right panel based on the given day index
function updataDay(index) {
    let day_textAll = document.querySelectorAll('.day_text')  // Get all day label text elements
    for (let i = 0; i < day_textAll.length; i++) {
        day_textAll[i].classList.remove('day_active')  // Remove active state from all day elements
    }
    day_textAll[index].classList.add('day_active')      // Add active state to the current day element
}

// Restart game button: reloads the page and returns to the homepage
let over_btn = document.querySelector('.over_btn')
over_btn.onclick = function () {
    location.href = 'index.html';  // Back to homepage and restart
}

// music btn
let music = document.querySelector('.music')         
let music_img = document.querySelector('.music_img')  
let day_music = document.querySelector('.day_music')  
let night_music = document.querySelector('.night_music')  
let music_state = false                               // false- do not play

// Handle music button click
music.onclick = function () {
    if (WhichMusic == 1) {  // if choose day mode
        if(music_state){
            music_img.src = '../image/icon7.png'  //  Switch to 'paused' icon
            day_music.pause()                     // stop the day music
        } else {
            music_img.src = '../image/icon8.png'  //  Switch to 'playing' icon
            day_music.play()                      // play day music
        }
    } else if (WhichMusic == 2) {  // if choose night mode
        if(music_state){
            night_music.pause()                  // stop the night music
            music_img.src = '../image/icon7.png' //  Switch to 'paused' icon
        } else {
            night_music.play()                   // play night music
            music_img.src = '../image/icon8.png' // Switch to 'playing' icon
        }
    }
    music_state  = !music_state  // Switch between playing and pausing the music
}
