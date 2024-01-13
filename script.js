document.addEventListener('DOMContentLoaded', event => {
    // Create the audio context
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();

    // Master volume
    const masterVolume = context.createGain();
    masterVolume.connect(context.destination);

    const startButton = document.querySelector('#start');
    console.log('startButton', startButton);
    const stopButton = document.querySelector('#stop');
    console.log('stopButton', stopButton);
    // const volumeControl = document.querySelector('#volume-control');
    const volumeControl = document.getElementById('volume-control');
    console.log('volumeControl', volumeControl);
    masterVolume.gain.value = .1;

    volumeControl.addEventListener('input', changeVolume);

    function changeVolume() {
        masterVolume.gain.value = this.value;
    }

    const waveforms = document.getElementsByName('waveform');
    let waveform;

    function setWaveform() {
        for (let i = 0; i < waveforms.length; i++) {
            if (waveforms[i].checked) {
                waveform = waveforms[i].value;
            }
        }
    }

    startButton.addEventListener('click', () => {
        // Add an oscillator node as the sound source
        const oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(220, 0);
        oscillator.connect(masterVolume);

        oscillator.start(0);
        oscillator.type = waveform;
        stopButton.addEventListener('click', () => {
            oscillator.stop();
            delete oscillator;
        });

        waveforms.forEach((waveformInput) => {
            waveformInput.addEventListener('change', () => {
                setWaveform();
                oscillator.type = waveform;
            });
        });
    });

});