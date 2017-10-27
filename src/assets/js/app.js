import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

var audio;

//Hide Pause Button
$('#pause').hide();

//Initialize Audio
initAudio($('#playlist li:first-child'));

//Initializer Function
function initAudio(element){
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    //Create Audio Object
    audio = new Audio('assets/music/' + song);

    if(!audio.currentTime) {
        $('#duration').html('0.00');
    }

    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);

    // Insert Cover
    $('img.cover').attr('src','assets/music/img/' + cover);

    $('#playlist li').removeClass('active');
    element.addClass('active');

}

//PLAY BUTTON
$('#play').click(function(){
    audio.play();

    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

//PAUSE BUTTON
$('#pause').click(function(){
    audio.pause();

    $('#pause').hide();
    $('#play').show();
});

//STOP BUTTON
$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#duration').fadeOut(400);
});

//NEXT BUTTON
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if(next.length == 0){
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

//PREV BUTTON
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if(prev.length == 0){
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

//VOLUME CONTROL
$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 20)
});
    

//Time Duration
function showDuration(){
    $(audio).bind('timeupdate', function(){
        //Get hours & Minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime)/ 60) % 60;
        //Add 0 if less than 10
        if(s < 10){
            s = '0' + s;
        }
        $('#duration').html(m + '.' + s);
        var value = 0;
        if(audio.currentTime > 0){
            value = Math.floor((100 / audio.duration) * audio.currentTime)
        }
        $('#progress').css('width',value+'%');
    })
}



//PLAYER 02

var songs = ["Cloud Colony - Win a Flight to Earth II.mp3",
"Cloud Colony - Our Garden.mp3",
"Cloud Colony - Psychological Facet.mp3",
"Cloud Colony - Chance.mp3",
"Cloud Colony - Turbine.mp3",
"Cloud Colony - Clouds.mp3",
"Cloud Colony - Won.mp3",];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');

var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

function loadSong () {
song.src = "assets/music/" + songs[currentSong];
songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
song.playbackRate = 1;
song.volume = volumeSlider.value;
song.play();
setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider () {
var c = Math.round(song.currentTime);
songSlider.value = c;
currentTime.textContent = convertTime(c);
if(song.ended){
next();
}
}

function convertTime (secs) {
var min = Math.floor(secs/60);
var sec = secs % 60;
min = (min < 10) ? "0" + min : min;
sec = (sec < 10) ? "0" + sec : sec;
return (min + ":" + sec);
}

function showDuration () {
var d = Math.floor(song.duration);
songSlider.setAttribute("max", d);
duration.textContent = convertTime(d);
}

function playOrPauseSong (img) {
song.playbackRate = 1;
if(song.paused){
song.play();
img.src = "assets/music/img/pauseBtn.png";
}else{
song.pause();
img.src = "assets/music/img/playBtn.png";
}
}

function next(){
currentSong = currentSong + 1 % songs.length;
loadSong();
}

function previous () {
currentSong--;
currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
loadSong();
}

function seekSong () {
song.currentTime = songSlider.value;
currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume () {
song.volume = volumeSlider.value;
}

function increasePlaybackRate () {
songs.playbackRate += 0.5;
}

function decreasePlaybackRate () {
songs.playbackRate -= 0.5;
}