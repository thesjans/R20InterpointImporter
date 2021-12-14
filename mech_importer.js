// ==UserScript==
// @name         Interpoint Macro Importer
// @namespace    Roll20InterpointMacroImporter
// @version      0.6.0
// @description  Allows users to easily import mechs using the Interpoint Macros
// @author       thesjans
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @include      https://app.roll20.net/editor*
// @updateURL    https://raw.githubusercontent.com/thesjans/R20InterpointImporter/main/mech_importer.js
// @downloadURL  https://raw.githubusercontent.com/thesjans/R20InterpointImporter/main/mech_importer.js
// ==/UserScript==

(function() {
    'use strict';

        // basically all the stuff from the mech sheet
    let sheetData = {
        "frames": {
            "Everest": {
                "traits": ["[Initiative](~395)", "[Replaceable Parts](~396)"],
                "active": "[Hyperspec Fuel Injector](~397)"
            },
            "Sagarmatha": {
                "traits": ["[Heroism](~596)", "[Replaceable Parts](~396)", "[Guardian](~410)"],
                "active": "[Rallying Cry](~597)"
            },
            "Blackbeard": {
                "traits": ["[Grapple Cable](~398)", "[Lock/Kill Subsystem](~399)", "[Exposed Reactor](~400)"],
                "active": "[Omni-Harpoon](~401)"
            },
            "Caliban": {
                "traits": ["[Wrecking Ball](~402)", "[Pursue Prey](~403)", "[Slam](~404)", "[Weak Computer](~405)"],
                "active": "[Equip Autochoke](~666)",
                "weapon": "[Flayer Shotgun](~406)"
            },
            "Drake": {
                "traits": ["[Heavy Frame](~407)", "[Blast Plating](~408)", "[Slow](~409)", "[Guardian](~410)"],
                "active": "[Fortress Protocol](~411)"
            },
            "Kidd": {
                "traits": ["[Reroute Power](~571)", "[Recycle](~572)", "[Rapid Deployment](~573)"],
                "passive": "[The Jolly Roger](~574)",
                "active": "[Skull and Bones](~575)"
            },
            "Lancaster": {
                "traits": ["[Insulated](~412)", "[Combat Repair](~413)", "[Redundant Systems](~414)"],
                "active": "[Supercharger](~415)",
                "weapon": "[Latch Drone](~416)"
            },
            "Nelson": {
                "traits": ["[Momentum](~417)", "[Skirmisher](~418)"],
                "active": "[Engage Drive](~419)"
            },
            "Raleigh": {
                "traits": ["[Full Metal Jacket](~420)", "[Shielded Magazines](~421)"],
                "active": "[Thundergod](~422)",
                "weapon": "[Mjolnir](~423)"
            },
            "Tortuga": {
                "traits": ["[Sentinel](~424)", "[Guardian](~410)"],
                "active": "[Hyper Reflex Mode](~425)"
            },
            "Vlad": {
                "traits": ["[Dismemberment](~426)", "[Shrike Armor](~427)"],
                "active": "[Tormentor Spikes](~428)"
            },
            "Zheng": {
                "traits": ["[Destructive Swings](~429)", "[Weak Computer](~405)"],
                "passive": "[Xialoi's Tenacity](~430)",
                "active": "[Xialoi's Ingenuity](~431)"
            },
            "Atlas": {
                "traits": ["[Giant Killer](~432)", "[Jäger Dodge](~433)", "[Finishing Blow](~434)", "[Exposed Reactor](~400)"],
                "active": "[Final Hunt](~435)"
            },
            "Black Witch": {
                "traits": ["[Repulsor Field](~436)", "[Mag Parry](~437)"],
                "active": "[Mag Field](~438)"
            },
            "Death's Head": {
                "traits": ["[Neuro Link](~439)", "[Perfected Targeting](~440)"],
                "active": "[Neural Shunt](~441)"
            },
            "Dusk Wing": {
                "traits": ["[Manouverability Jets](~442)", "[Harlequin Cloak](~443)", "[Fragile](~448)"],
                "active": "[Hall of Mirrors](~444)"
            },
            "Metalmark": {
                "traits": ["[Flash Cloak](~445)", "[Carapace Adaption](~446)"],
                "active": "[Tactical Cloak](~447)"
            },
            "Monarch": {
                "traits": ["[Avenger Silos](~449)", "[Seeking Payload](~450)"],
                "active": "[Divine Punishment](~451)"
            },
            "Mourning Cloak": {
                "traits": ["[Hunter](~452)", "[Biotic Components](~453)"],
                "passive": "[Blinkspace Jump](~454)",
                "active": "[Stabilize Singularity](~455)"
            },
            "Swallowtail": {
                "traits": ["[Integrated Cloak](~456)", "[Prophetic Scanners](~457)"],
                "active": "[Prophetic Interjection](~458)"
            },
            "Ranger Swallowtail": {
                "traits": ["[Scout Battlefield](~582)", "[Invigorating Scanners](~583)", "[Weathering](~584)"],
                "passive": "[Grounded](~585)",
                "active": "[Guerrilla Warfare](~586)"
            },
            "Balor": {
                "traits": ["[Scouring Swarm](~459)", "[Regeneration](~460)", "[Self Perpetuating](~461)"],
                "active": "[Hive Frenzy](~462)"
            },
            "Goblin": {
                "traits": ["[Liturgycode](~463)", "[Reactive Code](~464)", "[Fragile](~448)"],
                "active": "[Symbiosis](~465)"
            },
            "Gorgon": {
                "traits": ["[Metastatic Paralysis](~466)", "[Gaze](~467)", "[Guardian](~410)"],
                "active": "[Extrude Basilisk](~468)"
            },
            "Hydra": {
                "traits": ["[System Link](~469)", "[Shepherd Field](~470)"],
                "passive": "[Orochi Drones](~471)",
                "active": "[Full Deployment](~471.6)"
            },
            "Kobold": {
                "traits": ["[Mimic Carapace](~472)", "[Slag Spray](~473)", "[Exposed Reactor](~400)"],
                "active": "[Terraform](~474)"
            },
            "Lich": {
                "traits": ["[Soul Vessel](~475)", "[Immortal](~476)"],
                "active": "[Chrono Stutter](~477)"
            },
            "Manticore": {
                "traits": ["[Slag Carapace](~478)", "[Unstable System](~479)", "[Castigate the Enemies of the Godhead](~480)"],
                "passive": "[Charged Exoskeleton](~481)",
                "active": "[Destruction of the Temple of the Enemies of Ra](~482)"
            },
            "Minotaur": {
                "traits": ["[Invert Cockpit](~483)", "[Internal Metafold](~484)", "[Localized Maze](~485)"],
                "passive": "[Metafold Maze](~486)",
                "active": "[Maze](~487)"
            },
            "Pegasus": {
                "traits": ["[By the Way, I know Everything](~488)"],
                "passive": "[Ushabti Omnigun](~489)",
                "active": "[Unshackle Ushabti](~490)"
            },
            "Barbarossa": {
                "traits": ["[Heavy Frame](~491)", "[Pressure Plating](~492)", "[Guardian](~410)", "[Slow](~409)"],
                "active": "[Apocalypse Rail](~493)"
            },
            "Ghengis": {
                "traits": ["[Insulated](~412)", "[Emergency Vent](~494)"],
                "active": "[Expose Powercells](~495)"
            },
            "Ghengis Mk1": {
                "traits": ["[Weak Computer](~405)", "[Insulated](~412)", "[TBK Munitions](~587)"],
                "passive": "[Furiosa](~588)",
                "active": "[A Pleasure to Burn](~589)"
            },
            "Iskander": {
                "traits": ["[Assault Launcher](~496)", "[Mine Deployer](~497)", "[Skeleton Key](~498)"],
                "active": "[Death Cloud](~499)"
            },
            "Napoleon": {
                "traits": ["[Heavy Shielding](~500)", "[Flash Aegis](~501)"],
                "active": "[Activate Aegis](~502)"
            },
            "Saladin": {
                "traits": ["[Reinforced Frame](~503)", "[Guardian](~410)", "[Warp Shield](~504)"],
                "active": "[Tachyon Loop](~505)"
            },
            "Sherman": {
                "traits": ["[Superior Reactor](~506)", "[Mathur Stop](~507)", "[Vent Heat](~508)"],
                "weapon": "[Core Beam](~509)",
                "active": "[Coreburn Protocol](~510)"
            },
            "Sunzi": {
                "traits": ["[Safe Harbor](~511)", "[Anchor](~512)", "[Slip](~513)"],
                "passive": "[Blink Anchor](~514)",
                "active": "[Art of War](~515)"
            },
            "Tokugawa": {
                "traits": ["[Limit Break](~516)", "[Plasma Sheath](~517)"],
                "passive": "[Overclock](~518)",
                "active": "[Radiance](~519)"
            },
            "Enkidu": {
                "traits": ["[Primal Fury](~590)", "[All Fours](~591)", "[Brute Strength](~592)", "[Bloodsense](~593)"],
                "active": "[Crush Limiter](~594)",
                "weapon": "[Plasma Talons](~595)"
            },
            "Argus": {
                "traits": ["[Steel Teeth](~520)", "[Tally-Ho](~521)", "[Baba Yaga](~553)"],
                "passive": "[Bloodhound Drone](~522)",
                "active": "[Let Slip the Dogs of War](~523)"
            },
            "Nestor": {
                "traits": ["[Tactical Reload](~530)", "[Combat Maneuvers](~531)"],
                "active": "[Defiant Supremacy](~566)"
            },
            "Orpheus": {
                "traits": ["[Technophage](~540)", "[Local Bypass](~542)", "[Jockey](~540.1)"],
                "passive": "[Field Repair Suite](~544)",
                "active": "[Subvert Systems](~545)"
            },
            "Pollux": {
                "traits": ["[Nova Dispersal Coils](~551)", "[Emergency Core Ejector](~552)", "[Slow](~409)"],
                "active": "[Flush Plasma Vents](~554)"
            },
            "Atalanta": {
                "traits": ["[Mark Timestream](~658)", "[Abandon Timeline](~659)", "[Exposed Reactor](~400)"],
                "passive": "[Explore Divergence](~660)",
                "active": "[Infinite Possibilities](~661)"
            },
            "Theseus": {
                "traits": ["[Heavy Frame](~491)", "[Fragile](~448)", "[Crystalline Matrix](~633)", "[Detonate Shard](~655)"],
                "passive": "[Parts of the Whole](~634)",
                "active": "[Crystalline Wasteland](~635)"
            },
            "Coronus": {
                "traits": ["[Casino Dice](~622)", "[Slot Machine](~623)", "[Roulette](~624)"],
                "passive": "[Black Jack Barrier](~625)",
                "active": "[The House Always Wins](~626)"
            },
            "Acastus": {
                "traits": ["[Break Them](~610)", "[Lost but not Forgotten](~654)", "[Field of Ruin](~611)", "[Tireless Smithing](~612)"],
                "passive": "[Recall](~613)",
                "active": "[Infinite Blades](~618)",
                "weapon": "[Blade Sending](~614)"
            },
            "Heracles": {
                "traits": ["[Fragile](~448)", "[Slow](~409)", "[Weak Computer](~405)", "[Exposed Reactor](~400)"],
                "passive": "[Divert Energy](~690)",
                "active": "[Cascading Core Surge](~691)"
            }
        },
        "talents": {
            "Ace": ["[Ace 1](~301)", "[Ace 2](~302)", "[Ace 3](~303)"],
            "Black Thumb": ["[Black Thumb 1](~305)", "[Black Thumb 2](~306)", "[Black Thumb 3](~307)"],
            "Bonded": ["[Bonded 1](~308)", "[Bonded 2](~309)", "[Bonded 3](~310)"],
            "Brawler": ["[Brawler 1](~311)", "[Brawler 2](~312)", "[Brawler 3](~313)"],
            "Brutal": ["[Brutal 1](~314)", "[Brutal 2](~315)", "[Brutal 3](~316)"],
            "Crack Shot": ["[Crack Shot 1](~317)", "[Crack Shot 2](~318)", "[Crack Shot 3](~319)"],
            "Centimane": ["[Centimane 1](~320)", "[Centimane 2](~321)", "[Centimane 3](~322)"],
            "Combined Arms": ["[Combined Arms 1](~323)", "[Combined Arms 2](~324)", "[Combined Arms 3](~325)"],
            "Duelist": ["[Duelist 1](~326)", "[Duelist 2](~327)", "[Duelist 3](~328)"],
            "Drone Commander": ["[Drone Commander 1](~329)", "[Drone Commander 2](~330)", "[Drone Commander 3](~331)"],
            "Engineer": ["[Engineer 1](~332)", "[Engineer 2](~333)", "[Engineer 3](~334)"],
            "Empath": ["[Empath 1](~568)", "[Empath 2](~569)", "[Empath 3](~570)"],
            "Executioner": ["[Executioner 1](~335)", "[Executioner 2](~336)", "[Executioner 3](~337)"],
            "Exemplar": ["[Exemplar 1](~338)", "[Exemplar 2](~339)", "[Exemplar 3](~340)"],
            "Gunslinger": ["[Gunslinger 1](~341)", "[Gunslinger 2](~342)", "[Gunslinger 3](~343)"],
            "Grease Monkey": ["[Grease Monkey 1](~344)", "[Grease Monkey 2](~345)", "[Grease Monkey 3](~346)"],
            "Hacker": ["[Hacker 1](~347)", "[Hacker 2](~348)", "[Hacker 3](~349)"],
            "Heavy Gunner": ["[Heavy Gunner 1](~350)", "[Heavy Gunner 2](~351)", "[Heavy Gunner 3](~352)"],
            "Hunter": ["[Hunter 1](~353)", "[Hunter 2](~354)", "[Hunter 3](~355)"],
            "Infiltrator": ["[Infiltrator 1](~356)", "[Infiltrator 2](~357)", "[Infiltrator 3](~358)"],
            "Juggernaut": ["[Juggernaut 1](~359)", "[Juggernaut 2](~360)", "[Juggernaut 3](~361)"],
            "Leader": ["[Leader 1](~362)", "[Leader 2](~363)", "[Leader 3](~364)"],
            "Nuclear Cavalier": ["[Nuclear Cavalier 1](~365)", "[Nuclear Cavalier 2](~366)", "[Nuclear Cavalier 3](~367)"],
            "Siege Specialist": ["[Siege Specialist 1](~368)", "[Siege Specialist 2](~369)", "[Siege Specialist 3](~370)"],
            "Skirmisher": ["[Skirmisher 1](~371)", "[Skirmisher 2](~372)", "[Skirmisher 3](~373)"],
            "Space Born": ["[Space Born 1](~374)", "[Space Born 2](~375)", "[Space Born 3](~376)"],
            "Spotter": ["[Spotter 1](~377)", "[Spotter 2](~378)", "[Spotter 3](~379)"],
            "Stormbringer": ["[Stormbringer 1](~380)", "[Stormbringer 2](~381)", "[Stormbringer 3](~382)"],
            "Tactician": ["[Tactician 1](~383)", "[Tactician 2](~384)", "[Tactician 3](~385)"],
            "Technophile": ["[Technophile 1](~386)", "[Technophile 2](~387)", "[Technophile 3](~388)"],
            "Vanguard": ["[Vanguard 1](~389)", "[Vanguard 2](~390)", "[Vanguard 3](~391)"],
            "Walking Armory": ["[Walking Armory 1](~392)", "[Walking Armory 2](~393)", "[Walking Armory 3](~394)"],
            "Bounty Hunter": ["[Bounty Hunter 1](~640)", "[Bounty Hunter 2](~641)", "[Bounty Hunter 3](~642)"],
            "Reactor Criminal": ["[Reactor Criminal 1](~643)", "[Reactor Criminal 2](~644)", "[Reactor Criminal 3](~645)"],
            "Corpse Collector": ["[Corpse Collector 1](~646)", "[Corpse Collector 2](~647)", "[Corpse Collector 3](~648)"],
            "Antiquarian": ["[Antiquarian 1](~649)", "[Antiquarian 2](~650)", "[Antiquarian 3](~651)"],
            "Weaponsmith": ["[Weaponsmith 1](~677)", "[Weaponsmith 2](~678)", "[Weaponsmith 3](~679)"]
        },
        "coreBonuses": [
            "[Improved Armament](~218)",
            "[Integrated Weapon](~219)",
            "[Mount Retrofitting](~220)",
            "[Universal Compatibility](~221)",
            "[Auto Stabilizing Hardpoints](~222)",
            "[Overpower Caliber](~223)",
            "[All Theater Movement Suite](~224)",
            "[Ghostweave](~225)",
            "[Integrated Nerve Weave](~226)",
            "[Kai Bioplating](~227)",
            "[Neurolink Targeting](~228)",
            "[Full Subjectivity Sync](~229)",
            "[Briareos Frame](~230)",
            "[Fomorian Frame](~231)",
            "[Gyges Frame](~232)",
            "[Reinforced Frame](~233)",
            "[Sloped Plating](~234)",
            "[Titanomachy Mesh](~235)",
            "[The Lesson of Disbelief](~236)",
            "[The Lesson of the Open Door](~237)",
            "[The Lesson of the Held Image](~238)",
            "[The Lesson of Thinking Tomorrow's Thought](~239)",
            "[The Lesson of Transubstantiation](~240)",
            "[The Lesson of Shaping](~241)",
            "[Adaptive Reactor](~242)",
            "[Armor Sculpted Chassis](~243)",
            "[Heatfall Coolant System](~244)",
            "[Integrated Ammo Feeds](~245)",
            "[Stasis Shielding](~246)",
            "[Superior by Design](~247)",
            "[Broadband Scanners](~561)",
            "[Adaptive Solutions](~562)",
            "[Interblink](~563)",
            "[Inter-Vat Cloning Suite](~564)",
            "[True Strike Stabilizers](~652)",
            "[Far Field Exploration Suite](~653)"
        ],
        "weapons": [
            "[Charged Blade](~1)",
            "[Heavy Charged Blade](~2)",
            "[Heavy Melee](~3)",
            "[Segment Knife](~4)",
            "[Tactical Knife](~5)",
            "[Tactical Melee](~6)",
            "[Chain Axe](~7)",
            "[Nanocarbon Sword](~8)",
            "[Plasma Torch](~9)",
            "[War Pike](~10)",
            "[Power Knuckles](~11)",
            "[Kinetic Hammer](~12)",
            "[Catalytic Hammer](~13)",
            "[Impact Lance](~14)",
            "[Combat Drill](~15)",
            "[Shock Knife](~16)",
            "[Fold Knife](~17)",
            "[Variable Sword](~18)",
            "[Torch](~19)",
            "[Tiger-Hunter Combat Sheathe](~20)",
            "[D/D 288](~21)",
            "[Terashima Blade](~22)",
            "[Nanobot Whip](~23)",
            "[Prototype Lv1](~24)",
            "[Prototype Lv2](~25)",
            "[Prototype Lv3](~26)",
            "[Marker Spike](~525)",
            "[Serrated Machete](~567)",
            "[Surgical Implements](~543)",
            "[Cloak of Blades](~608)",
            "[Null Matter Blade](~619)",
            "[Anti Materiel Rifle](~27)",
            "[Assault Rifle](~28)",
            "[Cyclone Pulse Rifle](~29)",
            "[Thermal Rifle](~30)",
            "[Vulture DMR](~31)",
            "[Railgun](~32)",
            "[Veil Rifle](~33)",
            "[Rail Rifle](~34)",
            "[Oracle LMG](~35)",
            "[Smartgun](~36)",
            "[Gravity Gun](~37)",
            "[Displacer](~38)",
            "[Sol Pattern](~39)",
            "[Fusion Rifle](~40)",
            "[Warp Rifle](~41)",
            "[Blackspot](~577)",
            "[Stratus High Penetration Rifle](~524)",
            "[Quantum Super Position Rifle](~629)",
            "[Heavy Machine Gun](~54)",
            "[Howitzer](~55)",
            "[Mortar](~56)",
            "[Thermal Lance](~57)",
            "[Assault Cannon](~58)",
            "[Leviathan](~59)",
            "[Bolt Thrower](~60)",
            "[Magnetic Cannon](~61)",
            "[Vorpal Gun](~62)",
            "[Autogun](~63)",
            "[Siege Cannon](~64)",
            "[Slag Cannon](~65)",
            "[Stub Cannon](~66)",
            "[Andromeda](~67)",
            "[Tachyon Lance](~68)",
            "[Apollon Converter Cannon](~555)",
            "[Ripjaw Particle Cannon](~533)",
            "[Probability Flayer](~620)",
            "[Missile Rack](~42)",
            "[Rocket Propelled Grenade](~43)",
            "[Burst Launcher](~44)",
            "[Concussion Missiles](~45)",
            "[Sharanga](~46)",
            "[Gandiva](~47)",
            "[Pinaka](~48)",
            "[Vijaya](~49)",
            "[Autopod](~50)",
            "[Shatterhead](~51)",
            "[Hammer U-RPL](~52)",
            "[Unraveler](~53)",
            "[Shrapnel Spiker](~631)",
            "[Pistol](~69)",
            "[Shotgun](~70)",
            "[Thermal Pistol](~71)",
            "[Bristlecrown](~72)",
            "[Hand Cannon](~73)",
            "[Deck Sweeper](~74)",
            "[Daisycutter](~75)",
            "[Impaler Nailgun](~76)",
            "[Catalyst Pistol](~77)",
            "[Arc projector](~78)",
            "[Krakatoa](~79)",
            "[Plasma Thrower](~80)",
            "[Annihilator](~81)",
            "[Kraul Rifle](~82)",
            "[HHS Cannibal](~83)",
            "[Fuel Rod Gun](~84)",
            "[Norn Emitter](~656)",
            "[Aether Slug Charger](~664)",
            "[Nexus (Hunter Killer)](~85)",
            "[Nexus (Light)](~86)",
            "[Swarm/Hive Nanites](~87)",
            "[Ghoul Nexus](~88)",
            "[Ghast Nexus](~89)",
            "[Annihilation Nexus](~90)",
            "[Mimic Gun](~91)",
            "[Heat Transfer Harpoon](~696)",
            "[Thermite Harpoon Cannon](~696)",
            "[Heavy Chain Mace](~697)",
            "[Spyglass' Missile Racks](~667)",
            "[Rubicon's Smartgun](~668)",
            "[Hothead's Burst Launcher](~670)",
            "[Quicksilver's Tachyon Lance](~673)",
            "[Operator's Siege Cannon](~674)",
            "[Deca's D/D 288](~675)",
            "[Fruitpunch Tsunami's Heavy Machine Gun](~676)",
            "[Stardiver's Kinetic Hammer](~700)",
            "[Phoenix' Andromeda](~703)",
            "[Whitefeather's Autopod](~704)",
            "[Bulwark's Gandiva Missiles](~706)",
            "[Navarone's Tachyon Lance](~708)",
            "[Heat Raze's Blackspot](~709)",
            "[Z-X40's Plasma Thrower](~710)",
            "[Tsar's Nanocarbon Sword](~712)",
            "[Artemis' Probability Flayer](~713)",
            "[Wraith's Vulture DMR](~714)"
        ],
        "mods": [
            "[Paracausal Mod](~208)",
            "[Phase-Ready Mod](~209)",
            "[Nanocomposite Adaptation](~210)",
            "[Super Massive Mod](~211)",
            "[Thermal Charge](~212)",
            "[Throughbolt Rounds](~213)",
            "[UNCLE Class](~214)",
            "[Molten Wreath](~215)",
            "[Shock Wreath](~216)",
            "[Stabilizer Mod](~217)",
            "[Swarm Beacon Rounds](~529)",
            "[Underslung Attachment](~539)",
            "[Broken Blade](~609)",
            "[Quick Draw Sheath](~615)",
            "[Jackpot Mod](~627)"
        ],
        "invade": [
            "[Fragment Signal](~248)",
            "[Hacker 2](~249)",
            "[Beckoner](~250)",
            "[H0R OS1](~251)",
            "[H0R OS3](~252)",
            "[Immolate](~253)",
            "[Metafold Carver](~254)",
            "[Purifying Code](~255)",
            "[Smite](~256)",
            "[Viral Logic Suite](~257)",
            "[Hunter Logic Suite](~258)",
            "[Neurospike](~259)",
            "[Overarching Principles](~546)",
            "[Systemic Ambivalence](~547)",
            "[Crowning Ceremony](~548)",
            "[Misfortune Casino Suite](~628)",
            "[Iron Maiden's Beckon](~702)"
        ],
        "tech": [
            "[Hacker3](~263)",
            "[Accelerate](~264)",
            "[Realspace Breach](~265)",
            "[Tesseract](~266)",
            "[Final Secret](~267)",
            "[Aggressive System Sync](~268)",
            "[HOR OS2](~269)",
            "[Law of Blades](~270)",
            "[Metahook](~271)",
            "[Puppetmaster](~272)",
            "[Antilinear Time](~273)",
            "[Stay of Execution](~274)",
            "[Wandering Nightmare](~275)",
            "[Unhinge Chronology](~276)",
            "[Marker Light](~277)",
            "[Tracking Bug](~279)",
            "[PEBCAC](~576)",
            "[Field Approved Brass-Ignorant Modifications](~579)",
            "[CUBE Injection](~550)",
            "[Last Gamble](~630)",
            "[Chrono Anchor](~657)",
            "[Timestream Shredder](~663)",
            "[Metameleia's False Idol](~671)"
        ],
        "systems": [
            "[Custom Paint Job](~92)",
            "[EVA Module](~93)",
            "[Expanded Compartment](~94)",
            "[Manipulators](~95)",
            "[Personalization](~96)",
            "[Rapid Burst Jump Jets](~97)",
            "[Stable Structure](~98)",
            "[Type 1 Flight](~99)",
            "[Auto-Cooler](~100)",
            "[Blinkspace Tunneler](~101)",
            "[Clamp Bombs](~102)",
            "[Deep Well Heat Sink](~103)",
            "[Explosive Vents](~104)",
            "[External Ammo Feed](~105)",
            "[External Batteries](~106)",
            "[Flak Launcher](~107)",
            "[Plasma Gauntlet](~108)",
            "[Reactor Stabilizer](~109)",
            "[Redundant Systems Upgrade](~110)",
            "[Repulser Field](~111)",
            "[Siege Stabilizers](~112)",
            "[Scorpion V70.1](~113)",
            "[EMP Pulse](~114)",
            "[Eye of Horus](~115)",
            "[Forge Clamps](~116)",
            "[Hunter Lock](~117)",
            "[Interdiction Field](~118)",
            "[Lightning Generator](~119)",
            "[Mimic Mesh](~120)",
            "[Monitor Module](~121)",
            "[Scanner Swarm](~122)",
            "[Seismic Ripper](~123)",
            "[Swarm Body](~124)",
            "[Argonaut Shield](~125)",
            "[Armor Lock Plating](~126)",
            "[Bulwark Mods](~127)",
            "[Cable Winch](~128)",
            "[Caltrop Launcher](~129)",
            "[Charged Stake](~130)",
            "[Mule Harness](~131)",
            "[Ram Jets](~132)",
            "[Rapid Maneuver Jets](~133)",
            "[Reinforced Cabling](~134)",
            "[Siege Ram](~135)",
            "[Synthetic Muscle Netting](~136)",
            "[Total Strength Suite 1](~137)",
            "[Total Strength Suite 2](~138)",
            "[Total Strength Suite 3](~139)",
            "[Whitewash Sealant Spray](~140)",
            "[Roland Chamber](~141)",
            "[Active Camouflage](~142)",
            "[Core Siphon](~143)",
            "[Fade Cloak](~144)",
            "[Ferrous Lash](~145)",
            "[Flicker Field Projector](~146)",
            "[High Stress Mag Clamps](~147)",
            "[Javelin Rockets](~148)",
            "[Jäger Kunst 1](~149)",
            "[Jäger Kunst 2](~150)",
            "[Kinetic Compensator](~151)",
            "[LB/OC Cloaking Field](~152)",
            "[Multi Gear Manouvering System](~153)",
            "[Reactive Weave](~154)",
            "[Ricochet Blades](~155)",
            "[Singularity Motivator](~156)",
            "[Stuncrown](~157)",
            "[Black Ice Module](~158)",
            "[Retractable Profile](~278)",
            "[Field Maintenance Suite](~526)",
            "[Telescopic Stilts](~527)",
            "[Advanced Drone Upgrade](~528)",
            "[Cushioned Cockpit](~534)",
            "[Trajectory Reconstruction Matrix](~535)",
            "[Near Threat Actuators](~549)",
            "[Reactor Failsafe](~556)",
            "[External Coolant Ports](~557)",
            "[Wall of Blades](~616)",
            "[Pseudo Vault](~617)",
            "[Anticipatory Reactor Shielding](~621)",
            "[Resonance Shard Charges](~632)",
            "[Static Conductor Coils](~636)",
            "[Integrated Latticework](~637)",
            "[Helios Prism Array](~638)",
            "[Stasis Trauma Response](~662)",
            "[Reflex Boosters](~692)",
            "[Invasive Target Lock](~693)",
            "[\"Vamp\" Coolant Siphon](~694)",
            "[Adonis Exo Plating](~695)",
            "[Artemis' Total Strength Suite I](~669)",
            "[Dialect's Seismic Ripper](~672)",
            "[Peregrine's Ferrous Lash](~699)",
            "[Jockstrap's Expanded Compartment](~701)",
            "[Whammy's External Batteries](~705)",
            "[Valiant's Custom Paint Job](~707)"

        ],
        "deployables": [
            "[Jericho Deployable Cover](~159)",
            "[Smoke Charges](~160)",
            "[HEX Charges](~161)",
            "[Blink Charges](~162)",
            "[Havok Charges](~163)",
            "[Stasis Barrier](~164)",
            "[Roller Charges](~165)",
            "[Mesmer Charges](~166)",
            "[Aegis Shield Generator](~167)",
            "[BB Charges](~168)",
            "[Portable Bunker](~169)",
            "[Webjaw Snare](~170)",
            "[Flash Charges](~171)",
            "[Perimeter Command Plate](~172)",
            "[Spike Charges](~173)",
            "[Grounding Charges](~174)",
            "[Omnibus Plate](~578)",
            "[Smokestack Heatsink](~581)",
            "[Junkyard's Blink Charges](~698)",
            "[Rolling Thunder's Roller Charges](~715)"
        ],
        "shields": [
            "[Type3 Projected Shield](~175)",
            "[Blinkshield](~176)",
            "[Enclave Pattern Support Shield](~177)",
            "[Flash Anchor](~178)",
            "[Hardlight Defense System](~179)",
            "[Stasis Bolt](~180)",
            "[Stasis Generator](~181)",
            "[Aceso Stabilizer](~182)",
            "[Hardpoint Reinforcement](~183)",
            "[Hyperdense Armor](~184)",
            "[Oasis Wall](~185)",
            "[Magnetic Shield](~186)",
            "[Solstice Shield](~558)"
        ],
        "drones": [
            "[Turret Drones](~187)",
            "[Autoloader Drone](~188)",
            "[Assassin Drone](~189)",
            "[Hive Drone](~190)",
            "[Sentinel Drone](~191)",
            "[Tempest Drone](~192)",
            "[Restock Drone](~193)",
            "[ICE OUT Drone](~194)",
            "[Lotus Projector](~195)",
            "[Forge-2 Subaltern Squad](~580)",
            "[Refractor Drone](~559)"
        ],
        "ai": [
            "[Comp/Con](~196)",
            "[Agni Class](~197)",
            "[Asura Class](~198)",
            "[Lucifer Class](~199)",
            "[Noah Class](~200)",
            "[Osiris Class](~201)",
            "[Scylla Class](~202)",
            "[Sisyphus](~203)",
            "[Sekhmet](~204)",
            "[Athena NHP](~205)",
            "[Didymos NHP](~206)",
            "[Tlaloc NHP](~207)",
            "[Servant Class NHP](~386)",
            "[Student Class NHP](~387)",
            "[Enlightenment Class NHP](~388)",
            "[Pylos-Class NHP](~536)",
            "[Castor-Class NHP](~560)",
            "[HOPLON Class NHP](~639)",
            "[Kairos Class NHP](~665)",
            "[Insipid Moniker's Osiris Class](~711)"
        ]
    }

    // manual "translations" where compcon id doesn't match the name in the macros
    let ccCodeDict = {
        "frames": {
            "mf_standard_pattern_i_everest": "Everest",
            "mf_genghis_alt_worldkiller_genghis_mk_i": "Ghengis Mk1",
            "mf_tokugawa_alt_enkidu": "Enkidu",
            "mf_swallowtail_alt_swallowtail_ranger_variant": "Ranger Swallowtail",
            "mf_deaths_head": "Death's Head",
            "mf_genghis": "Ghengis"
        },
        "talents": {
            "t_spaceborn": "Space Born"
        },
        "coreBonuses": {
            "cb_improved_armament": "Improved Armament",
            "cb_integrated_weapon": "Integrated Weapon",
            "cb_mount_retrofitting": "Mount Retrofitting",
            "cb_universal_compatibility": "Universal Compatibility",
            "cb_auto_stabilizing_hardpoints": "Auto Stabilizing Hardpoints",
            "cb_overpower_caliber": "Overpower Caliber",
            "cb_all_theater_movement_suite": "All Theater Movement Suite",
            "cb_ghostweave": "Ghostweave",
            "cb_integrated_nerveweave": "Integrated Nerve Weave",
            "cb_kai_bioplating": "Kai Bioplating",
            "cb_neurolink_targeting": "Neurolink Targeting",
            "cb_full_subjectivity_sync": "Full Subjectivity Sync",
            "cb_briareos_frame": "Briareos Frame",
            "cb_fomorian_frame": "Fomorian Frame",
            "cb_gyges_frame": "Gyges Frame",
            "cb_reinforced_frame": "Reinforced Frame",
            "cb_sloped_plating": "Sloped Plating",
            "cb_titanomachy_mesh": "Titanomachy Mesh",
            "cb_the_lesson_of_disbelief": "The Lesson of Disbelief",
            "cb_the_lesson_of_the_open_door": "The Lesson of the Open Door",
            "cb_the_lesson_of_the_held_image": "The Lesson of the Held Image",
            "cb_the_lesson_of_thinking_tomorrows_thought": "The Lesson of Thinking Tomorrow's Thought",
            "cb_the_lesson_of_transubstantiation": "The Lesson of Transubstantiation",
            "cb_the_lesson_of_shaping": "The Lesson of Shaping",
            "cb_adaptive_reactor": "Adaptive Reactor",
            "cb_armory_sculpted_chassis": "Armor Sculpted Chassis",
            "cb_heatfall_coolant_system": "[Heatfall Coolant System](~244)",
            "cb_integrated_ammo_feeds": "Integrated Ammo Feeds",
            "cb_stasis_shielding": "Stasis Shielding",
            "cb_superior_by_design": "Superior by Design",
            "cb_broadband_scanners": "Broadband Scanners",
            "cb_adaptive_solutions": "Adaptive Solutions",
            "cb_interblink": "Interblink",
            "cb_interclone": "Inter-Vat Cloning Suite",
            "cb_truestrike_stabilizers": "True Strike Stabilizers",
            "cb_farfield_exploration_suite": "Far Field Exploration Suite"
        },
        "weapons": {
            "\"Ripjaw\" Particle Cannon": "Ripjaw Particle Cannon",
            "mw_prototype_1": "Prototype Lv1",
            "mw_prototype_2": "Prototype Lv2",
            "mw_prototype_3": "Prototype Lv3",
            "mw_tokugawa_alt_enkidu_integrated": "Plasma Talons",
            "mw_leviathan_heavy_assault_cannon": "Leviathan",
            "mw_cutter_mkii_plasma_torch": "Plasma Torch",
            "mw_deck_sweeper_automatic_shotgun": "Deck Sweeper",
            "mw_oracle_lmg_i": "Oracle LMG",
            "mw_krakatoa_thermobaric_flamethrower": "Krakatoa",
            "mw_shatterhead_colony_missiles": "Shatterhead",
            "mw_sol_pattern_laser_rifle": "Sol Pattern",
            "mw_andromeda_pattern_heavy_laser_rifle": "Andromeda",
            "mw_hhs_155_cannibal": "HHS Cannibal",
            "mw_xiaoli_combat_sheathe": "Tiger-Hunter Combat Sheathe",
            "mw_blackspot_targeting_laser": "Blackspot",
            "mw_shard_launcher": "Shrapnel Spiker",
            "mw_tactical_melee_weapon": "Tactical Melee",
            "mw_heavy_melee_weapon": "Heavy Melee",
            "mw_sharanga_missiles": "Sharanga",
            "mw_gandiva_missiles": "Gandiva",
            "mw_pinaka_missiles": "Pinaka",
            "mw_vijaya_rockets": "Vijaya",
            "mw_bristlecrown_flechette_launcher": "Bristlecrown",
            "mw_spyglassmissileracks": "[Spyglass' Missile Racks](~667)",
            "mw_quicksilvertachyon": "[Quicksilver's Tachyon Lance](~673)",
            "mw_operators_siegecannon": "[Operator's Siege Cannon](~674)",
            "mw_hotheads_burst_launcher": "[Hothead's Burst Launcher](~670)",
            "mw_rubicons_smartgun": "[Rubicon's Smartgun](~668)",
            "mw_decas_d_d_288": "[Deca's D/D 288](~675)",
            "mw_fruitpunch's_heavy_machine_gun": "[Fruitpunch Tsunami's Heavy Machine Gun](~676)",
            "mw_bulwarks_gandiva_missiles": "[Bulwark's Gandiva Missiles](~706)",
            "mw_heats_blackspot_targeting_laser": "[Heat Raze's Blackspot](~709)",
            "mw_whitefeathers_autopod": "[Whitefeather's Autopod](~704)",
            "mw_wraiths_vulture_dmr": "[Wraith's Vulture DMR](~714)",
            "mw_navarones_tachyon_lance": "[Navarone's Tachyon Lance](~708)",
            "mw_tsars_nanocarbon_sword": "[Tsar's Nanocarbon Sword](~712)",
            "mw_artemis_probability_flayer": "[Artemis' Probability Flayer](~713)",
            "mw_stardivers_kinetic_hammer": "[Stardiver's Kinetic Hammer](~700)",
            "mw_phoenix_andromeda_pattern_heavy_laser_rifle": "[Phoenix' Andromeda](~703)",
            "mw_zx40_plasma_thrower": "[Z-X40's Plasma Thrower](~710)"
        },
        "mods": {
            "wm_uncle_class_comp_con": "UNCLE Class",
            "wm_broken_blade_mod": "Broken Blade",
            "wm_molten_wreathe": "Molten Wreath"
        },
        "invade": {
            "ms_h0r_os_system_upgrade_i": "H0R OS1",
            "ms_h0r_os_system_upgrade_iii": "H0R OS3",
            "ms_ic_iron_maiden's_beckoner": "[Iron Maiden's Beckon](~702)"
        },
        "tech": {
            "ms_h0r_os_system_upgrade_ii": "HOR OS2",
            "ms_unravel": "Final Secret",
            "ms_unhinge_chronoflow": "Unhinge Chronology",
            "ms_distort": "Realspace Breach",
            "ms_tear_firmament": "Wandering Nightmare",
            "ms_rewrite": "Antilinear Time",
            "ms_metameleias_h0r_os_system_upgrade_ii": "[Metameleia's False Idol](~671)"
        },
        "systems": {
            "ms___scorpion_v70.1": "Scorpion V70.1",
            "ms_multi_gear_maneuver_system": "Multi Gear Manouvering System",
            "ms_total_strength_suite_i": "Total Strength Suite 1",
            "ms_total_strength_suite_ii": "Total Strength Suite 2",
            "ms_total_strength_suite_iii": "Total Strength Suite 3",
            "ms_near_threat_spring_actuators": "Near Threat Actuators",
            "ms_personalizations": "Personalization",
            "ms_rapid_burst_jump_jet_system": "Rapid Burst Jump Jets",
            "ms_satic_conductor_coils": "Static Conductor Coils",
            "ms_jäger_kunst_i": "Jäger Kunst 1",
            "ms_jäger_kunst_ii": "Jäger Kunst 2",
            "ms_type_i_flight_system": "Type 1 Flight",
            "ms_ramjet": "Ram Jets",
            "ms_seismic_pulse": "Seismic Ripper",
            "ms_artemis_total_strength_suite_i": "[Artemis' Total Strength Suite I](~669)",
            "ms_dialects_seismic_ripper": "[Dialect's Seismic Ripper](~672)",
            "ms_peregrines_ferrous_lash": "[Peregrine's Ferrous Lash](~699)",
            "ms_jockstraps_expanded_compartment": "[Jockstrap's Expanded Compartment](~701)",
            "ms_whammys_external_batteries": "[Whammy's External Batteries](~705)",
            "ms_valiants_custom_paint_job": "[Valiant's Custom Paint Job](~707)"
        },
        "deployables": {
            "ms_pattern_a_smoke_charges": "Smoke Charges",
            "ms_pattern_a_jericho_deployable_cover": "Jericho Deployable Cover",
            "ms_pattern_b_hex_charges": "HEX Charges",
            "ms_bb_breach_blast_charges": "BB Charges",
            "ms_roller_directed_payload_charges": "Roller Charges",
            "ms_junkyards_blink_charges": "[Junkyard's Blink Charges](~698)",
            "ms_rts_roller_directed_payload_charges": "[Rolling Thunder's Roller Charges](~715)"
        },
        "shields": {},
        "drones": {},
        "ai": {
            "ms_comp_con_class_assistant_unit": "Comp/Con",
            "ms_technophile_1": "Servant Class NHP",
            "ms_technophile_2": "Student Class NHP",
            "ms_technophile_3": "Enlightenment Class NHP",
            "ms_insipid_moniker_osiris_class_nhp": "[Insipid Moniker's Osiris Class](~711)"
        }
    }

    // list of all aux weapons
    // used to determine if secondary aux in flex mount should be included, to prevent phantom aux weapons
    let auxWeapons = [
        "mw_missile_rack", "mw_nexus_light", "mw_pistol", "mw_segment_knife", "mw_tactical_knife", "mw_thermal_pistol", "mw_bristlecrown_flechette_launcher", "mw_cutter_mkii_plasma_torch", "mw_power_knuckles", "mw_hand_cannon", "mw_shock_knife", "mw_fold_knife", "mw_vijaya_rockets", "mw_oracle_lmg_i", "mw_catalyst_pistol", "mw_stub_cannon", "mw_tokugawa_alt_enkidu_integrated", "interpoint_marker_spike", "mw_surgical_implements", "mw_aether_slug_charger"
    ]

    // core bonuses that should show up in the weapons macro
    let weaponRelevantCB = [
        "cb_overpower_caliber", "cb_auto_stabilizing_hardpoints", "cb_gyges_frame", "cb_the_lesson_of_thinking_tomorrows_thought", "cb_truestrike_stabilizers"
    ];

    // stats for all the frames
    /* to get stats for new frames, run frames.json through this (by setting frames to the json):
    frameStats = {};
    frames.forEach(frame => {
        let {structure, stress, size, sp, ...stats} = {...frame.stats};
        frameStats[frame.id] = stats
    });
    console.log(JSON.stringify(frameStats))
    */
    let frameStats = {
        "missing_frame":{"armor":0,"hp":10,"evasion":8,"edef":8,"heatcap":6,"repcap":5,"sensor_range":10,"tech_attack":0,"save":10,"speed":4},
        "mf_standard_pattern_i_everest":{"armor":0,"hp":10,"evasion":8,"edef":8,"heatcap":6,"repcap":5,"sensor_range":10,"tech_attack":0,"save":10,"speed":4},
        "mf_blackbeard":{"armor":1,"hp":12,"evasion":8,"edef":6,"heatcap":4,"repcap":5,"sensor_range":5,"tech_attack":-2,"save":10,"speed":5},
        "mf_drake":{"armor":3,"hp":8,"evasion":6,"edef":6,"heatcap":5,"repcap":5,"sensor_range":10,"tech_attack":0,"save":10,"speed":3},
        "mf_lancaster":{"armor":1,"hp":6,"evasion":8,"edef":8,"heatcap":6,"repcap":10,"sensor_range":8,"tech_attack":1,"save":10,"speed":6},
        "mf_nelson":{"armor":0,"hp":8,"evasion":11,"edef":7,"heatcap":6,"repcap":5,"sensor_range":5,"tech_attack":0,"save":10,"speed":5},
        "mf_raleigh":{"armor":1,"hp":10,"evasion":8,"edef":7,"heatcap":5,"repcap":5,"sensor_range":10,"tech_attack":-1,"save":10,"speed":4},
        "mf_tortuga":{"armor":2,"hp":8,"evasion":6,"edef":10,"heatcap":6,"repcap":6,"sensor_range":15,"tech_attack":1,"save":10,"speed":3},
        "mf_vlad":{"armor":2,"hp":8,"evasion":8,"edef":8,"heatcap":6,"repcap":4,"sensor_range":5,"tech_attack":-2,"save":11,"speed":4},
        "mf_black_witch":{"armor":1,"hp":6,"evasion":10,"edef":12,"heatcap":6,"repcap":3,"sensor_range":15,"tech_attack":0,"save":11,"speed":5},
        "mf_deaths_head":{"armor":0,"hp":8,"evasion":10,"edef":8,"heatcap":6,"repcap":2,"sensor_range":20,"tech_attack":0,"save":10,"speed":5,"ranged_attack_bonus":1},
        "mf_dusk_wing":{"armor":0,"hp":6,"evasion":12,"edef":8,"heatcap":4,"repcap":3,"sensor_range":10,"tech_attack":1,"save":11,"speed":6},
        "mf_metalmark":{"armor":1,"hp":8,"evasion":10,"edef":6,"heatcap":5,"repcap":4,"sensor_range":10,"tech_attack":0,"save":10,"speed":5},
        "mf_monarch":{"armor":1,"hp":8,"evasion":8,"edef":8,"heatcap":6,"repcap":3,"sensor_range":15,"tech_attack":1,"save":10,"speed":5},
        "mf_mourning_cloak":{"armor":0,"hp":8,"evasion":12,"edef":6,"heatcap":4,"repcap":3,"sensor_range":15,"tech_attack":0,"save":10,"speed":5},
        "mf_swallowtail":{"armor":0,"hp":6,"evasion":10,"edef":10,"heatcap":4,"repcap":5,"sensor_range":20,"tech_attack":1,"save":10,"speed":6},
        "mf_balor":{"armor":0,"hp":12,"evasion":6,"edef":10,"heatcap":4,"repcap":4,"sensor_range":5,"tech_attack":1,"save":10,"speed":3},
        "mf_goblin":{"armor":0,"hp":6,"evasion":10,"edef":12,"heatcap":4,"repcap":2,"sensor_range":20,"tech_attack":2,"save":11,"speed":5},
        "mf_gorgon":{"armor":0,"hp":12,"evasion":8,"edef":12,"heatcap":5,"repcap":3,"sensor_range":8,"tech_attack":1,"save":12,"speed":4},
        "mf_hydra":{"armor":1,"hp":8,"evasion":7,"edef":10,"heatcap":5,"repcap":4,"sensor_range":10,"tech_attack":1,"save":10,"speed":5},
        "mf_manticore":{"armor":2,"hp":8,"evasion":6,"edef":10,"heatcap":7,"repcap":3,"sensor_range":10,"tech_attack":1,"save":10,"speed":3},
        "mf_minotaur":{"armor":0,"hp":12,"evasion":8,"edef":10,"heatcap":5,"repcap":4,"sensor_range":8,"tech_attack":1,"save":11,"speed":4},
        "mf_pegasus":{"armor":0,"hp":8,"evasion":8,"edef":10,"heatcap":6,"repcap":3,"sensor_range":10,"tech_attack":1,"save":10,"speed":4},
        "mf_barbarossa":{"armor":2,"hp":10,"evasion":6,"edef":6,"heatcap":8,"repcap":4,"sensor_range":10,"tech_attack":-2,"save":10,"speed":2},
        "mf_genghis":{"armor":3,"hp":6,"evasion":6,"edef":8,"heatcap":10,"repcap":4,"sensor_range":5,"tech_attack":-2,"save":10,"speed":3},
        "mf_iskander":{"armor":1,"hp":8,"evasion":8,"edef":10,"heatcap":7,"repcap":3,"sensor_range":15,"tech_attack":1,"save":12,"speed":3},
        "mf_napoleon":{"armor":2,"hp":6,"evasion":8,"edef":8,"heatcap":8,"repcap":3,"sensor_range":5,"tech_attack":0,"save":11,"speed":4},
        "mf_saladin":{"armor":1,"hp":12,"evasion":6,"edef":8,"heatcap":8,"repcap":4,"sensor_range":10,"tech_attack":0,"save":10,"speed":3},
        "mf_sherman":{"armor":1,"hp":10,"evasion":7,"edef":8,"heatcap":8,"repcap":4,"sensor_range":10,"tech_attack":-1,"save":10,"speed":3},
        "mf_tokugawa":{"armor":1,"hp":8,"evasion":8,"edef":6,"heatcap":8,"repcap":4,"sensor_range":10,"tech_attack":-1,"save":11,"speed":4},
        "mf_atlas":{"armor":0,"hp":6,"evasion":12,"edef":6,"heatcap":4,"repcap":2,"sensor_range":3,"tech_attack":-2,"save":10,"speed":6},
        "mf_caliban":{"armor":2,"hp":6,"evasion":8,"edef":8,"heatcap":5,"repcap":5,"sensor_range":3,"tech_attack":-2,"save":11,"speed":3},
        "mf_kobold":{"armor":1,"hp":6,"evasion":10,"edef":10,"heatcap":6,"repcap":2,"sensor_range":8,"tech_attack":1,"save":11,"speed":4},
        "mf_lich":{"armor":0,"hp":4,"evasion":8,"edef":12,"heatcap":3,"repcap":5,"sensor_range":15,"tech_attack":1,"save":11,"speed":5},
        "mf_sunzi":{"armor":1,"hp":7,"evasion":7,"edef":8,"heatcap":7,"repcap":3,"sensor_range":15,"tech_attack":1,"save":11,"speed":4},
        "mf_zheng":{"armor":2,"hp":10,"evasion":9,"edef":6,"heatcap":6,"repcap":6,"sensor_range":3,"tech_attack":-2,"save":10,"speed":3},
        "mf_kidd":{"armor":2,"hp":6,"evasion":6,"edef":12,"heatcap":4,"repcap":5,"sensor_range":8,"tech_attack":1,"save":11,"speed":6},
        "mf_sagarmatha":{"armor":1,"hp":8,"evasion":8,"edef":8,"heatcap":6,"repcap":4,"sensor_range":10,"tech_attack":0,"save":10,"speed":4},
        "mf_tokugawa_alt_enkidu":{"armor":1,"hp":10,"evasion":8,"edef":8,"heatcap":8,"repcap":5,"sensor_range":5,"tech_attack":-2,"save":10,"speed":3},
        "mf_genghis_alt_worldkiller_genghis_mk_i":{"armor":3,"hp":6,"evasion":6,"edef":8,"heatcap":8,"repcap":4,"sensor_range":5,"tech_attack":-2,"save":10,"speed":3},
        "mf_swallowtail_alt_swallowtail_ranger_variant":{"armor":0,"hp":6,"evasion":10,"edef":8,"heatcap":4,"repcap":5,"sensor_range":20,"tech_attack":1,"save":10,"speed":6},
        "ic_acastus":{"armor":1,"hp":8,"evasion":10,"edef":8,"heatcap":5,"repcap":3,"sensor_range":5,"tech_attack":-2,"save":10,"speed":5},
        "ic_argus":{"armor":0,"hp":10,"evasion":8,"edef":8,"heatcap":5,"repcap":3,"sensor_range":15,"tech_attack":0,"save":11,"speed":5},
        "ic_atalanta":{"armor":0,"hp":8,"evasion":10,"edef":8,"heatcap":4,"repcap":3,"sensor_range":8,"tech_attack":0,"save":11,"speed":6},
        "ic_coronus":{"armor":0,"hp":12,"evasion":9,"edef":9,"heatcap":5,"repcap":5,"sensor_range":10,"tech_attack":1,"save":10,"speed":4},
        "ic_heracles":{"armor":1,"hp":8,"evasion":8,"edef":8,"heatcap":8,"repcap":5,"sensor_range":5,"tech_attack":0,"save":10,"speed":3},
        "ic_nestor":{"armor":1,"hp":10,"evasion":8,"edef":6,"heatcap":5,"repcap":5,"sensor_range":10,"tech_attack":0,"save":10,"speed":4},
        "ic_orpheus":{"armor":0,"hp":6,"evasion":12,"edef":10,"heatcap":4,"repcap":2,"sensor_range":3,"tech_attack":2,"save":12,"speed":6},
        "ic_pollux":{"armor":0,"hp":8,"evasion":6,"edef":10,"heatcap":8,"repcap":4,"sensor_range":8,"tech_attack":-2,"save":10,"speed":3},
        "ic_theseus":{"armor":0,"hp":12,"evasion":6,"edef":6,"heatcap":8,"repcap":4,"sensor_range":5,"tech_attack":0,"save":11,"speed":4}
    }

    let coreBonusStats = {
        "cb_reinforced_frame": {"hp": 5},
        "cb_sloped_plating": {"armor": 1},
        "cb_full_subjectivity_sync": {"evasion": 2},
        "cb_the_lesson_of_disbelief": {"edef": 2},
        "cb_the_lesson_of_the_open_door": {"save": 2},
        "cb_integrated_ammo_feeds": {"limited_bonus": 2},
        "cb_superior_by_design": {"heatcap": 2}
    }

    let HASEStats = [
        {"hull": 1, "hp": 2, "repcap": 0.49},
        {"agility": 1, "evasion": 1, "speed": 0.49},
        {"systems": 1, "tech_attack": 1, "edef": 1},
        {"engineering": 1, "heatcap": 1, "limited_bonus": 0.49}
    ]

    let LLStats = {"grit": 0.5, "hp": 0.5, "save": 0.5}

    let systemStats = {
        "ms_personalizations": {"hp": 2},
        "ms_integrated_latticework": {"hp": 2}
    }


    // deepCopy this and add in the stats
    let statsTemplate = {
        "armor": {"name": "Armor", "value": 0},
        "hp": {"name": "1.HP", "value": 0, "max": 0},
        "evasion": {"name": "Evasion", "value": 0},
        "edef": {"name": "E-Defense", "value": 0},
        "heatcap": {"name": "2.Heat", "value": 0, "max": 0},
        "repcap": {"name": "Repair Cap", "value": 0},
        "sensor_range": {"name": "Sensors", "value": 0},
        "tech_attack": {"name": "Tech Attack Bonus", "value": 0},
        "save": {"name": "Save", "value": 0},
        "speed": {"name": "Speed", "value": 0},
        "grit": {"name": "Grit", "value": 0},
        "hull": {"name": "Hull", "value": 0},
        "agility": {"name": "Agility", "value": 0},
        "systems": {"name": "Systems", "value": 0},
        "engineering": {"name": "Engineering", "value": 0},
        "ranged_attack_bonus": {"name": "Death's Head Ranged Attack Bonus (0 or 1)", "value": 0},
        "limited_bonus": {"name": "Limited Systems Bonus", "value": 0}
    }

    // html element used for displaying errors to the user
    let importerErrorSign;

    function getStats(pilot, mech) {
        // make deep copy of template
        let stats = JSON.parse(JSON.stringify(statsTemplate));
        // add in stats from frame, HASE, LL, core bonuses and systems
        for (let key in frameStats[mech.frame]) {
            stats[key].value += frameStats[mech.frame][key];
        }
        for (let index in HASEStats) {
            for (let key in HASEStats[index]) {
                stats[key].value += HASEStats[index][key] * pilot.mechSkills[index];
            }
        }
        for (let key in LLStats) {
            stats[key].value += LLStats[key] * pilot.level;
        }
        pilot.core_bonuses.filter( cb => cb in coreBonusStats).forEach( cb => {
            for (let key in coreBonusStats[cb]) {
                stats[key].value += coreBonusStats[cb][key];
            }
        })
        mech.loadouts[mech.active_loadout_index].systems.filter(system => system.id in systemStats).forEach( system => {
            for (let key in systemStats[system.id]) {
                stats[key].value += systemStats[system.id][key];
            }
        })
        // round values
        for (let key in stats) {
            stats[key].value = Math.round(stats[key].value);
        }
        // adjust hp and heatcap
        stats.hp.max = stats.hp.value;
        stats.heatcap.max = stats.heatcap.value;
        stats.heatcap.value = 0;

        return stats
    }


    // returns data from sheetData for given ccCode
    function parse(ccCode, type) {
        if (!(type in ccCodeDict && type in sheetData)) {
            let errMsg = "Couldn't find type \"" + type + "\" for \"" + ccCode + "\"";
            showError(errMsg, "Warning: " + errMsg);
        }
        let name = ccCode in ccCodeDict[type] ? ccCodeDict[type][ccCode] : ccCode.replace("___", "_").split("_").slice(1).map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
        if (type == "frames" || type == "talents") {
            return {
                "name": name,
                "data": sheetData[type][name]
            }
        } else {
            let normilizationRegex = /([\[\s"-\/\(\)]|\]\(~\d{1,3}\)|(NHP)|(CLASS)|(system$)|(system]\(~\d+\)$))/gi;
            let result = sheetData[type].find(macroString => macroString.replace(normilizationRegex, "").toLowerCase() == name.replace(normilizationRegex, "").toLowerCase());
            return result
        }
    }

    // returns macro for mech Frame Features
    function buildFrameFeaturesString(coreBonuses, activeMech) {
        let {
            name,
            data
        } = parse(activeMech.frame, "frames");
        return "/w \"@{selected|character_name}\" \"@{selected|character_name}\" &{template:default} {{name=Frame Features}} {{Traits= " +
            data.traits.join(" ") + "}} {{Core Power (Passive)= " +
            (data.passive || "") + "}}  {{Core Power (Active)= " +
            (data.active || "") + " }}  {{Core Bonuses= " +
            coreBonuses.map(cbTag => parse(cbTag, "coreBonuses")).join(" ") + " }}"
    }

    function parseWeapon(ccWeaponCode) {
        return parse(ccWeaponCode, "weapons")
    }

    function parseMod(ccModCode) {
        return parse(ccModCode, "mods")
    }

    function getWeaponsAndMods(mech) {
        let weapons = [];
        let mods = [];
        //add weapons&mods in normal mounts
        mech.loadouts[mech.active_loadout_index].mounts.concat([mech.loadouts[mech.active_loadout_index].improved_armament] || []).forEach(mount => {
            if (!mount.lock) {
                mount.slots.forEach(slot => {
                    if (!!slot.weapon) {
                        weapons[weapons.length] = slot.weapon.id;
                        if (slot.weapon.mod) mods[mods.length] = slot.weapon.mod.id
                    }
                });
                if (mount.mount_type == "Flex" && auxWeapons.includes(mount.slots[0].weapon?.id)) {
                    mount.extra.forEach(extra => {
                        if (!!extra.weapon) {
                            weapons[weapons.length] = extra.weapon.id;
                            if (extra.weapon.mod) mods[mods.length] = extra.weapon.mod.id
                        }
                    });
                }
            }
        })
        //add integrated weapons
        weapons = weapons.concat(mech.loadouts[mech.active_loadout_index].integratedMounts.map(mount => mount.weapon.id));
        mech.loadouts[mech.active_loadout_index].integratedWeapon.slots.forEach(slot => {
            if (slot.weapon) {
                weapons = weapons.concat([slot.weapon.id])
            }
        });

        weapons = weapons.concat(parse(mech.frame, "frames").weapon || [])

        //get rid of duplicates and parse weapons and mods
        return {
            "weapons": [...new Set(weapons)],
            "mods": [...new Set(mods)]
        }
    }

    // returns macro for mech Weapons
    function buildWeaponsString(activeMech, coreBonuses) {
        let {
            weapons,
            mods
        } = getWeaponsAndMods(activeMech);
        return "/w \"@{selected|character_name}\" \"@{selected|character_name}\" &{template:default} {{name=Weapons}} {{Weapons= " +
            weapons.map(parseWeapon).concat(parse(activeMech.frame, "frames").data.weapon || []).join(" ") + "}} {{Mods= " +
            mods.map(parseMod).join(" ") + "}} {{Core Bonus= " +
            coreBonuses.filter(cb => weaponRelevantCB.includes(cb)).map(cbTag => parse(cbTag, "coreBonuses")).join(" ") + "}}"
    }

    // returns macro for Invade
    function buildInvadeString(systems, talents) {
        return "&{template:default} {{name=Invade}} {{Type=Quick Tech}} {{Range= **@{Sensors}**}} {{Target=@{target|token_name}}} @{Tech Attack} {{Heat=**+[[2]]**}} {{Basic=[Fragment Signal](~248)}} {{Special= "
            + systems.map(system => parse(system.id, "invade"))
            .filter(system => !!system)
            .concat(talents.find(talent => talent.id == "t_hacker" && talent.rank >= 2) ? "[Hacker 2](~249)" : [])
            .join(" ") + "}}"
    }

    // returns macro for mech Tech Actions
    function buildTechString(systems, talents) {
        return "/w \"@{selected|character_name}\" \"@{selected|character_name}\" &{template:default} {{name=Tech Actions}} {{Basic=[Lock On](~260)[Bolster](~261)[Scan](~262) }} {{Special= "
            + systems.map(system => parse(system.id, "tech"))
            .filter(system => !!system)
            .concat(talents.find(talent => talent.id == "t_hacker" && talent.rank >= 3) ? "[Hacker3](~263)" : [])
            .join(" ") + "}}"
    }

    // returns macro for mech Systems
    function buildSystemString(systems) {
        return "/w \"@{selected|character_name}\" \"@{selected|character_name}\" &{template:default} {{name=Systems}} {{Systems= " +
            systems.map(system => parse(system.id, "systems")).filter(system => !!system).join(" ") + " }} {{Deployables= " +
            systems.map(system => parse(system.id, "deployables")).filter(system => !!system).join(" ") + " }} {{Shields= " +
            systems.map(system => parse(system.id, "shields")).filter(system => !!system).join(" ") + " }} {{Drones= " +
            systems.map(system => parse(system.id, "drones")).filter(system => !!system).join(" ") + " }} {{AIs= " +
            systems.map(system => parse(system.id, "ai")).filter(system => !!system).join(" ") + " }}"
    }

    // returns macro for pilots Talents
    function buildTalentString(talents) {

        return "/w \"@{selected|character_name}\" \"@{selected|character_name}\" &{template:default} {{name=Talents}} " +
            talents.map(({
            id,
            rank
        }) => {
            let {
                name,
                data
            } = parse(id, "talents");
            return "{{" + name + "= " + data.slice(0, rank).join(" ") + " }}"
        }).join(" ")
    }

    // run this to get all the relevant mech macros
    // the pilot input is the pilot's data file from compcon
    function printMech(pilot) {

        let activeMech = !pilot.mechs.map(mech => mech.id).includes(pilot.state.active_mech_id) ? pilot.mechs[0] : pilot.mechs.find(mech => {
            return mech.id === pilot.state.active_mech_id
        });
        let systems = activeMech.loadouts[activeMech.active_loadout_index].systems;

        console.log("===MACROS FOR " + pilot.callsign.toUpperCase() + "===");
        console.log("2. Frame Features");
        console.log(buildFrameFeaturesString(pilot.core_bonuses, activeMech));
        console.log("5. Weapons");
        console.log(buildWeaponsString(activeMech, pilot.core_bonuses));
        console.log("6. Invade");
        console.log(buildInvadeString(systems, pilot.talents));
        console.log("7. Tech Actions");
        console.log(buildTechString(systems, pilot.talents));
        console.log("8. Systems");
        console.log(buildSystemString(systems));
        console.log("9. Talents");
        console.log(buildTalentString(pilot.talents))
    }

    function buildMacros(pilot, activeMech) {

        let systems = activeMech.loadouts[activeMech.active_loadout_index].systems;

        return [{
            "title": "2.Frame-Features",
            "macroText": buildFrameFeaturesString(pilot.core_bonuses, activeMech)
        },
                {
                    "title": "5.Weapons",
                    "macroText": buildWeaponsString(activeMech, pilot.core_bonuses)
                },
                {
                    "title": "6.Invade",
                    "macroText": buildInvadeString(systems, pilot.talents)
                },
                {
                    "title": "7.Tech-Actions",
                    "macroText": buildTechString(systems, pilot.talents)
                },
                {
                    "title": "8.Systems",
                    "macroText": buildSystemString(systems)
                },
                {
                    "title": "9.Talents",
                    "macroText": buildTalentString(pilot.talents)
                },
                ]
    }

    // run this in the console in the roll20 window
    // the pilot input is the pilot's data file from compcon
    // character sheet for this mech needs to be opened, with the callsign as its name
    function enterMacros(pilot) {
        let callsign = pilot.callsign.replace(/″/g,"");
        let activeMech = !pilot.mechs.map(mech => mech.id).includes(pilot.state.active_mech_id) ? pilot.mechs[0] : pilot.mechs.find(mech => {
            return mech.id === pilot.state.active_mech_id
        });
        let macros = buildMacros(pilot, activeMech);
        let stats = getStats(pilot, activeMech);
        // find correct character sheet (has to be open and share the pilot's callsign)
        let r20MechSheet = [...document.getElementsByClassName("characterdialog")].find(characterdialog => characterdialog.parentElement.firstChild.textContent.replace(/″/g,"").toLowerCase().includes(callsign.toLowerCase()));
        // lil bit of error handling
        if (!r20MechSheet) {
            let errMsg = "Could not find character sheet for callsign \"" + callsign + "\". Make sure that the character sheet is open and has the correct name.";
            showError(errMsg, "Error: " + errMsg);
            return
        }
        if (r20MechSheet.parentNode.attributes.style.textContent.includes("display: none")) {
            let errMsg = "Please exit edit mode for callsign \"" + callsign + "\".";
            showError(errMsg, "Error: " + errMsg);
            return
        }
        // navigate to abilities
        let r20CharacterViewer = r20MechSheet.children[0].contentDocument.getElementsByClassName("characterviewer")[0];
        r20CharacterViewer.getElementsByClassName("nav-tabs")[0].children[1].children[0].click();

        // enter macros into abilities
        macros.forEach(macro => {
            let ability = [...r20CharacterViewer.getElementsByClassName("abil")].find(ability => ability.getElementsByClassName("abilname")[0].innerText == macro.title);
            if (!!ability) {
                ability.getElementsByClassName("action tokenizer")[0].value = macro.macroText;
                ability.getElementsByClassName("saveabil")[0].click();
            } else {
                showError("Warning: Could not edit ability named \"" + macro.title + "\"","Warning: Could not edit ability named \"" + macro.title + "\". Make sure that that ability exists and is not already opened for editing.")
            }
        })

        for (let statCode in stats) {
            let stat = stats[statCode];
            let attribute = [...r20CharacterViewer.getElementsByClassName("attrib")].find(attribute => attribute.getElementsByClassName("attrname")[0].textContent == stat.name);
            attribute.getElementsByClassName("current")[0].firstChild.defaultValue = stat.value;
            if (!!stat.max) attribute.getElementsByClassName("max")[0].firstChild.defaultValue = stat.max;
        }
    }

    // enter macros for mech given either by by pilot data file or share code
    function loadPilot(input) {
        resetError();
        // check if pilot is share code
        if (/^[0-9a-f]+$/.test(input)) {
            console.log("[SCRIPT] fetching pilot: ", input);
            fetch("https://gist.githubusercontent.com/compcon/" + input + "/raw")
                .then(response => response.json())
                .then(data => enterMacros(data))
                .catch((err) => showError(err, "Error: Could not fetch pilot from share code."));
            return;
        } else {
            try {
                let pilotJSON = JSON.parse(input);
                console.log("[SCRIPT] parsing pilot: ", pilotJSON);
                enterMacros(pilotJSON);
            }
            catch(err) {
                showError(err, "Error: Input is neither a share code nor a intact pilot data file.");
            }
        }
    }

    // clear error messages & hide error sign
    function resetError() {
        importerErrorSign.style.visibility = "hidden";
        importerErrorSign.attributes["original-title"].nodeValue = "";
    }

    function showError(err, errMsg) {
        console.error("[IMPORT SCRIPT ERROR]", err);
        importerErrorSign.style.visibility = "visible";
        if (importerErrorSign.attributes["original-title"].nodeValue.length > 0) importerErrorSign.attributes["original-title"].nodeValue += "\n";
        importerErrorSign.attributes["original-title"].nodeValue += errMsg;
    }

    document.getElementById("journal").getElementsByClassName("superadd")[0].insertAdjacentHTML( 'afterend', "<div style=\"float: inline-end;\"><span original-title=\"Error: test\" style=\"margin-right: 5px;font-size: large;visibility: hidden;color: red;\" id=\"importererrorsign\" class=\"inlinerollresult showtip tipsy-n-right\">⚠</span><input type=\"text\" id=\"importtext\" placeholder=\"Pilot Data or Share Code\" style=\"width: auto;\"><button class=\"btn\" float=\"inline\" id=\"importbutton\">Import</button></div>");
    document.getElementById("importbutton").addEventListener("click", () => loadPilot(document.getElementById("importtext").value))
    importerErrorSign = document.getElementById("importererrorsign");
})();
