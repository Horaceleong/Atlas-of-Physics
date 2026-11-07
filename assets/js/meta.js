/* meta.js — curriculum mapping + prerequisite graph for every chapter.
   Curriculum notes are editorial cross-references, NOT official syllabus text.
   Junior  : topic names follow the five first-level themes of the 2022
             compulsory-education physics curriculum standard (物質 /
             運動和相互作用 / 能量 / 實驗探究 / 跨學科實踐).
   Senior  : book and unit follow the 2019 PEP (人教版) textbook structure.
   `requires` drives the learning map: an arrow means "study this first". */
(function () {
  const M = (window.PHYS.meta = {
    'j-motion': {
      unit: '機械運動', unitEn: 'Mechanical motion',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: []
    },
    'j-sound': {
      unit: '聲和光', unitEn: 'Sound and light',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-motion']
    },
    'j-light': {
      unit: '聲和光', unitEn: 'Sound and light',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-motion']
    },
    'j-lens': {
      unit: '聲和光', unitEn: 'Sound and light',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-light']
    },
    'j-thermal': {
      unit: '物質的形態和變化', unitEn: 'States and changes of matter',
      theme: '物質', themeEn: 'Matter',
      requires: ['j-motion']
    },
    'j-density': {
      unit: '物質的屬性', unitEn: 'Properties of matter',
      theme: '物質', themeEn: 'Matter',
      requires: ['j-motion']
    },
    'j-force': {
      unit: '機械運動和力', unitEn: 'Motion and force',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-motion', 'j-density']
    },
    'j-pressure': {
      unit: '機械運動和力', unitEn: 'Motion and force',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-force', 'j-density']
    },
    'j-energy': {
      unit: '機械能', unitEn: 'Mechanical energy',
      theme: '能量', themeEn: 'Energy',
      requires: ['j-force']
    },
    'j-circuit': {
      unit: '電磁能', unitEn: 'Electrical energy',
      theme: '能量', themeEn: 'Energy',
      requires: ['j-motion']
    },
    'j-magnet': {
      unit: '電和磁', unitEn: 'Electricity and magnetism',
      theme: '運動和相互作用', themeEn: 'Motion and interaction',
      requires: ['j-circuit']
    },

    'h-kinematics': {
      book: '必修一', bookEn: 'Compulsory 1',
      unit: '運動的描述', unitEn: 'Describing motion',
      requires: []
    },
    'h-newton': {
      book: '必修一', bookEn: 'Compulsory 1',
      unit: '相互作用與牛頓運動定律', unitEn: "Forces and Newton's laws",
      requires: ['h-kinematics']
    },
    'h-projectile': {
      book: '必修二', bookEn: 'Compulsory 2',
      unit: '拋體運動', unitEn: 'Projectile motion',
      requires: ['h-newton']
    },
    'h-circular': {
      book: '必修二', bookEn: 'Compulsory 2',
      unit: '圓周運動與萬有引力', unitEn: 'Circular motion and gravitation',
      requires: ['h-projectile']
    },
    'h-energy': {
      book: '必修二', bookEn: 'Compulsory 2',
      unit: '機械能守恆', unitEn: 'Conservation of mechanical energy',
      requires: ['h-newton']
    },
    'h-momentum': {
      book: '選擇性必修一', bookEn: 'Elective 1',
      unit: '動量守恆', unitEn: 'Conservation of momentum',
      requires: ['h-energy']
    },
    'h-oscillation': {
      book: '選擇性必修一', bookEn: 'Elective 1',
      unit: '機械振動與機械波', unitEn: 'Oscillations and waves',
      requires: ['h-circular']
    },
    'h-fluid': {
      book: '拓展', bookEn: 'Extension',
      unit: '流體力學初步', unitEn: 'Introductory fluid mechanics',
      requires: ['h-newton']
    },
    'h-electrostatics': {
      book: '必修三', bookEn: 'Compulsory 3',
      unit: '靜電場', unitEn: 'Electrostatic field',
      requires: ['h-newton']
    },
    'h-potential': {
      book: '必修三', bookEn: 'Compulsory 3',
      unit: '電勢與電容', unitEn: 'Potential and capacitance',
      requires: ['h-electrostatics']
    },
    'h-circuit': {
      book: '必修三', bookEn: 'Compulsory 3',
      unit: '恆定電流', unitEn: 'Steady currents',
      requires: ['h-potential']
    },
    'h-magnetism': {
      book: '選擇性必修二', bookEn: 'Elective 2',
      unit: '電磁感應', unitEn: 'Electromagnetic induction',
      requires: ['h-circuit']
    },
    'h-rotation': {
      book: '拓展', bookEn: 'Extension',
      unit: '剛體轉動', unitEn: 'Rotation of rigid bodies',
      requires: ['h-momentum']
    }
  });

  /* depth = longest path from a root; used by the map layout. */
  PHYS.metaDepth = function (id, seen) {
    const m = M[id];
    if (!m) return 0;
    seen = seen || {};
    if (seen[id]) return 0;
    seen[id] = 1;
    if (!m.requires.length) return 0;
    let d = 0;
    for (const r of m.requires) d = Math.max(d, PHYS.metaDepth(r, seen) + 1);
    return d;
  };
})();
