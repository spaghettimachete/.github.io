let width = 700;
let height = 800;
let playButton;
let stopButton;
let desk = [];
let clicked = null;
let select;
let current = 0;

function setup()
{
  var defaultnotes = 8;
  createCanvas(width, height);
  rectMode(CENTER);
  //playbutton
  playButton = createButton("Play");
  playButton.position(20,25);
  playButton.mouseClicked(play);
  //stopbutton
  stopButton = createButton("Stop");
  stopButton.position(80,25);
  stopButton.mouseClicked(stop);
  //selectedchannel
  channelSelect = createRadio();
  channelSelect.option('Synth', 1);
  channelSelect.option('Bass', 2);
  channelSelect.option('Smplr One', 3);
  channelSelect.option('Smplr Two', 4);
  channelSelect.position(440,60);
  channelSelect.mouseClicked(changeChannel);

  var channel = createMixerChannel ("Synth", 20, 300, defaultnotes, 0); // Synth
  desk.push(channel);
  var channel2 = createMixerChannel ("Bass", 200, 300, defaultnotes, 0); // Synth
  desk.push(channel2);
  var channel3 = createMixerChannel ("Sampler One", 380, 300, defaultnotes, 1, 1); // Sampler
  desk.push(channel3);
  var channel4 = createMixerChannel ("Sampler Two", 560, 300, defaultnotes, 1, 2); // Sampler
  desk.push(channel4);

  desk[0].autoSlider.mouseClicked(changeOctaves);
  desk[1].autoSlider.mouseClicked(changeOctaves);
  desk[2].autoSlider.mouseClicked(changeOctaves);
  desk[3].autoSlider.mouseClicked(changeOctaves);
}

function draw()
{
  background(50, 50, 50);
  rect(20,20,610,350);
  var channel = desk[current];
  fill(0, 0, 0);
  for(let i = 0; i < channel.audio.numberofNotes; i++)
  {
    rect(channel.audio.notes[i].x, channel.audio.notes[i].y, channel.audio.notes[i].notelength,channel.audio.notes[i].notelength);
  }
  fill(255, 255, 255);

}

function mousePressed()
{
    var channel = desk[current]; //fetchcurrentchannel
    for(var i = 0; i < channel.audio.numberofNotes; i++) // Look at each of the notes on the current channel
    {
        let current = channel.audio.notes[i];
        let cNotelength = current.notelength/2;
        if ((mouseX >= current.x-cNotelength) && (mouseX <= current.x+cNotelength)
        && (mouseY >= current.y-cNotelength) && (mouseY <= current.y+cNotelength))
        {
        	clicked = current; // We have clicked on this note
        }
    }
}

function mouseDragged()
{
    if(clicked != null)
    {
        clicked.x = mouseX;
        clicked.y = mouseY;

        if(clicked.x < 0)
            clicked.x = 0
        else if(clicked.x > width)
            clicked.x = width;


        if(clicked.y < 0)
            clicked.y = 0
        else if(clicked.y > height)
            clicked.y = height;
    }
}

function mouseReleased()
{
    clicked = null;
}

function createMixerChannel(name, x, y, numbernotes, channeltype, audiofile)
{
    let channel = {
        name: name,
        volume: 0,
        pan: 0,
        chanx: x,
        chany: y,
        volumeSlider: createSlider(0, 100, 0),
        panSlider: createSlider(-1, 1, 0, 0.01),
        autoSlider: createSlider(0, 4, 0),
        audio: createAudioSource(numbernotes, channeltype, audiofile),
    }

	fill (0,0,0); //black
	channel.volumeSlider.position(channel.chanx, channel.chany);
	channel.panSlider.position(channel.chanx,channel.chany+50);
	channel.autoSlider.position(channel.chanx,channel.chany+100);
	fill (255,255,255); //white

    return channel;
}

function createAudioSource(numbernotes, channeltype)
{
    let audioTrack = new AudioSource(numbernotes, channeltype);
    return audioTrack;
}

function play(event)
{
	for(var i = 0; i < desk.length; i++) // Process every channel
    {
		desk[i].audio.start();
    }
}

function stop(event)
{
	for(var i = 0; i < desk.length; i++) // Process every channel
    {
        desk[i].audio.stop(); // Stop the audio
    }
}

function changeChannel(event)
{
	current=channelSelect.value()-1;
}

function changeOctaves()
{
	for(var i = 0; i < desk.length; i++)
    {
        desk[i].audio.autoFiltoctaves(desk[i].autoSlider.value());
    }
}
