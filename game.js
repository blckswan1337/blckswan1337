const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

async function main() {
  const client = new textToSpeech.TextToSpeechClient();

  const text = `Life

... as I see it, is a game.

Rules:
- Before the main rule, Pippi adds that he is familiar with Conway's 'Game of Life', which is a zero-player game.
The main rule here is that all games should have at least 0.1 in possible gain.

(To avoid zero-sum games, even if it would be in a zero-player game)

But

--Can we agree that the life we live is not a game where the players are less than 0.1?

I don't really want to set either numbers or words here.
Because no matter what I write, it will never fit everyone.

So...

'gain' == 'plus' and/or 'minus'

Is that correct?

I don't know...

Personally, this is how I see life, I think.. No matter how it feels, bad or good, I choose to focus on the 'living' part.
So whether it is experienced, down-lived, well-lived or badly-lived, I have as a personal core value that I like to live.

Maybe many will never believe me when I tell them.
(I don't even know if anyone will be able to understand the joke in the previous sentence, and that it is not a twisted, but a right one.)
But I choose, even though many do not believe me when I say it, to look forward.

I have been angry a lot. And at many.
At some more than others.
'Unfair!' - Maybe many will say.

Yes. Of course. I am that too!
(Unfair, that is).

But from my selfish, little head, it will always be dangerous with games where some win everything, and others lose everything.
Because it creates almost impossible conditions of that kind.

Iceland was long plagued with what I think of. Some have certainly heard of 'blood revenge'.
There would hardly have been any people left there today. On that little island. If they had continued with 'eye-for-eye, brother-for-friend, stoning-for-crossing-in-glasshouses'.

It was possible in Iceland. Some were so unfair that they chose not to take revenge. Luckily?
I think so. I also think that many got very angry. And scared. And confused.

I think many expect me to do the worst and sickest things to them.
At least that's how I feel I've survived lately.

Some very few people have probably also experienced both anger and madness from me.
For example, I had to let some believe for a long time that I was going to set their apartment on fire.

I went so far as to use both flames, vandalism, and violence.
I had to, unfortunately. I think.

But maybe I managed to turn the beam, or the chip a bit. Whether it is my own or my brother's, I should not get hung up on;
Anyway, it forced a situation that can only be called 'impossible'.

Still, I sit here. Lonely, tired, hungry and wanting a smoke.
In an apartment I have wrecked:
Because I am not allowed to be alone, or safe, or anything.
But the police went their way. Neither touched me, the speed, the smoke, or my hash.
(The latter I didn't even have. Ran out long ago. But would like to have!)

Almost unbelievable to have experienced, that neither the speed on the table nor the knife in the wall was mentioned.
They just wanted to check a concern they had heard about. Luckily it was not true.
(Yes and no, we will probably always and never agree on the last one there.)`;

  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

main();
