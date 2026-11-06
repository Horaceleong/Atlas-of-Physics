/* content-junior.js — 初中物理 · Junior secondary physics (China curriculum, bilingual) */
(function () {
  const P = window.PHYS;
  P.chapters = P.chapters || [];

  P.chapters.push({
    id: 'j-motion', track: 'junior', no: '01', tag: '核心',
    kicker: { zh: '力学 · 入门', en: 'Mechanics · first steps' },
    title: { zh: '测量与机械运动', en: 'Measurement and Motion' },
    summary: { zh: '长度、时间、速度：用数字描述运动。', en: 'Length, time and speed: describing motion with numbers.' },
    intro: {
      zh: '物理学从测量开始。要说清一个物体运动得多快，必须先约定单位、选好参照物，再找到路程与时间的比值。本章把这三件事讲透。',
      en: 'Physics begins with measurement. To say how fast something moves, you must first agree on units, choose a reference, then take the ratio of distance to time. This chapter pins down all three.'
    },
    sims: [{ type: 'motion', label: { zh: '小车与 s–t 图', en: 'Cart and s–t graph' } }],
    concepts: [
      {
        t: { zh: '长度与时间的测量', en: 'Measuring length and time' },
        b: {
          zh: '国际单位制中，长度的单位是米（m），时间的单位是秒（s）。用刻度尺测长度时，读数要估读到分度值的下一位，记录结果必须同时写出数字和单位。多次测量取平均值可以减小误差，但误差只能减小、不能消除。',
          en: 'In SI, length is measured in metres and time in seconds. When reading a ruler, estimate one extra digit beyond the smallest division, and always record a number with its unit. Averaging repeated measurements reduces random error — but error can be reduced, never removed.'
        },
        f: '1 m = 100 cm = 1000 mm　　<i>v</i> = <i>s</i> / <i>t</i>',
        note: { zh: '错误可以避免，误差不能消除。二者不是一回事。', en: 'Mistakes can be avoided; error cannot. They are not the same thing.' }
      },
      {
        t: { zh: '速度：运动的快慢', en: 'Speed: how fast motion is' },
        b: {
          zh: '速度等于路程与时间之比 <i>v</i> = <i>s</i>/<i>t</i>，表示物体运动的快慢。国际单位是 m/s，常用单位 km/h，两者换算关系是 1 m/s = 3.6 km/h。匀速直线运动中速度的大小和方向都不变，s–t 图像是一条过原点的直线。',
          en: 'Speed is distance divided by time, <i>v</i> = <i>s</i>/<i>t</i>. The SI unit is m/s; km/h is common, and 1 m/s = 3.6 km/h. In uniform straight-line motion both the magnitude and direction stay constant, so the s–t graph is a straight line through the origin.'
        },
        f: '<i>v</i> = <i>s</i>/<i>t</i>　　1 m/s = 3.6 km/h'
      },
      {
        t: { zh: '运动的相对性', en: 'Motion is relative' },
        b: {
          zh: '判断物体是运动还是静止，必须先选定参照物。同一物体选择不同参照物，结论可能完全相反：坐在行驶车厢里的人，以车厢为参照物是静止的，以地面为参照物却在高速运动。',
          en: 'To call something moving or at rest, you must first choose a reference object. The same body can give opposite answers: a passenger is at rest relative to the carriage and racing along relative to the ground.'
        },
        note: { zh: '说"某物体运动"时，一定要交代"相对谁"。', en: 'Never say "it moves" without saying "relative to what".' }
      },
      {
        t: { zh: '变速运动与平均速度', en: 'Non-uniform motion and average speed' },
        b: {
          zh: '实际运动大多是变速的，这时用平均速度描述整体的快慢：<i>v̄</i> = 总路程 ÷ 总时间。平均速度不是各段速度的算术平均值。前半程 4 m/s、后半程 6 m/s，平均速度是 4.8 m/s，而不是 5 m/s —— 因为慢的那一段花的时间更长。',
          en: 'Real motion is usually non-uniform, so we describe the trip as a whole with average speed: total distance over total time. It is not the arithmetic mean of the two speeds. Half the distance at 4 m/s and half at 6 m/s gives 4.8 m/s, not 5 — the slow half takes longer.'
        },
        f: '<i>v̄</i> = <i>s</i><sub>总</sub> / <i>t</i><sub>总</sub>',
        note: { zh: '只有两段路程相等时，"速度的平均值"才等于平均速度。', en: 'The mean of the speeds equals the average speed only when the two distances are equal.' }
      }
    ],
    terms: [
      ['长度', 'length', 'l'], ['时间', 'time', 't'], ['路程', 'distance', 's'],
      ['速度', 'speed / velocity', 'v'], ['参照物', 'reference object', '—'],
      ['平均速度', 'average speed', 'v̄'], ['误差', 'error', '—'], ['刻度尺', 'ruler', '—']
    ],
    practice: [
      {
        q: { zh: '某同学用刻度尺测得物体长度为 2.35 cm，这把刻度尺的分度值是：', en: 'A student measures 2.35 cm with a ruler. What is the smallest division of that ruler?' },
        o: [{ zh: '1 cm', en: '1 cm' }, { zh: '1 mm', en: '1 mm' }, { zh: '0.1 mm', en: '0.1 mm' }, { zh: '2 mm', en: '2 mm' }],
        a: 1,
        e: {
          zh: '2.35 cm 的最后一位"5"是估读位，倒数第二位"3"对应 0.1 cm，即分度值为 1 mm。',
          en: 'The final 5 is the estimated digit, so the 3 sits on the smallest division: 0.1 cm = 1 mm.'
        }
      },
      {
        q: { zh: '汽车以 72 km/h 行驶 30 min，通过的路程是：', en: 'A car travels at 72 km/h for 30 min. How far does it go?' },
        o: [{ zh: '18 km', en: '18 km' }, { zh: '36 km', en: '36 km' }, { zh: '72 km', en: '72 km' }, { zh: '144 km', en: '144 km' }],
        a: 1,
        e: {
          zh: '72 km/h = 20 m/s，30 min = 1800 s，s = vt = 20 × 1800 = 36000 m = 36 km。',
          en: '72 km/h = 20 m/s; 30 min = 1800 s; s = vt = 36 000 m = 36 km.'
        }
      },
      {
        q: { zh: '某人前半程速度 4 m/s，后半程速度 6 m/s，全程平均速度是：', en: 'Half the distance at 4 m/s, half at 6 m/s. The average speed is:' },
        o: [{ zh: '4.8 m/s', en: '4.8 m/s' }, { zh: '5 m/s', en: '5 m/s' }, { zh: '5.2 m/s', en: '5.2 m/s' }, { zh: '10 m/s', en: '10 m/s' }],
        a: 0,
        e: {
          zh: '设每半程为 s，总时间 t = s/4 + s/6，平均速度 = 2s / (s/4 + s/6) = 4.8 m/s。',
          en: 'Let each half be s. Total time = s/4 + s/6, so v̄ = 2s / (s/4 + s/6) = 4.8 m/s.'
        }
      }
    ]
  });

  P.chapters.push({
    id: 'j-sound', track: 'junior', no: '02', tag: '核心',
    kicker: { zh: '声学', en: 'Sound' },
    title: { zh: '声现象', en: 'Sound' },
    summary: { zh: '声音怎样产生、怎样传播，又怎样被描述。', en: 'How sound is made, how it travels, and how we describe it.' },
    intro: {
      zh: '一切声音都来自振动，而振动必须通过介质才能传出去。音调、响度、音色这三个词，对应三个完全不同的物理量。',
      en: 'Every sound comes from vibration, and vibration needs a medium to travel through. Pitch, loudness and timbre name three completely different physical quantities.'
    },
    sims: [{ type: 'wave', cfg: { mode: 'long' }, label: { zh: '声波：疏密相间', en: 'Sound as compression waves' } }],
    concepts: [
      {
        t: { zh: '声音的产生与传播', en: 'How sound is produced and transmitted' },
        b: {
          zh: '声是由物体的振动产生的，振动停止，发声也停止。声音的传播需要介质：固体、液体、气体都能传声，真空不能传声。15 ℃ 的空气中声速约为 340 m/s，一般固体中最快、气体中最慢。',
          en: 'Sound is produced by vibration; stop the vibration and the sound stops. It needs a medium — solids, liquids and gases all carry sound, vacuum does not. In air at 15 °C the speed is about 340 m/s, fastest in solids and slowest in gases.'
        },
        f: '<i>v</i><sub>声</sub> ≈ 340 m/s（15 ℃ 空气）　　<i>s</i> = ½<i>v t</i>（回声测距）',
        note: { zh: '宇航员在太空不能直接对话 —— 不是没有空气"呼吸"，而是没有介质传声。', en: 'Astronauts cannot talk directly in space — not for lack of air to breathe, but for lack of a medium to carry sound.' }
      },
      {
        t: { zh: '音调、响度、音色', en: 'Pitch, loudness and timbre' },
        b: {
          zh: '音调指声音的高低，由振动频率决定，频率越高音调越高，单位是赫兹（Hz）。响度指声音的强弱，由振幅和到声源的距离决定。音色由发声体的材料和结构决定，它让我们能分辨是小提琴还是钢琴。',
          en: 'Pitch is how high a note sounds, set by frequency (in hertz). Loudness is how strong it sounds, set by amplitude and distance from the source. Timbre is the "colour" of the sound, set by the material and shape of the source — it is why a violin and a piano playing the same note still sound different.'
        },
        f: '<i>f</i> = 1/<i>T</i>（频率与周期互为倒数）'
      },
      {
        t: { zh: '超声波与次声波', en: 'Ultrasound and infrasound' },
        b: {
          zh: '人的听觉范围大约是 20 Hz 到 20000 Hz。高于 20000 Hz 的声波叫超声波，方向性好、穿透力强，可用于 B 超、声呐、清洗和碎石。低于 20 Hz 的叫次声波，频率低、传播远，地震、台风、核爆都会产生次声波。',
          en: 'Human hearing spans roughly 20 Hz to 20 kHz. Above 20 kHz is ultrasound: directional and penetrating, used in medical imaging, sonar and cleaning. Below 20 Hz is infrasound, which travels very far and is produced by earthquakes, storms and explosions.'
        }
      },
      {
        t: { zh: '噪声与防治', en: 'Noise and its control' },
        b: {
          zh: '声音的强弱用分贝（dB）表示，人刚能听到的声音约为 0 dB，长期处于 90 dB 以上的环境会损伤听力。控制噪声有三条途径：在声源处减弱（消声器）、在传播过程中减弱（隔音墙、绿化带）、在人耳处减弱（耳塞）。',
          en: 'Loudness is measured in decibels. Healthy hearing is damaged by prolonged exposure above about 90 dB. Noise control works at three places: at the source (silencers), along the path (barriers, planting), and at the ear (earplugs).'
        }
      }
    ],
    terms: [
      ['振动', 'vibration', '—'], ['频率', 'frequency', 'f'], ['振幅', 'amplitude', 'A'],
      ['音调', 'pitch', '—'], ['响度', 'loudness', '—'], ['音色', 'timbre', '—'],
      ['分贝', 'decibel', 'dB'], ['超声波', 'ultrasound', '—'], ['次声波', 'infrasound', '—']
    ],
    practice: [
      {
        q: { zh: '宇航员在月球上不能直接对话，原因是：', en: 'Why can astronauts on the Moon not talk to each other directly?' },
        o: [{ zh: '月球上空气太稀薄', en: 'The air is too thin' }, { zh: '月球上没有介质传播声音', en: 'There is no medium to carry sound' }, { zh: '声音在月球上传播太慢', en: 'Sound travels too slowly there' }, { zh: '宇航服挡住了声波', en: 'The suits block sound' }],
        a: 1,
        e: { zh: '月球表面近乎真空，没有介质，声音无法传播。他们只能用无线电。', en: 'The lunar surface is essentially vacuum — no medium, no sound. Radio is the only option.' }
      },
      {
        q: { zh: '用大小不同的力敲同一面鼓，改变的是：', en: 'Beating the same drum with different force changes:' },
        o: [{ zh: '音调', en: 'pitch' }, { zh: '响度', en: 'loudness' }, { zh: '音色', en: 'timbre' }, { zh: '声速', en: 'speed of sound' }],
        a: 1,
        e: { zh: '用力不同改变的是振幅，振幅决定响度；鼓面松紧才改变音调。', en: 'Force changes amplitude, hence loudness. Tension of the drumhead would change pitch.' }
      },
      {
        q: { zh: '对着山崖喊一声，2 s 后听到回声，人到山崖的距离约为（v = 340 m/s）：', en: 'A shout returns as an echo after 2 s. Distance to the cliff (v = 340 m/s)?' },
        o: [{ zh: '170 m', en: '170 m' }, { zh: '340 m', en: '340 m' }, { zh: '680 m', en: '680 m' }, { zh: '1020 m', en: '1020 m' }],
        a: 1,
        e: { zh: '声音往返走了两倍距离，s = vt/2 = 340 × 2 / 2 = 340 m。', en: 'The sound covers the distance twice: s = vt/2 = 340 m.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-light', track: 'junior', no: '03', tag: '核心',
    kicker: { zh: '光学', en: 'Optics' },
    title: { zh: '光现象', en: 'Light: Reflection and Refraction' },
    summary: { zh: '直线传播、反射定律、平面镜与折射。', en: 'Straight-line travel, the law of reflection, mirrors and refraction.' },
    intro: {
      zh: '光在同一均匀介质中沿直线传播，遇到界面时一部分被反射、一部分被折射。反射与折射的规律，都可以用"法线"这一条辅助线说清楚。',
      en: 'Light travels in straight lines through a uniform medium. At an interface some of it reflects and some refracts; both rules are stated relative to one auxiliary line, the normal.'
    },
    sims: [
      { type: 'reflection', label: { zh: '反射定律', en: 'Law of reflection' } },
      { type: 'refraction', label: { zh: '折射与全反射', en: 'Refraction and TIR' } }
    ],
    concepts: [
      {
        t: { zh: '光的直线传播', en: 'Light travels in straight lines' },
        b: {
          zh: '光在同种均匀介质中沿直线传播，真空中光速 c = 3×10⁸ m/s，是自然界速度的上限。影子、日食月食、小孔成像，都是光沿直线传播的结果。小孔成像成的是倒立的实像，像的大小由物到孔和孔到屏的距离之比决定。',
          en: 'In a uniform medium light goes straight. In vacuum c = 3×10⁸ m/s, the cosmic speed limit. Shadows, eclipses and pinhole images all follow from this. A pinhole casts an inverted real image whose size is set by the ratio of the two distances.'
        },
        f: '<i>c</i> = 3×10<sup>8</sup> m/s'
      },
      {
        t: { zh: '光的反射定律', en: 'The law of reflection' },
        b: {
          zh: '反射光线、入射光线和法线在同一平面内；反射光线和入射光线分居法线两侧；反射角等于入射角。注意：入射角是入射光线与法线的夹角，不是与镜面的夹角。光路是可逆的。',
          en: 'Reflected ray, incident ray and normal lie in one plane; the two rays sit on opposite sides of the normal; the angle of reflection equals the angle of incidence. Careful: angles are measured from the normal, not from the mirror. Light paths are reversible.'
        },
        note: { zh: '入射光线与镜面成 30°，入射角是 60°，不是 30°。', en: 'A ray 30° above the mirror has an angle of incidence of 60°, not 30°.' }
      },
      {
        t: { zh: '镜面反射与漫反射', en: 'Specular and diffuse reflection' },
        b: {
          zh: '两种反射都遵守反射定律。镜面反射的反射面平整，反射光集中在一个方向，所以只在特定角度看到刺眼的光；漫反射的表面粗糙，反射光射向各个方向，正因如此我们才能从任何角度看到不发光的物体。',
          en: 'Both obey the same law. A smooth surface reflects light into one direction, so the glare appears only at certain angles. A rough surface scatters it everywhere — which is exactly why we can see non-luminous objects from any angle.'
        }
      },
      {
        t: { zh: '平面镜成像', en: 'Images in a plane mirror' },
        b: {
          zh: '平面镜所成的像与物体大小相等、到镜面的距离相等，像与物的连线垂直于镜面。这个像是虚像：它不是光线实际会聚形成的，不能用光屏承接。人靠近镜子时，像也靠近，但像的大小始终不变。',
          en: 'A plane mirror gives an image the same size as the object, the same distance behind the mirror, on the perpendicular through the object. It is virtual — no light actually converges there, so no screen can catch it. Walk closer and the image comes closer, but never grows.'
        }
      },
      {
        t: { zh: '光的折射', en: 'Refraction' },
        b: {
          zh: '光从空气斜射入水或玻璃时，折射光线向法线偏折，折射角小于入射角；反过来从水射向空气时，折射角大于入射角。垂直入射时传播方向不变。水中筷子看起来"折断"、池底看起来变浅、海市蜃楼，都是折射造成的。',
          en: 'Going from air into water or glass, the ray bends toward the normal, so the angle of refraction is smaller. Going the other way it bends away. At normal incidence nothing bends. A stick in water looks broken, a pool looks shallower, and mirages appear — all refraction.'
        },
        note: { zh: '看到的是"看起来的位置"，不是物体真实位置 —— 池水比看上去深。', en: 'You see where the object appears to be, not where it is: the pool is deeper than it looks.' }
      }
    ],
    terms: [
      ['光源', 'light source', '—'], ['入射角', 'angle of incidence', 'θ₁'],
      ['反射角', 'angle of reflection', 'θ₂'], ['法线', 'normal', '—'],
      ['实像', 'real image', '—'], ['虚像', 'virtual image', '—'],
      ['折射', 'refraction', '—'], ['光速', 'speed of light', 'c']
    ],
    practice: [
      {
        q: { zh: '入射光线与平面镜的夹角为 30°，则入射角为：', en: 'A ray makes 30° with the mirror. The angle of incidence is:' },
        o: [{ zh: '30°', en: '30°' }, { zh: '60°', en: '60°' }, { zh: '90°', en: '90°' }, { zh: '120°', en: '120°' }],
        a: 1,
        e: { zh: '入射角是光线与法线的夹角：90° − 30° = 60°。', en: 'Angle from the normal: 90° − 30° = 60°.' }
      },
      {
        q: { zh: '人向平面镜走近时，像的大小：', en: 'Walking toward a plane mirror, the image:' },
        o: [{ zh: '变大', en: 'grows' }, { zh: '变小', en: 'shrinks' }, { zh: '不变', en: 'stays the same' }, { zh: '先变大后变小', en: 'grows then shrinks' }],
        a: 2,
        e: { zh: '平面镜成像始终与物体等大，走近只是视角变大，像本身没变。', en: 'The image is always the same size as the object. It only subtends a larger angle as you approach.' }
      },
      {
        q: { zh: '插入水中的筷子看起来向上"折断"，这是因为光发生了：', en: 'A chopstick in water looks bent upward because light is:' },
        o: [{ zh: '反射', en: 'reflected' }, { zh: '折射', en: 'refracted' }, { zh: '衍射', en: 'diffracted' }, { zh: '被水吸收', en: 'absorbed' }],
        a: 1,
        e: { zh: '水下部分发出的光在水面折射后偏离法线，人眼沿折射光线的反向延长线看去，看到的是偏高的虚像。', en: 'Light from the submerged part bends away from the normal at the surface; the eye traces it back to a virtual image that sits higher.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-lens', track: 'junior', no: '04', tag: '核心',
    kicker: { zh: '光学 · 应用', en: 'Optics · applications' },
    title: { zh: '透镜及其应用', en: 'Lenses and Imaging' },
    summary: { zh: '凸透镜成像规律，一条公式管五种情况。', en: 'One lens equation covering all five imaging cases.' },
    intro: {
      zh: '凸透镜的成像规律看起来要背五条，其实都来自同一个公式 1/f = 1/u + 1/v。把物距从远到近推一遍，像的位置、大小、正倒、虚实就自然出来了。',
      en: 'Five rules to memorise look like a lot, but they all come from one equation. Sweep the object from far to near and the image position, size, orientation and reality follow automatically.'
    },
    sims: [{ type: 'lens', label: { zh: '光路作图', en: 'Ray diagram' } }],
    concepts: [
      {
        t: { zh: '凸透镜与凹透镜', en: 'Convex and concave lenses' },
        b: {
          zh: '凸透镜中间厚、边缘薄，对光有会聚作用；凹透镜中间薄、边缘厚，对光有发散作用。平行于主光轴的光经凸透镜折射后会聚于焦点，焦点到光心的距离叫焦距 f。焦距越小，会聚能力越强。',
          en: 'A convex lens is thick in the middle and converges light; a concave lens is thin in the middle and diverges it. Rays parallel to the principal axis converge at the focal point; its distance from the lens is the focal length f. A shorter f means stronger convergence.'
        }
      },
      {
        t: { zh: '凸透镜成像规律', en: 'How a convex lens forms images' },
        b: {
          zh: '物距 u > 2f：倒立、缩小的实像，照相机就是这一档。u = 2f：倒立、等大的实像。f < u < 2f：倒立、放大的实像，投影仪。u = f：折射光平行射出，不成像。u < f：正立、放大的虚像，放大镜。记住一句话：物近像远像变大。',
          en: 'u > 2f gives an inverted, diminished real image (a camera). u = 2f gives an inverted image of the same size. f < u < 2f gives an inverted, magnified real image (a projector). At u = f the outgoing rays are parallel and no image forms. u < f gives an upright, magnified virtual image (a magnifier). Move the object closer and the image moves farther and grows.'
        },
        f: '1/<i>f</i> = 1/<i>u</i> + 1/<i>v</i>　　<i>m</i> = <i>v</i>/<i>u</i>'
      },
      {
        t: { zh: '实像与虚像', en: 'Real versus virtual images' },
        b: {
          zh: '实像是实际光线会聚形成的，能用光屏承接，总是倒立的；虚像是实际光线的反向延长线相交形成的，不能用光屏承接，总是正立的。凸透镜在 u < f 时成虚像，平面镜成的也永远是虚像。',
          en: 'A real image is formed where rays actually meet; a screen can catch it, and it is always inverted. A virtual image is where backward extensions meet; no screen can catch it, and it is always upright. A convex lens gives a virtual image when u < f; a plane mirror always does.'
        }
      },
      {
        t: { zh: '眼睛与眼镜', en: 'The eye and corrective lenses' },
        b: {
          zh: '眼球相当于一个焦距可调的凸透镜，视网膜相当于光屏。近视眼的像成在视网膜前方，需要凹透镜先发散一点；远视眼的像成在视网膜后方，需要凸透镜先会聚一点。眼镜的度数 = 100 / 焦距（米），近视取负。',
          en: 'The eye is a variable-focus convex lens and the retina is the screen. In short sight the image falls in front of the retina, so a diverging lens is needed; in long sight it falls behind, so a converging lens helps. Lens power in dioptres is 100 / f in metres, negative for short sight.'
        },
        note: { zh: '近视镜是凹透镜（发散），远视镜是凸透镜（会聚）—— 别记反。', en: 'Short sight → concave lens. Long sight → convex lens. Do not swap them.' }
      }
    ],
    terms: [
      ['凸透镜', 'convex lens', '—'], ['凹透镜', 'concave lens', '—'],
      ['焦点', 'focal point', 'F'], ['焦距', 'focal length', 'f'],
      ['物距', 'object distance', 'u'], ['像距', 'image distance', 'v'],
      ['实像', 'real image', '—'], ['虚像', 'virtual image', '—'], ['光心', 'optical centre', 'O']
    ],
    practice: [
      {
        q: { zh: '凸透镜焦距 10 cm，物体放在距透镜 30 cm 处，所成的像是：', en: 'f = 10 cm, object at 30 cm. The image is:' },
        o: [{ zh: '倒立缩小的实像', en: 'inverted, diminished, real' }, { zh: '倒立放大的实像', en: 'inverted, magnified, real' }, { zh: '正立放大的虚像', en: 'upright, magnified, virtual' }, { zh: '正立等大的虚像', en: 'upright, same size, virtual' }],
        a: 0,
        e: { zh: 'u = 30 cm > 2f = 20 cm，成倒立缩小的实像，与照相机相同。', en: 'u = 30 cm > 2f, so the image is inverted and diminished — the camera case.' }
      },
      {
        q: { zh: '用放大镜观察邮票时，邮票应放在：', en: 'To use a magnifier on a stamp, the stamp must be:' },
        o: [{ zh: '焦点以外', en: 'beyond the focal point' }, { zh: '焦点以内', en: 'inside the focal point' }, { zh: '二倍焦距处', en: 'at twice the focal length' }, { zh: '紧贴透镜', en: 'touching the lens' }],
        a: 1,
        e: { zh: '只有 u < f 时才成正立放大的虚像，放大镜才起作用。', en: 'Only u < f gives an upright, magnified virtual image.' }
      },
      {
        q: { zh: '近视眼应配戴：', en: 'Short sight is corrected with:' },
        o: [{ zh: '凸透镜', en: 'a convex lens' }, { zh: '凹透镜', en: 'a concave lens' }, { zh: '平面镜', en: 'a plane mirror' }, { zh: '三棱镜', en: 'a prism' }],
        a: 1,
        e: { zh: '近视眼像成在视网膜前，需要凹透镜先发散光线，把像推后到视网膜上。', en: 'The image forms in front of the retina; a diverging lens pushes it back onto the retina.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-thermal', track: 'junior', no: '05', tag: '核心',
    kicker: { zh: '热学', en: 'Thermal physics' },
    title: { zh: '物态变化', en: 'Changes of State' },
    summary: { zh: '熔化、汽化、升华：吸热与放热的两条路线。', en: 'Melting, boiling, sublimation — and where the heat goes.' },
    intro: {
      zh: '物态变化只有六种，规律却出奇地整齐：向"更乱"的方向变（固→液→气）都要吸热，反过来都放热。晶体熔化时温度不变，这段"不变"正是理解潜热的钥匙。',
      en: 'There are only six changes of state, and the pattern is tidy: going toward the more disordered state (solid → liquid → gas) absorbs heat, and the reverse releases it. A crystal holds a constant temperature while melting — that plateau is the key to latent heat.'
    },
    sims: [{ type: 'heating', label: { zh: '冰的加热曲线', en: 'Heating curve of ice' } }],
    concepts: [
      {
        t: { zh: '温度与温度计', en: 'Temperature and thermometers' },
        b: {
          zh: '温度表示物体的冷热程度。摄氏温度规定：标准大气压下冰水混合物的温度为 0 ℃，沸水为 100 ℃。热力学温度 T 与摄氏温度 t 的关系是 T = t + 273.15 K。温度是分子平均动能的标志。',
          en: 'Temperature measures hotness. On the Celsius scale, an ice–water mixture at standard pressure is 0 °C and boiling water 100 °C. Thermodynamic temperature is T = t + 273.15 K. Microscopically, temperature tracks the average kinetic energy of molecules.'
        },
        f: '<i>T</i> = <i>t</i> + 273.15 K'
      },
      {
        t: { zh: '熔化和凝固', en: 'Melting and freezing' },
        b: {
          zh: '固体分为晶体和非晶体。晶体有固定的熔点，熔化过程中吸热但温度保持不变；非晶体（如沥青、玻璃）没有熔点，边吸热边升温边变软。同种晶体的凝固点等于熔点，凝固放热。',
          en: 'Crystalline solids have a sharp melting point and hold that temperature while absorbing heat. Amorphous solids such as glass or pitch soften gradually with no fixed point. For a given crystal the freezing point equals the melting point, and freezing releases heat.'
        },
        note: { zh: '熔化吸热但温度不变 —— 吸收的热量用来破坏晶格，不是用来升温。', en: 'Melting absorbs heat without warming: the energy goes into breaking the lattice, not into raising temperature.' }
      },
      {
        t: { zh: '汽化和液化', en: 'Vaporisation and condensation' },
        b: {
          zh: '汽化有蒸发和沸腾两种方式，都吸热。蒸发只在液体表面进行，任何温度都能发生，且表面积越大、温度越高、空气流动越快，蒸发越快。沸腾在液体内部和表面同时进行，温度达到沸点才发生，沸腾时温度不变。沸点随气压升高而升高，高压锅就是利用这一点。液化是汽化的逆过程，放热。',
          en: 'Vaporisation happens two ways, both absorbing heat. Evaporation occurs at the surface at any temperature, faster with larger area, higher temperature and moving air. Boiling happens throughout the liquid, only at the boiling point, and holds a constant temperature. Boiling point rises with pressure — that is the pressure cooker. Condensation is the reverse and releases heat.'
        },
        note: { zh: '白气不是水蒸气。水蒸气无色透明，看得见的"白气"是遇冷液化而成的小水滴。', en: '"White mist" is not water vapour. Vapour is invisible; the white cloud is tiny droplets formed by condensation.' }
      },
      {
        t: { zh: '升华和凝华', en: 'Sublimation and deposition' },
        b: {
          zh: '固体直接变成气体叫升华，吸热：干冰升华吸热可用于人工降雨和冷藏保鲜，樟脑丸变小也是升华。气体直接变成固体叫凝华，放热：霜、雾凇、窗玻璃上的冰花都是水蒸气凝华形成的。',
          en: 'Solid to gas is sublimation, absorbing heat — dry ice cools and seeds rain, mothballs shrink. Gas to solid is deposition, releasing heat — frost, rime and the ice flowers on winter windows all form this way.'
        }
      }
    ],
    terms: [
      ['温度', 'temperature', 't / T'], ['熔点', 'melting point', '—'],
      ['凝固点', 'freezing point', '—'], ['沸点', 'boiling point', '—'],
      ['蒸发', 'evaporation', '—'], ['液化', 'condensation', '—'],
      ['升华', 'sublimation', '—'], ['凝华', 'deposition', '—'],
      ['潜热', 'latent heat', 'L']
    ],
    practice: [
      {
        q: { zh: '冰在熔化过程中，温度保持 0 ℃ 不变，此时它：', en: 'While melting, ice stays at 0 °C. During this time it:' },
        o: [{ zh: '不吸热也不放热', en: 'absorbs and releases nothing' }, { zh: '吸热但温度不变', en: 'absorbs heat without warming' }, { zh: '放热但温度不变', en: 'releases heat without cooling' }, { zh: '内能不变', en: 'keeps constant internal energy' }],
        a: 1,
        e: { zh: '熔化需要吸热，但热量用于破坏晶体结构，温度不变，内能增大。', en: 'Heat is absorbed but goes into breaking the crystal structure; temperature stays put while internal energy rises.' }
      },
      {
        q: { zh: '夏天从冰箱取出的饮料瓶外壁"出汗"，这是：', en: 'A cold bottle "sweats" in summer. This is:' },
        o: [{ zh: '瓶内的水渗出来', en: 'water leaking out' }, { zh: '空气中的水蒸气液化', en: 'vapour in the air condensing' }, { zh: '瓶壁熔化', en: 'the bottle melting' }, { zh: '水蒸气升华', en: 'vapour sublimating' }],
        a: 1,
        e: { zh: '瓶壁温度低于空气露点，空气中的水蒸气遇冷液化成小水滴附着在瓶外。', en: 'The wall is below the dew point, so vapour condenses on it.' }
      },
      {
        q: { zh: '高压锅能更快煮熟食物，主要因为：', en: 'A pressure cooker cooks faster mainly because:' },
        o: [{ zh: '锅内气压高，水的沸点升高', en: 'higher pressure raises the boiling point' }, { zh: '锅内水更多', en: 'it holds more water' }, { zh: '锅的材料导热更好', en: 'the metal conducts better' }, { zh: '水的比热容变小', en: 'the specific heat falls' }],
        a: 0,
        e: { zh: '气压升高使沸点超过 100 ℃，水温更高，食物熟得更快。', en: 'Higher pressure pushes the boiling point above 100 °C, so the water is hotter.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-density', track: 'junior', no: '06', tag: '核心',
    kicker: { zh: '物质', en: 'Matter' },
    title: { zh: '质量与密度', en: 'Mass and Density' },
    summary: { zh: 'ρ = m/V：鉴别物质、判断空心。', en: 'ρ = m/V: identifying materials and spotting hollow objects.' },
    intro: {
      zh: '质量是物体自身的属性，走到哪里都不变；密度是物质的属性，同种物质在相同状态下密度相同。把两者分开，很多"看起来奇怪"的题目就顺了。',
      en: 'Mass belongs to the object and never changes with location; density belongs to the material. Keep the two apart and most "tricky" problems become straightforward.'
    },
    sims: [{ type: 'buoyancy', label: { zh: '密度与浮沉', en: 'Density and floating' } }],
    concepts: [
      {
        t: { zh: '质量', en: 'Mass' },
        b: {
          zh: '质量是物体所含物质的多少，用 m 表示，单位是千克（kg）。质量不随物体的形状、状态、位置和温度改变：一块冰化成水，质量不变；宇航员到月球，质量也不变（重力变了）。实验室用天平测质量。',
          en: 'Mass is the amount of matter, in kilograms. It does not change with shape, state, location or temperature: melted ice keeps its mass, and an astronaut on the Moon keeps hers (weight changes, mass does not). A balance measures mass.'
        }
      },
      {
        t: { zh: '密度', en: 'Density' },
        b: {
          zh: '某种物质组成的物体，质量与体积之比叫这种物质的密度：ρ = m/V。单位是 kg/m³，常用 g/cm³，1 g/cm³ = 1000 kg/m³。水的密度是 1.0×10³ kg/m³，表示 1 m³ 的水质量为 1000 kg。密度是物质的特性，与质量和体积无关。',
          en: 'Density is mass per unit volume, ρ = m/V, in kg/m³ (1 g/cm³ = 1000 kg/m³). Water is 1.0×10³ kg/m³ — one cubic metre weighs a tonne. Density characterises the material, not the particular lump: cut it in half and ρ stays the same.'
        },
        f: '<i>ρ</i> = <i>m</i> / <i>V</i>　　1 g/cm<sup>3</sup> = 10<sup>3</sup> kg/m<sup>3</sup>'
      },
      {
        t: { zh: '测量物质的密度', en: 'Measuring density' },
        b: {
          zh: '用天平测质量 m，用量筒测体积 V。测固体时先测质量、后测体积：若先浸水再称质量，物体沾水会使质量偏大。不规则固体的体积用排水法：V = V₂ − V₁。测液体密度时，要先测烧杯和液体的总质量，倒出一部分后再测，用差值算质量。',
          en: 'Weigh with a balance, measure volume with a graduated cylinder. For solids, weigh first, then immerse — wetting adds mass. Find an irregular volume by displacement: V = V₂ − V₁. For liquids, weigh cup plus liquid, pour some out, weigh again, and use the difference.'
        }
      },
      {
        t: { zh: '密度与生活', en: 'Density in practice' },
        b: {
          zh: '密度可以用来鉴别物质、判断物体是实心还是空心、选择材料。冰的密度小于水，所以冰浮在水面上；暖气片装在窗户下方，是因为热空气密度小会上升，冷空气下沉形成对流。',
          en: 'Density identifies materials, detects hollow objects and guides material choice. Ice floats because it is less dense than water. Radiators sit under windows because warm air is less dense and rises, setting up a convection loop.'
        },
        note: { zh: '判断空心：用实测体积与"按质量算出的实心体积"比较，实测大的就是空心。', en: 'To test for a hollow core, compare the measured volume with the solid volume implied by the mass.' }
      }
    ],
    terms: [
      ['质量', 'mass', 'm'], ['密度', 'density', 'ρ'], ['体积', 'volume', 'V'],
      ['天平', 'balance', '—'], ['量筒', 'graduated cylinder', '—'], ['排水法', 'displacement method', '—']
    ],
    practice: [
      {
        q: { zh: '某金属块质量 54 g，体积 20 cm³，它的密度是：', en: 'A metal block has mass 54 g and volume 20 cm³. Its density is:' },
        o: [{ zh: '2.7 g/cm³', en: '2.7 g/cm³' }, { zh: '0.37 g/cm³', en: '0.37 g/cm³' }, { zh: '27 g/cm³', en: '27 g/cm³' }, { zh: '5.4 g/cm³', en: '5.4 g/cm³' }],
        a: 0,
        e: { zh: 'ρ = 54 / 20 = 2.7 g/cm³，对应铝。', en: 'ρ = 54/20 = 2.7 g/cm³, which is aluminium.' }
      },
      {
        q: { zh: '一瓶水喝掉一半后，剩下水的密度：', en: 'After drinking half a bottle of water, the remaining water has:' },
        o: [{ zh: '变为原来的一半', en: 'half the density' }, { zh: '不变', en: 'the same density' }, { zh: '变为原来的两倍', en: 'twice the density' }, { zh: '无法判断', en: 'cannot be determined' }],
        a: 1,
        e: { zh: '质量和体积都减半，比值不变，密度是物质的特性。', en: 'Both mass and volume halve, so the ratio is unchanged.' }
      },
      {
        q: { zh: '冰熔化成水后，下列说法正确的是：', en: 'When ice melts into water:' },
        o: [{ zh: '质量变小，体积不变', en: 'mass falls, volume constant' }, { zh: '质量不变，体积变小', en: 'mass constant, volume shrinks' }, { zh: '质量不变，体积变大', en: 'mass constant, volume grows' }, { zh: '质量和体积都不变', en: 'both unchanged' }],
        a: 1,
        e: { zh: '质量守恒；水的密度大于冰，所以体积变小。', en: 'Mass is conserved; water is denser than ice, so volume decreases.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-force', track: 'junior', no: '07', tag: '核心',
    kicker: { zh: '力学', en: 'Mechanics' },
    title: { zh: '力与运动', en: 'Force and Motion' },
    summary: { zh: '三种力、二力平衡、惯性。', en: 'Three forces, balanced pairs, and inertia.' },
    intro: {
      zh: '"力是维持运动的原因"这个直觉是错的。伽利略的斜面实验指出：如果没有摩擦，运动不需要力来维持。牛顿第一定律正是从这一点出发。',
      en: 'The intuition that force is needed to keep something moving is wrong. Galileo\'s inclined-plane argument shows motion needs no force if friction vanishes — and Newton\'s first law starts exactly there.'
    },
    sims: [{ type: 'incline', label: { zh: '斜面上的力', en: 'Forces on an incline' } }],
    concepts: [
      {
        t: { zh: '力', en: 'Force' },
        b: {
          zh: '力是物体对物体的作用，单位是牛顿（N）。力的作用效果有两个：改变物体的形状、改变物体的运动状态。力的大小、方向、作用点叫力的三要素，它们共同决定力的作用效果。力的作用是相互的：你推墙，墙也推你。',
          en: 'A force is an interaction between bodies, measured in newtons. It can deform a body or change its state of motion. Magnitude, direction and point of application together define it. Forces always come in pairs: push a wall and the wall pushes back.'
        }
      },
      {
        t: { zh: '重力、弹力、摩擦力', en: 'Gravity, elastic force, friction' },
        b: {
          zh: '重力 G = mg，方向竖直向下，作用点在重心，g ≈ 9.8 N/kg。弹力是物体发生弹性形变时产生的力，弹簧测力计的原理是：在弹性限度内，弹簧的伸长量与所受拉力成正比。滑动摩擦力 f = μN，与压力和接触面的粗糙程度有关，与接触面积、运动速度无关。',
          en: 'Weight is G = mg, directed vertically down through the centre of gravity, with g ≈ 9.8 N/kg. Elastic force arises from deformation; a spring balance relies on Hooke\'s law — within the elastic limit, extension is proportional to the applied force. Sliding friction f = μN depends on the normal force and the roughness of the surfaces, not on contact area or speed.'
        },
        f: '<i>G</i> = <i>mg</i>　　<i>f</i> = <i>μN</i>　　<i>F</i> = <i>kx</i>'
      },
      {
        t: { zh: '牛顿第一定律与惯性', en: 'Newton\'s first law and inertia' },
        b: {
          zh: '一切物体在没有受到外力作用时，总保持静止状态或匀速直线运动状态，这就是牛顿第一定律。它不能由实验直接验证，是在伽利略理想实验的基础上推理得出的。物体保持原来运动状态不变的性质叫惯性，惯性只与质量有关，与速度无关。',
          en: 'Every body continues at rest or in uniform straight-line motion unless acted on by a net force. This law cannot be tested directly; it is inferred from Galileo\'s idealised experiment. The tendency to keep its state of motion is inertia, which depends only on mass — not on speed.'
        },
        note: { zh: '惯性不是力，不能说"受到惯性作用"，只能说"由于惯性"。', en: 'Inertia is not a force: never "acted on by inertia", only "because of inertia".' }
      },
      {
        t: { zh: '二力平衡', en: 'Balanced forces' },
        b: {
          zh: '作用在同一物体上的两个力，如果大小相等、方向相反、作用在同一直线上，这两个力就彼此平衡。物体在平衡力作用下保持静止或匀速直线运动。注意区分平衡力与相互作用力：平衡力作用在同一物体上，相互作用力作用在两个不同物体上。',
          en: 'Two forces on the same body are balanced when equal in magnitude, opposite in direction and collinear. A body under balanced forces stays at rest or moves uniformly. Distinguish balanced pairs from action–reaction pairs: the former act on one body, the latter on two.'
        }
      }
    ],
    terms: [
      ['力', 'force', 'F'], ['重力', 'gravity / weight', 'G'], ['弹力', 'elastic force', '—'],
      ['摩擦力', 'friction', 'f'], ['惯性', 'inertia', '—'], ['平衡力', 'balanced forces', '—'],
      ['重心', 'centre of gravity', '—'], ['牛顿', 'newton', 'N']
    ],
    practice: [
      {
        q: { zh: '跳远运动员起跳前要助跑，这是为了利用：', en: 'A long jumper runs up before take-off in order to use:' },
        o: [{ zh: '惯性', en: 'inertia' }, { zh: '重力', en: 'gravity' }, { zh: '摩擦力', en: 'friction' }, { zh: '弹力', en: 'elastic force' }],
        a: 0,
        e: { zh: '助跑使人获得较大的速度，起跳后由于惯性继续向前运动，跳得更远。', en: 'The run-up gives speed; after take-off inertia carries the jumper forward.' }
      },
      {
        q: { zh: '一名同学体重 500 N，他的质量约为（g 取 10 N/kg）：', en: 'A student weighs 500 N. His mass is about (g = 10 N/kg):' },
        o: [{ zh: '5 kg', en: '5 kg' }, { zh: '50 kg', en: '50 kg' }, { zh: '500 kg', en: '500 kg' }, { zh: '5000 kg', en: '5000 kg' }],
        a: 1,
        e: { zh: 'm = G/g = 500/10 = 50 kg。', en: 'm = G/g = 50 kg.' }
      },
      {
        q: { zh: '物体在水平面上做匀速直线运动，它受到的力：', en: 'A body moving uniformly on a horizontal surface is acted on by:' },
        o: [{ zh: '一定是平衡力', en: 'necessarily balanced forces' }, { zh: '一定不受力', en: 'no forces at all' }, { zh: '合力向前', en: 'a net forward force' }, { zh: '只有重力', en: 'gravity only' }],
        a: 0,
        e: { zh: '匀速直线运动说明合力为零，所受的力互相平衡（可能受多个力）。', en: 'Uniform motion means zero net force, so whatever forces act must balance.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-pressure', track: 'junior', no: '08', tag: '核心',
    kicker: { zh: '力学 · 流体', en: 'Mechanics · fluids' },
    title: { zh: '压强与浮力', en: 'Pressure and Buoyancy' },
    summary: { zh: 'p = F/S、p = ρgh 与阿基米德原理。', en: 'p = F/S, p = ρgh, and Archimedes\' principle.' },
    intro: {
      zh: '压强把"力"摊到"面积"上，浮力则是液体对物体上下表面的压强差。把这两个式子推一遍，浮沉条件就不用背了。',
      en: 'Pressure spreads force over area; buoyancy is the difference in pressure between the bottom and top of a submerged body. Derive the two and the floating condition needs no memorising.'
    },
    sims: [{ type: 'buoyancy', label: { zh: '浮力与浮沉', en: 'Buoyancy and floating' } }],
    concepts: [
      {
        t: { zh: '固体压强', en: 'Pressure in solids' },
        b: {
          zh: '物体单位面积上受到的压力叫压强：p = F/S，单位帕斯卡（Pa），1 Pa = 1 N/m²。压力一定时，受力面积越小压强越大 —— 刀要磨薄、图钉尖要细，都是这个道理。',
          en: 'Pressure is force per unit area, p = F/S, in pascals (1 Pa = 1 N/m²). For a given force, a smaller area gives a larger pressure — that is why blades are sharpened and pins are pointed.'
        },
        f: '<i>p</i> = <i>F</i> / <i>S</i>'
      },
      {
        t: { zh: '液体压强', en: 'Pressure in a liquid' },
        b: {
          zh: '液体内部某处的压强只与液体的密度和该处的深度有关：p = ρgh。深度 h 是指从液面竖直向下的距离。同一深度，各方向压强相等；压强与容器的形状、液体的总质量无关。连通器里装同种液体且静止时，液面总是相平的。',
          en: 'Pressure at a depth h depends only on density and depth: p = ρgh, where h is measured vertically from the free surface. At a given depth pressure is the same in every direction, independent of the container\'s shape or the total mass of liquid. In connected vessels of one liquid at rest, the surfaces are level.'
        },
        f: '<i>p</i> = <i>ρgh</i>'
      },
      {
        t: { zh: '大气压强', en: 'Atmospheric pressure' },
        b: {
          zh: '大气对浸在其中的物体产生的压强叫大气压强。托里拆利实验用水银柱测出：1 标准大气压 ≈ 1.013×10⁵ Pa，相当于 760 mm 高的水银柱。大气压随海拔升高而减小，离地面越高空气越稀薄。',
          en: 'The atmosphere presses on everything in it. Torricelli\'s mercury column gives 1 atm ≈ 1.013×10⁵ Pa, the weight of 760 mm of mercury. Pressure falls with altitude as the air thins.'
        },
        f: '1 atm ≈ 1.013×10<sup>5</sup> Pa ≈ 760 mmHg'
      },
      {
        t: { zh: '浮力与阿基米德原理', en: 'Buoyancy and Archimedes' },
        b: {
          zh: '浸在液体中的物体受到向上的浮力，浮力大小等于它排开的液体所受的重力：F浮 = ρ液gV排。浮力产生的原因是物体上下表面受到的液体压强不同，下表面受到的压力大于上表面。物体浸没后继续下沉，V排不变，浮力也不变，但压强仍在增大。',
          en: 'A submerged body feels an upward buoyant force equal to the weight of the fluid it displaces: F = ρgV. The cause is the pressure difference between lower and upper surfaces. Once fully submerged, sinking deeper changes neither displaced volume nor buoyancy — only the pressure rises.'
        },
        f: '<i>F</i><sub>浮</sub> = <i>ρ</i><sub>液</sub><i>gV</i><sub>排</sub>'
      },
      {
        t: { zh: '物体的浮沉条件', en: 'Floating and sinking' },
        b: {
          zh: '浸没时比较浮力与重力：F浮 > G 上浮，最终漂浮，此时 F浮 = G；F浮 = G 悬浮；F浮 < G 下沉。也可以比较密度：ρ物 < ρ液 上浮，ρ物 = ρ液 悬浮，ρ物 > ρ液 下沉。潜水艇靠改变自身重力实现上浮下潜，气球靠改变体积（因而改变浮力）升空。',
          en: 'Compare buoyancy with weight when fully submerged: greater floats up (ending in floating, where F = G), equal is neutrally buoyant, less sinks. Equivalently compare densities. Submarines change their weight; balloons change their volume, hence the displaced air.'
        }
      }
    ],
    terms: [
      ['压强', 'pressure', 'p'], ['帕斯卡', 'pascal', 'Pa'], ['深度', 'depth', 'h'],
      ['大气压', 'atmospheric pressure', 'p₀'], ['浮力', 'buoyancy', 'F浮'],
      ['排开液体的体积', 'displaced volume', 'V排'], ['连通器', 'connected vessels', '—']
    ],
    practice: [
      {
        q: { zh: '同一物体分别浸没在水和酒精中，受到的浮力：', en: 'The same object is fully submerged in water and then in alcohol. Buoyancy is:' },
        o: [{ zh: '在水中大', en: 'greater in water' }, { zh: '在酒精中大', en: 'greater in alcohol' }, { zh: '一样大', en: 'the same' }, { zh: '无法比较', en: 'cannot compare' }],
        a: 0,
        e: { zh: 'V排 相同，水的密度大于酒精，由 F浮 = ρ液gV排 得水中浮力更大。', en: 'Same displaced volume, higher density → greater buoyancy in water.' }
      },
      {
        q: { zh: '潜水艇从水面下潜到更深处，它受到的浮力：', en: 'A submarine dives deeper. Its buoyancy:' },
        o: [{ zh: '变大', en: 'increases' }, { zh: '变小', en: 'decreases' }, { zh: '不变', en: 'stays the same' }, { zh: '先变大后不变', en: 'increases then stays' }],
        a: 2,
        e: { zh: '浸没后 V排 不变，浮力不变；但深度增加，压强增大。', en: 'Fully submerged, displaced volume is fixed, so buoyancy is constant — only pressure grows.' }
      },
      {
        q: { zh: '把图钉尖做得很细，目的是：', en: 'A drawing pin has a very sharp point in order to:' },
        o: [{ zh: '增大压力', en: 'increase the force' }, { zh: '减小受力面积，增大压强', en: 'reduce area and increase pressure' }, { zh: '增大受力面积，减小压强', en: 'increase area and reduce pressure' }, { zh: '减小摩擦', en: 'reduce friction' }],
        a: 1,
        e: { zh: '压力一定时，S 越小 p 越大，图钉才容易压入墙面。', en: 'With force fixed, a smaller area gives higher pressure, so it goes in easily.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-energy', track: 'junior', no: '09', tag: '核心',
    kicker: { zh: '力学 · 能量', en: 'Mechanics · energy' },
    title: { zh: '功和机械能', en: 'Work, Energy and Simple Machines' },
    summary: { zh: '功、功率、动能势能，以及杠杆和滑轮。', en: 'Work, power, energy — plus levers and pulleys.' },
    intro: {
      zh: '功是力在位移上的积累，能量是做功的本领。杠杆和滑轮看似新知识，其实只是"功的原理"的两种应用：省力必费距离，任何机械都不省功。',
      en: 'Work is force accumulated along a displacement; energy is the capacity to do work. Levers and pulleys look like new material, but they are just consequences of the work principle: whatever you gain in force you pay back in distance.'
    },
    sims: [
      { type: 'coaster', label: { zh: '过山车与能量', en: 'Coaster energy' } },
      { type: 'lever', label: { zh: '杠杆平衡', en: 'Lever balance' } }
    ],
    concepts: [
      {
        t: { zh: '功', en: 'Work' },
        b: {
          zh: '功等于力与物体在力的方向上通过的距离的乘积：W = Fs，单位焦耳（J）。力与位移方向垂直时不做功：提着水桶水平走，人对水桶不做功。有力没有距离、有距离没有力，也都不做功。',
          en: 'Work is force times displacement along the force: W = Fs, in joules. A force perpendicular to the motion does no work — carrying a bucket horizontally does nothing for it. No displacement, or no force, also means no work.'
        },
        f: '<i>W</i> = <i>Fs</i>　　<i>W</i> = <i>Fl</i>cos<i>θ</i>（高中）'
      },
      {
        t: { zh: '功率', en: 'Power' },
        b: {
          zh: '功率是做功的快慢：P = W/t，单位瓦特（W），1 W = 1 J/s。功率大表示做功快，不表示做功多。机器铭牌上的功率是额定功率，实际功率可以小于它。',
          en: 'Power is the rate of doing work, P = W/t, in watts (1 W = 1 J/s). High power means fast, not more. The figure on a nameplate is the rated power; actual power can be lower.'
        },
        f: '<i>P</i> = <i>W</i>/<i>t</i> = <i>Fv</i>'
      },
      {
        t: { zh: '动能和势能', en: 'Kinetic and potential energy' },
        b: {
          zh: '物体由于运动而具有的能叫动能，Eк = ½mv²，质量越大、速度越大，动能越大。物体由于被举高而具有的能叫重力势能，Ep = mgh，与质量和高度有关（高度要有参照面）。发生弹性形变的物体具有弹性势能。',
          en: 'Kinetic energy comes from motion, E = ½mv² — larger with mass and, importantly, with the square of speed. Gravitational potential energy comes from height, E = mgh, measured from a chosen reference level. A stretched or compressed spring stores elastic potential energy.'
        },
        f: '<i>E</i><sub>k</sub> = ½<i>mv</i><sup>2</sup>　　<i>E</i><sub>p</sub> = <i>mgh</i>'
      },
      {
        t: { zh: '机械能及其转化', en: 'Mechanical energy and its transformations' },
        b: {
          zh: '动能和势能统称机械能。只有重力和弹力做功时，机械能守恒：过山车从高处滑下，势能转化为动能，高度越低速度越大。实际中总有摩擦，一部分机械能转化为内能，但能量的总量始终守恒。',
          en: 'Kinetic plus potential energy is mechanical energy. When only gravity and spring forces do work, it is conserved: a coaster trades height for speed. In reality friction turns some of it into internal energy — the total is still conserved.'
        },
        note: { zh: '"机械能守恒"是有条件的；"能量守恒"才是普遍规律。', en: 'Conservation of mechanical energy is conditional; conservation of energy is universal.' }
      },
      {
        t: { zh: '杠杆', en: 'Levers' },
        b: {
          zh: '杠杆绕着固定点（支点）转动。从支点到力的作用线的距离叫力臂，不是支点到作用点的距离。杠杆平衡条件：F₁L₁ = F₂L₂。L₁ > L₂ 时省力但费距离（撬棍）；L₁ < L₂ 时费力但省距离（镊子）。',
          en: 'A lever turns about a fulcrum. The moment arm is the perpendicular distance from the fulcrum to the line of action — not to the point of application. Balance requires F₁L₁ = F₂L₂. A longer effort arm saves force but costs distance (a crowbar); a shorter one saves distance but costs force (tweezers).'
        },
        f: '<i>F</i><sub>1</sub><i>L</i><sub>1</sub> = <i>F</i><sub>2</sub><i>L</i><sub>2</sub>'
      },
      {
        t: { zh: '滑轮', en: 'Pulleys' },
        b: {
          zh: '定滑轮实质是等臂杠杆，只能改变力的方向，不省力。动滑轮实质是动力臂为阻力臂两倍的杠杆，省一半力，但绳子要移动两倍距离。滑轮组既能省力又能改变方向，若承担物重的绳子有 n 段，则 F = G/n（不计摩擦和滑轮重）。',
          en: 'A fixed pulley is an equal-arm lever: it redirects force without saving any. A movable pulley has an effort arm twice the load arm: it halves the force but doubles the rope pulled. A block and tackle does both; with n supporting rope segments, F = G/n (ignoring friction and pulley weight).'
        },
        f: '<i>F</i> = <i>G</i>/<i>n</i>　　<i>s</i> = <i>nh</i>'
      }
    ],
    terms: [
      ['功', 'work', 'W'], ['功率', 'power', 'P'], ['焦耳', 'joule', 'J'],
      ['动能', 'kinetic energy', 'Ek'], ['重力势能', 'gravitational potential energy', 'Ep'],
      ['机械能', 'mechanical energy', 'E'], ['杠杆', 'lever', '—'],
      ['力臂', 'moment arm', 'L'], ['滑轮组', 'block and tackle', '—']
    ],
    practice: [
      {
        q: { zh: '提着水桶在水平路面上匀速行走，人对水桶做的功为：', en: 'Carrying a bucket at constant speed along a level road, the work you do on it is:' },
        o: [{ zh: '零', en: 'zero' }, { zh: '等于重力做的功', en: 'equal to gravity\'s work' }, { zh: '等于摩擦力做的功', en: 'equal to friction\'s work' }, { zh: '无法判断', en: 'undetermined' }],
        a: 0,
        e: { zh: '提力竖直向上，位移水平，二者垂直，不做功。', en: 'The lifting force is vertical, the displacement horizontal — perpendicular, so no work.' }
      },
      {
        q: { zh: '两台机器做功之比为 2∶1，所用时间之比为 1∶2，则功率之比为：', en: 'Work ratio 2:1, time ratio 1:2. The power ratio is:' },
        o: [{ zh: '1∶1', en: '1:1' }, { zh: '2∶1', en: '2:1' }, { zh: '4∶1', en: '4:1' }, { zh: '1∶4', en: '1:4' }],
        a: 2,
        e: { zh: 'P = W/t，功率比 = (2/1)/(1/2) = 4∶1。', en: 'P = W/t, so the ratio is (2/1) ÷ (1/2) = 4:1.' }
      },
      {
        q: { zh: '用撬棍撬石头时，为了更省力，应该：', en: 'To lift a rock with a crowbar more easily, you should:' },
        o: [{ zh: '减小动力臂', en: 'shorten the effort arm' }, { zh: '增大动力臂', en: 'lengthen the effort arm' }, { zh: '增大阻力', en: 'increase the load' }, { zh: '把支点移近手', en: 'move the fulcrum toward your hand' }],
        a: 1,
        e: { zh: 'F₁ = F₂L₂/L₁，增大 L₁ 可减小所需的动力。', en: 'F₁ = F₂L₂/L₁, so a longer effort arm needs less force.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-circuit', track: 'junior', no: '10', tag: '核心',
    kicker: { zh: '电学', en: 'Electricity' },
    title: { zh: '电流与电路', en: 'Current and Circuits' },
    summary: { zh: '电流、电压、电阻、欧姆定律与电功率。', en: 'Current, voltage, resistance, Ohm\'s law and power.' },
    intro: {
      zh: '电路里只有三个基本量：电流 I、电压 U、电阻 R，它们由一个式子连起来：I = U/R。串并联的所有规律，都是这个式子在具体连接方式下的结果。',
      en: 'A circuit has three basic quantities — current, voltage, resistance — tied by one relation: I = U/R. Every series and parallel rule is that relation applied to a particular wiring.'
    },
    sims: [{ type: 'circuit', label: { zh: '串联与并联', en: 'Series and parallel' } }],
    concepts: [
      {
        t: { zh: '电荷与电流', en: 'Charge and current' },
        b: {
          zh: '同种电荷相互排斥，异种电荷相互吸引。电荷的定向移动形成电流，规定正电荷定向移动的方向为电流方向。电流大小等于每秒通过导体横截面的电荷量：I = Q/t，单位安培（A）。串联电路中电流处处相等。',
          en: 'Like charges repel, unlike attract. Directed charge motion is a current, conventionally in the direction positive charge would move. Current is charge per second, I = Q/t, in amperes. In a series circuit the current is the same everywhere.'
        },
        f: '<i>I</i> = <i>Q</i>/<i>t</i>'
      },
      {
        t: { zh: '电压与电阻', en: 'Voltage and resistance' },
        b: {
          zh: '电压是使电路中形成电流的原因，单位伏特（V）。家庭电路电压 220 V，人体安全电压不高于 36 V。电阻表示导体对电流的阻碍作用，单位欧姆（Ω），大小由材料、长度、横截面积和温度决定：长度越长、横截面越小，电阻越大。',
          en: 'Voltage drives current, in volts. Mains is 220 V in China; safe body voltage is at most 36 V. Resistance is the opposition to current, in ohms, set by material, length, cross-section and temperature: longer and thinner means more resistance.'
        },
        f: '<i>R</i> = <i>ρL</i>/<i>S</i>'
      },
      {
        t: { zh: '欧姆定律', en: 'Ohm\'s law' },
        b: {
          zh: '导体中的电流跟导体两端的电压成正比，跟导体的电阻成反比：I = U/R。使用时要对应同一段导体、同一时刻。串联总电阻 R = R₁ + R₂，电流相等、电压按电阻分配；并联总电阻的倒数等于各支路倒数之和，电压相等、电流按电阻反比分配。',
          en: 'Current through a conductor is proportional to the voltage across it and inversely proportional to its resistance. Apply it to one conductor at one time. Series: R = R₁ + R₂, same current, voltage divides in proportion to resistance. Parallel: reciprocals add, same voltage, current divides inversely with resistance.'
        },
        f: '<i>I</i> = <i>U</i>/<i>R</i>　　<i>R</i><sub>串</sub> = <i>R</i><sub>1</sub>+<i>R</i><sub>2</sub>　　1/<i>R</i><sub>并</sub> = 1/<i>R</i><sub>1</sub>+1/<i>R</i><sub>2</sub>'
      },
      {
        t: { zh: '电功率与电热', en: 'Electric power and heating' },
        b: {
          zh: '电功率表示消耗电能的快慢：P = UI，单位瓦特（W）。纯电阻电路中还可写成 P = I²R = U²/R。电功 W = UIt，家庭用电 1 度 = 1 kW·h = 3.6×10⁶ J。焦耳定律给出电流产生的热量 Q = I²Rt。',
          en: 'Power is the rate of using electrical energy, P = UI. For pure resistors this becomes P = I²R = U²/R. Energy used is W = UIt; one kilowatt-hour is 3.6×10⁶ J. Joule\'s law gives the heat produced: Q = I²Rt.'
        },
        f: '<i>P</i> = <i>UI</i> = <i>I</i><sup>2</sup><i>R</i> = <i>U</i><sup>2</sup>/<i>R</i>　　<i>Q</i> = <i>I</i><sup>2</sup><i>Rt</i>'
      },
      {
        t: { zh: '家庭电路与安全用电', en: 'Household circuits and safety' },
        b: {
          zh: '家庭电路由进户线（火线与零线）、电能表、总开关、保险装置、用电器和插座组成，各用电器并联。火线与零线之间电压 220 V，火线与地之间也是 220 V。触电急救的第一步是切断电源，不能直接用手拉人。',
          en: 'A household circuit runs from the service wires through a meter, main switch and protective device to appliances wired in parallel. The live-to-neutral and live-to-earth voltages are both 220 V. In an electric shock, cut the power first — never grab the victim.'
        },
        note: { zh: '开关要接在火线上，这样断开时用电器不带电。', en: 'Switches belong on the live wire, so an open switch leaves the appliance dead.' }
      }
    ],
    terms: [
      ['电流', 'current', 'I'], ['电压', 'voltage', 'U'], ['电阻', 'resistance', 'R'],
      ['欧姆定律', 'Ohm\'s law', '—'], ['电功率', 'electric power', 'P'],
      ['焦耳定律', 'Joule\'s law', '—'], ['串联', 'series', '—'], ['并联', 'parallel', '—']
    ],
    practice: [
      {
        q: { zh: '电源电压 6 V，两个 3 Ω 的电阻串联，电路中的电流是：', en: 'A 6 V supply drives two 3 Ω resistors in series. The current is:' },
        o: [{ zh: '0.5 A', en: '0.5 A' }, { zh: '1 A', en: '1 A' }, { zh: '2 A', en: '2 A' }, { zh: '3 A', en: '3 A' }],
        a: 1,
        e: { zh: 'R总 = 3 + 3 = 6 Ω，I = U/R = 1 A。', en: 'R = 6 Ω, so I = 1 A.' }
      },
      {
        q: { zh: '并联电路中，各支路两端的电压：', en: 'In a parallel circuit, the voltage across each branch is:' },
        o: [{ zh: '相等', en: 'equal' }, { zh: '与电阻成正比', en: 'proportional to resistance' }, { zh: '与电阻成反比', en: 'inversely proportional to resistance' }, { zh: '之和等于总电压', en: 'summed to the total' }],
        a: 0,
        e: { zh: '并联各支路两端是同一对节点，电压必然相等；电流才按电阻反比分配。', en: 'All branches share the same two nodes, so the voltage is identical; it is the current that divides.' }
      },
      {
        q: { zh: '两个电阻串联后总电阻：', en: 'Two resistors in series have a total resistance that is:' },
        o: [{ zh: '比任一个都大', en: 'larger than either' }, { zh: '比任一个都小', en: 'smaller than either' }, { zh: '等于两者之差', en: 'their difference' }, { zh: '等于两者之积', en: 'their product' }],
        a: 0,
        e: { zh: '串联相当于加长了导体，R = R₁ + R₂，所以比任一个都大。', en: 'Series lengthens the path: R = R₁ + R₂, larger than either.' }
      }
    ]
  });

  P.chapters.push({
    id: 'j-magnet', track: 'junior', no: '11', tag: '核心',
    kicker: { zh: '电与磁', en: 'Electricity and magnetism' },
    title: { zh: '电与磁', en: 'Electromagnetism' },
    summary: { zh: '电流生磁、磁场对电流的作用、电磁感应。', en: 'Current makes magnetism, magnetism moves current, and motion makes current.' },
    intro: {
      zh: '电与磁是一枚硬币的两面。奥斯特发现电流周围有磁场，法拉第反过来发现变化的磁场能产生电流 —— 这两步直接催生了电动机和发电机。',
      en: 'Electricity and magnetism are two faces of one coin. Oersted found a magnetic field around a current; Faraday found that a changing field drives a current. Those two steps gave us the motor and the generator.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'wire' }, label: { zh: '直线电流的磁场', en: 'Field around a wire' } },
      { type: 'field', cfg: { mode: 'magnet' }, label: { zh: '条形磁体的磁感线', en: 'Bar magnet field lines' } }
    ],
    concepts: [
      {
        t: { zh: '磁现象与磁场', en: 'Magnets and magnetic fields' },
        b: {
          zh: '磁体两端磁性最强，叫磁极（N 极和 S 极），同名磁极相斥、异名磁极相吸。磁体周围存在磁场，用小磁针可以感知它的方向。磁感线从 N 极出发回到 S 极（磁体外部），磁感线越密的地方磁场越强。',
          en: 'Magnetism is strongest at the poles. Like poles repel, unlike attract. A magnet is surrounded by a field, probed by a compass needle. Outside the magnet, field lines run from N to S; where they crowd together the field is stronger.'
        }
      },
      {
        t: { zh: '电流的磁效应', en: 'The magnetic effect of current' },
        b: {
          zh: '奥斯特实验表明：通电导线周围存在磁场，这就是电流的磁效应。通电螺线管的磁场与条形磁体相似，极性用安培定则判断：右手握住螺线管，四指指向电流方向，拇指所指的一端就是 N 极。电磁铁的磁性强弱由电流大小和线圈匝数决定。',
          en: 'Oersted showed that a current-carrying wire has a magnetic field. A solenoid behaves like a bar magnet; its polarity follows the right-hand grip rule — fingers along the current, thumb points to N. An electromagnet\'s strength grows with current and turns.'
        },
        note: { zh: '电磁铁的优点：磁性有无、强弱、极性都可以控制。', en: 'An electromagnet can be switched, tuned and reversed — that is its advantage over a permanent magnet.' }
      },
      {
        t: { zh: '磁场对电流的作用', en: 'Force on a current in a field' },
        b: {
          zh: '通电导体在磁场中会受到力的作用，力的方向与电流方向和磁场方向都有关，可用左手定则判断。电动机就是利用这个原理工作的：通电线圈在磁场中受力转动，把电能转化为机械能。换向器的作用是在线圈转过平衡位置时改变电流方向，使线圈持续转动。',
          en: 'A current-carrying conductor in a magnetic field feels a force whose direction depends on both the current and the field — the left-hand rule. A motor uses this: a coil turns and converts electrical energy into mechanical energy. A commutator reverses the current each half turn so rotation continues.'
        }
      },
      {
        t: { zh: '电磁感应', en: 'Electromagnetic induction' },
        b: {
          zh: '闭合电路的一部分导体在磁场中做切割磁感线运动时，导体中就会产生电流，这种现象叫电磁感应，产生的电流叫感应电流。感应电流的方向与导体运动方向和磁场方向有关。发电机就是利用电磁感应工作的，把机械能转化为电能。',
          en: 'When part of a closed circuit cuts field lines, a current appears — electromagnetic induction. Its direction depends on the motion and the field. Generators use it to turn mechanical energy into electrical energy.'
        },
        note: { zh: '电动机：电 → 机；发电机：机 → 电。原理相反，别混。', en: 'Motor: electricity → motion. Generator: motion → electricity. Opposite directions — keep them straight.' }
      }
    ],
    terms: [
      ['磁极', 'magnetic pole', 'N / S'], ['磁场', 'magnetic field', 'B'],
      ['磁感线', 'field line', '—'], ['电磁铁', 'electromagnet', '—'],
      ['安培定则', 'right-hand grip rule', '—'], ['电动机', 'motor', '—'],
      ['电磁感应', 'electromagnetic induction', '—'], ['发电机', 'generator', '—']
    ],
    practice: [
      {
        q: { zh: '奥斯特实验说明：', en: 'Oersted\'s experiment shows that:' },
        o: [{ zh: '磁体周围有磁场', en: 'a magnet has a field' }, { zh: '通电导线周围有磁场', en: 'a current has a magnetic field' }, { zh: '磁场能产生电流', en: 'a field produces a current' }, { zh: '电流在磁场中受力', en: 'a current feels a force in a field' }],
        a: 1,
        e: { zh: '小磁针在通电导线旁发生偏转，说明电流周围存在磁场。', en: 'A compass needle deflects near a current-carrying wire — the current creates a field.' }
      },
      {
        q: { zh: '发电机的工作原理是：', en: 'A generator works by:' },
        o: [{ zh: '电流的磁效应', en: 'the magnetic effect of current' }, { zh: '磁场对电流的作用', en: 'force on a current in a field' }, { zh: '电磁感应', en: 'electromagnetic induction' }, { zh: '焦耳定律', en: 'Joule\'s law' }],
        a: 2,
        e: { zh: '线圈在磁场中转动切割磁感线，产生感应电流，把机械能转化为电能。', en: 'A coil rotating in a field cuts field lines, generating current from mechanical energy.' }
      },
      {
        q: { zh: '要增强电磁铁的磁性，可行的做法是：', en: 'To strengthen an electromagnet you can:' },
        o: [{ zh: '减小电流', en: 'reduce the current' }, { zh: '增加线圈匝数', en: 'add more turns' }, { zh: '换用更细的导线', en: 'use thinner wire' }, { zh: '把铁芯取出', en: 'remove the iron core' }],
        a: 1,
        e: { zh: '磁性随电流增大、匝数增多而增强；插入铁芯也会大大增强。', en: 'More current or more turns strengthens it, and an iron core helps a lot.' }
      }
    ]
  });

  // keep declaration order deterministic (junior first, then senior)
  P.juniorCount = P.chapters.length;
})();
