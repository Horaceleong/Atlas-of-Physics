/* content-senior.js — 高中物理 · Senior secondary physics (bilingual) */
(function () {
  const P = window.PHYS;
  P.chapters = P.chapters || [];

  P.chapters.push({
    id: 'h-kinematics', track: 'senior', no: '01', tag: '必修',
    kicker: { zh: '力學 · 運動學', en: 'Mechanics · kinematics' },
    title: { zh: '運動的描述', en: 'Describing Motion' },
    summary: { zh: '位移、速度、加速度與勻變速直線運動。', en: 'Displacement, velocity, acceleration and uniform acceleration.' },
    intro: {
      zh: '運動學只回答"怎樣運動"，不追問"為什麼"。五個量 —— 位置、位移、速度、加速度、時間 —— 加上三條公式和兩張圖像，足以描述一切勻變速直線運動。',
      en: 'Kinematics answers "how", not "why". Five quantities — position, displacement, velocity, acceleration, time — plus three equations and two graphs describe every uniformly accelerated motion.'
    },
    sims: [{ type: 'projectile', cfg: {}, label: { zh: '拋體運動', en: 'Projectile motion' } }],
    concepts: [
      {
        t: { zh: '質點與參考系', en: 'Particles and reference frames' },
        b: {
          zh: '當物體的大小和形狀對所研究的問題影響可以忽略時，可以把物體看成質點。參考系是描述運動時選作參照的物體；選擇不同參考系，同一運動的描述可以不同，但物理規律的形式不變（伽利略相對性原理）。',
          en: 'When size and shape do not matter for the question, treat the body as a point. A reference frame is the body you measure against; different frames give different descriptions of the same motion, though the laws keep their form.'
        }
      },
      {
        t: { zh: '位移與速度', en: 'Displacement and velocity' },
        b: {
          zh: '位移是初位置指向末位置的有向線段，是矢量；路程是軌跡的長度，是標量。平均速度等於位移與時間之比，方向與位移相同。瞬時速度是 Δt 趨近於零時平均速度的極限，其大小叫瞬時速率。',
          en: 'Displacement is the arrow from start to finish — a vector; distance is the length of the path — a scalar. Average velocity is displacement over time, pointing along the displacement. Instantaneous velocity is the limit as Δt → 0; its magnitude is speed.'
        },
        f: '<i>v̄</i> = Δ<i>x</i>/Δ<i>t</i>　　<i>v</i> = lim<sub>Δ<i>t</i>→0</sub> Δ<i>x</i>/Δ<i>t</i>'
      },
      {
        t: { zh: '加速度', en: 'Acceleration' },
        b: {
          zh: '加速度是速度的變化率：a = Δv/Δt，單位 m/s²。加速度是矢量，方向與 Δv 的方向相同，與速度方向不一定相同。a 與 v 同向則加速，反向則減速。速度大不代表加速度大：勻速飛行的飛機加速度為零。',
          en: 'Acceleration is the rate of change of velocity, a = Δv/Δt, in m/s². It points along Δv — not necessarily along v. Same direction: speeding up; opposite: slowing down. A fast plane in level flight has zero acceleration.'
        },
        f: '<i>a</i> = Δ<i>v</i>/Δ<i>t</i>'
      },
      {
        t: { zh: '勻變速直線運動的規律', en: 'Uniformly accelerated motion' },
        b: {
          zh: '加速度恆定是勻變速運動。三個基本公式中只有兩個獨立，解題時任選兩個即可。當問題不涉及時間時，用速度位移關係式最方便。初速度為零的勻加速運動，第 1、2、3 秒內的位移之比為 1∶3∶5。',
          en: 'Constant acceleration defines the motion. Only two of the three equations are independent; pick the pair that avoids what you do not know. When time is irrelevant, use the velocity–displacement relation. From rest, the distances covered in successive seconds go 1:3:5.'
        },
        f: '<i>v</i> = <i>v</i><sub>0</sub>+<i>at</i>　　<i>x</i> = <i>v</i><sub>0</sub><i>t</i>+½<i>at</i><sup>2</sup>　　<i>v</i><sup>2</sup>−<i>v</i><sub>0</sub><sup>2</sup> = 2<i>ax</i>'
      },
      {
        t: { zh: '自由落體與運動圖像', en: 'Free fall and motion graphs' },
        b: {
          zh: '自由落體是初速度為零、加速度為 g 的勻加速直線運動，g ≈ 9.8 m/s²（粗略計算取 10）。x–t 圖像的斜率是速度，v–t 圖像的斜率是加速度、圖線與時間軸圍成的面積是位移。圖像只能描述直線運動，不能畫曲線軌跡。',
          en: 'Free fall starts from rest with a = g ≈ 9.8 m/s². On an x–t graph the slope is velocity; on a v–t graph the slope is acceleration and the area under the line is displacement. These graphs describe one-dimensional motion only — they never show a curved path.'
        },
        f: '<i>h</i> = ½<i>gt</i><sup>2</sup>　　<i>v</i> = <i>gt</i>'
      }
    ],
    terms: [
      ['質點', 'particle', '—'], ['參考系', 'reference frame', '—'],
      ['位移', 'displacement', 'x'], ['路程', 'distance', 's'],
      ['平均速度', 'average velocity', 'v̄'], ['瞬時速度', 'instantaneous velocity', 'v'],
      ['加速度', 'acceleration', 'a'], ['自由落體', 'free fall', '—']
    ],
    practice: [
      {
        q: { zh: '物體做勻加速直線運動，初速度 2 m/s，加速度 3 m/s²，4 s 末的速度是：', en: 'Starting at 2 m/s with a = 3 m/s² for 4 s, the final velocity is:' },
        o: [{ zh: '10 m/s', en: '10 m/s' }, { zh: '12 m/s', en: '12 m/s' }, { zh: '14 m/s', en: '14 m/s' }, { zh: '8 m/s', en: '8 m/s' }],
        a: 2,
        e: { zh: 'v = v₀ + at = 2 + 3×4 = 14 m/s。', en: 'v = v₀ + at = 14 m/s.' }
      },
      {
        q: { zh: '關於加速度，下列說法正確的是：', en: 'Which statement about acceleration is correct?' },
        o: [{ zh: '速度大則加速度大', en: 'large speed means large acceleration' }, { zh: '加速度方向一定與速度方向相同', en: 'it always points along the velocity' }, { zh: '加速度為零時速度可以不為零', en: 'zero acceleration allows non-zero velocity' }, { zh: '速度變化量大則加速度大', en: 'large velocity change means large acceleration' }],
        a: 2,
        e: { zh: '勻速直線運動速度不為零而加速度為零。加速度取決於速度變化的快慢，不只是變化量。', en: 'Uniform motion has constant non-zero velocity and zero acceleration; acceleration measures how fast velocity changes, not by how much.' }
      },
      {
        q: { zh: 'v–t 圖像中，圖線與時間軸圍成的面積表示：', en: 'On a v–t graph, the area between the line and the time axis is:' },
        o: [{ zh: '加速度', en: 'acceleration' }, { zh: '位移', en: 'displacement' }, { zh: '路程', en: 'distance' }, { zh: '平均速度', en: 'average velocity' }],
        a: 1,
        e: { zh: '面積 = vΔt，量綱就是位移；t 軸下方的面積取負，代表反向位移。', en: 'Area = vΔt, a displacement. Area below the axis counts negative — motion in the opposite direction.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-newton', track: 'senior', no: '02', tag: '必修',
    kicker: { zh: '力學 · 動力學', en: 'Mechanics · dynamics' },
    title: { zh: '力與牛頓運動定律', en: 'Forces and Newton\'s Laws' },
    summary: { zh: '三種力、力的合成分解、F = ma 與超重失重。', en: 'Three forces, vector addition, F = ma, and apparent weight.' },
    intro: {
      zh: '動力學要回答"為什麼這樣運動"。核心只有一個式子 F合 = ma：左邊是受力分析，右邊是運動狀態。把兩邊都寫清楚，題就解完了。',
      en: 'Dynamics asks why. Everything reduces to F_net = ma: the left side is a force analysis, the right side a description of motion. Write both clearly and the problem is done.'
    },
    sims: [
      { type: 'incline', label: { zh: '斜面受力', en: 'Forces on an incline' } },
      { type: 'elevator', label: { zh: '超重與失重', en: 'Apparent weight' } }
    ],
    concepts: [
      {
        t: { zh: '重力、彈力與摩擦力', en: 'Gravity, elastic force, friction' },
        b: {
          zh: '重力 G = mg，方向豎直向下。彈力方向總是垂直於接觸面（繩的拉力沿繩）。摩擦力分為靜摩擦和滑動摩擦：靜摩擦力大小由平衡條件決定，範圍是 0 ≤ f ≤ f_max；滑動摩擦力 f = μN，與接觸面積和相對速度無關。',
          en: 'Weight is mg, vertically down. Elastic forces act perpendicular to the contact surface (a rope pulls along itself). Static friction is whatever the balance requires, up to a maximum; kinetic friction is f = μN, independent of contact area and speed.'
        },
        f: '<i>G</i> = <i>mg</i>　　<i>f</i> = <i>μN</i>　　<i>F</i> = <i>kx</i>'
      },
      {
        t: { zh: '力的合成與分解', en: 'Adding and resolving forces' },
        b: {
          zh: '力是矢量，合成遵循平行四邊形定則。兩個大小分別為 F₁、F₂ 的力，合力範圍是 |F₁−F₂| ≤ F ≤ F₁+F₂。分解是合成的逆運算，通常按效果分解或正交分解：建立直角坐標系，把每個力投影到兩軸上，再分別求和。',
          en: 'Forces add by the parallelogram rule. Two forces of magnitudes F₁ and F₂ give a resultant between |F₁−F₂| and F₁+F₂. Resolution is the inverse: choose axes, project every force, then sum along each axis.'
        },
        f: '<i>F</i> = √(<i>F</i><sub>1</sub><sup>2</sup>+<i>F</i><sub>2</sub><sup>2</sup>+2<i>F</i><sub>1</sub><i>F</i><sub>2</sub>cos<i>θ</i>)'
      },
      {
        t: { zh: '牛頓三定律', en: 'Newton\'s three laws' },
        b: {
          zh: '第一定律：不受外力時物體保持靜止或勻速直線運動 —— 定義了慣性系。第二定律：F合 = ma，加速度與合外力同向，與質量成反比。第三定律：作用力與反作用力大小相等、方向相反、作用在同一直線上，分別作用在兩個物體上，同時產生同時消失。',
          en: 'First: with no net force, a body keeps its velocity — this defines an inertial frame. Second: F = ma, acceleration along the net force, inversely proportional to mass. Third: action and reaction are equal, opposite, collinear, act on different bodies, and appear and vanish together.'
        },
        f: '<i>F</i><sub>合</sub> = <i>ma</i>'
      },
      {
        t: { zh: '超重與失重', en: 'Overweight and weightlessness' },
        b: {
          zh: '超重和失重指的是視重（支持力或拉力）的變化，物體的重力並沒有變。加速度向上時超重：N = m(g+a)；加速度向下時失重：N = m(g−a)；自由落體時 a = g，N = 0，叫完全失重。宇宙飛船中的失重就是自由落體狀態。',
          en: 'Overweight and weightlessness describe the apparent weight — the normal force — not gravity, which is unchanged. Upward acceleration gives N = m(g+a); downward gives N = m(g−a); free fall gives N = 0. Weightlessness in orbit is free fall, not absent gravity.'
        },
        f: '<i>N</i> = <i>m</i>(<i>g</i>±<i>a</i>)'
      },
      {
        t: { zh: '連接體問題', en: 'Connected bodies' },
        b: {
          zh: '幾個物體一起運動時，先把它們看成一個整體求加速度（整體法），再隔離其中一個物體求相互作用力（隔離法）。整體法不涉及內力，隔離法能求出內力，兩者配合最省力。',
          en: 'For bodies moving together, treat them as one system to find the acceleration, then isolate one to find the internal force. The system approach hides internal forces; isolation reveals them. Use both.'
        }
      }
    ],
    terms: [
      ['合外力', 'net force', 'F合'], ['慣性', 'inertia', '—'],
      ['靜摩擦力', 'static friction', 'f'], ['滑動摩擦力', 'kinetic friction', 'f'],
      ['正交分解', 'orthogonal resolution', '—'], ['超重', 'overweight', '—'],
      ['失重', 'weightlessness', '—'], ['視重', 'apparent weight', 'N']
    ],
    practice: [
      {
        q: { zh: '質量 2 kg 的物體受到 6 N 的合外力，加速度為：', en: 'A 2 kg body under a 6 N net force has acceleration:' },
        o: [{ zh: '3 m/s²', en: '3 m/s²' }, { zh: '12 m/s²', en: '12 m/s²' }, { zh: '0.33 m/s²', en: '0.33 m/s²' }, { zh: '6 m/s²', en: '6 m/s²' }],
        a: 0,
        e: { zh: 'a = F/m = 6/2 = 3 m/s²。', en: 'a = F/m = 3 m/s².' }
      },
      {
        q: { zh: '電梯以 2 m/s² 的加速度豎直向上加速，質量為 50 kg 的人對地板的壓力為（g 取 10）：', en: 'A lift accelerates upward at 2 m/s². The floor force on a 50 kg person is (g = 10):' },
        o: [{ zh: '400 N', en: '400 N' }, { zh: '500 N', en: '500 N' }, { zh: '600 N', en: '600 N' }, { zh: '1000 N', en: '1000 N' }],
        a: 2,
        e: { zh: '加速度向上為超重：N = m(g+a) = 50×12 = 600 N。', en: 'Upward acceleration: N = m(g+a) = 600 N.' }
      },
      {
        q: { zh: '關於作用力與反作用力，正確的是：', en: 'Which is true of action–reaction pairs?' },
        o: [{ zh: '作用在同一物體上', en: 'they act on the same body' }, { zh: '可以相互抵消', en: 'they cancel each other' }, { zh: '分別作用在兩個物體上', en: 'they act on two different bodies' }, { zh: '性質可以不同', en: 'they may be of different kinds' }],
        a: 2,
        e: { zh: '作用力與反作用力作用在兩個不同物體上，不能求合力、不能抵消；性質相同、同時存在。', en: 'They act on two bodies, so they never cancel; they are of the same kind and exist together.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-projectile', track: 'senior', no: '03', tag: '必修',
    kicker: { zh: '力學 · 二維運動', en: 'Mechanics · two dimensions' },
    title: { zh: '曲線運動與拋體', en: 'Curvilinear Motion and Projectiles' },
    summary: { zh: '運動的合成分解，平拋與斜拋。', en: 'Composing motions: horizontal and oblique projectiles.' },
    intro: {
      zh: '曲線運動的處理辦法只有一個：分解。平拋運動分解成水平勻速直線運動和豎直自由落體運動，兩個方向互不影響，只用時間把它們連起來。',
      en: 'There is one method for curved motion: decompose it. A horizontal projectile is uniform motion across and free fall down. The two are independent — only time links them.'
    },
    sims: [{ type: 'projectile', cfg: {}, label: { zh: '拋體軌跡與速度分解', en: 'Trajectory and velocity components' } }],
    concepts: [
      {
        t: { zh: '曲線運動的條件', en: 'When motion curves' },
        b: {
          zh: '物體做曲線運動的條件是：合外力的方向與速度方向不在同一直線上。曲線運動的軌跡總是向合力所指的一側彎曲，速度方向沿軌跡的切線。速度方向時刻改變，所以曲線運動一定是變速運動。',
          en: 'Motion curves when the net force is not collinear with the velocity. The path bends toward the force, and the velocity is always tangent to the path. Since the direction keeps changing, curved motion is always accelerated motion.'
        }
      },
      {
        t: { zh: '運動的合成與分解', en: 'Composing and resolving motions' },
        b: {
          zh: '一個物體同時參與幾個分運動時，實際運動是合運動。分運動具有獨立性（互不影響）和等時性（同時進行、時間相同）。小船渡河問題中，船在靜水中的速度與水流速度合成，最短時間對應船頭垂直河岸，最短位移對應合速度垂直河岸。',
          en: 'When a body takes part in several motions at once, the real motion is their sum. Components are independent yet simultaneous. For a boat crossing a river, boat speed and current add: the shortest time comes from pointing straight across, the shortest path from steering upstream.'
        }
      },
      {
        t: { zh: '平拋運動', en: 'Horizontal projectiles' },
        b: {
          zh: '平拋運動可分解為水平方向的勻速直線運動和豎直方向的自由落體運動。水平位移 x = v₀t，豎直位移 y = ½gt²，落地時間只由高度決定，與初速度無關。速度偏角 tanθ = v_y/v_x = gt/v₀，位移偏角 tanα = y/x = gt/(2v₀)，可見 tanθ = 2tanα。',
          en: 'Split it into uniform motion horizontally and free fall vertically: x = v₀t, y = ½gt². The time of flight depends only on height. The velocity angle satisfies tanθ = gt/v₀, the displacement angle tanα = gt/(2v₀), so tanθ = 2tanα.'
        },
        f: '<i>x</i> = <i>v</i><sub>0</sub><i>t</i>　　<i>y</i> = ½<i>gt</i><sup>2</sup>　　<i>t</i> = √(2<i>h</i>/<i>g</i>)'
      },
      {
        t: { zh: '斜拋運動', en: 'Oblique projectiles' },
        b: {
          zh: '斜拋運動分解為水平勻速運動和豎直上拋運動。飛行時間 t = 2v₀sinθ/g，射高 H = v₀²sin²θ/(2g)，射程 R = v₀²sin2θ/g。初速度一定時，45° 拋射角射程最大；互餘的兩個角度（如 30° 與 60°）射程相同。',
          en: 'An oblique launch splits into uniform horizontal motion and vertical throw. Flight time 2v₀sinθ/g, height v₀²sin²θ/2g, range v₀²sin2θ/g. For fixed speed, 45° maximises range, and complementary angles give equal ranges.'
        },
        f: '<i>R</i> = <i>v</i><sub>0</sub><sup>2</sup>sin2<i>θ</i>/<i>g</i>　　<i>H</i> = <i>v</i><sub>0</sub><sup>2</sup>sin<sup>2</sup><i>θ</i>/(2<i>g</i>)'
      }
    ],
    terms: [
      ['曲線運動', 'curvilinear motion', '—'], ['合運動', 'resultant motion', '—'],
      ['分運動', 'component motion', '—'], ['平拋運動', 'horizontal projectile', '—'],
      ['斜拋運動', 'oblique projectile', '—'], ['射程', 'range', 'R'],
      ['射高', 'maximum height', 'H'], ['切線方向', 'tangential direction', '—']
    ],
    practice: [
      {
        q: { zh: '從 20 m 高處水平拋出一個小球，落地時間約為（g 取 10）：', en: 'A ball is thrown horizontally from 20 m. Time to land (g = 10):' },
        o: [{ zh: '1 s', en: '1 s' }, { zh: '2 s', en: '2 s' }, { zh: '3 s', en: '3 s' }, { zh: '4 s', en: '4 s' }],
        a: 1,
        e: { zh: '豎直方向自由落體：h = ½gt²，t = √(2×20/10) = 2 s。', en: 'Vertically it is free fall: t = √(2h/g) = 2 s.' }
      },
      {
        q: { zh: '平拋運動中，決定飛行時間的因素是：', en: 'What determines the flight time of a horizontal projectile?' },
        o: [{ zh: '初速度', en: 'initial speed' }, { zh: '拋出點高度', en: 'launch height' }, { zh: '物體質量', en: 'mass' }, { zh: '水平位移', en: 'horizontal range' }],
        a: 1,
        e: { zh: 't = √(2h/g) 只與高度和 g 有關，與初速度無關。', en: 't = √(2h/g): only height and g matter.' }
      },
      {
        q: { zh: '以相同速率斜拋，射程最大的拋射角是：', en: 'For a fixed launch speed, the range is greatest at:' },
        o: [{ zh: '30°', en: '30°' }, { zh: '45°', en: '45°' }, { zh: '60°', en: '60°' }, { zh: '90°', en: '90°' }],
        a: 1,
        e: { zh: 'R = v₀²sin2θ/g，2θ = 90° 即 θ = 45° 時最大。', en: 'R is maximal when sin2θ = 1, i.e. θ = 45°.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-circular', track: 'senior', no: '04', tag: '必修',
    kicker: { zh: '力學 · 圓周與引力', en: 'Mechanics · circles and gravity' },
    title: { zh: '圓周運動與萬有引力', en: 'Circular Motion and Gravitation' },
    summary: { zh: '向心力、天體運動、衞星與宇宙速度。', en: 'Centripetal force, orbits, satellites and escape speeds.' },
    intro: {
      zh: '圓周運動不是"多了一種力"，而是合力恰好指向圓心。萬有引力提供天體做圓周運動的向心力 —— 這一句話把天上的運動和地上的落體統一了起來。',
      en: 'Circular motion is not a new kind of force: the net force simply points to the centre. Gravity supplies that force for planets — one sentence uniting the heavens and the falling apple.'
    },
    sims: [{ type: 'orbit', label: { zh: '衞星軌道', en: 'Satellite orbit' } }],
    concepts: [
      {
        t: { zh: '描述圓周運動的物理量', en: 'Describing circular motion' },
        b: {
          zh: '線速度 v = Δs/Δt = 2πr/T，角速度 ω = Δθ/Δt = 2π/T，二者關係 v = ωr。週期 T 是轉一圈的時間，轉速 n 是每秒轉過的圈數。向心加速度 a = v²/r = ω²r = 4π²r/T²，方向始終指向圓心，只改變速度方向，不改變速度大小。',
          en: 'Linear speed v = 2πr/T, angular speed ω = 2π/T, related by v = ωr. Period is one revolution; frequency is revolutions per second. Centripetal acceleration a = v²/r = ω²r points to the centre and changes only the direction of velocity, never its magnitude.'
        },
        f: '<i>v</i> = <i>ωr</i>　　<i>a</i> = <i>v</i><sup>2</sup>/<i>r</i> = <i>ω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '向心力', en: 'Centripetal force' },
        b: {
          zh: '向心力是按效果命名的力，不是一種新的性質力。它由實際的力（重力、彈力、摩擦力、萬有引力等）或它們的合力提供。分析問題時先找誰提供向心力，再列 F = mv²/r，這是解圓周運動問題的通用思路。',
          en: 'Centripetal force is named by its effect, not by its nature. It is provided by real forces — gravity, tension, friction — or their resultant. Find the provider first, then write F = mv²/r.'
        },
        f: '<i>F</i> = <i>mv</i><sup>2</sup>/<i>r</i> = <i>mω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '豎直平面內的圓周運動', en: 'Vertical circular motion' },
        b: {
          zh: '用繩繫着小球在豎直平面內做圓周運動，最高點的臨界條件是重力恰好提供向心力：mg = mv²/R，即 v_min = √(gR)。速度小於這個值，小球會在到達最高點前脱離圓軌道。用輕杆連接時，最高點速度可以為零，因為杆能提供支持力。',
          en: 'For a ball on a string in a vertical circle, the top is critical: gravity alone supplies the centripetal force, so v_min = √(gR). Below that the string goes slack. With a rigid rod the speed at the top can be zero, since the rod can push.'
        },
        f: '<i>v</i><sub>min</sub> = √(<i>gR</i>)（繩模型）'
      },
      {
        t: { zh: '萬有引力定律', en: 'Newton\'s law of gravitation' },
        b: {
          zh: '任意兩個質點之間的引力大小與質量乘積成正比、與距離平方成反比：F = GMm/r²，G = 6.67×10⁻¹¹ N·m²/kg²。天體表面重力加速度 g = GM/R²。卡文迪什用扭秤測出了 G，被稱為"稱量地球質量的人"。',
          en: 'Any two masses attract with F = GMm/r², G = 6.67×10⁻¹¹ N·m²/kg². Surface gravity is g = GM/R². Cavendish measured G with a torsion balance — "weighing the Earth".'
        },
        f: '<i>F</i> = <i>GMm</i>/<i>r</i><sup>2</sup>　　<i>g</i> = <i>GM</i>/<i>R</i><sup>2</sup>'
      },
      {
        t: { zh: '衞星與宇宙速度', en: 'Satellites and cosmic speeds' },
        b: {
          zh: '衞星繞地球做勻速圓周運動時，萬有引力提供向心力：GMm/r² = mv²/r，得 v = √(GM/r)。軌道越高，線速度越小、週期越大。第一宇宙速度 7.9 km/s 是近地衞星的環繞速度，也是發射衞星的最小速度；第二宇宙速度 11.2 km/s 是脱離地球的速度；第三宇宙速度 16.7 km/s 是脱離太陽系的速度。',
          en: 'For a satellite, gravity is the centripetal force: v = √(GM/r). Higher orbits are slower and longer-period. The first cosmic speed 7.9 km/s is low-Earth orbit speed and the minimum launch speed; 11.2 km/s escapes Earth; 16.7 km/s escapes the Solar System.'
        },
        f: '<i>v</i> = √(<i>GM</i>/<i>r</i>)　　<i>T</i> = 2π√(<i>r</i><sup>3</sup>/<i>GM</i>)'
      }
    ],
    terms: [
      ['線速度', 'linear speed', 'v'], ['角速度', 'angular speed', 'ω'],
      ['週期', 'period', 'T'], ['向心加速度', 'centripetal acceleration', 'a'],
      ['向心力', 'centripetal force', 'F'], ['萬有引力', 'gravitation', 'F'],
      ['第一宇宙速度', 'first cosmic speed', '7.9 km/s'], ['開普勒定律', 'Kepler\'s laws', '—']
    ],
    practice: [
      {
        q: { zh: '半徑 0.5 m 的圓軌道上，物體以 2 m/s 做勻速圓周運動，向心加速度為：', en: 'On a 0.5 m radius at 2 m/s, the centripetal acceleration is:' },
        o: [{ zh: '2 m/s²', en: '2 m/s²' }, { zh: '4 m/s²', en: '4 m/s²' }, { zh: '8 m/s²', en: '8 m/s²' }, { zh: '1 m/s²', en: '1 m/s²' }],
        a: 2,
        e: { zh: 'a = v²/r = 4/0.5 = 8 m/s²。', en: 'a = v²/r = 8 m/s².' }
      },
      {
        q: { zh: '衞星軌道半徑增大時，它的線速度：', en: 'As a satellite\'s orbital radius increases, its speed:' },
        o: [{ zh: '增大', en: 'increases' }, { zh: '減小', en: 'decreases' }, { zh: '不變', en: 'stays the same' }, { zh: '先增大後減小', en: 'rises then falls' }],
        a: 1,
        e: { zh: 'v = √(GM/r)，r 越大 v 越小，週期越長。', en: 'v = √(GM/r): larger r means slower motion and a longer period.' }
      },
      {
        q: { zh: '第一宇宙速度約為：', en: 'The first cosmic speed is about:' },
        o: [{ zh: '3.0 km/s', en: '3.0 km/s' }, { zh: '7.9 km/s', en: '7.9 km/s' }, { zh: '11.2 km/s', en: '11.2 km/s' }, { zh: '16.7 km/s', en: '16.7 km/s' }],
        a: 1,
        e: { zh: '由 v = √(GM/R) 代入地球數據得 7.9 km/s。', en: 'Putting Earth\'s data into v = √(GM/R) gives 7.9 km/s.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-energy', track: 'senior', no: '05', tag: '必修',
    kicker: { zh: '力學 · 能量', en: 'Mechanics · energy' },
    title: { zh: '功和機械能', en: 'Work and Mechanical Energy' },
    summary: { zh: '功、功率、動能定理與機械能守恆。', en: 'Work, power, the work–energy theorem and conservation.' },
    intro: {
      zh: '能量方法最大的好處是不必關心中間過程。只要知道初末狀態，動能定理就能跨過所有複雜的受力和路徑 —— 這是解力學題的第二條路。',
      en: 'The energy method frees you from the details of the path. Given the initial and final states, the work–energy theorem leaps over complicated forces and trajectories — the second route through mechanics.'
    },
    sims: [{ type: 'coaster', label: { zh: '能量轉化', en: 'Energy exchange' } }],
    concepts: [
      {
        t: { zh: '功', en: 'Work' },
        b: {
          zh: '功等於力與位移在力的方向上的分量的乘積：W = Flcosθ。θ < 90° 時做正功，θ = 90° 時不做功，θ > 90° 時做負功。功是標量，但有正負；總功等於各力做功的代數和，也等於合力的功。',
          en: 'Work is force times the displacement along it: W = Flcosθ. Acute angle: positive work; right angle: none; obtuse: negative. Work is a scalar with a sign. Total work is the algebraic sum of the individual works, and equals the work of the net force.'
        },
        f: '<i>W</i> = <i>Fl</i>cos<i>θ</i>'
      },
      {
        t: { zh: '功率', en: 'Power' },
        b: {
          zh: '平均功率 P = W/t，瞬時功率 P = Fvcosθ。機車啓動有兩種典型方式：以恆定功率啓動，牽引力隨速度增大而減小，做加速度減小的加速運動；以恆定牽引力啓動，功率隨時間線性增大，達到額定功率後再做變加速運動。',
          en: 'Average power is W/t; instantaneous power is Fvcosθ. A locomotive can start at constant power (tractive force falls as speed rises, so acceleration decreases) or at constant force (power climbs until rated, then acceleration tapers).'
        },
        f: '<i>P</i> = <i>W</i>/<i>t</i> = <i>Fv</i>cos<i>θ</i>'
      },
      {
        t: { zh: '動能定理', en: 'The work–energy theorem' },
        b: {
          zh: '合外力對物體做的功等於物體動能的變化：W合 = ½mv² − ½mv₀²。動能定理對變力做功、曲線運動同樣成立，因為它只關心初末動能。這是它比牛頓第二定律更通用的地方。',
          en: 'The net work equals the change in kinetic energy: W = ½mv² − ½mv₀². It holds for varying forces and curved paths because it looks only at the endpoints — which is why it is more general than F = ma in practice.'
        },
        f: '<i>W</i><sub>合</sub> = ½<i>mv</i><sup>2</sup> − ½<i>mv</i><sub>0</sub><sup>2</sup>'
      },
      {
        t: { zh: '勢能', en: 'Potential energy' },
        b: {
          zh: '重力勢能 Ep = mgh，h 是相對參考面的高度，所以重力勢能具有相對性，但重力勢能的變化與參考面無關。重力做正功，重力勢能減少。彈性勢能 Ep = ½kx²，由形變量決定。勢能屬於系統，不屬於單個物體。',
          en: 'Gravitational potential energy is mgh measured from a chosen level — relative, though changes are not. Gravity doing positive work lowers it. Elastic potential energy is ½kx². Potential energy belongs to a system, not to one body.'
        },
        f: '<i>E</i><sub>p</sub> = <i>mgh</i>　　<i>E</i><sub>p</sub> = ½<i>kx</i><sup>2</sup>'
      },
      {
        t: { zh: '機械能守恆定律', en: 'Conservation of mechanical energy' },
        b: {
          zh: '在只有重力或彈力做功的系統中，動能與勢能相互轉化，機械能的總量保持不變：Eк₁ + Ep₁ = Eк₂ + Ep₂。判斷是否守恆，關鍵看有沒有其他力做功（如摩擦力、空氣阻力、外力）。有摩擦時用能量守恆：減少的機械能等於產生的內能。',
          en: 'When only gravity and spring forces do work, kinetic and potential energy trade but their sum stays fixed. To test for conservation, look for other forces doing work — friction, drag, an external push. With friction, use total energy: the lost mechanical energy becomes internal energy.'
        },
        f: '<i>E</i><sub>k1</sub>+<i>E</i><sub>p1</sub> = <i>E</i><sub>k2</sub>+<i>E</i><sub>p2</sub>'
      }
    ],
    terms: [
      ['功', 'work', 'W'], ['功率', 'power', 'P'], ['動能', 'kinetic energy', 'Ek'],
      ['動能定理', 'work–energy theorem', '—'], ['重力勢能', 'gravitational PE', 'Ep'],
      ['彈性勢能', 'elastic PE', 'Ep'], ['機械能守恆', 'energy conservation', '—'],
      ['額定功率', 'rated power', '—']
    ],
    practice: [
      {
        q: { zh: '物體在 10 N 的水平力作用下沿力的方向移動 3 m，該力做的功為：', en: 'A 10 N horizontal force moves a body 3 m along its direction. Work done:' },
        o: [{ zh: '3 J', en: '3 J' }, { zh: '10 J', en: '10 J' }, { zh: '30 J', en: '30 J' }, { zh: '0 J', en: '0 J' }],
        a: 2,
        e: { zh: 'W = Fl = 10 × 3 = 30 J。', en: 'W = Fl = 30 J.' }
      },
      {
        q: { zh: '質量 1 kg 的物體速度由 2 m/s 增大到 6 m/s，合外力做的功為：', en: 'A 1 kg body speeds up from 2 to 6 m/s. Net work done:' },
        o: [{ zh: '8 J', en: '8 J' }, { zh: '16 J', en: '16 J' }, { zh: '32 J', en: '32 J' }, { zh: '4 J', en: '4 J' }],
        a: 1,
        e: { zh: 'W = ½×1×(36−4) = 16 J。', en: 'W = ½(36 − 4) = 16 J.' }
      },
      {
        q: { zh: '下列過程中機械能守恆的是：', en: 'Mechanical energy is conserved when:' },
        o: [{ zh: '物體沿粗糙斜面下滑', en: 'sliding down a rough incline' }, { zh: '物體做自由落體運動', en: 'a body falls freely' }, { zh: '物體在水平面上被推着加速', en: 'pushed to speed up on a level floor' }, { zh: '汽車剎車', en: 'a car brakes' }],
        a: 1,
        e: { zh: '自由落體只受重力，只有重力做功，機械能守恆。', en: 'Free fall involves only gravity, so mechanical energy is conserved.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-momentum', track: 'senior', no: '06', tag: '選修',
    kicker: { zh: '力學 · 守恆', en: 'Mechanics · conservation' },
    title: { zh: '動量與碰撞', en: 'Momentum and Collisions' },
    summary: { zh: '衝量、動量定理、動量守恆與碰撞。', en: 'Impulse, momentum, conservation and collisions.' },
    intro: {
      zh: '碰撞過程力大、時間短，用牛頓定律幾乎算不動；但動量總是守恆的。這就是為什麼動量守恆在處理爆炸、碰撞、反衝時如此好用。',
      en: 'Collisions involve huge forces over tiny times, hopeless for F = ma. Momentum, however, is conserved. That is why it handles collisions, explosions and recoil so well.'
    },
    sims: [{ type: 'collision', label: { zh: '一維碰撞', en: 'One-dimensional collision' } }],
    concepts: [
      {
        t: { zh: '衝量與動量', en: 'Impulse and momentum' },
        b: {
          zh: '動量 p = mv，是矢量，方向與速度相同，單位 kg·m/s。衝量 I = FΔt，也是矢量，方向與力的方向相同。衝量是過程量，動量是狀態量；二者通過動量定理聯繫起來。',
          en: 'Momentum p = mv is a vector along the velocity, in kg·m/s. Impulse I = FΔt is a vector along the force. Impulse describes a process, momentum a state; the momentum theorem connects them.'
        },
        f: '<i>p</i> = <i>mv</i>　　<i>I</i> = <i>F</i>Δ<i>t</i>'
      },
      {
        t: { zh: '動量定理', en: 'The momentum theorem' },
        b: {
          zh: '合外力的衝量等於物體動量的變化：I合 = Δp = mv₂ − mv₁。它解釋了為什麼緩衝能減小衝擊力：動量變化量一定時，延長作用時間就能減小平均作用力。安全氣囊、跳遠沙坑、包裝泡沫都是這個原理。',
          en: 'The net impulse equals the change in momentum: FΔt = Δp. This explains cushioning: for a fixed momentum change, stretching the time reduces the average force. Airbags, sand pits and foam packing all rely on it.'
        },
        f: '<i>F</i>Δ<i>t</i> = <i>mv</i><sub>2</sub> − <i>mv</i><sub>1</sub>'
      },
      {
        t: { zh: '動量守恆定律', en: 'Conservation of momentum' },
        b: {
          zh: '系統不受外力或所受合外力為零時，系統的總動量保持不變：m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′。內力遠大於外力時（碰撞、爆炸），可以近似認為動量守恆。動量守恆是矢量式，要規定正方向。',
          en: 'If a system feels no net external force, its total momentum is constant. When internal forces dwarf external ones — collisions, explosions — conservation holds approximately. It is a vector equation: fix a positive direction first.'
        },
        f: '<i>m</i><sub>1</sub><i>v</i><sub>1</sub>+<i>m</i><sub>2</sub><i>v</i><sub>2</sub> = <i>m</i><sub>1</sub><i>v</i><sub>1</sub>′+<i>m</i><sub>2</sub><i>v</i><sub>2</sub>′'
      },
      {
        t: { zh: '碰撞', en: 'Collisions' },
        b: {
          zh: '彈性碰撞：動量守恆且動能守恆，碰後兩物體分離。完全非彈性碰撞：碰後粘在一起以共同速度運動，動能損失最大。一般情況下，碰撞過程動量守恆，但動能有一部分轉化為內能和聲能。',
          en: 'Elastic: momentum and kinetic energy both conserved, bodies separate. Perfectly inelastic: they stick together, losing the maximum kinetic energy. In general momentum is conserved while some kinetic energy becomes heat and sound.'
        },
        f: '<i>v</i><sub>共</sub> = (<i>m</i><sub>1</sub><i>v</i><sub>1</sub>+<i>m</i><sub>2</sub><i>v</i><sub>2</sub>)/(<i>m</i><sub>1</sub>+<i>m</i><sub>2</sub>)'
      },
      {
        t: { zh: '反衝與爆炸', en: 'Recoil and explosions' },
        b: {
          zh: '原來靜止的系統，在內力作用下分成兩部分，總動量仍為零：0 = m₁v₁ + m₂v₂，兩部分運動方向相反。火箭噴氣、槍炮後坐、放射性衰變都屬於反衝。',
          en: 'A system initially at rest splitting under internal forces keeps zero total momentum: the parts move in opposite directions. Rockets, recoil and radioactive decay are all examples.'
        }
      }
    ],
    terms: [
      ['動量', 'momentum', 'p'], ['衝量', 'impulse', 'I'],
      ['動量定理', 'momentum theorem', '—'], ['動量守恆', 'conservation of momentum', '—'],
      ['彈性碰撞', 'elastic collision', '—'], ['完全非彈性碰撞', 'perfectly inelastic collision', '—'],
      ['反衝', 'recoil', '—']
    ],
    practice: [
      {
        q: { zh: '質量 2 kg 的物體以 3 m/s 運動，動量大小為：', en: 'A 2 kg body at 3 m/s has momentum:' },
        o: [{ zh: '1.5 kg·m/s', en: '1.5 kg·m/s' }, { zh: '6 kg·m/s', en: '6 kg·m/s' }, { zh: '5 kg·m/s', en: '5 kg·m/s' }, { zh: '9 kg·m/s', en: '9 kg·m/s' }],
        a: 1,
        e: { zh: 'p = mv = 2×3 = 6 kg·m/s。', en: 'p = mv = 6 kg·m/s.' }
      },
      {
        q: { zh: '跳遠時落在沙坑裏，是為了：', en: 'Landing in a sand pit is meant to:' },
        o: [{ zh: '減小動量變化量', en: 'reduce the momentum change' }, { zh: '延長作用時間，減小衝擊力', en: 'lengthen the impact time and cut the force' }, { zh: '增大衝量', en: 'increase the impulse' }, { zh: '減小重力', en: 'reduce gravity' }],
        a: 1,
        e: { zh: '動量變化量是確定的，沙坑使作用時間變長，由 F = Δp/Δt 知平均作用力變小。', en: 'Δp is fixed; a longer Δt means a smaller F.' }
      },
      {
        q: { zh: '質量 2 kg 的 A 以 4 m/s 撞上靜止的 2 kg 的 B 並粘在一起，共同速度為：', en: 'A 2 kg body at 4 m/s hits a stationary 2 kg body and sticks. Common speed:' },
        o: [{ zh: '1 m/s', en: '1 m/s' }, { zh: '2 m/s', en: '2 m/s' }, { zh: '4 m/s', en: '4 m/s' }, { zh: '8 m/s', en: '8 m/s' }],
        a: 1,
        e: { zh: '完全非彈性碰撞：v = (2×4)/(2+2) = 2 m/s。', en: 'Perfectly inelastic: v = 8/4 = 2 m/s.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-oscillation', track: 'senior', no: '07', tag: '選修',
    kicker: { zh: '力學 · 振動與波', en: 'Mechanics · oscillation and waves' },
    title: { zh: '機械振動與機械波', en: 'Oscillations and Waves' },
    summary: { zh: '簡諧運動、單擺、波的傳播與干涉。', en: 'SHM, pendulums, wave propagation and interference.' },
    intro: {
      zh: '振動是"來回"，波是"把振動傳出去"。抓住回復力、週期、振幅、波長四個量，振動和波的大部分問題都能定性判斷。',
      en: 'Oscillation is back-and-forth; a wave carries that oscillation outward. Four quantities — restoring force, period, amplitude, wavelength — settle most qualitative questions.'
    },
    sims: [
      { type: 'pendulum', label: { zh: '單擺', en: 'Simple pendulum' } },
      { type: 'wave', cfg: {}, label: { zh: '橫波', en: 'Transverse wave' } }
    ],
    concepts: [
      {
        t: { zh: '簡諧運動', en: 'Simple harmonic motion' },
        b: {
          zh: '物體所受回復力與位移成正比、方向相反的運動叫簡諧運動：F = −kx。位移隨時間按正弦規律變化 x = Asin(ωt+φ)，週期 T = 2π√(m/k)，只由系統本身決定，叫固有周期。簡諧運動中加速度與位移始終反向，平衡位置處速度最大、加速度為零。',
          en: 'Motion with a restoring force proportional and opposite to displacement: F = −kx. Position varies sinusoidally with period T = 2π√(m/k), fixed by the system itself. Acceleration is always opposite to displacement; at equilibrium speed peaks and acceleration vanishes.'
        },
        f: '<i>F</i> = −<i>kx</i>　　<i>T</i> = 2π√(<i>m</i>/<i>k</i>)'
      },
      {
        t: { zh: '單擺', en: 'The simple pendulum' },
        b: {
          zh: '擺角很小時（一般小於 5°），單擺的振動可看作簡諧運動，週期 T = 2π√(L/g)，與擺球質量和振幅無關，這叫單擺的等時性。利用這一點可以測重力加速度：g = 4π²L/T²。',
          en: 'For small angles (under about 5°), a pendulum is simple harmonic with T = 2π√(L/g), independent of bob mass and amplitude — isochronism. This gives a way to measure g: g = 4π²L/T².'
        },
        f: '<i>T</i> = 2π√(<i>L</i>/<i>g</i>)'
      },
      {
        t: { zh: '受迫振動與共振', en: 'Driven oscillation and resonance' },
        b: {
          zh: '阻尼振動中振幅逐漸減小，能量轉化為內能。受迫振動的頻率等於驅動力的頻率，與固有頻率無關。當驅動力頻率等於固有頻率時，振幅達到最大，這種現象叫共振。盪鞦韆要按固有頻率推，軍隊過橋要便步走，都是共振的實例。',
          en: 'In damped oscillation the amplitude decays as energy becomes heat. A driven oscillator moves at the driving frequency, not its own. When the two match, amplitude peaks: resonance. Pushing a swing in time, and breaking step on a bridge, are the practical lessons.'
        }
      },
      {
        t: { zh: '機械波', en: 'Mechanical waves' },
        b: {
          zh: '機械振動在介質中的傳播形成機械波，需要波源和介質。波傳播的是振動形式和能量，介質中的質點並不隨波遷移。波長 λ、頻率 f、波速 v 的關係是 v = λf = λ/T。波速由介質決定，頻率由波源決定。',
          en: 'A mechanical wave is oscillation travelling through a medium — it needs a source and a medium. What travels is the disturbance and its energy; the particles only oscillate in place. Wavelength, frequency and speed satisfy v = λf. Speed is set by the medium, frequency by the source.'
        },
        f: '<i>v</i> = <i>λf</i> = <i>λ</i>/<i>T</i>'
      },
      {
        t: { zh: '干涉、衍射與多普勒效應', en: 'Interference, diffraction, Doppler' },
        b: {
          zh: '兩列頻率相同、相位差恆定的波疊加，形成穩定的干涉圖樣：振動加強點與減弱點相間分佈。波繞過障礙物繼續傳播叫衍射，障礙物尺寸與波長相近時最明顯。波源與觀察者相對運動時，接收頻率發生變化，叫多普勒效應。',
          en: 'Two waves of equal frequency and fixed phase difference superpose into a stable pattern of strong and weak points. Diffraction is waves bending around obstacles, most obvious when the obstacle is comparable to the wavelength. Relative motion between source and observer shifts the received frequency — the Doppler effect.'
        }
      }
    ],
    terms: [
      ['簡諧運動', 'simple harmonic motion', '—'], ['回復力', 'restoring force', 'F'],
      ['振幅', 'amplitude', 'A'], ['週期', 'period', 'T'],
      ['固有頻率', 'natural frequency', 'f₀'], ['共振', 'resonance', '—'],
      ['波長', 'wavelength', 'λ'], ['衍射', 'diffraction', '—'], ['多普勒效應', 'Doppler effect', '—']
    ],
    practice: [
      {
        q: { zh: '單擺擺長變為原來的 4 倍，週期變為原來的：', en: 'If a pendulum\'s length quadruples, its period becomes:' },
        o: [{ zh: '2 倍', en: '2×' }, { zh: '4 倍', en: '4×' }, { zh: '一半', en: 'half' }, { zh: '不變', en: 'unchanged' }],
        a: 0,
        e: { zh: 'T = 2π√(L/g)，L 變為 4 倍，T 變為 √4 = 2 倍。', en: 'T ∝ √L, so quadrupling L doubles T.' }
      },
      {
        q: { zh: '波在介質中傳播時，介質中的質點：', en: 'As a wave passes, the particles of the medium:' },
        o: [{ zh: '隨波一起向前移動', en: 'travel along with the wave' }, { zh: '只在平衡位置附近振動', en: 'only oscillate about equilibrium' }, { zh: '靜止不動', en: 'stay still' }, { zh: '做勻速直線運動', en: 'move uniformly forward' }],
        a: 1,
        e: { zh: '波傳播的是振動形式和能量，質點不隨波遷移。', en: 'Waves transport the disturbance and energy, not matter.' }
      },
      {
        q: { zh: '發生共振的條件是：', en: 'Resonance occurs when:' },
        o: [{ zh: '驅動力頻率等於固有頻率', en: 'driving frequency equals natural frequency' }, { zh: '驅動力頻率大於固有頻率', en: 'driving exceeds natural' }, { zh: '振幅最大時', en: 'amplitude is largest' }, { zh: '阻尼最大時', en: 'damping is largest' }],
        a: 0,
        e: { zh: '驅動力頻率與系統固有頻率相等時振幅最大，即共振。', en: 'Matching frequencies give the largest amplitude.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-fluid', track: 'senior', no: '08', tag: '選修',
    kicker: { zh: '力學 · 流體', en: 'Mechanics · fluids' },
    title: { zh: '流體力學初步', en: 'Fluid Mechanics' },
    summary: { zh: '連續性方程、伯努利方程與升力。', en: 'Continuity, Bernoulli\'s equation, and lift.' },
    intro: {
      zh: '流體有兩個守恆：質量守恆（連續性方程）和能量守恆（伯努利方程）。把它們並排寫出來，管道、機翼、噴霧器的問題都歸到同一套語言裏。',
      en: 'Fluids obey two conservation laws: mass (continuity) and energy (Bernoulli). Written side by side, pipes, wings and atomisers all speak the same language.'
    },
    sims: [{ type: 'fluid', label: { zh: '文丘裏管', en: 'Venturi tube' } }],
    concepts: [
      {
        t: { zh: '流體的壓強與浮力', en: 'Pressure and buoyancy in fluids' },
        b: {
          zh: '靜止流體內部壓強隨深度線性增加：p = p₀ + ρgh。浮力等於排開流體的重力，不僅適用於液體，也適用於氣體（氣球、飛艇）。流體壓強的方向總是垂直於作用面。',
          en: 'In a fluid at rest, pressure grows linearly with depth: p = p₀ + ρgh. Buoyancy equals the weight of displaced fluid — true for gases too (balloons, airships). Fluid pressure always acts perpendicular to a surface.'
        },
        f: '<i>p</i> = <i>p</i><sub>0</sub>+<i>ρgh</i>　　<i>F</i><sub>浮</sub> = <i>ρgV</i><sub>排</sub>'
      },
      {
        t: { zh: '連續性方程', en: 'The continuity equation' },
        b: {
          zh: '不可壓縮流體在穩定流動時，單位時間內通過任一截面的體積相同：A₁v₁ = A₂v₂。截面積小的地方流速大 —— 捏住水管口，水就噴得更遠，就是這個道理。',
          en: 'For steady flow of an incompressible fluid, the volume passing any cross-section per second is the same: A₁v₁ = A₂v₂. Narrow sections carry faster flow — pinch a hose and the jet shoots farther.'
        },
        f: '<i>A</i><sub>1</sub><i>v</i><sub>1</sub> = <i>A</i><sub>2</sub><i>v</i><sub>2</sub>'
      },
      {
        t: { zh: '伯努利方程', en: 'Bernoulli\'s equation' },
        b: {
          zh: '對同一流線上的理想流體：p + ½ρv² + ρgh = 常量。流速大的地方壓強小，流速小的地方壓強大。這是能量守恆在流體中的表達：壓強能、動能、重力勢能三者之和保持不變。',
          en: 'Along a streamline of an ideal fluid, p + ½ρv² + ρgh is constant: fast flow means low pressure. This is energy conservation for fluids — pressure energy, kinetic energy and gravitational potential energy trading places.'
        },
        f: '<i>p</i>+½<i>ρv</i><sup>2</sup>+<i>ρgh</i> = 常量'
      },
      {
        t: { zh: '黏性與層流', en: 'Viscosity and laminar flow' },
        b: {
          zh: '真實流體有黏性，流動時存在內摩擦。層流中流速分層，管壁處為零、中心最大。泊肅葉定律給出圓管中的流量：Q = πr⁴Δp/(8ηL)，流量與半徑的四次方成正比 —— 血管半徑稍微變小，流量就急劇下降。',
          en: 'Real fluids are viscous and resist flow internally. In laminar flow, speed varies across the pipe — zero at the wall, maximum at the centre. Poiseuille\'s law gives Q = πr⁴Δp/(8ηL): flow scales with the fourth power of radius, so a slight narrowing of a blood vessel cuts flow sharply.'
        },
        f: '<i>Q</i> = π<i>r</i><sup>4</sup>Δ<i>p</i>/(8<i>ηL</i>)'
      },
      {
        t: { zh: '升力從哪來', en: 'Where lift comes from' },
        b: {
          zh: '機翼的升力主要來自氣流被機翼向下偏轉，根據牛頓第三定律，空氣對機翼產生向上的反作用力；同時機翼上方的彎曲使流線彎曲、壓力降低，伯努利方程給出壓力差。常見的"上表面路程長所以流速快"說法並不完整：真正決定流速的是流線彎曲和環流，不是路程長短。',
          en: 'Lift comes mainly from air being deflected downward by the wing: by Newton\'s third law the air pushes the wing up. Curvature of the streamlines also lowers the pressure above. The popular "longer path means faster flow" story is incomplete — it is the turning of the flow and the circulation that set the speed, not the path length.'
        },
        note: { zh: '"等時通過"假設是錯的：上下表面的氣流並不需要同時到達後緣。', en: 'The "equal transit time" assumption is false: air above and below need not arrive together.' }
      }
    ],
    terms: [
      ['連續性方程', 'continuity equation', '—'], ['伯努利方程', 'Bernoulli equation', '—'],
      ['黏性', 'viscosity', 'η'], ['層流', 'laminar flow', '—'],
      ['流量', 'flow rate', 'Q'], ['升力', 'lift', '—'], ['文丘裏管', 'Venturi tube', '—']
    ],
    practice: [
      {
        q: { zh: '水管截面積減小一半，流速變為原來的：', en: 'If a pipe\'s cross-section halves, the flow speed becomes:' },
        o: [{ zh: '一半', en: 'half' }, { zh: '2 倍', en: '2×' }, { zh: '4 倍', en: '4×' }, { zh: '不變', en: 'unchanged' }],
        a: 1,
        e: { zh: 'A₁v₁ = A₂v₂，面積減半則流速加倍。', en: 'A₁v₁ = A₂v₂: halving area doubles speed.' }
      },
      {
        q: { zh: '根據伯努利方程，流速大的地方：', en: 'By Bernoulli\'s equation, where flow is fast:' },
        o: [{ zh: '壓強小', en: 'pressure is low' }, { zh: '壓強大', en: 'pressure is high' }, { zh: '壓強不變', en: 'pressure is unchanged' }, { zh: '與壓強無關', en: 'pressure is unrelated' }],
        a: 0,
        e: { zh: 'p + ½ρv² = 常量，v 增大則 p 減小（同一高度）。', en: 'With p + ½ρv² constant at fixed height, larger v means smaller p.' }
      },
      {
        q: { zh: '關於機翼升力，下列說法更準確的是：', en: 'The more accurate statement about lift is:' },
        o: [{ zh: '上表面路程長，氣流必須同時到達後緣', en: 'the upper path is longer and air must arrive together' }, { zh: '氣流被向下偏轉，空氣對機翼產生向上反作用力', en: 'air is deflected down, so it pushes the wing up' }, { zh: '升力與空氣密度無關', en: 'lift is independent of air density' }, { zh: '只由機翼面積決定', en: 'it depends only on wing area' }],
        a: 1,
        e: { zh: '升力本質上來自動量改變：機翼把空氣向下推，空氣把機翼向上推。', en: 'Lift is fundamentally a momentum exchange: the wing pushes air down, air pushes the wing up.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-electrostatics', track: 'senior', no: '09', tag: '必修',
    kicker: { zh: '電學 · 場', en: 'Electricity · fields' },
    title: { zh: '靜電場', en: 'Electrostatics' },
    summary: { zh: '庫侖定律、電場強度、電場線與靜電屏蔽。', en: 'Coulomb\'s law, field strength, field lines and shielding.' },
    intro: {
      zh: '電場是電荷周圍存在的特殊物質，它的強弱用場強 E 描述。電場線不是真實存在的線，但它能把"場"畫成人能看懂的圖。',
      en: 'An electric field is the influence a charge carries into the space around it, described by E. Field lines do not exist physically, but they turn the field into something the eye can follow.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'charges' }, label: { zh: '等量異種電荷', en: 'Two opposite charges' } },
      { type: 'field', cfg: { mode: 'plates' }, label: { zh: '平行板電場', en: 'Uniform field' } }
    ],
    concepts: [
      {
        t: { zh: '電荷與庫侖定律', en: 'Charge and Coulomb\'s law' },
        b: {
          zh: '自然界只有兩種電荷，同種相斥、異種相吸。電荷量單位是庫侖（C），元電荷 e = 1.6×10⁻¹⁹ C。真空中兩個靜止點電荷之間的作用力 F = kq₁q₂/r²，k = 9.0×10⁹ N·m²/C²。方向沿兩點電荷的連線。',
          en: 'There are two kinds of charge; like repels, unlike attracts. Charge is measured in coulombs; the elementary charge is 1.6×10⁻¹⁹ C. For two point charges at rest in vacuum, F = kq₁q₂/r² with k = 9.0×10⁹ N·m²/C², along the line joining them.'
        },
        f: '<i>F</i> = <i>kq</i><sub>1</sub><i>q</i><sub>2</sub>/<i>r</i><sup>2</sup>'
      },
      {
        t: { zh: '電場強度', en: 'Electric field strength' },
        b: {
          zh: '電場強度 E = F/q，是矢量，方向規定為正電荷在該點受力的方向，單位 N/C 或 V/m。點電荷產生的場強 E = kQ/r²，離電荷越遠越弱。多個電荷的場強按矢量疊加，遵循平行四邊形定則。',
          en: 'Field strength is E = F/q, a vector pointing the way a positive test charge would be pushed, in N/C or V/m. A point charge gives E = kQ/r², falling with distance. Fields from several charges add as vectors.'
        },
        f: '<i>E</i> = <i>F</i>/<i>q</i>　　<i>E</i> = <i>kQ</i>/<i>r</i><sup>2</sup>'
      },
      {
        t: { zh: '電場線', en: 'Field lines' },
        b: {
          zh: '電場線從正電荷出發、終止於負電荷（或伸向無窮遠），不閉合、不相交。電場線的疏密表示場強的強弱，切線方向表示該點的場強方向。勻強電場的電場線是等間距的平行直線。',
          en: 'Field lines start on positive charge and end on negative charge (or at infinity); they never cross or close. Their density shows field strength, their tangent the direction. A uniform field is drawn as evenly spaced parallel lines.'
        },
        note: { zh: '電場線是人為畫的，不是電荷運動的軌跡。', en: 'Field lines are a drawing convention, not particle trajectories.' }
      },
      {
        t: { zh: '靜電平衡與靜電屏蔽', en: 'Electrostatic equilibrium and shielding' },
        b: {
          zh: '導體放入電場後，自由電子重新分佈，直到導體內部場強處處為零，這叫靜電平衡。此時導體是等勢體，電荷只分布在導體外表面，表面越尖鋭處電荷越密。空腔導體能屏蔽外部電場，這就是法拉第籠。',
          en: 'A conductor in a field redistributes its free electrons until the internal field is zero — electrostatic equilibrium. The conductor becomes an equipotential body, charge sits on the outer surface, denser at sharp points. A hollow conductor screens its interior: the Faraday cage.'
        }
      }
    ],
    terms: [
      ['電荷量', 'charge', 'q'], ['元電荷', 'elementary charge', 'e'],
      ['庫侖定律', 'Coulomb\'s law', '—'], ['電場強度', 'electric field strength', 'E'],
      ['電場線', 'field line', '—'], ['靜電平衡', 'electrostatic equilibrium', '—'],
      ['靜電屏蔽', 'electrostatic shielding', '—']
    ],
    practice: [
      {
        q: { zh: '兩個點電荷間距變為原來的 2 倍，庫侖力變為原來的：', en: 'If the separation of two point charges doubles, the force becomes:' },
        o: [{ zh: '2 倍', en: '2×' }, { zh: '1/2', en: '1/2' }, { zh: '1/4', en: '1/4' }, { zh: '4 倍', en: '4×' }],
        a: 2,
        e: { zh: 'F ∝ 1/r²，距離加倍，力變為 1/4。', en: 'F ∝ 1/r², so doubling r quarters the force.' }
      },
      {
        q: { zh: '關於電場線，正確的是：', en: 'Which is true of electric field lines?' },
        o: [{ zh: '電場線是電荷運動的軌跡', en: 'they are particle trajectories' }, { zh: '電場線可以相交', en: 'they may cross' }, { zh: '電場線越密場強越大', en: 'denser lines mean stronger field' }, { zh: '電場線是閉合曲線', en: 'they form closed loops' }],
        a: 2,
        e: { zh: '電場線的疏密表示場強大小；它不閉合、不相交，也不是軌跡。', en: 'Density encodes strength; lines neither close nor cross, and they are not trajectories.' }
      },
      {
        q: { zh: '處於靜電平衡的導體，內部場強：', en: 'Inside a conductor in electrostatic equilibrium, the field is:' },
        o: [{ zh: '為零', en: 'zero' }, { zh: '與外部相同', en: 'the same as outside' }, { zh: '方向指向表面', en: 'pointing to the surface' }, { zh: '無法確定', en: 'undetermined' }],
        a: 0,
        e: { zh: '若內部場強不為零，自由電荷會繼續移動，直到場強為零。', en: 'Any internal field would keep charges moving until it cancels.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-potential', track: 'senior', no: '10', tag: '選修',
    kicker: { zh: '電學 · 能', en: 'Electricity · energy' },
    title: { zh: '電勢與電容', en: 'Potential and Capacitance' },
    summary: { zh: '電勢差、等勢面、U = Ed 與電容器。', en: 'Potential difference, equipotentials, U = Ed, capacitors.' },
    intro: {
      zh: '電場有兩個描述方式：力的描述（場強 E）和能的描述（電勢 φ）。二者由 U = Ed 在勻強電場中直接相連。電容器就是把電荷"存"起來的兩塊板。',
      en: 'A field can be described two ways: by force (E) and by energy (potential φ). In a uniform field they are linked by U = Ed. A capacitor is simply two plates that store charge.'
    },
    sims: [
      { type: 'capacitor', label: { zh: '平行板電容器', en: 'Parallel-plate capacitor' } },
      { type: 'field', cfg: { mode: 'plates' }, label: { zh: '勻強電場', en: 'Uniform field' } }
    ],
    concepts: [
      {
        t: { zh: '電勢能與電勢', en: 'Potential energy and potential' },
        b: {
          zh: '電荷在電場中具有電勢能 Ep，電勢能與電荷量的比值叫電勢：φ = Ep/q，單位伏特（V）。電勢是標量，有正負，大小與零電勢點的選取有關。兩點間的電勢差 U_AB = φ_A − φ_B = W_AB/q，與零電勢點無關。',
          en: 'A charge in a field has potential energy Ep; the ratio Ep/q is the potential φ, in volts. Potential is a scalar with a sign, defined relative to a chosen zero. The difference U_AB = φ_A − φ_B = W_AB/q is independent of that choice.'
        },
        f: '<i>φ</i> = <i>E</i><sub>p</sub>/<i>q</i>　　<i>U</i><sub>AB</sub> = <i>φ</i><sub>A</sub>−<i>φ</i><sub>B</sub>'
      },
      {
        t: { zh: '等勢面', en: 'Equipotential surfaces' },
        b: {
          zh: '電場中電勢相同的點構成等勢面。等勢面與電場線處處垂直；沿等勢面移動電荷，電場力不做功。電場線總是從電勢高的等勢面指向電勢低的等勢面。導體處於靜電平衡時，整個導體是一個等勢體，表面是等勢面。',
          en: 'Points of equal potential form an equipotential surface, always perpendicular to the field lines. Moving a charge along one takes no work. Field lines run from higher to lower potential. A conductor in equilibrium is an equipotential body.'
        },
        note: { zh: '電勢高低與場強大小沒有必然聯繫：場強為零處電勢不一定為零。', en: 'Potential and field strength are independent: zero field does not mean zero potential.' }
      },
      {
        t: { zh: '勻強電場中 U = Ed', en: 'Uniform field: U = Ed' },
        b: {
          zh: '在勻強電場中，沿場強方向兩點間的電勢差等於場強與兩點間距離的乘積：U = Ed。d 必須是沿電場方向的距離；若兩點連線與場強成 θ 角，則 U = Edcosθ。',
          en: 'In a uniform field the potential difference along the field is U = Ed, where d is measured along the field. At an angle θ, U = Edcosθ.'
        },
        f: '<i>U</i> = <i>Ed</i>　　<i>E</i> = <i>U</i>/<i>d</i>'
      },
      {
        t: { zh: '電容', en: 'Capacitance' },
        b: {
          zh: '電容器所帶電荷量與兩板間電勢差的比值叫電容：C = Q/U，單位法拉（F），常用微法（μF）。電容由電容器本身決定，與所帶電荷量和電壓無關。平行板電容器的電容 C = ε_r S/(4πkd)，與正對面積成正比、與板間距成反比。',
          en: 'Capacitance is charge per volt: C = Q/U, in farads (µF in practice). It is a property of the device, independent of Q and U. For parallel plates C = ε_r S/(4πkd): proportional to area, inversely proportional to gap.'
        },
        f: '<i>C</i> = <i>Q</i>/<i>U</i>　　<i>C</i> = <i>ε</i><sub>r</sub><i>S</i>/(4π<i>kd</i>)'
      },
      {
        t: { zh: '電容器的充放電', en: 'Charging and discharging' },
        b: {
          zh: '電容器充電時，電源把電荷搬到兩板上，兩板帶等量異種電荷，板間建立電場，電能儲存起來。斷開電源後電荷量不變；保持連接電源則電壓不變。儲存的能量 E = ½CU² = ½QU。',
          en: 'Charging moves charge onto the plates, setting up a field and storing energy. Disconnected, the charge stays; still connected, the voltage stays. Stored energy is ½CU² = ½QU.'
        },
        f: '<i>E</i> = ½<i>CU</i><sup>2</sup>'
      }
    ],
    terms: [
      ['電勢', 'electric potential', 'φ'], ['電勢差', 'potential difference', 'U'],
      ['等勢面', 'equipotential surface', '—'], ['電容', 'capacitance', 'C'],
      ['法拉', 'farad', 'F'], ['介電常數', 'permittivity', 'ε'],
      ['擊穿', 'breakdown', '—']
    ],
    practice: [
      {
        q: { zh: '勻強電場場強 200 V/m，沿場強方向相距 0.05 m 兩點的電勢差為：', en: 'A 200 V/m uniform field over 0.05 m along the field gives:' },
        o: [{ zh: '4 V', en: '4 V' }, { zh: '10 V', en: '10 V' }, { zh: '40 V', en: '40 V' }, { zh: '4000 V', en: '4000 V' }],
        a: 1,
        e: { zh: 'U = Ed = 200 × 0.05 = 10 V。', en: 'U = Ed = 10 V.' }
      },
      {
        q: { zh: '平行板電容器充電後斷開電源，將板間距增大，則：', en: 'A charged capacitor is disconnected, then the plates are pulled apart. Then:' },
        o: [{ zh: '電荷量不變，電壓增大', en: 'charge fixed, voltage rises' }, { zh: '電壓不變，電荷量增大', en: 'voltage fixed, charge rises' }, { zh: '電容增大', en: 'capacitance rises' }, { zh: '場強增大', en: 'field strength rises' }],
        a: 0,
        e: { zh: '斷開後 Q 不變；d 增大使 C 減小，由 U = Q/C 得 U 增大；場強 E = U/d = Q/(εS) 不變。', en: 'Q stays fixed; larger d lowers C, so U rises. The field E = Q/(εS) is unchanged.' }
      },
      {
        q: { zh: '沿等勢面移動電荷時，電場力做功：', en: 'Moving a charge along an equipotential surface, the field does:' },
        o: [{ zh: '為零', en: 'zero work' }, { zh: '為正', en: 'positive work' }, { zh: '為負', en: 'negative work' }, { zh: '先正後負', en: 'positive then negative' }],
        a: 0,
        e: { zh: '等勢面上各點電勢相同，U = 0，W = qU = 0。', en: 'No potential difference along the surface, so W = qU = 0.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-circuit', track: 'senior', no: '11', tag: '必修',
    kicker: { zh: '電學 · 電路', en: 'Electricity · circuits' },
    title: { zh: '恆定電流', en: 'Direct Current Circuits' },
    summary: { zh: '電阻定律、閉合電路歐姆定律、電功率。', en: 'Resistivity, the complete-circuit law, and power.' },
    intro: {
      zh: '高中電路比初中多了"內阻"這一項。電源不是理想電壓源，它自己有電阻 r，於是路端電壓隨電流增大而下降：U = E − Ir。',
      en: 'Senior circuits add one thing: internal resistance. A real source has its own r, so terminal voltage sags as current rises: U = E − Ir.'
    },
    sims: [{ type: 'circuit', label: { zh: '串並聯電路', en: 'Series and parallel' } }],
    concepts: [
      {
        t: { zh: '電流的微觀表達式', en: 'Current at the microscopic level' },
        b: {
          zh: '電流是單位時間內通過導體橫截面的電荷量：I = Q/t。若導體單位體積內有 n 個自由電荷，每個電荷量為 q，定向移動速率為 v，橫截面積為 S，則 I = nqSv。注意定向移動速率很小（約 10⁻⁴ m/s），但電場建立的速度接近光速。',
          en: 'Current is charge per unit time. With n carriers per unit volume, charge q, drift speed v and cross-section S, I = nqSv. The drift speed is tiny (about 10⁻⁴ m/s), yet the field that starts them propagates near light speed.'
        },
        f: '<i>I</i> = <i>nqSv</i>'
      },
      {
        t: { zh: '電阻定律', en: 'Resistivity' },
        b: {
          zh: '導體的電阻與長度成正比、與橫截面積成反比：R = ρL/S，ρ 是電阻率，由材料和溫度決定。金屬的電阻率隨溫度升高而增大，半導體的電阻率隨溫度升高而減小。',
          en: 'Resistance grows with length and falls with cross-section: R = ρL/S, with ρ the resistivity set by material and temperature. Metals become more resistive when hot; semiconductors less.'
        },
        f: '<i>R</i> = <i>ρL</i>/<i>S</i>'
      },
      {
        t: { zh: '閉合電路歐姆定律', en: 'The complete-circuit law' },
        b: {
          zh: '閉合電路中的電流跟電源電動勢成正比，跟內外電阻之和成反比：I = E/(R+r)。路端電壓 U = E − Ir，隨外電阻減小（電流增大）而減小。斷路時 U = E，短路時 I = E/r 最大。電源的 U–I 圖像是一條斜率為 −r、縱截距為 E 的直線。',
          en: 'Current equals EMF over total resistance: I = E/(R+r). Terminal voltage U = E − Ir falls as current rises. Open circuit: U = E. Short circuit: I = E/r. The U–I line has intercept E and slope −r.'
        },
        f: '<i>I</i> = <i>E</i>/(<i>R</i>+<i>r</i>)　　<i>U</i> = <i>E</i>−<i>Ir</i>'
      },
      {
        t: { zh: '電功與電熱', en: 'Electrical work and heat' },
        b: {
          zh: '電功 W = UIt，電功率 P = UI，這是普遍適用的。電熱由焦耳定律給出 Q = I²Rt。在純電阻電路中（電爐、燈泡），電能全部轉化為內能，W = Q；在非純電阻電路中（電動機、電解槽），W > Q，多餘部分轉化為機械能或化學能。',
          en: 'Work is W = UIt and power P = UI — always valid. Joule heating is Q = I²Rt. In a pure resistor all electrical energy becomes heat, so W = Q. In a motor or electrolytic cell, W > Q; the rest becomes mechanical or chemical energy.'
        },
        f: '<i>W</i> = <i>UIt</i>　　<i>P</i> = <i>UI</i>　　<i>Q</i> = <i>I</i><sup>2</sup><i>Rt</i>'
      },
      {
        t: { zh: '串並聯與電錶改裝', en: 'Series, parallel, and meter conversion' },
        b: {
          zh: '串聯分壓、並聯分流。把小量程電流表改裝成電壓表要串聯一個大電阻（分壓）；改裝成大量程電流表要並聯一個小電阻（分流）。伏安法測電阻時，大電阻用內接法、小電阻用外接法，可減小系統誤差。',
          en: 'Series divides voltage, parallel divides current. To turn a galvanometer into a voltmeter, add a large series resistor; into an ammeter, add a small shunt. When measuring resistance, use the internal connection for large R and the external for small R.'
        }
      }
    ],
    terms: [
      ['電動勢', 'electromotive force', 'E'], ['內阻', 'internal resistance', 'r'],
      ['路端電壓', 'terminal voltage', 'U'], ['電阻率', 'resistivity', 'ρ'],
      ['電功', 'electrical work', 'W'], ['焦耳定律', 'Joule\'s law', '—'],
      ['分流', 'current division', '—'], ['分壓', 'voltage division', '—']
    ],
    practice: [
      {
        q: { zh: '電源電動勢 12 V，內阻 1 Ω，外接 5 Ω 電阻，電流為：', en: 'EMF 12 V, internal resistance 1 Ω, external 5 Ω. Current:' },
        o: [{ zh: '2 A', en: '2 A' }, { zh: '2.4 A', en: '2.4 A' }, { zh: '12 A', en: '12 A' }, { zh: '1.2 A', en: '1.2 A' }],
        a: 0,
        e: { zh: 'I = E/(R+r) = 12/6 = 2 A。', en: 'I = 12/6 = 2 A.' }
      },
      {
        q: { zh: '上題中電源的路端電壓為：', en: 'In the previous circuit the terminal voltage is:' },
        o: [{ zh: '12 V', en: '12 V' }, { zh: '10 V', en: '10 V' }, { zh: '2 V', en: '2 V' }, { zh: '8 V', en: '8 V' }],
        a: 1,
        e: { zh: 'U = E − Ir = 12 − 2×1 = 10 V，也等於 IR = 2×5。', en: 'U = E − Ir = 10 V, which also equals IR.' }
      },
      {
        q: { zh: '電動機正常工作時，下列關係正確的是：', en: 'For a working motor, which relation holds?' },
        o: [{ zh: 'W = Q', en: 'W = Q' }, { zh: 'W > Q', en: 'W > Q' }, { zh: 'W < Q', en: 'W < Q' }, { zh: 'P = I²R', en: 'P = I²R' }],
        a: 1,
        e: { zh: '電動機是非純電阻，電能一部分轉化為機械能，所以 W > Q，且 P = UI > I²R。', en: 'A motor is not a pure resistor: some energy becomes mechanical, so W > Q and UI > I²R.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-magnetism', track: 'senior', no: '12', tag: '必修',
    kicker: { zh: '電學 · 磁與感應', en: 'Electricity · magnetism' },
    title: { zh: '磁場與電磁感應', en: 'Magnetic Fields and Induction' },
    summary: { zh: '安培力、洛倫茲力、法拉第定律與楞次定律。', en: 'Ampère force, Lorentz force, Faraday and Lenz.' },
    intro: {
      zh: '磁場對運動電荷的力總是垂直於速度，所以它不做功 —— 只改變方向。這一點讓帶電粒子在磁場中走出圓弧，也是迴旋加速器和質譜儀的基礎。',
      en: 'The magnetic force on a moving charge is always perpendicular to its velocity, so it does no work — it only turns the particle. That is why charges move in circles, and why cyclotrons and mass spectrometers work.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'magnet' }, label: { zh: '磁感線', en: 'Field lines' } },
      { type: 'coil', label: { zh: '磁體穿過線圈', en: 'Magnet through a coil' } }
    ],
    concepts: [
      {
        t: { zh: '磁場與磁感應強度', en: 'Magnetic field and flux density' },
        b: {
          zh: '磁感應強度 B 描述磁場的強弱和方向，定義式 B = F/(IL)（電流與磁場垂直時），單位特斯拉（T）。磁感線是閉合曲線，磁體外部從 N 到 S，內部從 S 到 N。地磁場的 N 極在地理南極附近。',
          en: 'Flux density B describes the strength and direction of a magnetic field, defined by B = F/(IL) for a perpendicular current, in tesla. Field lines are closed loops: outside a magnet N to S, inside S to N. Earth\'s magnetic north pole lies near the geographic south.'
        },
        f: '<i>B</i> = <i>F</i>/(<i>IL</i>)'
      },
      {
        t: { zh: '安培力', en: 'Force on a current' },
        b: {
          zh: '通電導線在磁場中受到的力叫安培力：F = BILsinθ，θ 是電流方向與磁場方向的夾角。電流與磁場平行時不受力，垂直時受力最大。方向用左手定則判斷：讓磁感線穿入手心，四指指向電流方向，拇指指向安培力方向。',
          en: 'A current-carrying wire in a field feels F = BILsinθ, where θ is the angle between current and field. Parallel gives zero, perpendicular gives maximum. Direction follows the left-hand rule.'
        },
        f: '<i>F</i> = <i>BIL</i>sin<i>θ</i>'
      },
      {
        t: { zh: '洛倫茲力', en: 'The Lorentz force' },
        b: {
          zh: '運動電荷在磁場中受到的力 F = qvBsinθ，方向同樣用左手定則（正電荷）。由於洛倫茲力始終垂直於速度，它不做功，只改變速度方向。帶電粒子垂直進入勻強磁場後做勻速圓周運動，半徑 r = mv/(qB)，週期 T = 2πm/(qB)，週期與速度無關。',
          en: 'A moving charge feels F = qvBsinθ. Because it is always perpendicular to v, it does no work — it only bends the path. A charge entering a uniform field perpendicularly moves in a circle of radius mv/(qB) with period 2πm/(qB), independent of speed.'
        },
        f: '<i>r</i> = <i>mv</i>/(<i>qB</i>)　　<i>T</i> = 2π<i>m</i>/(<i>qB</i>)'
      },
      {
        t: { zh: '法拉第電磁感應定律', en: 'Faraday\'s law' },
        b: {
          zh: '閉合電路中感應電動勢的大小跟穿過這一電路的磁通量的變化率成正比：E = nΔΦ/Δt。磁通量 Φ = BS（B 與 S 垂直時）。感應電動勢的大小取決於磁通量變化的快慢，而不是磁通量本身的大小。',
          en: 'The induced EMF is proportional to the rate of change of flux: E = nΔΦ/Δt. Flux is Φ = BS for a perpendicular field. What matters is how fast the flux changes, not how much there is.'
        },
        f: 'ε = <i>n</i>ΔΦ/Δ<i>t</i>　　Φ = <i>BS</i>'
      },
      {
        t: { zh: '楞次定律與動生電動勢', en: 'Lenz\'s law and motional EMF' },
        b: {
          zh: '感應電流的磁場總要阻礙引起感應電流的磁通量的變化 —— 這就是楞次定律，"阻礙"不是"相反"。導體棒以速度 v 切割磁感線時，產生的動生電動勢 ε = BLv，方向用右手定則判斷。',
          en: 'The induced current creates a field that opposes the change in flux that produced it — Lenz\'s law. "Oppose the change", not "oppose the field". A rod of length L moving at v across a field generates ε = BLv, direction from the right-hand rule.'
        },
        f: 'ε = <i>BLv</i>'
      },
      {
        t: { zh: '變壓器', en: 'Transformers' },
        b: {
          zh: '理想變壓器原副線圈電壓之比等於匝數之比：U₁/U₂ = n₁/n₂；電流之比等於匝數的反比：I₁/I₂ = n₂/n₁。變壓器只能改變交流電壓，不能改變直流電壓；它不改變功率（理想情況下 P₁ = P₂）。',
          en: 'For an ideal transformer, voltages follow the turns ratio and currents the inverse ratio. It works only with alternating current and, ideally, passes power unchanged.'
        },
        f: '<i>U</i><sub>1</sub>/<i>U</i><sub>2</sub> = <i>n</i><sub>1</sub>/<i>n</i><sub>2</sub>'
      }
    ],
    terms: [
      ['磁感應強度', 'magnetic flux density', 'B'], ['磁通量', 'magnetic flux', 'Φ'],
      ['安培力', 'Ampère force', 'F'], ['洛倫茲力', 'Lorentz force', 'F'],
      ['左手定則', 'left-hand rule', '—'], ['楞次定律', 'Lenz\'s law', '—'],
      ['動生電動勢', 'motional EMF', 'ε'], ['變壓器', 'transformer', '—']
    ],
    practice: [
      {
        q: { zh: '電荷垂直進入勻強磁場，做圓周運動的半徑與速度的關係是：', en: 'A charge enters a uniform field perpendicularly. Its orbital radius depends on speed as:' },
        o: [{ zh: '與 v 成正比', en: 'proportional to v' }, { zh: '與 v 成反比', en: 'inversely proportional to v' }, { zh: '與 v² 成正比', en: 'proportional to v²' }, { zh: '與 v 無關', en: 'independent of v' }],
        a: 0,
        e: { zh: 'r = mv/(qB)，r 與 v 成正比；但週期 T = 2πm/(qB) 與 v 無關。', en: 'r = mv/(qB) grows with v, while the period is independent of v.' }
      },
      {
        q: { zh: '長度 0.5 m 的導體棒以 4 m/s 垂直切割 B = 0.2 T 的磁場，感應電動勢為：', en: 'A 0.5 m rod cuts a 0.2 T field at 4 m/s. Induced EMF:' },
        o: [{ zh: '0.4 V', en: '0.4 V' }, { zh: '0.8 V', en: '0.8 V' }, { zh: '1.6 V', en: '1.6 V' }, { zh: '4 V', en: '4 V' }],
        a: 0,
        e: { zh: 'ε = BLv = 0.2 × 0.5 × 4 = 0.4 V。', en: 'ε = BLv = 0.4 V.' }
      },
      {
        q: { zh: '根據楞次定律，感應電流的磁場總是：', en: 'By Lenz\'s law, the field of the induced current always:' },
        o: [{ zh: '與原磁場方向相反', en: 'opposes the original field direction' }, { zh: '阻礙引起感應電流的磁通量的變化', en: 'opposes the change in flux' }, { zh: '與原磁場方向相同', en: 'matches the original field' }, { zh: '使磁通量增大', en: 'increases the flux' }],
        a: 1,
        e: { zh: '阻礙的是"變化"：磁通量增大時反向，減小時同向。', en: 'It opposes the change: reverse when flux grows, same direction when it falls.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-rotation', track: 'senior', no: '13', tag: '拓展',
    kicker: { zh: '力學 · 剛體', en: 'Mechanics · rigid bodies' },
    title: { zh: '剛體轉動', en: 'Rotation of Rigid Bodies' },
    summary: { zh: '轉動慣量、力矩、角動量守恆。', en: 'Moment of inertia, torque, and angular momentum.' },
    intro: {
      zh: '把平動的整套語言翻譯成轉動：m → I，F → τ，v → ω，p → L。翻譯過去以後，牛頓第二定律變成 τ = Iα，動量守恆變成角動量守恆。',
      en: 'Translate the whole language of translation: m → I, F → τ, v → ω, p → L. Then F = ma becomes τ = Iα, and momentum conservation becomes angular momentum conservation.'
    },
    sims: [{ type: 'rotation', label: { zh: '轉動圓盤', en: 'Spinning disc' } }],
    concepts: [
      {
        t: { zh: '角量與線量', en: 'Angular and linear quantities' },
        b: {
          zh: '剛體上每一點繞軸轉動的角速度 ω 相同，但線速度不同：v = ωr，離軸越遠線速度越大。角加速度 α = Δω/Δt，切向加速度 a_t = αr，法向加速度 a_n = ω²r。',
          en: 'Every point of a rigid body shares the same angular velocity, but not the same linear speed: v = ωr, larger farther out. Angular acceleration α gives tangential acceleration αr and centripetal acceleration ω²r.'
        },
        f: '<i>v</i> = <i>ωr</i>　　<i>a</i><sub>t</sub> = <i>αr</i>　　<i>a</i><sub>n</sub> = <i>ω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '轉動慣量', en: 'Moment of inertia' },
        b: {
          zh: '轉動慣量是物體轉動慣性的量度：I = Σmᵢrᵢ²，單位 kg·m²。它不僅與質量有關，還與質量相對於轉軸的分佈有關 —— 同樣質量的圓環和圓盤，繞中心軸的轉動慣量不同（圓環 I = mR²，圓盤 I = ½mR²）。',
          en: 'Moment of inertia measures rotational inertia: I = Σmr², in kg·m². It depends not only on mass but on how that mass is distributed: a hoop and a disc of equal mass have different I about their axes (mR² versus ½mR²).'
        },
        f: '<i>I</i> = Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup>'
      },
      {
        t: { zh: '轉動定律', en: 'Newton\'s second law for rotation' },
        b: {
          zh: '力矩 τ = rFsinθ，是力使物體繞軸轉動的作用效果，單位 N·m。剛體的角加速度與合外力矩成正比、與轉動慣量成反比：τ = Iα。這與 F = ma 完全對應。',
          en: 'Torque τ = rFsinθ measures a force\'s turning effect, in N·m. Angular acceleration is proportional to net torque and inversely to inertia: τ = Iα — exactly parallel to F = ma.'
        },
        f: '<i>τ</i> = <i>rF</i>sin<i>θ</i> = <i>Iα</i>'
      },
      {
        t: { zh: '角動量守恆', en: 'Conservation of angular momentum' },
        b: {
          zh: '角動量 L = Iω，單位 kg·m²/s。當合外力矩為零時，系統的角動量保持不變：I₁ω₁ = I₂ω₂。花樣滑冰運動員收臂時 I 變小、ω 變大，就是這個道理。',
          en: 'Angular momentum L = Iω. With zero net torque it is conserved: I₁ω₁ = I₂ω₂. A skater pulling her arms in reduces I and spins faster.'
        },
        f: '<i>L</i> = <i>Iω</i>　　<i>I</i><sub>1</sub><i>ω</i><sub>1</sub> = <i>I</i><sub>2</sub><i>ω</i><sub>2</sub>'
      },
      {
        t: { zh: '轉動動能', en: 'Rotational kinetic energy' },
        b: {
          zh: '繞定軸轉動的剛體具有轉動動能 E = ½Iω²。若物體同時平動和轉動（如滾動的球），總動能為 ½mv² + ½Iω²。純滾動時 v = ωR，機械能守恆，球從斜面滾下比滑塊下滑慢，因為一部分能量分給了轉動。',
          en: 'A rotating body has ½Iω². A body that also translates has ½mv² + ½Iω². For rolling without slipping, v = ωR; a rolling ball reaches the bottom of a ramp later than a sliding block because some energy goes into rotation.'
        },
        f: '<i>E</i><sub>k</sub> = ½<i>Iω</i><sup>2</sup>'
      }
    ],
    terms: [
      ['角速度', 'angular velocity', 'ω'], ['角加速度', 'angular acceleration', 'α'],
      ['轉動慣量', 'moment of inertia', 'I'], ['力矩', 'torque', 'τ'],
      ['角動量', 'angular momentum', 'L'], ['轉動動能', 'rotational KE', '—'],
      ['純滾動', 'rolling without slipping', '—']
    ],
    practice: [
      {
        q: { zh: '花樣滑冰運動員收攏手臂時，轉速變快，原因是：', en: 'A skater spins faster when pulling her arms in because:' },
        o: [{ zh: '角動量守恆，轉動慣量減小', en: 'angular momentum is conserved and I falls' }, { zh: '力矩增大', en: 'torque increases' }, { zh: '質量減小', en: 'her mass decreases' }, { zh: '重力做功', en: 'gravity does work' }],
        a: 0,
        e: { zh: '合外力矩為零，L = Iω 守恆；收臂使 I 變小，ω 必須變大。', en: 'No net torque, so L is fixed; smaller I forces larger ω.' }
      },
      {
        q: { zh: '質量相同、半徑相同的圓環和圓盤，繞中心軸轉動慣量較大的是：', en: 'A hoop and a disc of the same mass and radius: which has the larger I about its axis?' },
        o: [{ zh: '圓環', en: 'the hoop' }, { zh: '圓盤', en: 'the disc' }, { zh: '一樣大', en: 'the same' }, { zh: '無法比較', en: 'cannot compare' }],
        a: 0,
        e: { zh: '圓環質量全在邊緣，I = mR²；圓盤質量分佈更靠近軸，I = ½mR²。', en: 'The hoop keeps all its mass at radius R (mR²); the disc is more concentrated near the axis (½mR²).' }
      },
      {
        q: { zh: '力矩的單位是：', en: 'The unit of torque is:' },
        o: [{ zh: 'N', en: 'N' }, { zh: 'N·m', en: 'N·m' }, { zh: 'J', en: 'J' }, { zh: 'kg·m/s', en: 'kg·m/s' }],
        a: 1,
        e: { zh: 'τ = rFsinθ，單位是 N·m。注意它與功的單位 J 量綱相同，但物理意義不同。', en: 'τ = rFsinθ, so N·m. It shares dimensions with the joule but means something different.' }
      }
    ]
  });

  P.seniorCount = P.chapters.length - P.juniorCount;
})();
