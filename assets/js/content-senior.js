/* content-senior.js — 高中物理 · Senior secondary physics (bilingual) */
(function () {
  const P = window.PHYS;
  P.chapters = P.chapters || [];

  P.chapters.push({
    id: 'h-kinematics', track: 'senior', no: '01', tag: '必修',
    kicker: { zh: '力学 · 运动学', en: 'Mechanics · kinematics' },
    title: { zh: '运动的描述', en: 'Describing Motion' },
    summary: { zh: '位移、速度、加速度与匀变速直线运动。', en: 'Displacement, velocity, acceleration and uniform acceleration.' },
    intro: {
      zh: '运动学只回答"怎样运动"，不追问"为什么"。五个量 —— 位置、位移、速度、加速度、时间 —— 加上三條公式和两张图像，足以描述一切匀变速直线运动。',
      en: 'Kinematics answers "how", not "why". Five quantities — position, displacement, velocity, acceleration, time — plus three equations and two graphs describe every uniformly accelerated motion.'
    },
    sims: [{ type: 'projectile', cfg: {}, label: { zh: '抛体运动', en: 'Projectile motion' } }],
    concepts: [
      {
        t: { zh: '质点与参考系', en: 'Particles and reference frames' },
        b: {
          zh: '当物体的大小和形状对所研究的问题影响可以忽略时，可以把物体看成质点。参考系是描述运动时选作参照的物体；选择不同参考系，同一运动的描述可以不同，但物理规律的形式不变（伽利略相对性原理）。',
          en: 'When size and shape do not matter for the question, treat the body as a point. A reference frame is the body you measure against; different frames give different descriptions of the same motion, though the laws keep their form.'
        }
      },
      {
        t: { zh: '位移与速度', en: 'Displacement and velocity' },
        b: {
          zh: '位移是初位置指向末位置的有向线段，是矢量；路程是轨迹的长度，是标量。平均速度等于位移与时间之比，方向与位移相同。瞬时速度是 Δt 趋近于零时平均速度的极限，其大小叫瞬时速率。',
          en: 'Displacement is the arrow from start to finish — a vector; distance is the length of the path — a scalar. Average velocity is displacement over time, pointing along the displacement. Instantaneous velocity is the limit as Δt → 0; its magnitude is speed.'
        },
        f: '<i>v̄</i> = Δ<i>x</i>/Δ<i>t</i>　　<i>v</i> = lim<sub>Δ<i>t</i>→0</sub> Δ<i>x</i>/Δ<i>t</i>'
      },
      {
        t: { zh: '加速度', en: 'Acceleration' },
        b: {
          zh: '加速度是速度的变化率：a = Δv/Δt，单位 m/s²。加速度是矢量，方向与 Δv 的方向相同，与速度方向不一定相同。a 与 v 同向则加速，反向则减速。速度大不代表加速度大：匀速飞行的飞机加速度为零。',
          en: 'Acceleration is the rate of change of velocity, a = Δv/Δt, in m/s². It points along Δv — not necessarily along v. Same direction: speeding up; opposite: slowing down. A fast plane in level flight has zero acceleration.'
        },
        f: '<i>a</i> = Δ<i>v</i>/Δ<i>t</i>'
      },
      {
        t: { zh: '匀变速直线运动的规律', en: 'Uniformly accelerated motion' },
        b: {
          zh: '加速度恒定是匀变速运动。三个基本公式中只有两个独立，解题时任选两个即可。当问题不涉及时间时，用速度位移关系式最方便。初速度为零的匀加速运动，第 1、2、3 秒内的位移之比为 1∶3∶5。',
          en: 'Constant acceleration defines the motion. Only two of the three equations are independent; pick the pair that avoids what you do not know. When time is irrelevant, use the velocity–displacement relation. From rest, the distances covered in successive seconds go 1:3:5.'
        },
        f: '<i>v</i> = <i>v</i><sub>0</sub>+<i>at</i>　　<i>x</i> = <i>v</i><sub>0</sub><i>t</i>+½<i>at</i><sup>2</sup>　　<i>v</i><sup>2</sup>−<i>v</i><sub>0</sub><sup>2</sup> = 2<i>ax</i>'
      },
      {
        t: { zh: '自由落体与运动图像', en: 'Free fall and motion graphs' },
        b: {
          zh: '自由落体是初速度为零、加速度为 g 的匀加速直线运动，g ≈ 9.8 m/s²（粗略计算取 10）。x–t 图像的斜率是速度，v–t 图像的斜率是加速度、图线与时间轴围成的面积是位移。图像只能描述直线运动，不能画曲线轨迹。',
          en: 'Free fall starts from rest with a = g ≈ 9.8 m/s². On an x–t graph the slope is velocity; on a v–t graph the slope is acceleration and the area under the line is displacement. These graphs describe one-dimensional motion only — they never show a curved path.'
        },
        f: '<i>h</i> = ½<i>gt</i><sup>2</sup>　　<i>v</i> = <i>gt</i>'
      }
    ],
    terms: [
      ['质点', 'particle', '—'], ['参考系', 'reference frame', '—'],
      ['位移', 'displacement', 'x'], ['路程', 'distance', 's'],
      ['平均速度', 'average velocity', 'v̄'], ['瞬时速度', 'instantaneous velocity', 'v'],
      ['加速度', 'acceleration', 'a'], ['自由落体', 'free fall', '—']
    ],
    practice: [
      {
        q: { zh: '物体做匀加速直线运动，初速度 2 m/s，加速度 3 m/s²，4 s 末的速度是：', en: 'Starting at 2 m/s with a = 3 m/s² for 4 s, the final velocity is:' },
        o: [{ zh: '10 m/s', en: '10 m/s' }, { zh: '12 m/s', en: '12 m/s' }, { zh: '14 m/s', en: '14 m/s' }, { zh: '8 m/s', en: '8 m/s' }],
        a: 2,
        e: { zh: 'v = v₀ + at = 2 + 3×4 = 14 m/s。', en: 'v = v₀ + at = 14 m/s.' }
      },
      {
        q: { zh: '关于加速度，下列说法正确的是：', en: 'Which statement about acceleration is correct?' },
        o: [{ zh: '速度大则加速度大', en: 'large speed means large acceleration' }, { zh: '加速度方向一定与速度方向相同', en: 'it always points along the velocity' }, { zh: '加速度为零时速度可以不为零', en: 'zero acceleration allows non-zero velocity' }, { zh: '速度变化量大则加速度大', en: 'large velocity change means large acceleration' }],
        a: 2,
        e: { zh: '匀速直线运动速度不为零而加速度为零。加速度取决于速度变化的快慢，不只是变化量。', en: 'Uniform motion has constant non-zero velocity and zero acceleration; acceleration measures how fast velocity changes, not by how much.' }
      },
      {
        q: { zh: 'v–t 图像中，图线与时间轴围成的面积表示：', en: 'On a v–t graph, the area between the line and the time axis is:' },
        o: [{ zh: '加速度', en: 'acceleration' }, { zh: '位移', en: 'displacement' }, { zh: '路程', en: 'distance' }, { zh: '平均速度', en: 'average velocity' }],
        a: 1,
        e: { zh: '面积 = vΔt，量纲就是位移；t 轴下方的面积取负，代表反向位移。', en: 'Area = vΔt, a displacement. Area below the axis counts negative — motion in the opposite direction.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-newton', track: 'senior', no: '02', tag: '必修',
    kicker: { zh: '力学 · 动力学', en: 'Mechanics · dynamics' },
    title: { zh: '力与牛顿运动定律', en: 'Forces and Newton\'s Laws' },
    summary: { zh: '三种力、力的合成分解、F = ma 与超重失重。', en: 'Three forces, vector addition, F = ma, and apparent weight.' },
    intro: {
      zh: '动力学要回答"为什么这样运动"。核心只有一个式子 F合 = ma：左边是受力分析，右边是运动状态。把两边都写清楚，题就解完了。',
      en: 'Dynamics asks why. Everything reduces to F_net = ma: the left side is a force analysis, the right side a description of motion. Write both clearly and the problem is done.'
    },
    sims: [
      { type: 'incline', label: { zh: '斜面受力', en: 'Forces on an incline' } },
      { type: 'elevator', label: { zh: '超重与失重', en: 'Apparent weight' } }
    ],
    concepts: [
      {
        t: { zh: '重力、弹力与摩擦力', en: 'Gravity, elastic force, friction' },
        b: {
          zh: '重力 G = mg，方向竖直向下。弹力方向总是垂直于接触面（绳的拉力沿绳）。摩擦力分为静摩擦和滑动摩擦：静摩擦力大小由平衡条件决定，范围是 0 ≤ f ≤ f_max；滑动摩擦力 f = μN，与接触面积和相对速度无关。',
          en: 'Weight is mg, vertically down. Elastic forces act perpendicular to the contact surface (a rope pulls along itself). Static friction is whatever the balance requires, up to a maximum; kinetic friction is f = μN, independent of contact area and speed.'
        },
        f: '<i>G</i> = <i>mg</i>　　<i>f</i> = <i>μN</i>　　<i>F</i> = <i>kx</i>'
      },
      {
        t: { zh: '力的合成与分解', en: 'Adding and resolving forces' },
        b: {
          zh: '力是矢量，合成遵循平行四边形定则。两个大小分别为 F₁、F₂ 的力，合力范围是 |F₁−F₂| ≤ F ≤ F₁+F₂。分解是合成的逆运算，通常按效果分解或正交分解：建立直角坐标系，把每个力投影到两轴上，再分别求和。',
          en: 'Forces add by the parallelogram rule. Two forces of magnitudes F₁ and F₂ give a resultant between |F₁−F₂| and F₁+F₂. Resolution is the inverse: choose axes, project every force, then sum along each axis.'
        },
        f: '<i>F</i> = √(<i>F</i><sub>1</sub><sup>2</sup>+<i>F</i><sub>2</sub><sup>2</sup>+2<i>F</i><sub>1</sub><i>F</i><sub>2</sub>cos<i>θ</i>)'
      },
      {
        t: { zh: '牛顿三定律', en: 'Newton\'s three laws' },
        b: {
          zh: '第一定律：不受外力时物体保持静止或匀速直线运动 —— 定义了惯性系。第二定律：F合 = ma，加速度与合外力同向，与质量成反比。第三定律：作用力与反作用力大小相等、方向相反、作用在同一直线上，分别作用在两个物体上，同时产生同时消失。',
          en: 'First: with no net force, a body keeps its velocity — this defines an inertial frame. Second: F = ma, acceleration along the net force, inversely proportional to mass. Third: action and reaction are equal, opposite, collinear, act on different bodies, and appear and vanish together.'
        },
        f: '<i>F</i><sub>合</sub> = <i>ma</i>'
      },
      {
        t: { zh: '超重与失重', en: 'Overweight and weightlessness' },
        b: {
          zh: '超重和失重指的是视重（支持力或拉力）的变化，物体的重力并没有变。加速度向上时超重：N = m(g+a)；加速度向下时失重：N = m(g−a)；自由落体时 a = g，N = 0，叫完全失重。宇宙飞船中的失重就是自由落体状态。',
          en: 'Overweight and weightlessness describe the apparent weight — the normal force — not gravity, which is unchanged. Upward acceleration gives N = m(g+a); downward gives N = m(g−a); free fall gives N = 0. Weightlessness in orbit is free fall, not absent gravity.'
        },
        f: '<i>N</i> = <i>m</i>(<i>g</i>±<i>a</i>)'
      },
      {
        t: { zh: '连接体问题', en: 'Connected bodies' },
        b: {
          zh: '几个物体一起运动时，先把它们看成一个整体求加速度（整体法），再隔离其中一个物体求相互作用力（隔离法）。整体法不涉及内力，隔离法能求出内力，两者配合最省力。',
          en: 'For bodies moving together, treat them as one system to find the acceleration, then isolate one to find the internal force. The system approach hides internal forces; isolation reveals them. Use both.'
        }
      }
    ],
    terms: [
      ['合外力', 'net force', 'F合'], ['惯性', 'inertia', '—'],
      ['静摩擦力', 'static friction', 'f'], ['滑动摩擦力', 'kinetic friction', 'f'],
      ['正交分解', 'orthogonal resolution', '—'], ['超重', 'overweight', '—'],
      ['失重', 'weightlessness', '—'], ['视重', 'apparent weight', 'N']
    ],
    practice: [
      {
        q: { zh: '质量 2 kg 的物体受到 6 N 的合外力，加速度为：', en: 'A 2 kg body under a 6 N net force has acceleration:' },
        o: [{ zh: '3 m/s²', en: '3 m/s²' }, { zh: '12 m/s²', en: '12 m/s²' }, { zh: '0.33 m/s²', en: '0.33 m/s²' }, { zh: '6 m/s²', en: '6 m/s²' }],
        a: 0,
        e: { zh: 'a = F/m = 6/2 = 3 m/s²。', en: 'a = F/m = 3 m/s².' }
      },
      {
        q: { zh: '电梯以 2 m/s² 的加速度竖直向上加速，质量为 50 kg 的人对地板的压力为（g 取 10）：', en: 'A lift accelerates upward at 2 m/s². The floor force on a 50 kg person is (g = 10):' },
        o: [{ zh: '400 N', en: '400 N' }, { zh: '500 N', en: '500 N' }, { zh: '600 N', en: '600 N' }, { zh: '1000 N', en: '1000 N' }],
        a: 2,
        e: { zh: '加速度向上为超重：N = m(g+a) = 50×12 = 600 N。', en: 'Upward acceleration: N = m(g+a) = 600 N.' }
      },
      {
        q: { zh: '关于作用力与反作用力，正确的是：', en: 'Which is true of action–reaction pairs?' },
        o: [{ zh: '作用在同一物体上', en: 'they act on the same body' }, { zh: '可以相互抵消', en: 'they cancel each other' }, { zh: '分别作用在两个物体上', en: 'they act on two different bodies' }, { zh: '性质可以不同', en: 'they may be of different kinds' }],
        a: 2,
        e: { zh: '作用力与反作用力作用在两个不同物体上，不能求合力、不能抵消；性质相同、同时存在。', en: 'They act on two bodies, so they never cancel; they are of the same kind and exist together.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-projectile', track: 'senior', no: '03', tag: '必修',
    kicker: { zh: '力学 · 二维运动', en: 'Mechanics · two dimensions' },
    title: { zh: '曲线运动与抛体', en: 'Curvilinear Motion and Projectiles' },
    summary: { zh: '运动的合成分解，平抛与斜抛。', en: 'Composing motions: horizontal and oblique projectiles.' },
    intro: {
      zh: '曲线运动的处理办法只有一个：分解。平抛运动分解成水平匀速直线运动和竖直自由落体运动，两个方向互不影响，只用时间把它们连起来。',
      en: 'There is one method for curved motion: decompose it. A horizontal projectile is uniform motion across and free fall down. The two are independent — only time links them.'
    },
    sims: [{ type: 'projectile', cfg: {}, label: { zh: '抛体轨迹与速度分解', en: 'Trajectory and velocity components' } }],
    concepts: [
      {
        t: { zh: '曲线运动的条件', en: 'When motion curves' },
        b: {
          zh: '物体做曲线运动的条件是：合外力的方向与速度方向不在同一直线上。曲线运动的轨迹总是向合力所指的一侧弯曲，速度方向沿轨迹的切线。速度方向时刻改变，所以曲线运动一定是变速运动。',
          en: 'Motion curves when the net force is not collinear with the velocity. The path bends toward the force, and the velocity is always tangent to the path. Since the direction keeps changing, curved motion is always accelerated motion.'
        }
      },
      {
        t: { zh: '运动的合成与分解', en: 'Composing and resolving motions' },
        b: {
          zh: '一个物体同时参与几个分运动时，实际运动是合运动。分运动具有独立性（互不影响）和等时性（同时进行、时间相同）。小船渡河问题中，船在静水中的速度与水流速度合成，最短时间对应船头垂直河岸，最短位移对应合速度垂直河岸。',
          en: 'When a body takes part in several motions at once, the real motion is their sum. Components are independent yet simultaneous. For a boat crossing a river, boat speed and current add: the shortest time comes from pointing straight across, the shortest path from steering upstream.'
        }
      },
      {
        t: { zh: '平抛运动', en: 'Horizontal projectiles' },
        b: {
          zh: '平抛运动可分解为水平方向的匀速直线运动和竖直方向的自由落体运动。水平位移 x = v₀t，竖直位移 y = ½gt²，落地时间只由高度决定，与初速度无关。速度偏角 tanθ = v_y/v_x = gt/v₀，位移偏角 tanα = y/x = gt/(2v₀)，可见 tanθ = 2tanα。',
          en: 'Split it into uniform motion horizontally and free fall vertically: x = v₀t, y = ½gt². The time of flight depends only on height. The velocity angle satisfies tanθ = gt/v₀, the displacement angle tanα = gt/(2v₀), so tanθ = 2tanα.'
        },
        f: '<i>x</i> = <i>v</i><sub>0</sub><i>t</i>　　<i>y</i> = ½<i>gt</i><sup>2</sup>　　<i>t</i> = √(2<i>h</i>/<i>g</i>)'
      },
      {
        t: { zh: '斜抛运动', en: 'Oblique projectiles' },
        b: {
          zh: '斜抛运动分解为水平匀速运动和竖直上抛运动。飞行时间 t = 2v₀sinθ/g，射高 H = v₀²sin²θ/(2g)，射程 R = v₀²sin2θ/g。初速度一定时，45° 抛射角射程最大；互余的两个角度（如 30° 与 60°）射程相同。',
          en: 'An oblique launch splits into uniform horizontal motion and vertical throw. Flight time 2v₀sinθ/g, height v₀²sin²θ/2g, range v₀²sin2θ/g. For fixed speed, 45° maximises range, and complementary angles give equal ranges.'
        },
        f: '<i>R</i> = <i>v</i><sub>0</sub><sup>2</sup>sin2<i>θ</i>/<i>g</i>　　<i>H</i> = <i>v</i><sub>0</sub><sup>2</sup>sin<sup>2</sup><i>θ</i>/(2<i>g</i>)'
      }
    ],
    terms: [
      ['曲线运动', 'curvilinear motion', '—'], ['合运动', 'resultant motion', '—'],
      ['分运动', 'component motion', '—'], ['平抛运动', 'horizontal projectile', '—'],
      ['斜抛运动', 'oblique projectile', '—'], ['射程', 'range', 'R'],
      ['射高', 'maximum height', 'H'], ['切线方向', 'tangential direction', '—']
    ],
    practice: [
      {
        q: { zh: '从 20 m 高处水平抛出一个小球，落地时间约为（g 取 10）：', en: 'A ball is thrown horizontally from 20 m. Time to land (g = 10):' },
        o: [{ zh: '1 s', en: '1 s' }, { zh: '2 s', en: '2 s' }, { zh: '3 s', en: '3 s' }, { zh: '4 s', en: '4 s' }],
        a: 1,
        e: { zh: '竖直方向自由落体：h = ½gt²，t = √(2×20/10) = 2 s。', en: 'Vertically it is free fall: t = √(2h/g) = 2 s.' }
      },
      {
        q: { zh: '平抛运动中，决定飞行时间的因素是：', en: 'What determines the flight time of a horizontal projectile?' },
        o: [{ zh: '初速度', en: 'initial speed' }, { zh: '抛出点高度', en: 'launch height' }, { zh: '物体质量', en: 'mass' }, { zh: '水平位移', en: 'horizontal range' }],
        a: 1,
        e: { zh: 't = √(2h/g) 只与高度和 g 有关，与初速度无关。', en: 't = √(2h/g): only height and g matter.' }
      },
      {
        q: { zh: '以相同速率斜抛，射程最大的抛射角是：', en: 'For a fixed launch speed, the range is greatest at:' },
        o: [{ zh: '30°', en: '30°' }, { zh: '45°', en: '45°' }, { zh: '60°', en: '60°' }, { zh: '90°', en: '90°' }],
        a: 1,
        e: { zh: 'R = v₀²sin2θ/g，2θ = 90° 即 θ = 45° 时最大。', en: 'R is maximal when sin2θ = 1, i.e. θ = 45°.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-circular', track: 'senior', no: '04', tag: '必修',
    kicker: { zh: '力学 · 圆周与引力', en: 'Mechanics · circles and gravity' },
    title: { zh: '圆周运动与万有引力', en: 'Circular Motion and Gravitation' },
    summary: { zh: '向心力、天体运动、卫星与宇宙速度。', en: 'Centripetal force, orbits, satellites and escape speeds.' },
    intro: {
      zh: '圆周运动不是"多了一种力"，而是合力恰好指向圆心。万有引力提供天体做圆周运动的向心力 —— 这一句话把天上的运动和地上的落体统一了起来。',
      en: 'Circular motion is not a new kind of force: the net force simply points to the centre. Gravity supplies that force for planets — one sentence uniting the heavens and the falling apple.'
    },
    sims: [{ type: 'orbit', label: { zh: '卫星轨道', en: 'Satellite orbit' } }],
    concepts: [
      {
        t: { zh: '描述圆周运动的物理量', en: 'Describing circular motion' },
        b: {
          zh: '线速度 v = Δs/Δt = 2πr/T，角速度 ω = Δθ/Δt = 2π/T，二者关系 v = ωr。周期 T 是转一圈的时间，转速 n 是每秒转过的圈数。向心加速度 a = v²/r = ω²r = 4π²r/T²，方向始终指向圆心，只改变速度方向，不改变速度大小。',
          en: 'Linear speed v = 2πr/T, angular speed ω = 2π/T, related by v = ωr. Period is one revolution; frequency is revolutions per second. Centripetal acceleration a = v²/r = ω²r points to the centre and changes only the direction of velocity, never its magnitude.'
        },
        f: '<i>v</i> = <i>ωr</i>　　<i>a</i> = <i>v</i><sup>2</sup>/<i>r</i> = <i>ω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '向心力', en: 'Centripetal force' },
        b: {
          zh: '向心力是按效果命名的力，不是一种新的性质力。它由实际的力（重力、弹力、摩擦力、万有引力等）或它们的合力提供。分析问题时先找谁提供向心力，再列 F = mv²/r，这是解圆周运动问题的通用思路。',
          en: 'Centripetal force is named by its effect, not by its nature. It is provided by real forces — gravity, tension, friction — or their resultant. Find the provider first, then write F = mv²/r.'
        },
        f: '<i>F</i> = <i>mv</i><sup>2</sup>/<i>r</i> = <i>mω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '竖直平面内的圆周运动', en: 'Vertical circular motion' },
        b: {
          zh: '用绳系着小球在竖直平面内做圆周运动，最高点的临界条件是重力恰好提供向心力：mg = mv²/R，即 v_min = √(gR)。速度小于这个值，小球会在到达最高点前脱离圆轨道。用轻杆连接时，最高点速度可以为零，因为杆能提供支持力。',
          en: 'For a ball on a string in a vertical circle, the top is critical: gravity alone supplies the centripetal force, so v_min = √(gR). Below that the string goes slack. With a rigid rod the speed at the top can be zero, since the rod can push.'
        },
        f: '<i>v</i><sub>min</sub> = √(<i>gR</i>)（绳模型）'
      },
      {
        t: { zh: '万有引力定律', en: 'Newton\'s law of gravitation' },
        b: {
          zh: '任意两个质点之间的引力大小与质量乘积成正比、与距离平方成反比：F = GMm/r²，G = 6.67×10⁻¹¹ N·m²/kg²。天体表面重力加速度 g = GM/R²。卡文迪什用扭秤测出了 G，被称为"称量地球质量的人"。',
          en: 'Any two masses attract with F = GMm/r², G = 6.67×10⁻¹¹ N·m²/kg². Surface gravity is g = GM/R². Cavendish measured G with a torsion balance — "weighing the Earth".'
        },
        f: '<i>F</i> = <i>GMm</i>/<i>r</i><sup>2</sup>　　<i>g</i> = <i>GM</i>/<i>R</i><sup>2</sup>'
      },
      {
        t: { zh: '卫星与宇宙速度', en: 'Satellites and cosmic speeds' },
        b: {
          zh: '卫星绕地球做匀速圆周运动时，万有引力提供向心力：GMm/r² = mv²/r，得 v = √(GM/r)。轨道越高，线速度越小、周期越大。第一宇宙速度 7.9 km/s 是近地卫星的环绕速度，也是发射卫星的最小速度；第二宇宙速度 11.2 km/s 是脱离地球的速度；第三宇宙速度 16.7 km/s 是脱离太阳系的速度。',
          en: 'For a satellite, gravity is the centripetal force: v = √(GM/r). Higher orbits are slower and longer-period. The first cosmic speed 7.9 km/s is low-Earth orbit speed and the minimum launch speed; 11.2 km/s escapes Earth; 16.7 km/s escapes the Solar System.'
        },
        f: '<i>v</i> = √(<i>GM</i>/<i>r</i>)　　<i>T</i> = 2π√(<i>r</i><sup>3</sup>/<i>GM</i>)'
      }
    ],
    terms: [
      ['线速度', 'linear speed', 'v'], ['角速度', 'angular speed', 'ω'],
      ['周期', 'period', 'T'], ['向心加速度', 'centripetal acceleration', 'a'],
      ['向心力', 'centripetal force', 'F'], ['万有引力', 'gravitation', 'F'],
      ['第一宇宙速度', 'first cosmic speed', '7.9 km/s'], ['开普勒定律', 'Kepler\'s laws', '—']
    ],
    practice: [
      {
        q: { zh: '半径 0.5 m 的圆轨道上，物体以 2 m/s 做匀速圆周运动，向心加速度为：', en: 'On a 0.5 m radius at 2 m/s, the centripetal acceleration is:' },
        o: [{ zh: '2 m/s²', en: '2 m/s²' }, { zh: '4 m/s²', en: '4 m/s²' }, { zh: '8 m/s²', en: '8 m/s²' }, { zh: '1 m/s²', en: '1 m/s²' }],
        a: 2,
        e: { zh: 'a = v²/r = 4/0.5 = 8 m/s²。', en: 'a = v²/r = 8 m/s².' }
      },
      {
        q: { zh: '卫星轨道半径增大时，它的线速度：', en: 'As a satellite\'s orbital radius increases, its speed:' },
        o: [{ zh: '增大', en: 'increases' }, { zh: '减小', en: 'decreases' }, { zh: '不变', en: 'stays the same' }, { zh: '先增大后减小', en: 'rises then falls' }],
        a: 1,
        e: { zh: 'v = √(GM/r)，r 越大 v 越小，周期越长。', en: 'v = √(GM/r): larger r means slower motion and a longer period.' }
      },
      {
        q: { zh: '第一宇宙速度约为：', en: 'The first cosmic speed is about:' },
        o: [{ zh: '3.0 km/s', en: '3.0 km/s' }, { zh: '7.9 km/s', en: '7.9 km/s' }, { zh: '11.2 km/s', en: '11.2 km/s' }, { zh: '16.7 km/s', en: '16.7 km/s' }],
        a: 1,
        e: { zh: '由 v = √(GM/R) 代入地球数据得 7.9 km/s。', en: 'Putting Earth\'s data into v = √(GM/R) gives 7.9 km/s.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-energy', track: 'senior', no: '05', tag: '必修',
    kicker: { zh: '力学 · 能量', en: 'Mechanics · energy' },
    title: { zh: '功和机械能', en: 'Work and Mechanical Energy' },
    summary: { zh: '功、功率、动能定理与机械能守恒。', en: 'Work, power, the work–energy theorem and conservation.' },
    intro: {
      zh: '能量方法最大的好处是不必关心中间过程。只要知道初末状态，动能定理就能跨过所有复杂的受力和路径 —— 这是解力学题的第二条路。',
      en: 'The energy method frees you from the details of the path. Given the initial and final states, the work–energy theorem leaps over complicated forces and trajectories — the second route through mechanics.'
    },
    sims: [{ type: 'coaster', label: { zh: '能量转化', en: 'Energy exchange' } }],
    concepts: [
      {
        t: { zh: '功', en: 'Work' },
        b: {
          zh: '功等于力与位移在力的方向上的分量的乘积：W = Flcosθ。θ < 90° 时做正功，θ = 90° 时不做功，θ > 90° 时做负功。功是标量，但有正负；总功等于各力做功的代数和，也等于合力的功。',
          en: 'Work is force times the displacement along it: W = Flcosθ. Acute angle: positive work; right angle: none; obtuse: negative. Work is a scalar with a sign. Total work is the algebraic sum of the individual works, and equals the work of the net force.'
        },
        f: '<i>W</i> = <i>Fl</i>cos<i>θ</i>'
      },
      {
        t: { zh: '功率', en: 'Power' },
        b: {
          zh: '平均功率 P = W/t，瞬时功率 P = Fvcosθ。机车启动有两种典型方式：以恒定功率启动，牵引力随速度增大而减小，做加速度减小的加速运动；以恒定牵引力启动，功率随时间线性增大，达到额定功率后再做变加速运动。',
          en: 'Average power is W/t; instantaneous power is Fvcosθ. A locomotive can start at constant power (tractive force falls as speed rises, so acceleration decreases) or at constant force (power climbs until rated, then acceleration tapers).'
        },
        f: '<i>P</i> = <i>W</i>/<i>t</i> = <i>Fv</i>cos<i>θ</i>'
      },
      {
        t: { zh: '动能定理', en: 'The work–energy theorem' },
        b: {
          zh: '合外力对物体做的功等于物体动能的变化：W合 = ½mv² − ½mv₀²。动能定理对变力做功、曲线运动同样成立，因为它只关心初末动能。这是它比牛顿第二定律更通用的地方。',
          en: 'The net work equals the change in kinetic energy: W = ½mv² − ½mv₀². It holds for varying forces and curved paths because it looks only at the endpoints — which is why it is more general than F = ma in practice.'
        },
        f: '<i>W</i><sub>合</sub> = ½<i>mv</i><sup>2</sup> − ½<i>mv</i><sub>0</sub><sup>2</sup>'
      },
      {
        t: { zh: '势能', en: 'Potential energy' },
        b: {
          zh: '重力势能 Ep = mgh，h 是相对参考面的高度，所以重力势能具有相对性，但重力势能的变化与参考面无关。重力做正功，重力势能减少。弹性势能 Ep = ½kx²，由形变量决定。势能属于系统，不属于单个物体。',
          en: 'Gravitational potential energy is mgh measured from a chosen level — relative, though changes are not. Gravity doing positive work lowers it. Elastic potential energy is ½kx². Potential energy belongs to a system, not to one body.'
        },
        f: '<i>E</i><sub>p</sub> = <i>mgh</i>　　<i>E</i><sub>p</sub> = ½<i>kx</i><sup>2</sup>'
      },
      {
        t: { zh: '机械能守恒定律', en: 'Conservation of mechanical energy' },
        b: {
          zh: '在只有重力或弹力做功的系统中，动能与势能相互转化，机械能的总量保持不变：Eк₁ + Ep₁ = Eк₂ + Ep₂。判断是否守恒，关键看有没有其他力做功（如摩擦力、空气阻力、外力）。有摩擦时用能量守恒：减少的机械能等于产生的内能。',
          en: 'When only gravity and spring forces do work, kinetic and potential energy trade but their sum stays fixed. To test for conservation, look for other forces doing work — friction, drag, an external push. With friction, use total energy: the lost mechanical energy becomes internal energy.'
        },
        f: '<i>E</i><sub>k1</sub>+<i>E</i><sub>p1</sub> = <i>E</i><sub>k2</sub>+<i>E</i><sub>p2</sub>'
      }
    ],
    terms: [
      ['功', 'work', 'W'], ['功率', 'power', 'P'], ['动能', 'kinetic energy', 'Ek'],
      ['动能定理', 'work–energy theorem', '—'], ['重力势能', 'gravitational PE', 'Ep'],
      ['弹性势能', 'elastic PE', 'Ep'], ['机械能守恒', 'energy conservation', '—'],
      ['额定功率', 'rated power', '—']
    ],
    practice: [
      {
        q: { zh: '物体在 10 N 的水平力作用下沿力的方向移动 3 m，该力做的功为：', en: 'A 10 N horizontal force moves a body 3 m along its direction. Work done:' },
        o: [{ zh: '3 J', en: '3 J' }, { zh: '10 J', en: '10 J' }, { zh: '30 J', en: '30 J' }, { zh: '0 J', en: '0 J' }],
        a: 2,
        e: { zh: 'W = Fl = 10 × 3 = 30 J。', en: 'W = Fl = 30 J.' }
      },
      {
        q: { zh: '质量 1 kg 的物体速度由 2 m/s 增大到 6 m/s，合外力做的功为：', en: 'A 1 kg body speeds up from 2 to 6 m/s. Net work done:' },
        o: [{ zh: '8 J', en: '8 J' }, { zh: '16 J', en: '16 J' }, { zh: '32 J', en: '32 J' }, { zh: '4 J', en: '4 J' }],
        a: 1,
        e: { zh: 'W = ½×1×(36−4) = 16 J。', en: 'W = ½(36 − 4) = 16 J.' }
      },
      {
        q: { zh: '下列过程中机械能守恒的是：', en: 'Mechanical energy is conserved when:' },
        o: [{ zh: '物体沿粗糙斜面下滑', en: 'sliding down a rough incline' }, { zh: '物体做自由落体运动', en: 'a body falls freely' }, { zh: '物体在水平面上被推着加速', en: 'pushed to speed up on a level floor' }, { zh: '汽车刹车', en: 'a car brakes' }],
        a: 1,
        e: { zh: '自由落体只受重力，只有重力做功，机械能守恒。', en: 'Free fall involves only gravity, so mechanical energy is conserved.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-momentum', track: 'senior', no: '06', tag: '选修',
    kicker: { zh: '力学 · 守恒', en: 'Mechanics · conservation' },
    title: { zh: '动量与碰撞', en: 'Momentum and Collisions' },
    summary: { zh: '冲量、动量定理、动量守恒与碰撞。', en: 'Impulse, momentum, conservation and collisions.' },
    intro: {
      zh: '碰撞过程力大、时间短，用牛顿定律几乎算不动；但动量总是守恒的。这就是为什么动量守恒在处理爆炸、碰撞、反冲时如此好用。',
      en: 'Collisions involve huge forces over tiny times, hopeless for F = ma. Momentum, however, is conserved. That is why it handles collisions, explosions and recoil so well.'
    },
    sims: [{ type: 'collision', label: { zh: '一维碰撞', en: 'One-dimensional collision' } }],
    concepts: [
      {
        t: { zh: '冲量与动量', en: 'Impulse and momentum' },
        b: {
          zh: '动量 p = mv，是矢量，方向与速度相同，单位 kg·m/s。冲量 I = FΔt，也是矢量，方向与力的方向相同。冲量是过程量，动量是状态量；二者通过动量定理联系起来。',
          en: 'Momentum p = mv is a vector along the velocity, in kg·m/s. Impulse I = FΔt is a vector along the force. Impulse describes a process, momentum a state; the momentum theorem connects them.'
        },
        f: '<i>p</i> = <i>mv</i>　　<i>I</i> = <i>F</i>Δ<i>t</i>'
      },
      {
        t: { zh: '动量定理', en: 'The momentum theorem' },
        b: {
          zh: '合外力的冲量等于物体动量的变化：I合 = Δp = mv₂ − mv₁。它解释了为什么缓冲能减小冲击力：动量变化量一定时，延长作用时间就能减小平均作用力。安全气囊、跳远沙坑、包装泡沫都是这个原理。',
          en: 'The net impulse equals the change in momentum: FΔt = Δp. This explains cushioning: for a fixed momentum change, stretching the time reduces the average force. Airbags, sand pits and foam packing all rely on it.'
        },
        f: '<i>F</i>Δ<i>t</i> = <i>mv</i><sub>2</sub> − <i>mv</i><sub>1</sub>'
      },
      {
        t: { zh: '动量守恒定律', en: 'Conservation of momentum' },
        b: {
          zh: '系统不受外力或所受合外力为零时，系统的总动量保持不变：m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′。内力远大于外力时（碰撞、爆炸），可以近似认为动量守恒。动量守恒是矢量式，要规定正方向。',
          en: 'If a system feels no net external force, its total momentum is constant. When internal forces dwarf external ones — collisions, explosions — conservation holds approximately. It is a vector equation: fix a positive direction first.'
        },
        f: '<i>m</i><sub>1</sub><i>v</i><sub>1</sub>+<i>m</i><sub>2</sub><i>v</i><sub>2</sub> = <i>m</i><sub>1</sub><i>v</i><sub>1</sub>′+<i>m</i><sub>2</sub><i>v</i><sub>2</sub>′'
      },
      {
        t: { zh: '碰撞', en: 'Collisions' },
        b: {
          zh: '弹性碰撞：动量守恒且动能守恒，碰后两物体分离。完全非弹性碰撞：碰后粘在一起以共同速度运动，动能损失最大。一般情况下，碰撞过程动量守恒，但动能有一部分转化为内能和声能。',
          en: 'Elastic: momentum and kinetic energy both conserved, bodies separate. Perfectly inelastic: they stick together, losing the maximum kinetic energy. In general momentum is conserved while some kinetic energy becomes heat and sound.'
        },
        f: '<i>v</i><sub>共</sub> = (<i>m</i><sub>1</sub><i>v</i><sub>1</sub>+<i>m</i><sub>2</sub><i>v</i><sub>2</sub>)/(<i>m</i><sub>1</sub>+<i>m</i><sub>2</sub>)'
      },
      {
        t: { zh: '反冲与爆炸', en: 'Recoil and explosions' },
        b: {
          zh: '原来静止的系统，在内力作用下分成两部分，总动量仍为零：0 = m₁v₁ + m₂v₂，两部分运动方向相反。火箭喷气、枪炮后坐、放射性衰变都属于反冲。',
          en: 'A system initially at rest splitting under internal forces keeps zero total momentum: the parts move in opposite directions. Rockets, recoil and radioactive decay are all examples.'
        }
      }
    ],
    terms: [
      ['动量', 'momentum', 'p'], ['冲量', 'impulse', 'I'],
      ['动量定理', 'momentum theorem', '—'], ['动量守恒', 'conservation of momentum', '—'],
      ['弹性碰撞', 'elastic collision', '—'], ['完全非弹性碰撞', 'perfectly inelastic collision', '—'],
      ['反冲', 'recoil', '—']
    ],
    practice: [
      {
        q: { zh: '质量 2 kg 的物体以 3 m/s 运动，动量大小为：', en: 'A 2 kg body at 3 m/s has momentum:' },
        o: [{ zh: '1.5 kg·m/s', en: '1.5 kg·m/s' }, { zh: '6 kg·m/s', en: '6 kg·m/s' }, { zh: '5 kg·m/s', en: '5 kg·m/s' }, { zh: '9 kg·m/s', en: '9 kg·m/s' }],
        a: 1,
        e: { zh: 'p = mv = 2×3 = 6 kg·m/s。', en: 'p = mv = 6 kg·m/s.' }
      },
      {
        q: { zh: '跳远时落在沙坑里，是为了：', en: 'Landing in a sand pit is meant to:' },
        o: [{ zh: '减小动量变化量', en: 'reduce the momentum change' }, { zh: '延长作用时间，减小冲击力', en: 'lengthen the impact time and cut the force' }, { zh: '增大冲量', en: 'increase the impulse' }, { zh: '减小重力', en: 'reduce gravity' }],
        a: 1,
        e: { zh: '动量变化量是确定的，沙坑使作用时间变长，由 F = Δp/Δt 知平均作用力变小。', en: 'Δp is fixed; a longer Δt means a smaller F.' }
      },
      {
        q: { zh: '质量 2 kg 的 A 以 4 m/s 撞上静止的 2 kg 的 B 并粘在一起，共同速度为：', en: 'A 2 kg body at 4 m/s hits a stationary 2 kg body and sticks. Common speed:' },
        o: [{ zh: '1 m/s', en: '1 m/s' }, { zh: '2 m/s', en: '2 m/s' }, { zh: '4 m/s', en: '4 m/s' }, { zh: '8 m/s', en: '8 m/s' }],
        a: 1,
        e: { zh: '完全非弹性碰撞：v = (2×4)/(2+2) = 2 m/s。', en: 'Perfectly inelastic: v = 8/4 = 2 m/s.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-oscillation', track: 'senior', no: '07', tag: '选修',
    kicker: { zh: '力学 · 振动与波', en: 'Mechanics · oscillation and waves' },
    title: { zh: '机械振动与机械波', en: 'Oscillations and Waves' },
    summary: { zh: '简谐运动、单摆、波的传播与干涉。', en: 'SHM, pendulums, wave propagation and interference.' },
    intro: {
      zh: '振动是"来回"，波是"把振动传出去"。抓住回复力、周期、振幅、波长四个量，振动和波的大部分问题都能定性判断。',
      en: 'Oscillation is back-and-forth; a wave carries that oscillation outward. Four quantities — restoring force, period, amplitude, wavelength — settle most qualitative questions.'
    },
    sims: [
      { type: 'pendulum', label: { zh: '单摆', en: 'Simple pendulum' } },
      { type: 'wave', cfg: {}, label: { zh: '横波', en: 'Transverse wave' } }
    ],
    concepts: [
      {
        t: { zh: '简谐运动', en: 'Simple harmonic motion' },
        b: {
          zh: '物体所受回复力与位移成正比、方向相反的运动叫简谐运动：F = −kx。位移随时间按正弦规律变化 x = Asin(ωt+φ)，周期 T = 2π√(m/k)，只由系统本身决定，叫固有周期。简谐运动中加速度与位移始终反向，平衡位置处速度最大、加速度为零。',
          en: 'Motion with a restoring force proportional and opposite to displacement: F = −kx. Position varies sinusoidally with period T = 2π√(m/k), fixed by the system itself. Acceleration is always opposite to displacement; at equilibrium speed peaks and acceleration vanishes.'
        },
        f: '<i>F</i> = −<i>kx</i>　　<i>T</i> = 2π√(<i>m</i>/<i>k</i>)'
      },
      {
        t: { zh: '单摆', en: 'The simple pendulum' },
        b: {
          zh: '摆角很小时（一般小于 5°），单摆的振动可看作简谐运动，周期 T = 2π√(L/g)，与摆球质量和振幅无关，这叫单摆的等时性。利用这一点可以测重力加速度：g = 4π²L/T²。',
          en: 'For small angles (under about 5°), a pendulum is simple harmonic with T = 2π√(L/g), independent of bob mass and amplitude — isochronism. This gives a way to measure g: g = 4π²L/T².'
        },
        f: '<i>T</i> = 2π√(<i>L</i>/<i>g</i>)'
      },
      {
        t: { zh: '受迫振动与共振', en: 'Driven oscillation and resonance' },
        b: {
          zh: '阻尼振动中振幅逐渐减小，能量转化为内能。受迫振动的频率等于驱动力的频率，与固有频率无关。当驱动力频率等于固有频率时，振幅达到最大，这种现象叫共振。荡秋千要按固有频率推，军队过桥要便步走，都是共振的实例。',
          en: 'In damped oscillation the amplitude decays as energy becomes heat. A driven oscillator moves at the driving frequency, not its own. When the two match, amplitude peaks: resonance. Pushing a swing in time, and breaking step on a bridge, are the practical lessons.'
        }
      },
      {
        t: { zh: '机械波', en: 'Mechanical waves' },
        b: {
          zh: '机械振动在介质中的传播形成机械波，需要波源和介质。波传播的是振动形式和能量，介质中的质点并不随波迁移。波长 λ、频率 f、波速 v 的关系是 v = λf = λ/T。波速由介质决定，频率由波源决定。',
          en: 'A mechanical wave is oscillation travelling through a medium — it needs a source and a medium. What travels is the disturbance and its energy; the particles only oscillate in place. Wavelength, frequency and speed satisfy v = λf. Speed is set by the medium, frequency by the source.'
        },
        f: '<i>v</i> = <i>λf</i> = <i>λ</i>/<i>T</i>'
      },
      {
        t: { zh: '干涉、衍射与多普勒效应', en: 'Interference, diffraction, Doppler' },
        b: {
          zh: '两列频率相同、相位差恒定的波叠加，形成稳定的干涉图样：振动加强点与减弱点相间分布。波绕过障碍物继续传播叫衍射，障碍物尺寸与波长相近时最明显。波源与观察者相对运动时，接收频率发生变化，叫多普勒效应。',
          en: 'Two waves of equal frequency and fixed phase difference superpose into a stable pattern of strong and weak points. Diffraction is waves bending around obstacles, most obvious when the obstacle is comparable to the wavelength. Relative motion between source and observer shifts the received frequency — the Doppler effect.'
        }
      }
    ],
    terms: [
      ['简谐运动', 'simple harmonic motion', '—'], ['回复力', 'restoring force', 'F'],
      ['振幅', 'amplitude', 'A'], ['周期', 'period', 'T'],
      ['固有频率', 'natural frequency', 'f₀'], ['共振', 'resonance', '—'],
      ['波长', 'wavelength', 'λ'], ['衍射', 'diffraction', '—'], ['多普勒效应', 'Doppler effect', '—']
    ],
    practice: [
      {
        q: { zh: '单摆摆长变为原来的 4 倍，周期变为原来的：', en: 'If a pendulum\'s length quadruples, its period becomes:' },
        o: [{ zh: '2 倍', en: '2×' }, { zh: '4 倍', en: '4×' }, { zh: '一半', en: 'half' }, { zh: '不变', en: 'unchanged' }],
        a: 0,
        e: { zh: 'T = 2π√(L/g)，L 变为 4 倍，T 变为 √4 = 2 倍。', en: 'T ∝ √L, so quadrupling L doubles T.' }
      },
      {
        q: { zh: '波在介质中传播时，介质中的质点：', en: 'As a wave passes, the particles of the medium:' },
        o: [{ zh: '随波一起向前移动', en: 'travel along with the wave' }, { zh: '只在平衡位置附近振动', en: 'only oscillate about equilibrium' }, { zh: '静止不动', en: 'stay still' }, { zh: '做匀速直线运动', en: 'move uniformly forward' }],
        a: 1,
        e: { zh: '波传播的是振动形式和能量，质点不随波迁移。', en: 'Waves transport the disturbance and energy, not matter.' }
      },
      {
        q: { zh: '发生共振的条件是：', en: 'Resonance occurs when:' },
        o: [{ zh: '驱动力频率等于固有频率', en: 'driving frequency equals natural frequency' }, { zh: '驱动力频率大于固有频率', en: 'driving exceeds natural' }, { zh: '振幅最大时', en: 'amplitude is largest' }, { zh: '阻尼最大时', en: 'damping is largest' }],
        a: 0,
        e: { zh: '驱动力频率与系统固有频率相等时振幅最大，即共振。', en: 'Matching frequencies give the largest amplitude.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-fluid', track: 'senior', no: '08', tag: '选修',
    kicker: { zh: '力学 · 流体', en: 'Mechanics · fluids' },
    title: { zh: '流体力学初步', en: 'Fluid Mechanics' },
    summary: { zh: '连续性方程、伯努利方程与升力。', en: 'Continuity, Bernoulli\'s equation, and lift.' },
    intro: {
      zh: '流体有两个守恒：质量守恒（连续性方程）和能量守恒（伯努利方程）。把它们并排写出来，管道、机翼、喷雾器的问题都归到同一套语言里。',
      en: 'Fluids obey two conservation laws: mass (continuity) and energy (Bernoulli). Written side by side, pipes, wings and atomisers all speak the same language.'
    },
    sims: [{ type: 'fluid', label: { zh: '文丘里管', en: 'Venturi tube' } }],
    concepts: [
      {
        t: { zh: '流体的压强与浮力', en: 'Pressure and buoyancy in fluids' },
        b: {
          zh: '静止流体内部压强随深度线性增加：p = p₀ + ρgh。浮力等于排开流体的重力，不仅适用于液体，也适用于气体（气球、飞艇）。流体压强的方向总是垂直于作用面。',
          en: 'In a fluid at rest, pressure grows linearly with depth: p = p₀ + ρgh. Buoyancy equals the weight of displaced fluid — true for gases too (balloons, airships). Fluid pressure always acts perpendicular to a surface.'
        },
        f: '<i>p</i> = <i>p</i><sub>0</sub>+<i>ρgh</i>　　<i>F</i><sub>浮</sub> = <i>ρgV</i><sub>排</sub>'
      },
      {
        t: { zh: '连续性方程', en: 'The continuity equation' },
        b: {
          zh: '不可压缩流体在稳定流动时，单位时间内通过任一截面的体积相同：A₁v₁ = A₂v₂。截面积小的地方流速大 —— 捏住水管口，水就喷得更远，就是这个道理。',
          en: 'For steady flow of an incompressible fluid, the volume passing any cross-section per second is the same: A₁v₁ = A₂v₂. Narrow sections carry faster flow — pinch a hose and the jet shoots farther.'
        },
        f: '<i>A</i><sub>1</sub><i>v</i><sub>1</sub> = <i>A</i><sub>2</sub><i>v</i><sub>2</sub>'
      },
      {
        t: { zh: '伯努利方程', en: 'Bernoulli\'s equation' },
        b: {
          zh: '对同一流线上的理想流体：p + ½ρv² + ρgh = 常量。流速大的地方压强小，流速小的地方压强大。这是能量守恒在流体中的表达：压强能、动能、重力势能三者之和保持不变。',
          en: 'Along a streamline of an ideal fluid, p + ½ρv² + ρgh is constant: fast flow means low pressure. This is energy conservation for fluids — pressure energy, kinetic energy and gravitational potential energy trading places.'
        },
        f: '<i>p</i>+½<i>ρv</i><sup>2</sup>+<i>ρgh</i> = 常量'
      },
      {
        t: { zh: '黏性与层流', en: 'Viscosity and laminar flow' },
        b: {
          zh: '真实流体有黏性，流动时存在内摩擦。层流中流速分层，管壁处为零、中心最大。泊肃叶定律给出圆管中的流量：Q = πr⁴Δp/(8ηL)，流量与半径的四次方成正比 —— 血管半径稍微变小，流量就急剧下降。',
          en: 'Real fluids are viscous and resist flow internally. In laminar flow, speed varies across the pipe — zero at the wall, maximum at the centre. Poiseuille\'s law gives Q = πr⁴Δp/(8ηL): flow scales with the fourth power of radius, so a slight narrowing of a blood vessel cuts flow sharply.'
        },
        f: '<i>Q</i> = π<i>r</i><sup>4</sup>Δ<i>p</i>/(8<i>ηL</i>)'
      },
      {
        t: { zh: '升力从哪来', en: 'Where lift comes from' },
        b: {
          zh: '机翼的升力主要来自气流被机翼向下偏转，根据牛顿第三定律，空气对机翼产生向上的反作用力；同时机翼上方的弯曲使流线弯曲、压力降低，伯努利方程给出压力差。常见的"上表面路程长所以流速快"说法并不完整：真正决定流速的是流线弯曲和环流，不是路程长短。',
          en: 'Lift comes mainly from air being deflected downward by the wing: by Newton\'s third law the air pushes the wing up. Curvature of the streamlines also lowers the pressure above. The popular "longer path means faster flow" story is incomplete — it is the turning of the flow and the circulation that set the speed, not the path length.'
        },
        note: { zh: '"等时通过"假设是错的：上下表面的气流并不需要同时到达后缘。', en: 'The "equal transit time" assumption is false: air above and below need not arrive together.' }
      }
    ],
    terms: [
      ['连续性方程', 'continuity equation', '—'], ['伯努利方程', 'Bernoulli equation', '—'],
      ['黏性', 'viscosity', 'η'], ['层流', 'laminar flow', '—'],
      ['流量', 'flow rate', 'Q'], ['升力', 'lift', '—'], ['文丘里管', 'Venturi tube', '—']
    ],
    practice: [
      {
        q: { zh: '水管截面积减小一半，流速变为原来的：', en: 'If a pipe\'s cross-section halves, the flow speed becomes:' },
        o: [{ zh: '一半', en: 'half' }, { zh: '2 倍', en: '2×' }, { zh: '4 倍', en: '4×' }, { zh: '不变', en: 'unchanged' }],
        a: 1,
        e: { zh: 'A₁v₁ = A₂v₂，面积减半则流速加倍。', en: 'A₁v₁ = A₂v₂: halving area doubles speed.' }
      },
      {
        q: { zh: '根据伯努利方程，流速大的地方：', en: 'By Bernoulli\'s equation, where flow is fast:' },
        o: [{ zh: '压强小', en: 'pressure is low' }, { zh: '压强大', en: 'pressure is high' }, { zh: '压强不变', en: 'pressure is unchanged' }, { zh: '与压强无关', en: 'pressure is unrelated' }],
        a: 0,
        e: { zh: 'p + ½ρv² = 常量，v 增大则 p 减小（同一高度）。', en: 'With p + ½ρv² constant at fixed height, larger v means smaller p.' }
      },
      {
        q: { zh: '关于机翼升力，下列说法更准确的是：', en: 'The more accurate statement about lift is:' },
        o: [{ zh: '上表面路程长，气流必须同时到达后缘', en: 'the upper path is longer and air must arrive together' }, { zh: '气流被向下偏转，空气对机翼产生向上反作用力', en: 'air is deflected down, so it pushes the wing up' }, { zh: '升力与空气密度无关', en: 'lift is independent of air density' }, { zh: '只由机翼面积决定', en: 'it depends only on wing area' }],
        a: 1,
        e: { zh: '升力本质上来自动量改变：机翼把空气向下推，空气把机翼向上推。', en: 'Lift is fundamentally a momentum exchange: the wing pushes air down, air pushes the wing up.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-electrostatics', track: 'senior', no: '09', tag: '必修',
    kicker: { zh: '电学 · 场', en: 'Electricity · fields' },
    title: { zh: '静电场', en: 'Electrostatics' },
    summary: { zh: '库仑定律、电场强度、电场线与静电屏蔽。', en: 'Coulomb\'s law, field strength, field lines and shielding.' },
    intro: {
      zh: '电场是电荷周围存在的特殊物质，它的强弱用场强 E 描述。电场线不是真实存在的线，但它能把"场"画成人能看懂的图。',
      en: 'An electric field is the influence a charge carries into the space around it, described by E. Field lines do not exist physically, but they turn the field into something the eye can follow.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'charges' }, label: { zh: '等量异种电荷', en: 'Two opposite charges' } },
      { type: 'field', cfg: { mode: 'plates' }, label: { zh: '平行板电场', en: 'Uniform field' } }
    ],
    concepts: [
      {
        t: { zh: '电荷与库仑定律', en: 'Charge and Coulomb\'s law' },
        b: {
          zh: '自然界只有两种电荷，同种相斥、异种相吸。电荷量单位是库仑（C），元电荷 e = 1.6×10⁻¹⁹ C。真空中两个静止点电荷之间的作用力 F = kq₁q₂/r²，k = 9.0×10⁹ N·m²/C²。方向沿两点电荷的连线。',
          en: 'There are two kinds of charge; like repels, unlike attracts. Charge is measured in coulombs; the elementary charge is 1.6×10⁻¹⁹ C. For two point charges at rest in vacuum, F = kq₁q₂/r² with k = 9.0×10⁹ N·m²/C², along the line joining them.'
        },
        f: '<i>F</i> = <i>kq</i><sub>1</sub><i>q</i><sub>2</sub>/<i>r</i><sup>2</sup>'
      },
      {
        t: { zh: '电场强度', en: 'Electric field strength' },
        b: {
          zh: '电场强度 E = F/q，是矢量，方向规定为正电荷在该点受力的方向，单位 N/C 或 V/m。点电荷产生的场强 E = kQ/r²，离电荷越远越弱。多个电荷的场强按矢量叠加，遵循平行四边形定则。',
          en: 'Field strength is E = F/q, a vector pointing the way a positive test charge would be pushed, in N/C or V/m. A point charge gives E = kQ/r², falling with distance. Fields from several charges add as vectors.'
        },
        f: '<i>E</i> = <i>F</i>/<i>q</i>　　<i>E</i> = <i>kQ</i>/<i>r</i><sup>2</sup>'
      },
      {
        t: { zh: '电场线', en: 'Field lines' },
        b: {
          zh: '电场线从正电荷出发、终止于负电荷（或伸向无穷远），不闭合、不相交。电场线的疏密表示场强的强弱，切线方向表示该点的场强方向。匀强电场的电场线是等间距的平行直线。',
          en: 'Field lines start on positive charge and end on negative charge (or at infinity); they never cross or close. Their density shows field strength, their tangent the direction. A uniform field is drawn as evenly spaced parallel lines.'
        },
        note: { zh: '电场线是人为画的，不是电荷运动的轨迹。', en: 'Field lines are a drawing convention, not particle trajectories.' }
      },
      {
        t: { zh: '静电平衡与静电屏蔽', en: 'Electrostatic equilibrium and shielding' },
        b: {
          zh: '导体放入电场后，自由电子重新分布，直到导体内部场强处处为零，这叫静电平衡。此时导体是等势体，电荷只分布在导体外表面，表面越尖锐处电荷越密。空腔导体能屏蔽外部电场，这就是法拉第笼。',
          en: 'A conductor in a field redistributes its free electrons until the internal field is zero — electrostatic equilibrium. The conductor becomes an equipotential body, charge sits on the outer surface, denser at sharp points. A hollow conductor screens its interior: the Faraday cage.'
        }
      }
    ],
    terms: [
      ['电荷量', 'charge', 'q'], ['元电荷', 'elementary charge', 'e'],
      ['库仑定律', 'Coulomb\'s law', '—'], ['电场强度', 'electric field strength', 'E'],
      ['电场线', 'field line', '—'], ['静电平衡', 'electrostatic equilibrium', '—'],
      ['静电屏蔽', 'electrostatic shielding', '—']
    ],
    practice: [
      {
        q: { zh: '两个点电荷间距变为原来的 2 倍，库仑力变为原来的：', en: 'If the separation of two point charges doubles, the force becomes:' },
        o: [{ zh: '2 倍', en: '2×' }, { zh: '1/2', en: '1/2' }, { zh: '1/4', en: '1/4' }, { zh: '4 倍', en: '4×' }],
        a: 2,
        e: { zh: 'F ∝ 1/r²，距离加倍，力变为 1/4。', en: 'F ∝ 1/r², so doubling r quarters the force.' }
      },
      {
        q: { zh: '关于电场线，正确的是：', en: 'Which is true of electric field lines?' },
        o: [{ zh: '电场线是电荷运动的轨迹', en: 'they are particle trajectories' }, { zh: '电场线可以相交', en: 'they may cross' }, { zh: '电场线越密场强越大', en: 'denser lines mean stronger field' }, { zh: '电场线是闭合曲线', en: 'they form closed loops' }],
        a: 2,
        e: { zh: '电场线的疏密表示场强大小；它不闭合、不相交，也不是轨迹。', en: 'Density encodes strength; lines neither close nor cross, and they are not trajectories.' }
      },
      {
        q: { zh: '处于静电平衡的导体，内部场强：', en: 'Inside a conductor in electrostatic equilibrium, the field is:' },
        o: [{ zh: '为零', en: 'zero' }, { zh: '与外部相同', en: 'the same as outside' }, { zh: '方向指向表面', en: 'pointing to the surface' }, { zh: '无法确定', en: 'undetermined' }],
        a: 0,
        e: { zh: '若内部场强不为零，自由电荷会继续移动，直到场强为零。', en: 'Any internal field would keep charges moving until it cancels.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-potential', track: 'senior', no: '10', tag: '选修',
    kicker: { zh: '电学 · 能', en: 'Electricity · energy' },
    title: { zh: '电势与电容', en: 'Potential and Capacitance' },
    summary: { zh: '电势差、等势面、U = Ed 与电容器。', en: 'Potential difference, equipotentials, U = Ed, capacitors.' },
    intro: {
      zh: '电场有两个描述方式：力的描述（场强 E）和能的描述（电势 φ）。二者由 U = Ed 在匀强电场中直接相连。电容器就是把电荷"存"起来的两块板。',
      en: 'A field can be described two ways: by force (E) and by energy (potential φ). In a uniform field they are linked by U = Ed. A capacitor is simply two plates that store charge.'
    },
    sims: [
      { type: 'capacitor', label: { zh: '平行板电容器', en: 'Parallel-plate capacitor' } },
      { type: 'field', cfg: { mode: 'plates' }, label: { zh: '匀强电场', en: 'Uniform field' } }
    ],
    concepts: [
      {
        t: { zh: '电势能与电势', en: 'Potential energy and potential' },
        b: {
          zh: '电荷在电场中具有电势能 Ep，电势能与电荷量的比值叫电势：φ = Ep/q，单位伏特（V）。电势是标量，有正负，大小与零电势点的选取有关。两点间的电势差 U_AB = φ_A − φ_B = W_AB/q，与零电势点无关。',
          en: 'A charge in a field has potential energy Ep; the ratio Ep/q is the potential φ, in volts. Potential is a scalar with a sign, defined relative to a chosen zero. The difference U_AB = φ_A − φ_B = W_AB/q is independent of that choice.'
        },
        f: '<i>φ</i> = <i>E</i><sub>p</sub>/<i>q</i>　　<i>U</i><sub>AB</sub> = <i>φ</i><sub>A</sub>−<i>φ</i><sub>B</sub>'
      },
      {
        t: { zh: '等势面', en: 'Equipotential surfaces' },
        b: {
          zh: '电场中电势相同的点构成等势面。等势面与电场线处处垂直；沿等势面移动电荷，电场力不做功。电场线总是从电势高的等势面指向电势低的等势面。导体处于静电平衡时，整个导体是一个等势体，表面是等势面。',
          en: 'Points of equal potential form an equipotential surface, always perpendicular to the field lines. Moving a charge along one takes no work. Field lines run from higher to lower potential. A conductor in equilibrium is an equipotential body.'
        },
        note: { zh: '电势高低与场强大小没有必然联系：场强为零处电势不一定为零。', en: 'Potential and field strength are independent: zero field does not mean zero potential.' }
      },
      {
        t: { zh: '匀强电场中 U = Ed', en: 'Uniform field: U = Ed' },
        b: {
          zh: '在匀强电场中，沿场强方向两点间的电势差等于场强与两点间距离的乘积：U = Ed。d 必须是沿电场方向的距离；若两点连线与场强成 θ 角，则 U = Edcosθ。',
          en: 'In a uniform field the potential difference along the field is U = Ed, where d is measured along the field. At an angle θ, U = Edcosθ.'
        },
        f: '<i>U</i> = <i>Ed</i>　　<i>E</i> = <i>U</i>/<i>d</i>'
      },
      {
        t: { zh: '电容', en: 'Capacitance' },
        b: {
          zh: '电容器所带电荷量与两板间电势差的比值叫电容：C = Q/U，单位法拉（F），常用微法（μF）。电容由电容器本身决定，与所带电荷量和电压无关。平行板电容器的电容 C = ε_r S/(4πkd)，与正对面积成正比、与板间距成反比。',
          en: 'Capacitance is charge per volt: C = Q/U, in farads (µF in practice). It is a property of the device, independent of Q and U. For parallel plates C = ε_r S/(4πkd): proportional to area, inversely proportional to gap.'
        },
        f: '<i>C</i> = <i>Q</i>/<i>U</i>　　<i>C</i> = <i>ε</i><sub>r</sub><i>S</i>/(4π<i>kd</i>)'
      },
      {
        t: { zh: '电容器的充放电', en: 'Charging and discharging' },
        b: {
          zh: '电容器充电时，电源把电荷搬到两板上，两板带等量异种电荷，板间建立电场，电能储存起来。断开电源后电荷量不变；保持连接电源则电压不变。储存的能量 E = ½CU² = ½QU。',
          en: 'Charging moves charge onto the plates, setting up a field and storing energy. Disconnected, the charge stays; still connected, the voltage stays. Stored energy is ½CU² = ½QU.'
        },
        f: '<i>E</i> = ½<i>CU</i><sup>2</sup>'
      }
    ],
    terms: [
      ['电势', 'electric potential', 'φ'], ['电势差', 'potential difference', 'U'],
      ['等势面', 'equipotential surface', '—'], ['电容', 'capacitance', 'C'],
      ['法拉', 'farad', 'F'], ['介电常数', 'permittivity', 'ε'],
      ['击穿', 'breakdown', '—']
    ],
    practice: [
      {
        q: { zh: '匀强电场场强 200 V/m，沿场强方向相距 0.05 m 两点的电势差为：', en: 'A 200 V/m uniform field over 0.05 m along the field gives:' },
        o: [{ zh: '4 V', en: '4 V' }, { zh: '10 V', en: '10 V' }, { zh: '40 V', en: '40 V' }, { zh: '4000 V', en: '4000 V' }],
        a: 1,
        e: { zh: 'U = Ed = 200 × 0.05 = 10 V。', en: 'U = Ed = 10 V.' }
      },
      {
        q: { zh: '平行板电容器充电后断开电源，将板间距增大，则：', en: 'A charged capacitor is disconnected, then the plates are pulled apart. Then:' },
        o: [{ zh: '电荷量不变，电压增大', en: 'charge fixed, voltage rises' }, { zh: '电压不变，电荷量增大', en: 'voltage fixed, charge rises' }, { zh: '电容增大', en: 'capacitance rises' }, { zh: '场强增大', en: 'field strength rises' }],
        a: 0,
        e: { zh: '断开后 Q 不变；d 增大使 C 减小，由 U = Q/C 得 U 增大；场强 E = U/d = Q/(εS) 不变。', en: 'Q stays fixed; larger d lowers C, so U rises. The field E = Q/(εS) is unchanged.' }
      },
      {
        q: { zh: '沿等势面移动电荷时，电场力做功：', en: 'Moving a charge along an equipotential surface, the field does:' },
        o: [{ zh: '为零', en: 'zero work' }, { zh: '为正', en: 'positive work' }, { zh: '为负', en: 'negative work' }, { zh: '先正后负', en: 'positive then negative' }],
        a: 0,
        e: { zh: '等势面上各点电势相同，U = 0，W = qU = 0。', en: 'No potential difference along the surface, so W = qU = 0.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-circuit', track: 'senior', no: '11', tag: '必修',
    kicker: { zh: '电学 · 电路', en: 'Electricity · circuits' },
    title: { zh: '恒定电流', en: 'Direct Current Circuits' },
    summary: { zh: '电阻定律、闭合电路欧姆定律、电功率。', en: 'Resistivity, the complete-circuit law, and power.' },
    intro: {
      zh: '高中电路比初中多了"内阻"这一项。电源不是理想电压源，它自己有电阻 r，于是路端电压随电流增大而下降：U = E − Ir。',
      en: 'Senior circuits add one thing: internal resistance. A real source has its own r, so terminal voltage sags as current rises: U = E − Ir.'
    },
    sims: [{ type: 'circuit', label: { zh: '串并联电路', en: 'Series and parallel' } }],
    concepts: [
      {
        t: { zh: '电流的微观表达式', en: 'Current at the microscopic level' },
        b: {
          zh: '电流是单位时间内通过导体横截面的电荷量：I = Q/t。若导体单位体积内有 n 个自由电荷，每个电荷量为 q，定向移动速率为 v，横截面积为 S，则 I = nqSv。注意定向移动速率很小（约 10⁻⁴ m/s），但电场建立的速度接近光速。',
          en: 'Current is charge per unit time. With n carriers per unit volume, charge q, drift speed v and cross-section S, I = nqSv. The drift speed is tiny (about 10⁻⁴ m/s), yet the field that starts them propagates near light speed.'
        },
        f: '<i>I</i> = <i>nqSv</i>'
      },
      {
        t: { zh: '电阻定律', en: 'Resistivity' },
        b: {
          zh: '导体的电阻与长度成正比、与横截面积成反比：R = ρL/S，ρ 是电阻率，由材料和温度决定。金属的电阻率随温度升高而增大，半导体的电阻率随温度升高而减小。',
          en: 'Resistance grows with length and falls with cross-section: R = ρL/S, with ρ the resistivity set by material and temperature. Metals become more resistive when hot; semiconductors less.'
        },
        f: '<i>R</i> = <i>ρL</i>/<i>S</i>'
      },
      {
        t: { zh: '闭合电路欧姆定律', en: 'The complete-circuit law' },
        b: {
          zh: '闭合电路中的电流跟电源电动势成正比，跟内外电阻之和成反比：I = E/(R+r)。路端电压 U = E − Ir，随外电阻减小（电流增大）而减小。断路时 U = E，短路时 I = E/r 最大。电源的 U–I 图像是一条斜率为 −r、纵截距为 E 的直线。',
          en: 'Current equals EMF over total resistance: I = E/(R+r). Terminal voltage U = E − Ir falls as current rises. Open circuit: U = E. Short circuit: I = E/r. The U–I line has intercept E and slope −r.'
        },
        f: '<i>I</i> = <i>E</i>/(<i>R</i>+<i>r</i>)　　<i>U</i> = <i>E</i>−<i>Ir</i>'
      },
      {
        t: { zh: '电功与电热', en: 'Electrical work and heat' },
        b: {
          zh: '电功 W = UIt，电功率 P = UI，这是普遍适用的。电热由焦耳定律给出 Q = I²Rt。在纯电阻电路中（电炉、灯泡），电能全部转化为内能，W = Q；在非纯电阻电路中（电动机、电解槽），W > Q，多余部分转化为机械能或化学能。',
          en: 'Work is W = UIt and power P = UI — always valid. Joule heating is Q = I²Rt. In a pure resistor all electrical energy becomes heat, so W = Q. In a motor or electrolytic cell, W > Q; the rest becomes mechanical or chemical energy.'
        },
        f: '<i>W</i> = <i>UIt</i>　　<i>P</i> = <i>UI</i>　　<i>Q</i> = <i>I</i><sup>2</sup><i>Rt</i>'
      },
      {
        t: { zh: '串并联与电表改装', en: 'Series, parallel, and meter conversion' },
        b: {
          zh: '串联分压、并联分流。把小量程电流表改装成电压表要串联一个大电阻（分压）；改装成大量程电流表要并联一个小电阻（分流）。伏安法测电阻时，大电阻用内接法、小电阻用外接法，可减小系统误差。',
          en: 'Series divides voltage, parallel divides current. To turn a galvanometer into a voltmeter, add a large series resistor; into an ammeter, add a small shunt. When measuring resistance, use the internal connection for large R and the external for small R.'
        }
      }
    ],
    terms: [
      ['电动势', 'electromotive force', 'E'], ['内阻', 'internal resistance', 'r'],
      ['路端电压', 'terminal voltage', 'U'], ['电阻率', 'resistivity', 'ρ'],
      ['电功', 'electrical work', 'W'], ['焦耳定律', 'Joule\'s law', '—'],
      ['分流', 'current division', '—'], ['分压', 'voltage division', '—']
    ],
    practice: [
      {
        q: { zh: '电源电动势 12 V，内阻 1 Ω，外接 5 Ω 电阻，电流为：', en: 'EMF 12 V, internal resistance 1 Ω, external 5 Ω. Current:' },
        o: [{ zh: '2 A', en: '2 A' }, { zh: '2.4 A', en: '2.4 A' }, { zh: '12 A', en: '12 A' }, { zh: '1.2 A', en: '1.2 A' }],
        a: 0,
        e: { zh: 'I = E/(R+r) = 12/6 = 2 A。', en: 'I = 12/6 = 2 A.' }
      },
      {
        q: { zh: '上题中电源的路端电压为：', en: 'In the previous circuit the terminal voltage is:' },
        o: [{ zh: '12 V', en: '12 V' }, { zh: '10 V', en: '10 V' }, { zh: '2 V', en: '2 V' }, { zh: '8 V', en: '8 V' }],
        a: 1,
        e: { zh: 'U = E − Ir = 12 − 2×1 = 10 V，也等于 IR = 2×5。', en: 'U = E − Ir = 10 V, which also equals IR.' }
      },
      {
        q: { zh: '电动机正常工作时，下列关系正确的是：', en: 'For a working motor, which relation holds?' },
        o: [{ zh: 'W = Q', en: 'W = Q' }, { zh: 'W > Q', en: 'W > Q' }, { zh: 'W < Q', en: 'W < Q' }, { zh: 'P = I²R', en: 'P = I²R' }],
        a: 1,
        e: { zh: '电动机是非纯电阻，电能一部分转化为机械能，所以 W > Q，且 P = UI > I²R。', en: 'A motor is not a pure resistor: some energy becomes mechanical, so W > Q and UI > I²R.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-magnetism', track: 'senior', no: '12', tag: '必修',
    kicker: { zh: '电学 · 磁与感应', en: 'Electricity · magnetism' },
    title: { zh: '磁场与电磁感应', en: 'Magnetic Fields and Induction' },
    summary: { zh: '安培力、洛伦兹力、法拉第定律与楞次定律。', en: 'Ampère force, Lorentz force, Faraday and Lenz.' },
    intro: {
      zh: '磁场对运动电荷的力总是垂直于速度，所以它不做功 —— 只改变方向。这一点让带电粒子在磁场中走出圆弧，也是回旋加速器和质谱仪的基础。',
      en: 'The magnetic force on a moving charge is always perpendicular to its velocity, so it does no work — it only turns the particle. That is why charges move in circles, and why cyclotrons and mass spectrometers work.'
    },
    sims: [
      { type: 'field', cfg: { mode: 'magnet' }, label: { zh: '磁感线', en: 'Field lines' } },
      { type: 'coil', label: { zh: '磁体穿过线圈', en: 'Magnet through a coil' } }
    ],
    concepts: [
      {
        t: { zh: '磁场与磁感应强度', en: 'Magnetic field and flux density' },
        b: {
          zh: '磁感应强度 B 描述磁场的强弱和方向，定义式 B = F/(IL)（电流与磁场垂直时），单位特斯拉（T）。磁感线是闭合曲线，磁体外部从 N 到 S，内部从 S 到 N。地磁场的 N 极在地理南极附近。',
          en: 'Flux density B describes the strength and direction of a magnetic field, defined by B = F/(IL) for a perpendicular current, in tesla. Field lines are closed loops: outside a magnet N to S, inside S to N. Earth\'s magnetic north pole lies near the geographic south.'
        },
        f: '<i>B</i> = <i>F</i>/(<i>IL</i>)'
      },
      {
        t: { zh: '安培力', en: 'Force on a current' },
        b: {
          zh: '通电导线在磁场中受到的力叫安培力：F = BILsinθ，θ 是电流方向与磁场方向的夹角。电流与磁场平行时不受力，垂直时受力最大。方向用左手定则判断：让磁感线穿入手心，四指指向电流方向，拇指指向安培力方向。',
          en: 'A current-carrying wire in a field feels F = BILsinθ, where θ is the angle between current and field. Parallel gives zero, perpendicular gives maximum. Direction follows the left-hand rule.'
        },
        f: '<i>F</i> = <i>BIL</i>sin<i>θ</i>'
      },
      {
        t: { zh: '洛伦兹力', en: 'The Lorentz force' },
        b: {
          zh: '运动电荷在磁场中受到的力 F = qvBsinθ，方向同样用左手定则（正电荷）。由于洛伦兹力始终垂直于速度，它不做功，只改变速度方向。带电粒子垂直进入匀强磁场后做匀速圆周运动，半径 r = mv/(qB)，周期 T = 2πm/(qB)，周期与速度无关。',
          en: 'A moving charge feels F = qvBsinθ. Because it is always perpendicular to v, it does no work — it only bends the path. A charge entering a uniform field perpendicularly moves in a circle of radius mv/(qB) with period 2πm/(qB), independent of speed.'
        },
        f: '<i>r</i> = <i>mv</i>/(<i>qB</i>)　　<i>T</i> = 2π<i>m</i>/(<i>qB</i>)'
      },
      {
        t: { zh: '法拉第电磁感应定律', en: 'Faraday\'s law' },
        b: {
          zh: '闭合电路中感应电动势的大小跟穿过这一电路的磁通量的变化率成正比：E = nΔΦ/Δt。磁通量 Φ = BS（B 与 S 垂直时）。感应电动势的大小取决于磁通量变化的快慢，而不是磁通量本身的大小。',
          en: 'The induced EMF is proportional to the rate of change of flux: E = nΔΦ/Δt. Flux is Φ = BS for a perpendicular field. What matters is how fast the flux changes, not how much there is.'
        },
        f: 'ε = <i>n</i>ΔΦ/Δ<i>t</i>　　Φ = <i>BS</i>'
      },
      {
        t: { zh: '楞次定律与动生电动势', en: 'Lenz\'s law and motional EMF' },
        b: {
          zh: '感应电流的磁场总要阻碍引起感应电流的磁通量的变化 —— 这就是楞次定律，"阻碍"不是"相反"。导体棒以速度 v 切割磁感线时，产生的动生电动势 ε = BLv，方向用右手定则判断。',
          en: 'The induced current creates a field that opposes the change in flux that produced it — Lenz\'s law. "Oppose the change", not "oppose the field". A rod of length L moving at v across a field generates ε = BLv, direction from the right-hand rule.'
        },
        f: 'ε = <i>BLv</i>'
      },
      {
        t: { zh: '变压器', en: 'Transformers' },
        b: {
          zh: '理想变压器原副线圈电压之比等于匝数之比：U₁/U₂ = n₁/n₂；电流之比等于匝数的反比：I₁/I₂ = n₂/n₁。变压器只能改变交流电压，不能改变直流电压；它不改变功率（理想情况下 P₁ = P₂）。',
          en: 'For an ideal transformer, voltages follow the turns ratio and currents the inverse ratio. It works only with alternating current and, ideally, passes power unchanged.'
        },
        f: '<i>U</i><sub>1</sub>/<i>U</i><sub>2</sub> = <i>n</i><sub>1</sub>/<i>n</i><sub>2</sub>'
      }
    ],
    terms: [
      ['磁感应强度', 'magnetic flux density', 'B'], ['磁通量', 'magnetic flux', 'Φ'],
      ['安培力', 'Ampère force', 'F'], ['洛伦兹力', 'Lorentz force', 'F'],
      ['左手定则', 'left-hand rule', '—'], ['楞次定律', 'Lenz\'s law', '—'],
      ['动生电动势', 'motional EMF', 'ε'], ['变压器', 'transformer', '—']
    ],
    practice: [
      {
        q: { zh: '电荷垂直进入匀强磁场，做圆周运动的半径与速度的关系是：', en: 'A charge enters a uniform field perpendicularly. Its orbital radius depends on speed as:' },
        o: [{ zh: '与 v 成正比', en: 'proportional to v' }, { zh: '与 v 成反比', en: 'inversely proportional to v' }, { zh: '与 v² 成正比', en: 'proportional to v²' }, { zh: '与 v 无关', en: 'independent of v' }],
        a: 0,
        e: { zh: 'r = mv/(qB)，r 与 v 成正比；但周期 T = 2πm/(qB) 与 v 无关。', en: 'r = mv/(qB) grows with v, while the period is independent of v.' }
      },
      {
        q: { zh: '长度 0.5 m 的导体棒以 4 m/s 垂直切割 B = 0.2 T 的磁场，感应电动势为：', en: 'A 0.5 m rod cuts a 0.2 T field at 4 m/s. Induced EMF:' },
        o: [{ zh: '0.4 V', en: '0.4 V' }, { zh: '0.8 V', en: '0.8 V' }, { zh: '1.6 V', en: '1.6 V' }, { zh: '4 V', en: '4 V' }],
        a: 0,
        e: { zh: 'ε = BLv = 0.2 × 0.5 × 4 = 0.4 V。', en: 'ε = BLv = 0.4 V.' }
      },
      {
        q: { zh: '根据楞次定律，感应电流的磁场总是：', en: 'By Lenz\'s law, the field of the induced current always:' },
        o: [{ zh: '与原磁场方向相反', en: 'opposes the original field direction' }, { zh: '阻碍引起感应电流的磁通量的变化', en: 'opposes the change in flux' }, { zh: '与原磁场方向相同', en: 'matches the original field' }, { zh: '使磁通量增大', en: 'increases the flux' }],
        a: 1,
        e: { zh: '阻碍的是"变化"：磁通量增大时反向，减小时同向。', en: 'It opposes the change: reverse when flux grows, same direction when it falls.' }
      }
    ]
  });

  P.chapters.push({
    id: 'h-rotation', track: 'senior', no: '13', tag: '拓展',
    kicker: { zh: '力学 · 刚体', en: 'Mechanics · rigid bodies' },
    title: { zh: '刚体转动', en: 'Rotation of Rigid Bodies' },
    summary: { zh: '转动惯量、力矩、角动量守恒。', en: 'Moment of inertia, torque, and angular momentum.' },
    intro: {
      zh: '把平动的整套语言翻译成转动：m → I，F → τ，v → ω，p → L。翻译过去以后，牛顿第二定律变成 τ = Iα，动量守恒变成角动量守恒。',
      en: 'Translate the whole language of translation: m → I, F → τ, v → ω, p → L. Then F = ma becomes τ = Iα, and momentum conservation becomes angular momentum conservation.'
    },
    sims: [{ type: 'rotation', label: { zh: '转动圆盘', en: 'Spinning disc' } }],
    concepts: [
      {
        t: { zh: '角量与线量', en: 'Angular and linear quantities' },
        b: {
          zh: '刚体上每一点绕轴转动的角速度 ω 相同，但线速度不同：v = ωr，离轴越远线速度越大。角加速度 α = Δω/Δt，切向加速度 a_t = αr，法向加速度 a_n = ω²r。',
          en: 'Every point of a rigid body shares the same angular velocity, but not the same linear speed: v = ωr, larger farther out. Angular acceleration α gives tangential acceleration αr and centripetal acceleration ω²r.'
        },
        f: '<i>v</i> = <i>ωr</i>　　<i>a</i><sub>t</sub> = <i>αr</i>　　<i>a</i><sub>n</sub> = <i>ω</i><sup>2</sup><i>r</i>'
      },
      {
        t: { zh: '转动惯量', en: 'Moment of inertia' },
        b: {
          zh: '转动惯量是物体转动惯性的量度：I = Σmᵢrᵢ²，单位 kg·m²。它不仅与质量有关，还与质量相对于转轴的分布有关 —— 同样质量的圆环和圆盘，绕中心轴的转动惯量不同（圆环 I = mR²，圆盘 I = ½mR²）。',
          en: 'Moment of inertia measures rotational inertia: I = Σmr², in kg·m². It depends not only on mass but on how that mass is distributed: a hoop and a disc of equal mass have different I about their axes (mR² versus ½mR²).'
        },
        f: '<i>I</i> = Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup>'
      },
      {
        t: { zh: '转动定律', en: 'Newton\'s second law for rotation' },
        b: {
          zh: '力矩 τ = rFsinθ，是力使物体绕轴转动的作用效果，单位 N·m。刚体的角加速度与合外力矩成正比、与转动惯量成反比：τ = Iα。这与 F = ma 完全对应。',
          en: 'Torque τ = rFsinθ measures a force\'s turning effect, in N·m. Angular acceleration is proportional to net torque and inversely to inertia: τ = Iα — exactly parallel to F = ma.'
        },
        f: '<i>τ</i> = <i>rF</i>sin<i>θ</i> = <i>Iα</i>'
      },
      {
        t: { zh: '角动量守恒', en: 'Conservation of angular momentum' },
        b: {
          zh: '角动量 L = Iω，单位 kg·m²/s。当合外力矩为零时，系统的角动量保持不变：I₁ω₁ = I₂ω₂。花样滑冰运动员收臂时 I 变小、ω 变大，就是这个道理。',
          en: 'Angular momentum L = Iω. With zero net torque it is conserved: I₁ω₁ = I₂ω₂. A skater pulling her arms in reduces I and spins faster.'
        },
        f: '<i>L</i> = <i>Iω</i>　　<i>I</i><sub>1</sub><i>ω</i><sub>1</sub> = <i>I</i><sub>2</sub><i>ω</i><sub>2</sub>'
      },
      {
        t: { zh: '转动动能', en: 'Rotational kinetic energy' },
        b: {
          zh: '绕定轴转动的刚体具有转动动能 E = ½Iω²。若物体同时平动和转动（如滚动的球），总动能为 ½mv² + ½Iω²。纯滚动时 v = ωR，机械能守恒，球从斜面滚下比滑块下滑慢，因为一部分能量分给了转动。',
          en: 'A rotating body has ½Iω². A body that also translates has ½mv² + ½Iω². For rolling without slipping, v = ωR; a rolling ball reaches the bottom of a ramp later than a sliding block because some energy goes into rotation.'
        },
        f: '<i>E</i><sub>k</sub> = ½<i>Iω</i><sup>2</sup>'
      }
    ],
    terms: [
      ['角速度', 'angular velocity', 'ω'], ['角加速度', 'angular acceleration', 'α'],
      ['转动惯量', 'moment of inertia', 'I'], ['力矩', 'torque', 'τ'],
      ['角动量', 'angular momentum', 'L'], ['转动动能', 'rotational KE', '—'],
      ['纯滚动', 'rolling without slipping', '—']
    ],
    practice: [
      {
        q: { zh: '花样滑冰运动员收拢手臂时，转速变快，原因是：', en: 'A skater spins faster when pulling her arms in because:' },
        o: [{ zh: '角动量守恒，转动惯量减小', en: 'angular momentum is conserved and I falls' }, { zh: '力矩增大', en: 'torque increases' }, { zh: '质量减小', en: 'her mass decreases' }, { zh: '重力做功', en: 'gravity does work' }],
        a: 0,
        e: { zh: '合外力矩为零，L = Iω 守恒；收臂使 I 变小，ω 必须变大。', en: 'No net torque, so L is fixed; smaller I forces larger ω.' }
      },
      {
        q: { zh: '质量相同、半径相同的圆环和圆盘，绕中心轴转动惯量较大的是：', en: 'A hoop and a disc of the same mass and radius: which has the larger I about its axis?' },
        o: [{ zh: '圆环', en: 'the hoop' }, { zh: '圆盘', en: 'the disc' }, { zh: '一样大', en: 'the same' }, { zh: '无法比较', en: 'cannot compare' }],
        a: 0,
        e: { zh: '圆环质量全在边缘，I = mR²；圆盘质量分布更靠近轴，I = ½mR²。', en: 'The hoop keeps all its mass at radius R (mR²); the disc is more concentrated near the axis (½mR²).' }
      },
      {
        q: { zh: '力矩的单位是：', en: 'The unit of torque is:' },
        o: [{ zh: 'N', en: 'N' }, { zh: 'N·m', en: 'N·m' }, { zh: 'J', en: 'J' }, { zh: 'kg·m/s', en: 'kg·m/s' }],
        a: 1,
        e: { zh: 'τ = rFsinθ，单位是 N·m。注意它与功的单位 J 量纲相同，但物理意义不同。', en: 'τ = rFsinθ, so N·m. It shares dimensions with the joule but means something different.' }
      }
    ]
  });

  P.seniorCount = P.chapters.length - P.juniorCount;
})();
