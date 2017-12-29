/*
 * Welcome Home Animation for the H0M3ST3AD Project
 * Author: Jeremy Mallette
 * Last Updated: 10/12/2017
 */

var wh_header = document.getElementById("wh_header");

// Choose Translation ----------------------------------------------------------
var traslations = ["welcome home.",
                   "bienvenue chez vous.",
                   "おかえり.",
                   "benvenuto a casa."];

var traslation_choice = Math.floor(Math.random() * (traslations.length));
var welcome_msg = traslations[traslation_choice];

// Typing Animation ------------------------------------------------------------
var msgCount = 0;
var timer1;

function typeFunc()
{
   wh_header.innerHTML = welcome_msg.substring(0, msgCount);

   if (msgCount == welcome_msg.length)
   {
      // Stop Timer
      clearInterval(timer1);
   }
   else
   {
      msgCount++;
   }
}

timer1 = setInterval("typeFunc()", 400); // Every 300 milliseconds
