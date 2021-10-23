# R20InterpointImporter

A script for importing Lancer mechs for GMs using the Interpoint mech sheets.
Usable with [Tampermonkey](https://www.tampermonkey.net/).

## How To Use

Either install the script in Tampermonkey or paste it into the browser console (usually accessible with F12).

Then, to import a pilot's mech:

1. Get the Pilot Data File from Comp/Con (export pilot -> export pilot data file)
2. Prepare the mech sheet by duplicating the Interpoint Mech Sheet and renaming that duplicate to the pilot's callsign.
3. With this mech sheet open, paste the contents of the Pilot Data File into the textbox in the roll20 journal, then hit the Import button.
4. Click on each of the changed attribute values (on the left).