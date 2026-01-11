$(document).on("selectionchange", function () {
  let germanText = window.getSelection().toString();
  const speechSynth = window.speechSynthesis;

  if (germanText != "") {
    console.log("starting translation......");
    fetch(chrome.runtime.getURL("german_dict.json"))
      .then((data) => data.json())
      .then((jsonData) => {
        console.log("searching local dictionary........");

        let englishTranslatation = jsonData[germanText];

        if (!speechSynth.speaking) {
          if (englishTranslatation && germanText) {
            console.log("speaking......");
            const germanUtter = new SpeechSynthesisUtterance(germanText);
            const englishUtter = new SpeechSynthesisUtterance(
              "meaning is " + englishTranslatation
            );
            germanUtter.lang = "de-DE";
            englishUtter.lang = "de-DE";
            speechSynth.speak(germanUtter);
            speechSynth.speak(englishUtter);
          } else {
            const notFound = new SpeechSynthesisUtterance(
              "Meaning not found. Google it!"
            );
            notFound.lang = "en-EN";
            speechSynth.speak(notFound);
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
});
