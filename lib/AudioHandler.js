var audiofile = 1
class AudioSource
{
    constructor(numberofnotes, channeltype)
    {

        this.notes = []; // Where we store a synths or samples for each note
        this.numberofNotes = numberofnotes; // The number of notes on this channel
        this.createAudioNotes(numberofnotes, channeltype);
    }
    createAudioNotes(numberofnotes, channeltype)
    {

    	for (var i=0; i<numberofnotes; i++)
    	{
    		if (channeltype == 0)
    		{

    			var thisnoteaudio = new Tone.PolySynth(3, Tone.Synth, {
							"oscillator" : {
							"type" : "fatsawtooth",
							"count" : 3,
							"spread" : 30
											},
                    });

				console.log("Creating synth");
			}
			else
			{
        if (audiofile == 1)
        {
          var audiofetch = new Tone.Player("audio/kick.wav")
        }
        else {
          var audiofetch = new Tone.Player("audio/snare.wav")
        }
        console.log("Creating sample");

			}

			var thisautofilt = new Tone.AutoFilter(0.5);

			var currentnote = {
            chantype: channeltype,
            audiofile: audiofile,
        		x: i*40+10,
        		y: 10,
        		volume: 0,
        		pan: 0,
        		notelength: 20,
        		synthaudio: thisnoteaudio,
        		synthautofilt: thisautofilt
        		}
        	this.notes.push(currentnote);
        	this.notes[i].synthaudio.connect(this.notes[i].synthautofilt);
        	this.notes[i].synthautofilt.connect(Tone.Master);
        	console.log ("Created note %d",i);
    	}
    }

    start()
    {
    	// Go through each of the notes and start them
		for (var k=0; k<this.numberofNotes; k++)
		{
    		var timeval = this.notes[k].x/50;
    		var timestring = "+" + String(timeval); // The time we want the note to start

    		if (this.notes[k].chantype == 0)
    		{
        		this.notes[k].synthaudio.triggerAttackRelease(this.notes[k].y,1,timestring);
        		console.log("Playing synth with freq %d", this.notes[k].y);
        	}
        	else
        	{
        		this.notes[k].synthaudio.start(timestring);
        		console.log("Playing sample");
        	}
        }
    }

    stop()
    {
    	// Go through each of the notes and stop them
    	for (var k=0; k<this.numberofNotes; k++)
		{
			if (this.notes[k].chantype == 1)
			{
        		this.notes[k].synthaudio.stop();
        	}
        }
    }

    autoFiltoctaves(autoVal)
    {
    	//console.log("Value %d",autoVal);
    	for (var k=0; k<this.numberofNotes; k++)
		{
       		this.notes[k].synthautofilt.octaves=autoVal;
        }

    }

}
