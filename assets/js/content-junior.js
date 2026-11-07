/* content-junior.js — 初中物理 · Junior secondary physics (China curriculum, bilingual) */
(function () {
  const P = window.PHYS;
  P.chapters = P.chapters || [];

  P.chapters.push({
    id: 'j-motion', track: 'junior', no: '01', tag: '核心',
    kicker: { zh: '力學 · 入門', en: 'Mechanics · first steps' },
    title: { zh: '測量與機械運動', en: 'Measurement and Motion' },
    summary: { zh: '長度、時間、速度：用數字描述運動。', en: 'Length, time and speed: describing motion with numbers.' },
    intro: {
      zh: '物理學從測量開始。要說清一個物體運動得多快，必須先約定單位、選好參照物，再找到路程與時間的比值。本章把這三件事講透。',
      en: 'Physics begins with measurement. To say how fast something moves, you must first agree on units, choose a reference, then take the ratio of distance to time. This chapter pins down all three.'
    },
    sims: [{ type: 'motion', label: { zh: '小車與 s–t 圖', en: 'Cart and s–t graph' } }],
    concepts: [
      {
        t: { zh: '長度與時間的測量', en: 'Measuring length and time' },
        b: {
          zh: '國際單位制中，長度的單位是米（m），時間的單位是秒（s）。用刻度尺測長度時，讀數要估讀到分度值的下一位，記錄結果必須同時寫出數字和單位。多次測量取平均值可以減小誤差，但誤差只能減小、不能消除。',
          en: 'In SI, length is measured in metres and time in seconds. When reading a ruler, estimate one extra digit beyond the smallest division, and always record a number with its unit. Averaging repeated measurements reduces random error — but error can be reduced, never removed.'
        },
        f: '1 m = 100 cm = 1000 mm　　<i>v</i> = <i>s</i> / <i>t</i>',
        note: { zh: '錯誤可以避免，誤差不能消除。二者不是一回事。', en: 'Mistakes can be avoided; error cannot. They are not the same thing.' }
      },
      {
        t: { zh: '速度：運動的快慢', en: 'Speed: how fast motion is' },
        b: {
          zh: '速度等於路程與時間之比 <i>v</i> = <i>s</i>/<i>t</i>，表示物體運動的快慢。國際單位是 m/s，常用單位 km/h，兩者換算關係是 1 m/s = 3.6 km/h。勻速直線運動中速度的大小和方向都不變，s–t 圖像是一條過原點的直線。',
          en: 'Speed is distance divided by time, <i>v</i> = <i>s</i>/<i>t</i>. The SI unit is m/s; km/h is common, and 1 m/s = 3.6 km/h. In uniform straight-line motion both the magnitude and direction stay constant, so the s–t graph is a straight line through the origin.'
        },
        f: '<i>v</i> = <i>s</i>/<i>t</i>　　1 m/s = 3.6 km/h'
      },
      {
        t: { zh: '運動的相對性', en: 'Motion is relative' },
        b: {
          zh: '判斷物體是運動還是靜止，必須先選定參照物。同一物體選擇不同參照物，結論可能完全相反：坐在行駛車廂裏的人，以車廂為參照物是靜止的，以地面為參照物卻在高速運動。',
          en: 'To call something moving or at rest, you must first choose a reference object. The same body can give opposite answers: a passenger is at rest relative to the carriage and racing along relative to the ground.'
        },
        note: { zh: '說"某物體運動"時，一定要交代"相對誰"。', en: 'Never say "it moves" without saying "relative to what".' }
      },
      {
        t: { zh: '變速運動與平均速度', en: 'Non-uniform motion and average speed' },
        b: {
          zh: '實際運動大多是變速的，這時用平均速度描述整體的快慢：<i>v̄</i> = 總路程 ÷ 總時間。平均速度不是各段速度的算術平均值。前半程 4 m/s、後半程 6 m/s，平均速度是 4.8 m/s，而不是 5 m/s —— 因為慢的那一段花的時間更長。',
          en: 'Real motion is usually non-uniform, so we describe the trip as a whole with average speed: total distance over total time. It is not the arithmetic mean of the two speeds. Half the distance at 4 m/s and half at 6 m/s gives 4.8 m/s, not 5 — the slow half takes longer.'
        },
        f: '<i>v̄</i> = <i>s</i><sub>總</sub> / <i>t</i><sub>總</sub>',
        note: { zh: '只有兩段路程相等時，"速度的平均值"才等於平均速度。', en: 'The mean of the speeds equals the average speed only when the two distances are equal.' }
      }
    ],
    terms: [
      ['長度', 'length', 'l'], ['時間', 'time', 't'], ['路程', 'distance', 's'],
      ['速度', 'speed / velocity', 'v'], ['參照物', 'reference object', '—'],
      ['平均速度', 'average speed', 'v̄'], ['誤差', 'error', '—'], ['刻度尺', 'ruler', '—']
    ],
    practice: [
      {
        q: { zh: '某同學用刻度尺測得物體長度為 2.35 cm，這把刻度尺的分度值是：', en: 'A student measures 2.35 cm with a ruler. What is the smallest division of that ruler?' },
        o: [{ zh: '1 cm', en: '1 cm' }, { zh: '1 mm', en: '1 mm' }, { zh: '0.1 mm', en: '0.1 mm' }, { zh: '2 mm', en: '2 mm' }],
        a: 1,
        e: {
          zh: '2.35 cm 的最後一位"5"是估讀位，倒數第二位"3"對應 0.1 cm，即分度值為 1 mm。',
          en: 'The final 5 is the estimated digit, so the 3 sits on the smallest division: 0.1 cm = 1 mm.'
        }
      },
      {
        q: { zh: '汽車以 72 km/h 行駛 30 min，通過的路程是：', en: 'A car travels at 72 km/h for 30 min. How far does it go?' },
        o: [{ zh: '18 km', en: '18 km' }, { zh: '36 km', en: '36 km' }, { zh: '72 km', en: '72 km' }, { zh: '144 km', en: '144 km' }],
        a: 1,
        e: {
          zh: '72 km/h = 20 m/s，30 min = 1800 s，s = vt = 20 × 1800 = 36000 m = 36 km。',
          en: '72 km/h = 20 m/s; 30 min = 1800 s; s = vt = 36 000 m = 36 km.'
        }
      },
      {
        q: { zh: '某人前半程速度 4 m/s，後半程速度 6 m/s，全程平均速度是：', en: 'Half the distance at 4 m/s, half at 6 m/s. The average speed is:' },
        o: [{ zh: '4.8 m/s', en: '4.8 m/s' }, { zh: '5 m/s', en: '5 m/s' }, { zh: '5.2 m/s', en: '5.2 m/s' }, { zh: '10 m/s', en: '10 m/s' }],
        a: 0,
        e: {
          zh: '設每半程為 s，總時間 t = s/4 + s/6，平均速度 = 2s / (s/4 + s/6) = 4.8 m/s。',
          en: 'Let each half be s. Total time = s/4 + s/6, so v̄ = 2s / (s/4 + s/6) = 4.8 m/s.'
        }
      }
    ]
  });

  P.chapters.push({
    id: 'j-sound', track: 'junior', no: '02', tag: '核心',
    kicker: { zh: '聲學', en: 'Sound' },
    title: { zh: '聲現象', en: 'Sound' },
    summary: { zh: '聲音怎樣產生、怎樣傳播，又怎樣被描述。', en: 'How sound is made, how it travels, and how we describe it.' },
    intro: {
      zh: '一切聲音都來自振動，而振動必須通過介質才能傳出去。音調、響度、音色這三個詞，對應三個完全不同的物理量。',
      en: 'Every sound comes from vibration, and vibration needs a medium to travel through. Pitch, loudness and timbre name three completely different physical quantities.'
    },
    sims: [{ type: 'wave', cfg: { mode: 'long' }, label: { zh: '聲波：疏密相間', en: 'Sound as compression waves' } }],
    concepts: [
      {
        t: { zh: '聲音的產生與傳播', en: 'How sound is produced and transmitted' },
        b: {
          zh: '聲是由物體的振動產生的，振動停止，發聲也停止。聲音的傳播需要介質：固體、液體、氣體都能傳聲，真空不能傳聲。15 ℃ 的空氣中聲速約為 340 m/s，一般固體中最快、氣體中最慢。',
          en: 'Sound is produced by vibration; stop the vibration and the sound stops. It needs a medium — solids, liquids and gases all carry sound, vacuum does not. In air at 15 °C the speed is about 340 m/s, fastest in solids and slowest in gases.'
        },
        f: '<i>v</i><sub>聲</sub> ≈ 340 m/s（15 ℃ 空氣）　　<i>s</i> = ½<i>v t</i>（回聲測距）',
        note: { zh: '宇航員在太空不能直接對話 —— 不是沒有空氣"呼吸"，而是沒有介質傳聲。', en: 'Astronauts cannot talk directly in space — not for lack of air to breathe, but for lack of a medium to carry sound.' }
      },
      {
        t: { zh: '音調、響度、音色', en: 'Pitch, loudness and timbre' },
        b: {
          zh: '音調指聲音的高低，由振動頻率決定，頻率越高音調越高，單位是赫茲（Hz）。響度指聲音的強弱，由振幅和到聲源的距離決定。音色由發聲體的材料和結構決定，它讓我們能分辨是小提琴還是鋼琴。',
          en: 'Pitch is how high a note sounds, set by frequency (in hertz). Loudness is how strong it sounds, set by amplitude and distance from the source. Timbre is the "colour" of the sound, set by the material and shape of the source — it is why a violin and a piano playing the same note still sound different.'
        },
        f: '<i>f</i> = 1/<i>T</i>（頻率與週期互為倒數）'
      },
      {
        t: { zh: '超聲波與次聲波', en: 'Ultrasound and infrasound' },
        b: {
          zh: '人的聽覺範圍大約是 20 Hz 到 20000 Hz。高於 20000 Hz 的聲波叫超聲波，方向性好、穿透力強，可用於 B 超、聲吶、清洗和碎石。低於 20 Hz 的叫次聲波，頻率低、傳播遠，地震、颱風、核爆都會產生次聲波。',
          en: 'Human hearing spans roughly 20 Hz to 20 kHz. Above 20 kHz is ultrasound: directional and penetrating, used in medical imaging, sonar and cleaning. Below 20 Hz is infrasound, which travels very far and is produced by earthquakes, storms and explosions.'
        }
      },
      {
        t: { zh: '噪聲與防治', en: 'Noise and its control' },
        b: {
          zh: '聲音的強弱用分貝（dB）表示，人剛能聽到的聲音約為 0 dB，長期處於 90 dB 以上的環境會損傷聽力。控制噪聲有三條途徑：在聲源處減弱（消聲器）、在傳播過程中減弱（隔音牆、綠化帶）、在人耳處減弱（耳塞）。',
          en: 'Loudness is measured in decibels. Healthy hearing is damaged by prolonged exposure above about 90 dB. Noise control works at three places: at the source (silencers), along the path (barriers, planting), and at the ear (earplugs).'
        }
      }
    ],
    terms: [
      ['振動', 'vibration', '—'], ['頻率', 'frequency', 'f'], ['振幅', 'amplitude', 'A'],
      ['音調', 'pitch', '—'], ['響度', 'loudness', '—'], ['音色', 'timbre', '—'],
      ['分貝', 'decibel', 'dB'], ['超聲波', 'ultrasound', '—'], ['次聲波', 'infrasound', '—']
    ],
    practice: [
      {
        q: { zh: '宇航員在月球上不能直接對話，原因是：', en: 'Why can astronauts on the Moon not talk to each other directly?' },
        o: [{ zh: '月球上空氣太稀薄', en: 'The air is too thin' }, { zh: '月球上沒有介質傳播聲音', en: 'There is no medium to carry sound' }, { zh: '聲音在月球上傳播太慢', en: 'Sound travels too slowly there' }, { zh: '宇航服擋住了聲波', en: 'The suits block sound' }],
        a: 1,
        e: { zh: '月球表面近乎真空，沒有介質，聲音無法傳播。他們只能用無線電。', en: 'The lunar surface is essentially vacuum — no medium, no sound. Radio is the only option.' }
      },
      {
        q: { zh: '用大小不同的力敲同一面鼓，改變的是：', en: 'Beating the same drum with different force changes:' },
        o: [{ zh: '音調', en: 'pitch' }, { zh: '響度', en: 'loudness' }, { zh: '音色', en: 'timbre' }, { zh: '聲速', en: 'speed of sound' }],
        a: 1,
        e: { zh: '用力不同改變的是振幅，振幅決定響度；鼓面鬆緊才改變音調。', en: 'Force changes amplitude, hence loudness. Tension of the drumhead would change pitch.' }
      },
      {
        q: { zh: '對着山崖喊一聲，2 s 後聽到回聲，人到山崖的距離約為（v = 340 m/s）：', en: 'A shout returns as an echo after 2 s. Distance to the cliff (v = 340 m/s)?' },
        o: [{ zh: '170 m', en: '170 m' }, { zh: '340 m', en: '340 m' }, { zh: '680 m', en: '680 m' }, { zh: '1020 m', en: '1020 m' }],
        a: 1,
        e: { zh: '聲音往返走了兩倍距離，s = vt/2 = 340 × 2 / 2 = 340 m。', en: 'The sound covers the distance twice: s = vt/2 = 340 m.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-light', track: 'junior', no: '03', tag: '核心',
    kicker: { zh: '光學', en: 'Optics' },
    title: { zh: '光現象', en: 'Light: Reflection and Refraction' },
    summary: { zh: '直線傳播、反射定律、平面鏡與折射。', en: 'Straight-line travel, the law of reflection, mirrors and refraction.' },
    intro: {
      zh: '光在同一均勻介質中沿直線傳播，遇到界面時一部分被反射、一部分被折射。反射與折射的規律，都可以用"法線"這一條輔助線說清楚。',
      en: 'Light travels in straight lines through a uniform medium. At an interface some of it reflects and some refracts; both rules are stated relative to one auxiliary line, the normal.'
    },
    sims: [
      { type: 'reflection', label: { zh: '反射定律', en: 'Law of reflection' } },
      { type: 'refraction', label: { zh: '折射與全反射', en: 'Refraction and TIR' } }
    ],
    concepts: [
      {
        t: { zh: '光的直線傳播', en: 'Light travels in straight lines' },
        b: {
          zh: '光在同種均勻介質中沿直線傳播，真空中光速 c = 3×10⁸ m/s，是自然界速度的上限。影子、日食月食、小孔成像，都是光沿直線傳播的結果。小孔成像成的是倒立的實像，像的大小由物到孔和孔到屏的距離之比決定。',
          en: 'In a uniform medium light goes straight. In vacuum c = 3×10⁸ m/s, the cosmic speed limit. Shadows, eclipses and pinhole images all follow from this. A pinhole casts an inverted real image whose size is set by the ratio of the two distances.'
        },
        f: '<i>c</i> = 3×10<sup>8</sup> m/s'
      },
      {
        t: { zh: '光的反射定律', en: 'The law of reflection' },
        b: {
          zh: '反射光線、入射光線和法線在同一平面內；反射光線和入射光線分居法線兩側；反射角等於入射角。注意：入射角是入射光線與法線的夾角，不是與鏡面的夾角。光路是可逆的。',
          en: 'Reflected ray, incident ray and normal lie in one plane; the two rays sit on opposite sides of the normal; the angle of reflection equals the angle of incidence. Careful: angles are measured from the normal, not from the mirror. Light paths are reversible.'
        },
        note: { zh: '入射光線與鏡面成 30°，入射角是 60°，不是 30°。', en: 'A ray 30° above the mirror has an angle of incidence of 60°, not 30°.' }
      },
      {
        t: { zh: '鏡面反射與漫反射', en: 'Specular and diffuse reflection' },
        b: {
          zh: '兩種反射都遵守反射定律。鏡面反射的反射面平整，反射光集中在一個方向，所以只在特定角度看到刺眼的光；漫反射的表面粗糙，反射光射向各個方向，正因如此我們才能從任何角度看到不發光的物體。',
          en: 'Both obey the same law. A smooth surface reflects light into one direction, so the glare appears only at certain angles. A rough surface scatters it everywhere — which is exactly why we can see non-luminous objects from any angle.'
        }
      },
      {
        t: { zh: '平面鏡成像', en: 'Images in a plane mirror' },
        b: {
          zh: '平面鏡所成的像與物體大小相等、到鏡面的距離相等，像與物的連線垂直於鏡面。這個像是虛像：它不是光線實際會聚形成的，不能用光屏承接。人靠近鏡子時，像也靠近，但像的大小始終不變。',
          en: 'A plane mirror gives an image the same size as the object, the same distance behind the mirror, on the perpendicular through the object. It is virtual — no light actually converges there, so no screen can catch it. Walk closer and the image comes closer, but never grows.'
        }
      },
      {
        t: { zh: '光的折射', en: 'Refraction' },
        b: {
          zh: '光從空氣斜射入水或玻璃時，折射光線向法線偏折，折射角小於入射角；反過來從水射向空氣時，折射角大於入射角。垂直入射時傳播方向不變。水中筷子看起來"折斷"、池底看起來變淺、海市蜃樓，都是折射造成的。',
          en: 'Going from air into water or glass, the ray bends toward the normal, so the angle of refraction is smaller. Going the other way it bends away. At normal incidence nothing bends. A stick in water looks broken, a pool looks shallower, and mirages appear — all refraction.'
        },
        note: { zh: '看到的是"看起來的位置"，不是物體真實位置 —— 池水比看上去深。', en: 'You see where the object appears to be, not where it is: the pool is deeper than it looks.' }
      }
    ],
    terms: [
      ['光源', 'light source', '—'], ['入射角', 'angle of incidence', 'θ₁'],
      ['反射角', 'angle of reflection', 'θ₂'], ['法線', 'normal', '—'],
      ['實像', 'real image', '—'], ['虛像', 'virtual image', '—'],
      ['折射', 'refraction', '—'], ['光速', 'speed of light', 'c']
    ],
    practice: [
      {
        q: { zh: '入射光線與平面鏡的夾角為 30°，則入射角為：', en: 'A ray makes 30° with the mirror. The angle of incidence is:' },
        o: [{ zh: '30°', en: '30°' }, { zh: '60°', en: '60°' }, { zh: '90°', en: '90°' }, { zh: '120°', en: '120°' }],
        a: 1,
        e: { zh: '入射角是光線與法線的夾角：90° − 30° = 60°。', en: 'Angle from the normal: 90° − 30° = 60°.' }
      },
      {
        q: { zh: '人向平面鏡走近時，像的大小：', en: 'Walking toward a plane mirror, the image:' },
        o: [{ zh: '變大', en: 'grows' }, { zh: '變小', en: 'shrinks' }, { zh: '不變', en: 'stays the same' }, { zh: '先變大後變小', en: 'grows then shrinks' }],
        a: 2,
        e: { zh: '平面鏡成像始終與物體等大，走近只是視角變大，像本身沒變。', en: 'The image is always the same size as the object. It only subtends a larger angle as you approach.' }
      },
      {
        q: { zh: '插入水中的筷子看起來向上"折斷"，這是因為光發生了：', en: 'A chopstick in water looks bent upward because light is:' },
        o: [{ zh: '反射', en: 'reflected' }, { zh: '折射', en: 'refracted' }, { zh: '衍射', en: 'diffracted' }, { zh: '被水吸收', en: 'absorbed' }],
        a: 1,
        e: { zh: '水下部分發出的光在水面折射後偏離法線，人眼沿折射光線的反向延長線看去，看到的是偏高的虛像。', en: 'Light from the submerged part bends away from the normal at the surface; the eye traces it back to a virtual image that sits higher.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-lens', track: 'junior', no: '04', tag: '核心',
    kicker: { zh: '光學 · 應用', en: 'Optics · applications' },
    title: { zh: '透鏡及其應用', en: 'Lenses and Imaging' },
    summary: { zh: '凸透鏡成像規律，一條公式管五種情況。', en: 'One lens equation covering all five imaging cases.' },
    intro: {
      zh: '凸透鏡的成像規律看起來要背五條，其實都來自同一個公式 1/f = 1/u + 1/v。把物距從遠到近推一遍，像的位置、大小、正倒、虛實就自然出來了。',
      en: 'Five rules to memorise look like a lot, but they all come from one equation. Sweep the object from far to near and the image position, size, orientation and reality follow automatically.'
    },
    sims: [{ type: 'lens', label: { zh: '光路作圖', en: 'Ray diagram' } }],
    concepts: [
      {
        t: { zh: '凸透鏡與凹透鏡', en: 'Convex and concave lenses' },
        b: {
          zh: '凸透鏡中間厚、邊緣薄，對光有會聚作用；凹透鏡中間薄、邊緣厚，對光有發散作用。平行於主光軸的光經凸透鏡折射後會聚於焦點，焦點到光心的距離叫焦距 f。焦距越小，會聚能力越強。',
          en: 'A convex lens is thick in the middle and converges light; a concave lens is thin in the middle and diverges it. Rays parallel to the principal axis converge at the focal point; its distance from the lens is the focal length f. A shorter f means stronger convergence.'
        }
      },
      {
        t: { zh: '凸透鏡成像規律', en: 'How a convex lens forms images' },
        b: {
          zh: '物距 u > 2f：倒立、縮小的實像，照相機就是這一檔。u = 2f：倒立、等大的實像。f < u < 2f：倒立、放大的實像，投影儀。u = f：折射光平行射出，不成像。u < f：正立、放大的虛像，放大鏡。記住一句話：物近像遠像變大。',
          en: 'u > 2f gives an inverted, diminished real image (a camera). u = 2f gives an inverted image of the same size. f < u < 2f gives an inverted, magnified real image (a projector). At u = f the outgoing rays are parallel and no image forms. u < f gives an upright, magnified virtual image (a magnifier). Move the object closer and the image moves farther and grows.'
        },
        f: '1/<i>f</i> = 1/<i>u</i> + 1/<i>v</i>　　<i>m</i> = <i>v</i>/<i>u</i>'
      },
      {
        t: { zh: '實像與虛像', en: 'Real versus virtual images' },
        b: {
          zh: '實像是實際光線會聚形成的，能用光屏承接，總是倒立的；虛像是實際光線的反向延長線相交形成的，不能用光屏承接，總是正立的。凸透鏡在 u < f 時成虛像，平面鏡成的也永遠是虛像。',
          en: 'A real image is formed where rays actually meet; a screen can catch it, and it is always inverted. A virtual image is where backward extensions meet; no screen can catch it, and it is always upright. A convex lens gives a virtual image when u < f; a plane mirror always does.'
        }
      },
      {
        t: { zh: '眼睛與眼鏡', en: 'The eye and corrective lenses' },
        b: {
          zh: '眼球相當於一個焦距可調的凸透鏡，視網膜相當於光屏。近視眼的像成在視網膜前方，需要凹透鏡先發散一點；遠視眼的像成在視網膜後方，需要凸透鏡先會聚一點。眼鏡的度數 = 100 / 焦距（米），近視取負。',
          en: 'The eye is a variable-focus convex lens and the retina is the screen. In short sight the image falls in front of the retina, so a diverging lens is needed; in long sight it falls behind, so a converging lens helps. Lens power in dioptres is 100 / f in metres, negative for short sight.'
        },
        note: { zh: '近視鏡是凹透鏡（發散），遠視鏡是凸透鏡（會聚）—— 別記反。', en: 'Short sight → concave lens. Long sight → convex lens. Do not swap them.' }
      }
    ],
    terms: [
      ['凸透鏡', 'convex lens', '—'], ['凹透鏡', 'concave lens', '—'],
      ['焦點', 'focal point', 'F'], ['焦距', 'focal length', 'f'],
      ['物距', 'object distance', 'u'], ['像距', 'image distance', 'v'],
      ['實像', 'real image', '—'], ['虛像', 'virtual image', '—'], ['光心', 'optical centre', 'O']
    ],
    practice: [
      {
        q: { zh: '凸透鏡焦距 10 cm，物體放在距透鏡 30 cm 處，所成的像是：', en: 'f = 10 cm, object at 30 cm. The image is:' },
        o: [{ zh: '倒立縮小的實像', en: 'inverted, diminished, real' }, { zh: '倒立放大的實像', en: 'inverted, magnified, real' }, { zh: '正立放大的虛像', en: 'upright, magnified, virtual' }, { zh: '正立等大的虛像', en: 'upright, same size, virtual' }],
        a: 0,
        e: { zh: 'u = 30 cm > 2f = 20 cm，成倒立縮小的實像，與照相機相同。', en: 'u = 30 cm > 2f, so the image is inverted and diminished — the camera case.' }
      },
      {
        q: { zh: '用放大鏡觀察郵票時，郵票應放在：', en: 'To use a magnifier on a stamp, the stamp must be:' },
        o: [{ zh: '焦點以外', en: 'beyond the focal point' }, { zh: '焦點以內', en: 'inside the focal point' }, { zh: '二倍焦距處', en: 'at twice the focal length' }, { zh: '緊貼透鏡', en: 'touching the lens' }],
        a: 1,
        e: { zh: '只有 u < f 時才成正立放大的虛像，放大鏡才起作用。', en: 'Only u < f gives an upright, magnified virtual image.' }
      },
      {
        q: { zh: '近視眼應配戴：', en: 'Short sight is corrected with:' },
        o: [{ zh: '凸透鏡', en: 'a convex lens' }, { zh: '凹透鏡', en: 'a concave lens' }, { zh: '平面鏡', en: 'a plane mirror' }, { zh: '三稜鏡', en: 'a prism' }],
        a: 1,
        e: { zh: '近視眼像成在視網膜前，需要凹透鏡先發散光線，把像推後到視網膜上。', en: 'The image forms in front of the retina; a diverging lens pushes it back onto the retina.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-thermal', track: 'junior', no: '05', tag: '核心',
    kicker: { zh: '熱學', en: 'Thermal physics' },
    title: { zh: '物態變化', en: 'Changes of State' },
    summary: { zh: '熔化、汽化、昇華：吸熱與放熱的兩條路線。', en: 'Melting, boiling, sublimation — and where the heat goes.' },
    intro: {
      zh: '物態變化只有六種，規律卻出奇地整齊：向"更亂"的方向變（固→液→氣）都要吸熱，反過來都放熱。晶體熔化時溫度不變，這段"不變"正是理解潛熱的鑰匙。',
      en: 'There are only six changes of state, and the pattern is tidy: going toward the more disordered state (solid → liquid → gas) absorbs heat, and the reverse releases it. A crystal holds a constant temperature while melting — that plateau is the key to latent heat.'
    },
    sims: [{ type: 'heating', label: { zh: '冰的加熱曲線', en: 'Heating curve of ice' } }],
    concepts: [
      {
        t: { zh: '溫度與溫度計', en: 'Temperature and thermometers' },
        b: {
          zh: '溫度表示物體的冷熱程度。攝氏溫度規定：標準大氣壓下冰水混合物的溫度為 0 ℃，沸水為 100 ℃。熱力學溫度 T 與攝氏溫度 t 的關係是 T = t + 273.15 K。溫度是分子平均動能的標誌。',
          en: 'Temperature measures hotness. On the Celsius scale, an ice–water mixture at standard pressure is 0 °C and boiling water 100 °C. Thermodynamic temperature is T = t + 273.15 K. Microscopically, temperature tracks the average kinetic energy of molecules.'
        },
        f: '<i>T</i> = <i>t</i> + 273.15 K'
      },
      {
        t: { zh: '熔化和凝固', en: 'Melting and freezing' },
        b: {
          zh: '固體分為晶體和非晶體。晶體有固定的熔點，熔化過程中吸熱但溫度保持不變；非晶體（如瀝青、玻璃）沒有熔點，邊吸熱邊升溫邊變軟。同種晶體的凝固點等於熔點，凝固放熱。',
          en: 'Crystalline solids have a sharp melting point and hold that temperature while absorbing heat. Amorphous solids such as glass or pitch soften gradually with no fixed point. For a given crystal the freezing point equals the melting point, and freezing releases heat.'
        },
        note: { zh: '熔化吸熱但溫度不變 —— 吸收的熱量用來破壞晶格，不是用來升溫。', en: 'Melting absorbs heat without warming: the energy goes into breaking the lattice, not into raising temperature.' }
      },
      {
        t: { zh: '汽化和液化', en: 'Vaporisation and condensation' },
        b: {
          zh: '汽化有蒸發和沸騰兩種方式，都吸熱。蒸發只在液體表面進行，任何溫度都能發生，且表面積越大、溫度越高、空氣流動越快，蒸發越快。沸騰在液體內部和表面同時進行，溫度達到沸點才發生，沸騰時溫度不變。沸點隨氣壓升高而升高，高壓鍋就是利用這一點。液化是汽化的逆過程，放熱。',
          en: 'Vaporisation happens two ways, both absorbing heat. Evaporation occurs at the surface at any temperature, faster with larger area, higher temperature and moving air. Boiling happens throughout the liquid, only at the boiling point, and holds a constant temperature. Boiling point rises with pressure — that is the pressure cooker. Condensation is the reverse and releases heat.'
        },
        note: { zh: '白氣不是水蒸氣。水蒸氣無色透明，看得見的"白氣"是遇冷液化而成的小水滴。', en: '"White mist" is not water vapour. Vapour is invisible; the white cloud is tiny droplets formed by condensation.' }
      },
      {
        t: { zh: '昇華和凝華', en: 'Sublimation and deposition' },
        b: {
          zh: '固體直接變成氣體叫昇華，吸熱：乾冰昇華吸熱可用於人工降雨和冷藏保鮮，樟腦丸變小也是昇華。氣體直接變成固體叫凝華，放熱：霜、霧凇、窗玻璃上的冰花都是水蒸氣凝華形成的。',
          en: 'Solid to gas is sublimation, absorbing heat — dry ice cools and seeds rain, mothballs shrink. Gas to solid is deposition, releasing heat — frost, rime and the ice flowers on winter windows all form this way.'
        }
      }
    ],
    terms: [
      ['溫度', 'temperature', 't / T'], ['熔點', 'melting point', '—'],
      ['凝固點', 'freezing point', '—'], ['沸點', 'boiling point', '—'],
      ['蒸發', 'evaporation', '—'], ['液化', 'condensation', '—'],
      ['昇華', 'sublimation', '—'], ['凝華', 'deposition', '—'],
      ['潛熱', 'latent heat', 'L']
    ],
    practice: [
      {
        q: { zh: '冰在熔化過程中，溫度保持 0 ℃ 不變，此時它：', en: 'While melting, ice stays at 0 °C. During this time it:' },
        o: [{ zh: '不吸熱也不放熱', en: 'absorbs and releases nothing' }, { zh: '吸熱但溫度不變', en: 'absorbs heat without warming' }, { zh: '放熱但溫度不變', en: 'releases heat without cooling' }, { zh: '內能不變', en: 'keeps constant internal energy' }],
        a: 1,
        e: { zh: '熔化需要吸熱，但熱量用於破壞晶體結構，溫度不變，內能增大。', en: 'Heat is absorbed but goes into breaking the crystal structure; temperature stays put while internal energy rises.' }
      },
      {
        q: { zh: '夏天從冰箱取出的飲料瓶外壁"出汗"，這是：', en: 'A cold bottle "sweats" in summer. This is:' },
        o: [{ zh: '瓶內的水滲出來', en: 'water leaking out' }, { zh: '空氣中的水蒸氣液化', en: 'vapour in the air condensing' }, { zh: '瓶壁熔化', en: 'the bottle melting' }, { zh: '水蒸氣昇華', en: 'vapour sublimating' }],
        a: 1,
        e: { zh: '瓶壁溫度低於空氣露點，空氣中的水蒸氣遇冷液化成小水滴附着在瓶外。', en: 'The wall is below the dew point, so vapour condenses on it.' }
      },
      {
        q: { zh: '高壓鍋能更快煮熟食物，主要因為：', en: 'A pressure cooker cooks faster mainly because:' },
        o: [{ zh: '鍋內氣壓高，水的沸點升高', en: 'higher pressure raises the boiling point' }, { zh: '鍋內水更多', en: 'it holds more water' }, { zh: '鍋的材料導熱更好', en: 'the metal conducts better' }, { zh: '水的比熱容變小', en: 'the specific heat falls' }],
        a: 0,
        e: { zh: '氣壓升高使沸點超過 100 ℃，水溫更高，食物熟得更快。', en: 'Higher pressure pushes the boiling point above 100 °C, so the water is hotter.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-density', track: 'junior', no: '06', tag: '核心',
    kicker: { zh: '物質', en: 'Matter' },
    title: { zh: '質量與密度', en: 'Mass and Density' },
    summary: { zh: 'ρ = m/V：鑑別物質、判斷空心。', en: 'ρ = m/V: identifying materials and spotting hollow objects.' },
    intro: {
      zh: '質量是物體自身的屬性，走到哪裏都不變；密度是物質的屬性，同種物質在相同狀態下密度相同。把兩者分開，很多"看起來奇怪"的題目就順了。',
      en: 'Mass belongs to the object and never changes with location; density belongs to the material. Keep the two apart and most "tricky" problems become straightforward.'
    },
    sims: [{ type: 'buoyancy', label: { zh: '密度與浮沉', en: 'Density and floating' } }],
    concepts: [
      {
        t: { zh: '質量', en: 'Mass' },
        b: {
          zh: '質量是物體所含物質的多少，用 m 表示，單位是千克（kg）。質量不隨物體的形狀、狀態、位置和溫度改變：一塊冰化成水，質量不變；宇航員到月球，質量也不變（重力變了）。實驗室用天平測質量。',
          en: 'Mass is the amount of matter, in kilograms. It does not change with shape, state, location or temperature: melted ice keeps its mass, and an astronaut on the Moon keeps hers (weight changes, mass does not). A balance measures mass.'
        }
      },
      {
        t: { zh: '密度', en: 'Density' },
        b: {
          zh: '某種物質組成的物體，質量與體積之比叫這種物質的密度：ρ = m/V。單位是 kg/m³，常用 g/cm³，1 g/cm³ = 1000 kg/m³。水的密度是 1.0×10³ kg/m³，表示 1 m³ 的水質量為 1000 kg。密度是物質的特性，與質量和體積無關。',
          en: 'Density is mass per unit volume, ρ = m/V, in kg/m³ (1 g/cm³ = 1000 kg/m³). Water is 1.0×10³ kg/m³ — one cubic metre weighs a tonne. Density characterises the material, not the particular lump: cut it in half and ρ stays the same.'
        },
        f: '<i>ρ</i> = <i>m</i> / <i>V</i>　　1 g/cm<sup>3</sup> = 10<sup>3</sup> kg/m<sup>3</sup>'
      },
      {
        t: { zh: '測量物質的密度', en: 'Measuring density' },
        b: {
          zh: '用天平測質量 m，用量筒測體積 V。測固體時先測質量、後測體積：若先浸水再稱質量，物體沾水會使質量偏大。不規則固體的體積用排水法：V = V₂ − V₁。測液體密度時，要先測燒杯和液體的總質量，倒出一部分後再測，用差值算質量。',
          en: 'Weigh with a balance, measure volume with a graduated cylinder. For solids, weigh first, then immerse — wetting adds mass. Find an irregular volume by displacement: V = V₂ − V₁. For liquids, weigh cup plus liquid, pour some out, weigh again, and use the difference.'
        }
      },
      {
        t: { zh: '密度與生活', en: 'Density in practice' },
        b: {
          zh: '密度可以用來鑑別物質、判斷物體是實心還是空心、選擇材料。冰的密度小於水，所以冰浮在水面上；暖氣片裝在窗户下方，是因為熱空氣密度小會上升，冷空氣下沉形成對流。',
          en: 'Density identifies materials, detects hollow objects and guides material choice. Ice floats because it is less dense than water. Radiators sit under windows because warm air is less dense and rises, setting up a convection loop.'
        },
        note: { zh: '判斷空心：用實測體積與"按質量算出的實心體積"比較，實測大的就是空心。', en: 'To test for a hollow core, compare the measured volume with the solid volume implied by the mass.' }
      }
    ],
    terms: [
      ['質量', 'mass', 'm'], ['密度', 'density', 'ρ'], ['體積', 'volume', 'V'],
      ['天平', 'balance', '—'], ['量筒', 'graduated cylinder', '—'], ['排水法', 'displacement method', '—']
    ],
    practice: [
      {
        q: { zh: '某金屬塊質量 54 g，體積 20 cm³，它的密度是：', en: 'A metal block has mass 54 g and volume 20 cm³. Its density is:' },
        o: [{ zh: '2.7 g/cm³', en: '2.7 g/cm³' }, { zh: '0.37 g/cm³', en: '0.37 g/cm³' }, { zh: '27 g/cm³', en: '27 g/cm³' }, { zh: '5.4 g/cm³', en: '5.4 g/cm³' }],
        a: 0,
        e: { zh: 'ρ = 54 / 20 = 2.7 g/cm³，對應鋁。', en: 'ρ = 54/20 = 2.7 g/cm³, which is aluminium.' }
      },
      {
        q: { zh: '一瓶水喝掉一半後，剩下水的密度：', en: 'After drinking half a bottle of water, the remaining water has:' },
        o: [{ zh: '變為原來的一半', en: 'half the density' }, { zh: '不變', en: 'the same density' }, { zh: '變為原來的兩倍', en: 'twice the density' }, { zh: '無法判斷', en: 'cannot be determined' }],
        a: 1,
        e: { zh: '質量和體積都減半，比值不變，密度是物質的特性。', en: 'Both mass and volume halve, so the ratio is unchanged.' }
      },
      {
        q: { zh: '冰熔化成水後，下列說法正確的是：', en: 'When ice melts into water:' },
        o: [{ zh: '質量變小，體積不變', en: 'mass falls, volume constant' }, { zh: '質量不變，體積變小', en: 'mass constant, volume shrinks' }, { zh: '質量不變，體積變大', en: 'mass constant, volume grows' }, { zh: '質量和體積都不變', en: 'both unchanged' }],
        a: 1,
        e: { zh: '質量守恆；水的密度大於冰，所以體積變小。', en: 'Mass is conserved; water is denser than ice, so volume decreases.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-force', track: 'junior', no: '07', tag: '核心',
    kicker: { zh: '力學', en: 'Mechanics' },
    title: { zh: '力與運動', en: 'Force and Motion' },
    summary: { zh: '三種力、二力平衡、慣性。', en: 'Three forces, balanced pairs, and inertia.' },
    intro: {
      zh: '"力是維持運動的原因"這個直覺是錯的。伽利略的斜面實驗指出：如果沒有摩擦，運動不需要力來維持。牛頓第一定律正是從這一點出發。',
      en: 'The intuition that force is needed to keep something moving is wrong. Galileo\'s inclined-plane argument shows motion needs no force if friction vanishes — and Newton\'s first law starts exactly there.'
    },
    sims: [{ type: 'incline', label: { zh: '斜面上的力', en: 'Forces on an incline' } }],
    concepts: [
      {
        t: { zh: '力', en: 'Force' },
        b: {
          zh: '力是物體對物體的作用，單位是牛頓（N）。力的作用效果有兩個：改變物體的形狀、改變物體的運動狀態。力的大小、方向、作用點叫力的三要素，它們共同決定力的作用效果。力的作用是相互的：你推牆，牆也推你。',
          en: 'A force is an interaction between bodies, measured in newtons. It can deform a body or change its state of motion. Magnitude, direction and point of application together define it. Forces always come in pairs: push a wall and the wall pushes back.'
        }
      },
      {
        t: { zh: '重力、彈力、摩擦力', en: 'Gravity, elastic force, friction' },
        b: {
          zh: '重力 G = mg，方向豎直向下，作用點在重心，g ≈ 9.8 N/kg。彈力是物體發生彈性形變時產生的力，彈簧測力計的原理是：在彈性限度內，彈簧的伸長量與所受拉力成正比。滑動摩擦力 f = μN，與壓力和接觸面的粗糙程度有關，與接觸面積、運動速度無關。',
          en: 'Weight is G = mg, directed vertically down through the centre of gravity, with g ≈ 9.8 N/kg. Elastic force arises from deformation; a spring balance relies on Hooke\'s law — within the elastic limit, extension is proportional to the applied force. Sliding friction f = μN depends on the normal force and the roughness of the surfaces, not on contact area or speed.'
        },
        f: '<i>G</i> = <i>mg</i>　　<i>f</i> = <i>μN</i>　　<i>F</i> = <i>kx</i>'
      },
      {
        t: { zh: '牛頓第一定律與慣性', en: 'Newton\'s first law and inertia' },
        b: {
          zh: '一切物體在沒有受到外力作用時，總保持靜止狀態或勻速直線運動狀態，這就是牛頓第一定律。它不能由實驗直接驗證，是在伽利略理想實驗的基礎上推理得出的。物體保持原來運動狀態不變的性質叫慣性，慣性只與質量有關，與速度無關。',
          en: 'Every body continues at rest or in uniform straight-line motion unless acted on by a net force. This law cannot be tested directly; it is inferred from Galileo\'s idealised experiment. The tendency to keep its state of motion is inertia, which depends only on mass — not on speed.'
        },
        note: { zh: '慣性不是力，不能說"受到慣性作用"，只能說"由於慣性"。', en: 'Inertia is not a force: never "acted on by inertia", only "because of inertia".' }
      },
      {
        t: { zh: '二力平衡', en: 'Balanced forces' },
        b: {
          zh: '作用在同一物體上的兩個力，如果大小相等、方向相反、作用在同一直線上，這兩個力就彼此平衡。物體在平衡力作用下保持靜止或勻速直線運動。注意區分平衡力與相互作用力：平衡力作用在同一物體上，相互作用力作用在兩個不同物體上。',
          en: 'Two forces on the same body are balanced when equal in magnitude, opposite in direction and collinear. A body under balanced forces stays at rest or moves uniformly. Distinguish balanced pairs from action–reaction pairs: the former act on one body, the latter on two.'
        }
      }
    ],
    terms: [
      ['力', 'force', 'F'], ['重力', 'gravity / weight', 'G'], ['彈力', 'elastic force', '—'],
      ['摩擦力', 'friction', 'f'], ['慣性', 'inertia', '—'], ['平衡力', 'balanced forces', '—'],
      ['重心', 'centre of gravity', '—'], ['牛頓', 'newton', 'N']
    ],
    practice: [
      {
        q: { zh: '跳遠運動員起跳前要助跑，這是為了利用：', en: 'A long jumper runs up before take-off in order to use:' },
        o: [{ zh: '慣性', en: 'inertia' }, { zh: '重力', en: 'gravity' }, { zh: '摩擦力', en: 'friction' }, { zh: '彈力', en: 'elastic force' }],
        a: 0,
        e: { zh: '助跑使人獲得較大的速度，起跳後由於慣性繼續向前運動，跳得更遠。', en: 'The run-up gives speed; after take-off inertia carries the jumper forward.' }
      },
      {
        q: { zh: '一名同學體重 500 N，他的質量約為（g 取 10 N/kg）：', en: 'A student weighs 500 N. His mass is about (g = 10 N/kg):' },
        o: [{ zh: '5 kg', en: '5 kg' }, { zh: '50 kg', en: '50 kg' }, { zh: '500 kg', en: '500 kg' }, { zh: '5000 kg', en: '5000 kg' }],
        a: 1,
        e: { zh: 'm = G/g = 500/10 = 50 kg。', en: 'm = G/g = 50 kg.' }
      },
      {
        q: { zh: '物體在水平面上做勻速直線運動，它受到的力：', en: 'A body moving uniformly on a horizontal surface is acted on by:' },
        o: [{ zh: '一定是平衡力', en: 'necessarily balanced forces' }, { zh: '一定不受力', en: 'no forces at all' }, { zh: '合力向前', en: 'a net forward force' }, { zh: '只有重力', en: 'gravity only' }],
        a: 0,
        e: { zh: '勻速直線運動說明合力為零，所受的力互相平衡（可能受多個力）。', en: 'Uniform motion means zero net force, so whatever forces act must balance.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-pressure', track: 'junior', no: '08', tag: '核心',
    kicker: { zh: '力學 · 流體', en: 'Mechanics · fluids' },
    title: { zh: '壓強與浮力', en: 'Pressure and Buoyancy' },
    summary: { zh: 'p = F/S、p = ρgh 與阿基米德原理。', en: 'p = F/S, p = ρgh, and Archimedes\' principle.' },
    intro: {
      zh: '壓強把"力"攤到"面積"上，浮力則是液體對物體上下表面的壓強差。把這兩個式子推一遍，浮沉條件就不用背了。',
      en: 'Pressure spreads force over area; buoyancy is the difference in pressure between the bottom and top of a submerged body. Derive the two and the floating condition needs no memorising.'
    },
    sims: [{ type: 'buoyancy', label: { zh: '浮力與浮沉', en: 'Buoyancy and floating' } }],
    concepts: [
      {
        t: { zh: '固體壓強', en: 'Pressure in solids' },
        b: {
          zh: '物體單位面積上受到的壓力叫壓強：p = F/S，單位帕斯卡（Pa），1 Pa = 1 N/m²。壓力一定時，受力面積越小壓強越大 —— 刀要磨薄、圖釘尖要細，都是這個道理。',
          en: 'Pressure is force per unit area, p = F/S, in pascals (1 Pa = 1 N/m²). For a given force, a smaller area gives a larger pressure — that is why blades are sharpened and pins are pointed.'
        },
        f: '<i>p</i> = <i>F</i> / <i>S</i>'
      },
      {
        t: { zh: '液體壓強', en: 'Pressure in a liquid' },
        b: {
          zh: '液體內部某處的壓強只與液體的密度和該處的深度有關：p = ρgh。深度 h 是指從液面豎直向下的距離。同一深度，各方向壓強相等；壓強與容器的形狀、液體的總質量無關。連通器裏裝同種液體且靜止時，液面總是相平的。',
          en: 'Pressure at a depth h depends only on density and depth: p = ρgh, where h is measured vertically from the free surface. At a given depth pressure is the same in every direction, independent of the container\'s shape or the total mass of liquid. In connected vessels of one liquid at rest, the surfaces are level.'
        },
        f: '<i>p</i> = <i>ρgh</i>'
      },
      {
        t: { zh: '大氣壓強', en: 'Atmospheric pressure' },
        b: {
          zh: '大氣對浸在其中的物體產生的壓強叫大氣壓強。托里拆利實驗用水銀柱測出：1 標準大氣壓 ≈ 1.013×10⁵ Pa，相當於 760 mm 高的水銀柱。大氣壓隨海拔升高而減小，離地面越高空氣越稀薄。',
          en: 'The atmosphere presses on everything in it. Torricelli\'s mercury column gives 1 atm ≈ 1.013×10⁵ Pa, the weight of 760 mm of mercury. Pressure falls with altitude as the air thins.'
        },
        f: '1 atm ≈ 1.013×10<sup>5</sup> Pa ≈ 760 mmHg'
      },
      {
        t: { zh: '浮力與阿基米德原理', en: 'Buoyancy and Archimedes' },
        b: {
          zh: '浸在液體中的物體受到向上的浮力，浮力大小等於它排開的液體所受的重力：F浮 = ρ液gV排。浮力產生的原因是物體上下表面受到的液體壓強不同，下表面受到的壓力大於上表面。物體浸沒後繼續下沉，V排不變，浮力也不變，但壓強仍在增大。',
          en: 'A submerged body feels an upward buoyant force equal to the weight of the fluid it displaces: F = ρgV. The cause is the pressure difference between lower and upper surfaces. Once fully submerged, sinking deeper changes neither displaced volume nor buoyancy — only the pressure rises.'
        },
        f: '<i>F</i><sub>浮</sub> = <i>ρ</i><sub>液</sub><i>gV</i><sub>排</sub>'
      },
      {
        t: { zh: '物體的浮沉條件', en: 'Floating and sinking' },
        b: {
          zh: '浸沒時比較浮力與重力：F浮 > G 上浮，最終漂浮，此時 F浮 = G；F浮 = G 懸浮；F浮 < G 下沉。也可以比較密度：ρ物 < ρ液 上浮，ρ物 = ρ液 懸浮，ρ物 > ρ液 下沉。潛水艇靠改變自身重力實現上浮下潛，氣球靠改變體積（因而改變浮力）升空。',
          en: 'Compare buoyancy with weight when fully submerged: greater floats up (ending in floating, where F = G), equal is neutrally buoyant, less sinks. Equivalently compare densities. Submarines change their weight; balloons change their volume, hence the displaced air.'
        }
      }
    ],
    terms: [
      ['壓強', 'pressure', 'p'], ['帕斯卡', 'pascal', 'Pa'], ['深度', 'depth', 'h'],
      ['大氣壓', 'atmospheric pressure', 'p₀'], ['浮力', 'buoyancy', 'F浮'],
      ['排開液體的體積', 'displaced volume', 'V排'], ['連通器', 'connected vessels', '—']
    ],
    practice: [
      {
        q: { zh: '同一物體分別浸沒在水和酒精中，受到的浮力：', en: 'The same object is fully submerged in water and then in alcohol. Buoyancy is:' },
        o: [{ zh: '在水中大', en: 'greater in water' }, { zh: '在酒精中大', en: 'greater in alcohol' }, { zh: '一樣大', en: 'the same' }, { zh: '無法比較', en: 'cannot compare' }],
        a: 0,
        e: { zh: 'V排 相同，水的密度大於酒精，由 F浮 = ρ液gV排 得水中浮力更大。', en: 'Same displaced volume, higher density → greater buoyancy in water.' }
      },
      {
        q: { zh: '潛水艇從水面下潛到更深處，它受到的浮力：', en: 'A submarine dives deeper. Its buoyancy:' },
        o: [{ zh: '變大', en: 'increases' }, { zh: '變小', en: 'decreases' }, { zh: '不變', en: 'stays the same' }, { zh: '先變大後不變', en: 'increases then stays' }],
        a: 2,
        e: { zh: '浸沒後 V排 不變，浮力不變；但深度增加，壓強增大。', en: 'Fully submerged, displaced volume is fixed, so buoyancy is constant — only pressure grows.' }
      },
      {
        q: { zh: '把圖釘尖做得很細，目的是：', en: 'A drawing pin has a very sharp point in order to:' },
        o: [{ zh: '增大壓力', en: 'increase the force' }, { zh: '減小受力面積，增大壓強', en: 'reduce area and increase pressure' }, { zh: '增大受力面積，減小壓強', en: 'increase area and reduce pressure' }, { zh: '減小摩擦', en: 'reduce friction' }],
        a: 1,
        e: { zh: '壓力一定時，S 越小 p 越大，圖釘才容易壓入牆面。', en: 'With force fixed, a smaller area gives higher pressure, so it goes in easily.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-energy', track: 'junior', no: '09', tag: '核心',
    kicker: { zh: '力學 · 能量', en: 'Mechanics · energy' },
    title: { zh: '功和機械能', en: 'Work, Energy and Simple Machines' },
    summary: { zh: '功、功率、動能勢能，以及槓桿和滑輪。', en: 'Work, power, energy — plus levers and pulleys.' },
    intro: {
      zh: '功是力在位移上的積累，能量是做功的本領。槓桿和滑輪看似新知識，其實只是"功的原理"的兩種應用：省力必費距離，任何機械都不省功。',
      en: 'Work is force accumulated along a displacement; energy is the capacity to do work. Levers and pulleys look like new material, but they are just consequences of the work principle: whatever you gain in force you pay back in distance.'
    },
    sims: [
      { type: 'coaster', label: { zh: '過山車與能量', en: 'Coaster energy' } },
      { type: 'lever', label: { zh: '槓桿平衡', en: 'Lever balance' } }
    ],
    concepts: [
      {
        t: { zh: '功', en: 'Work' },
        b: {
          zh: '功等於力與物體在力的方向上通過的距離的乘積：W = Fs，單位焦耳（J）。力與位移方向垂直時不做功：提着水桶水平走，人對水桶不做功。有力沒有距離、有距離沒有力，也都不做功。',
          en: 'Work is force times displacement along the force: W = Fs, in joules. A force perpendicular to the motion does no work — carrying a bucket horizontally does nothing for it. No displacement, or no force, also means no work.'
        },
        f: '<i>W</i> = <i>Fs</i>　　<i>W</i> = <i>Fl</i>cos<i>θ</i>（高中）'
      },
      {
        t: { zh: '功率', en: 'Power' },
        b: {
          zh: '功率是做功的快慢：P = W/t，單位瓦特（W），1 W = 1 J/s。功率大表示做功快，不表示做功多。機器銘牌上的功率是額定功率，實際功率可以小於它。',
          en: 'Power is the rate of doing work, P = W/t, in watts (1 W = 1 J/s). High power means fast, not more. The figure on a nameplate is the rated power; actual power can be lower.'
        },
        f: '<i>P</i> = <i>W</i>/<i>t</i> = <i>Fv</i>'
      },
      {
        t: { zh: '動能和勢能', en: 'Kinetic and potential energy' },
        b: {
          zh: '物體由於運動而具有的能叫動能，Eк = ½mv²，質量越大、速度越大，動能越大。物體由於被舉高而具有的能叫重力勢能，Ep = mgh，與質量和高度有關（高度要有參照面）。發生彈性形變的物體具有彈性勢能。',
          en: 'Kinetic energy comes from motion, E = ½mv² — larger with mass and, importantly, with the square of speed. Gravitational potential energy comes from height, E = mgh, measured from a chosen reference level. A stretched or compressed spring stores elastic potential energy.'
        },
        f: '<i>E</i><sub>k</sub> = ½<i>mv</i><sup>2</sup>　　<i>E</i><sub>p</sub> = <i>mgh</i>'
      },
      {
        t: { zh: '機械能及其轉化', en: 'Mechanical energy and its transformations' },
        b: {
          zh: '動能和勢能統稱機械能。只有重力和彈力做功時，機械能守恆：過山車從高處滑下，勢能轉化為動能，高度越低速度越大。實際中總有摩擦，一部分機械能轉化為內能，但能量的總量始終守恆。',
          en: 'Kinetic plus potential energy is mechanical energy. When only gravity and spring forces do work, it is conserved: a coaster trades height for speed. In reality friction turns some of it into internal energy — the total is still conserved.'
        },
        note: { zh: '"機械能守恆"是有條件的；"能量守恆"才是普遍規律。', en: 'Conservation of mechanical energy is conditional; conservation of energy is universal.' }
      },
      {
        t: { zh: '槓桿', en: 'Levers' },
        b: {
          zh: '槓桿繞着固定點（支點）轉動。從支點到力的作用線的距離叫力臂，不是支點到作用點的距離。槓桿平衡條件：F₁L₁ = F₂L₂。L₁ > L₂ 時省力但費距離（撬棍）；L₁ < L₂ 時費力但省距離（鑷子）。',
          en: 'A lever turns about a fulcrum. The moment arm is the perpendicular distance from the fulcrum to the line of action — not to the point of application. Balance requires F₁L₁ = F₂L₂. A longer effort arm saves force but costs distance (a crowbar); a shorter one saves distance but costs force (tweezers).'
        },
        f: '<i>F</i><sub>1</sub><i>L</i><sub>1</sub> = <i>F</i><sub>2</sub><i>L</i><sub>2</sub>'
      },
      {
        t: { zh: '滑輪', en: 'Pulleys' },
        b: {
          zh: '定滑輪實質是等臂槓桿，只能改變力的方向，不省力。動滑輪實質是動力臂為阻力臂兩倍的槓桿，省一半力，但繩子要移動兩倍距離。滑輪組既能省力又能改變方向，若承擔物重的繩子有 n 段，則 F = G/n（不計摩擦和滑輪重）。',
          en: 'A fixed pulley is an equal-arm lever: it redirects force without saving any. A movable pulley has an effort arm twice the load arm: it halves the force but doubles the rope pulled. A block and tackle does both; with n supporting rope segments, F = G/n (ignoring friction and pulley weight).'
        },
        f: '<i>F</i> = <i>G</i>/<i>n</i>　　<i>s</i> = <i>nh</i>'
      }
    ],
    terms: [
      ['功', 'work', 'W'], ['功率', 'power', 'P'], ['焦耳', 'joule', 'J'],
      ['動能', 'kinetic energy', 'Ek'], ['重力勢能', 'gravitational potential energy', 'Ep'],
      ['機械能', 'mechanical energy', 'E'], ['槓桿', 'lever', '—'],
      ['力臂', 'moment arm', 'L'], ['滑輪組', 'block and tackle', '—']
    ],
    practice: [
      {
        q: { zh: '提着水桶在水平路面上勻速行走，人對水桶做的功為：', en: 'Carrying a bucket at constant speed along a level road, the work you do on it is:' },
        o: [{ zh: '零', en: 'zero' }, { zh: '等於重力做的功', en: 'equal to gravity\'s work' }, { zh: '等於摩擦力做的功', en: 'equal to friction\'s work' }, { zh: '無法判斷', en: 'undetermined' }],
        a: 0,
        e: { zh: '提力豎直向上，位移水平，二者垂直，不做功。', en: 'The lifting force is vertical, the displacement horizontal — perpendicular, so no work.' }
      },
      {
        q: { zh: '兩台機器做功之比為 2∶1，所用時間之比為 1∶2，則功率之比為：', en: 'Work ratio 2:1, time ratio 1:2. The power ratio is:' },
        o: [{ zh: '1∶1', en: '1:1' }, { zh: '2∶1', en: '2:1' }, { zh: '4∶1', en: '4:1' }, { zh: '1∶4', en: '1:4' }],
        a: 2,
        e: { zh: 'P = W/t，功率比 = (2/1)/(1/2) = 4∶1。', en: 'P = W/t, so the ratio is (2/1) ÷ (1/2) = 4:1.' }
      },
      {
        q: { zh: '用撬棍撬石頭時，為了更省力，應該：', en: 'To lift a rock with a crowbar more easily, you should:' },
        o: [{ zh: '減小動力臂', en: 'shorten the effort arm' }, { zh: '增大動力臂', en: 'lengthen the effort arm' }, { zh: '增大阻力', en: 'increase the load' }, { zh: '把支點移近手', en: 'move the fulcrum toward your hand' }],
        a: 1,
        e: { zh: 'F₁ = F₂L₂/L₁，增大 L₁ 可減小所需的動力。', en: 'F₁ = F₂L₂/L₁, so a longer effort arm needs less force.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-circuit', track: 'junior', no: '10', tag: '核心',
    kicker: { zh: '電學', en: 'Electricity' },
    title: { zh: '電流與電路', en: 'Current and Circuits' },
    summary: { zh: '電流、電壓、電阻、歐姆定律與電功率。', en: 'Current, voltage, resistance, Ohm\'s law and power.' },
    intro: {
      zh: '電路裏只有三個基本量：電流 I、電壓 U、電阻 R，它們由一個式子連起來：I = U/R。串並聯的所有規律，都是這個式子在具體連接方式下的結果。',
      en: 'A circuit has three basic quantities — current, voltage, resistance — tied by one relation: I = U/R. Every series and parallel rule is that relation applied to a particular wiring.'
    },
    sims: [{ type: 'circuit', label: { zh: '串聯與並聯', en: 'Series and parallel' } }],
    concepts: [
      {
        t: { zh: '電荷與電流', en: 'Charge and current' },
        b: {
          zh: '同種電荷相互排斥，異種電荷相互吸引。電荷的定向移動形成電流，規定正電荷定向移動的方向為電流方向。電流大小等於每秒通過導體橫截面的電荷量：I = Q/t，單位安培（A）。串聯電路中電流處處相等。',
          en: 'Like charges repel, unlike attract. Directed charge motion is a current, conventionally in the direction positive charge would move. Current is charge per second, I = Q/t, in amperes. In a series circuit the current is the same everywhere.'
        },
        f: '<i>I</i> = <i>Q</i>/<i>t</i>'
      },
      {
        t: { zh: '電壓與電阻', en: 'Voltage and resistance' },
        b: {
          zh: '電壓是使電路中形成電流的原因，單位伏特（V）。家庭電路電壓 220 V，人體安全電壓不高於 36 V。電阻表示導體對電流的阻礙作用，單位歐姆（Ω），大小由材料、長度、橫截面積和溫度決定：長度越長、橫截面越小，電阻越大。',
          en: 'Voltage drives current, in volts. Mains is 220 V in China; safe body voltage is at most 36 V. Resistance is the opposition to current, in ohms, set by material, length, cross-section and temperature: longer and thinner means more resistance.'
        },
        f: '<i>R</i> = <i>ρL</i>/<i>S</i>'
      },
      {
        t: { zh: '歐姆定律', en: 'Ohm\'s law' },
        b: {
          zh: '導體中的電流跟導體兩端的電壓成正比，跟導體的電阻成反比：I = U/R。使用時要對應同一段導體、同一時刻。串聯總電阻 R = R₁ + R₂，電流相等、電壓按電阻分配；並聯總電阻的倒數等於各支路倒數之和，電壓相等、電流按電阻反比分配。',
          en: 'Current through a conductor is proportional to the voltage across it and inversely proportional to its resistance. Apply it to one conductor at one time. Series: R = R₁ + R₂, same current, voltage divides in proportion to resistance. Parallel: reciprocals add, same voltage, current divides inversely with resistance.'
        },
        f: '<i>I</i> = <i>U</i>/<i>R</i>　　<i>R</i><sub>串</sub> = <i>R</i><sub>1</sub>+<i>R</i><sub>2</sub>　　1/<i>R</i><sub>並</sub> = 1/<i>R</i><sub>1</sub>+1/<i>R</i><sub>2</sub>'
      },
      {
        t: { zh: '電功率與電熱', en: 'Electric power and heating' },
        b: {
          zh: '電功率表示消耗電能的快慢：P = UI，單位瓦特（W）。純電阻電路中還可寫成 P = I²R = U²/R。電功 W = UIt，家庭用電 1 度 = 1 kW·h = 3.6×10⁶ J。焦耳定律給出電流產生的熱量 Q = I²Rt。',
          en: 'Power is the rate of using electrical energy, P = UI. For pure resistors this becomes P = I²R = U²/R. Energy used is W = UIt; one kilowatt-hour is 3.6×10⁶ J. Joule\'s law gives the heat produced: Q = I²Rt.'
        },
        f: '<i>P</i> = <i>UI</i> = <i>I</i><sup>2</sup><i>R</i> = <i>U</i><sup>2</sup>/<i>R</i>　　<i>Q</i> = <i>I</i><sup>2</sup><i>Rt</i>'
      },
      {
        t: { zh: '家庭電路與安全用電', en: 'Household circuits and safety' },
        b: {
          zh: '家庭電路由進户線（火線與零線）、電能表、總開關、保險裝置、用電器和插座組成，各用電器並聯。火線與零線之間電壓 220 V，火線與地之間也是 220 V。觸電急救的第一步是切斷電源，不能直接用手拉人。',
          en: 'A household circuit runs from the service wires through a meter, main switch and protective device to appliances wired in parallel. The live-to-neutral and live-to-earth voltages are both 220 V. In an electric shock, cut the power first — never grab the victim.'
        },
        note: { zh: '開關要接在火線上，這樣斷開時用電器不帶電。', en: 'Switches belong on the live wire, so an open switch leaves the appliance dead.' }
      }
    ],
    terms: [
      ['電流', 'current', 'I'], ['電壓', 'voltage', 'U'], ['電阻', 'resistance', 'R'],
      ['歐姆定律', 'Ohm\'s law', '—'], ['電功率', 'electric power', 'P'],
      ['焦耳定律', 'Joule\'s law', '—'], ['串聯', 'series', '—'], ['並聯', 'parallel', '—']
    ],
    practice: [
      {
        q: { zh: '電源電壓 6 V，兩個 3 Ω 的電阻串聯，電路中的電流是：', en: 'A 6 V supply drives two 3 Ω resistors in series. The current is:' },
        o: [{ zh: '0.5 A', en: '0.5 A' }, { zh: '1 A', en: '1 A' }, { zh: '2 A', en: '2 A' }, { zh: '3 A', en: '3 A' }],
        a: 1,
        e: { zh: 'R總 = 3 + 3 = 6 Ω，I = U/R = 1 A。', en: 'R = 6 Ω, so I = 1 A.' }
      },
      {
        q: { zh: '並聯電路中，各支路兩端的電壓：', en: 'In a parallel circuit, the voltage across each branch is:' },
        o: [{ zh: '相等', en: 'equal' }, { zh: '與電阻成正比', en: 'proportional to resistance' }, { zh: '與電阻成反比', en: 'inversely proportional to resistance' }, { zh: '之和等於總電壓', en: 'summed to the total' }],
        a: 0,
        e: { zh: '並聯各支路兩端是同一對節點，電壓必然相等；電流才按電阻反比分配。', en: 'All branches share the same two nodes, so the voltage is identical; it is the current that divides.' }
      },
      {
        q: { zh: '兩個電阻串聯後總電阻：', en: 'Two resistors in series have a total resistance that is:' },
        o: [{ zh: '比任一個都大', en: 'larger than either' }, { zh: '比任一個都小', en: 'smaller than either' }, { zh: '等於兩者之差', en: 'their difference' }, { zh: '等於兩者之積', en: 'their product' }],
        a: 0,
        e: { zh: '串聯相當於加長了導體，R = R₁ + R₂，所以比任一個都大。', en: 'Series lengthens the path: R = R₁ + R₂, larger than either.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-magnet', track: 'junior', no: '11', tag: '核心',
    kicker: { zh: '電與磁', en: 'Electricity and magnetism' },
    title: { zh: '電與磁', en: 'Electromagnetism' },
    summary: { zh: '電流生磁、磁場對電流的作用、電磁感應。', en: 'Current makes magnetism, magnetism moves current, and motion makes current.' },
    intro: {
      zh: '電與磁是一枚硬幣的兩面。奧斯特發現電流周圍有磁場，法拉第反過來發現變化的磁場能產生電流 —— 這兩步直接催生了電動機和發電機。',
      en: 'Electricity and magnetism are two faces of one coin. Oersted found a magnetic field around a current; Faraday found that a changing field drives a current. Those two steps gave us the motor and the generator.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'wire' }, label: { zh: '直線電流的磁場', en: 'Field around a wire' } },
      { type: 'field', cfg: { mode: 'magnet' }, label: { zh: '條形磁體的磁感線', en: 'Bar magnet field lines' } }
    ],
    concepts: [
      {
        t: { zh: '磁現象與磁場', en: 'Magnets and magnetic fields' },
        b: {
          zh: '磁體兩端磁性最強，叫磁極（N 極和 S 極），同名磁極相斥、異名磁極相吸。磁體周圍存在磁場，用小磁針可以感知它的方向。磁感線從 N 極出發回到 S 極（磁體外部），磁感線越密的地方磁場越強。',
          en: 'Magnetism is strongest at the poles. Like poles repel, unlike attract. A magnet is surrounded by a field, probed by a compass needle. Outside the magnet, field lines run from N to S; where they crowd together the field is stronger.'
        }
      },
      {
        t: { zh: '電流的磁效應', en: 'The magnetic effect of current' },
        b: {
          zh: '奧斯特實驗表明：通電導線周圍存在磁場，這就是電流的磁效應。通電螺線管的磁場與條形磁體相似，極性用安培定則判斷：右手握住螺線管，四指指向電流方向，拇指所指的一端就是 N 極。電磁鐵的磁性強弱由電流大小和線圈匝數決定。',
          en: 'Oersted showed that a current-carrying wire has a magnetic field. A solenoid behaves like a bar magnet; its polarity follows the right-hand grip rule — fingers along the current, thumb points to N. An electromagnet\'s strength grows with current and turns.'
        },
        note: { zh: '電磁鐵的優點：磁性有無、強弱、極性都可以控制。', en: 'An electromagnet can be switched, tuned and reversed — that is its advantage over a permanent magnet.' }
      },
      {
        t: { zh: '磁場對電流的作用', en: 'Force on a current in a field' },
        b: {
          zh: '通電導體在磁場中會受到力的作用，力的方向與電流方向和磁場方向都有關，可用左手定則判斷。電動機就是利用這個原理工作的：通電線圈在磁場中受力轉動，把電能轉化為機械能。換向器的作用是在線圈轉過平衡位置時改變電流方向，使線圈持續轉動。',
          en: 'A current-carrying conductor in a magnetic field feels a force whose direction depends on both the current and the field — the left-hand rule. A motor uses this: a coil turns and converts electrical energy into mechanical energy. A commutator reverses the current each half turn so rotation continues.'
        }
      },
      {
        t: { zh: '電磁感應', en: 'Electromagnetic induction' },
        b: {
          zh: '閉合電路的一部分導體在磁場中做切割磁感線運動時，導體中就會產生電流，這種現象叫電磁感應，產生的電流叫感應電流。感應電流的方向與導體運動方向和磁場方向有關。發電機就是利用電磁感應工作的，把機械能轉化為電能。',
          en: 'When part of a closed circuit cuts field lines, a current appears — electromagnetic induction. Its direction depends on the motion and the field. Generators use it to turn mechanical energy into electrical energy.'
        },
        note: { zh: '電動機：電 → 機；發電機：機 → 電。原理相反，別混。', en: 'Motor: electricity → motion. Generator: motion → electricity. Opposite directions — keep them straight.' }
      }
    ],
    terms: [
      ['磁極', 'magnetic pole', 'N / S'], ['磁場', 'magnetic field', 'B'],
      ['磁感線', 'field line', '—'], ['電磁鐵', 'electromagnet', '—'],
      ['安培定則', 'right-hand grip rule', '—'], ['電動機', 'motor', '—'],
      ['電磁感應', 'electromagnetic induction', '—'], ['發電機', 'generator', '—']
    ],
    practice: [
      {
        q: { zh: '奧斯特實驗說明：', en: 'Oersted\'s experiment shows that:' },
        o: [{ zh: '磁體周圍有磁場', en: 'a magnet has a field' }, { zh: '通電導線周圍有磁場', en: 'a current has a magnetic field' }, { zh: '磁場能產生電流', en: 'a field produces a current' }, { zh: '電流在磁場中受力', en: 'a current feels a force in a field' }],
        a: 1,
        e: { zh: '小磁針在通電導線旁發生偏轉，說明電流周圍存在磁場。', en: 'A compass needle deflects near a current-carrying wire — the current creates a field.' }
      },
      {
        q: { zh: '發電機的工作原理是：', en: 'A generator works by:' },
        o: [{ zh: '電流的磁效應', en: 'the magnetic effect of current' }, { zh: '磁場對電流的作用', en: 'force on a current in a field' }, { zh: '電磁感應', en: 'electromagnetic induction' }, { zh: '焦耳定律', en: 'Joule\'s law' }],
        a: 2,
        e: { zh: '線圈在磁場中轉動切割磁感線，產生感應電流，把機械能轉化為電能。', en: 'A coil rotating in a field cuts field lines, generating current from mechanical energy.' }
      },
      {
        q: { zh: '要增強電磁鐵的磁性，可行的做法是：', en: 'To strengthen an electromagnet you can:' },
        o: [{ zh: '減小電流', en: 'reduce the current' }, { zh: '增加線圈匝數', en: 'add more turns' }, { zh: '換用更細的導線', en: 'use thinner wire' }, { zh: '把鐵芯取出', en: 'remove the iron core' }],
        a: 1,
        e: { zh: '磁性隨電流增大、匝數增多而增強；插入鐵芯也會大大增強。', en: 'More current or more turns strengthens it, and an iron core helps a lot.' }
      }
    ]
  });

  // keep declaration order deterministic (junior first, then senior)
  P.juniorCount = P.chapters.length;
})();
