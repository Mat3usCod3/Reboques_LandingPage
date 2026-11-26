/* ============================================================
   1. CONFIGURAÇÃO
   ============================================================ */
const WHATSAPP_NUMBER = '5531975561538';
const COMPANY = 'Carretinhas Ronildo';

const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
const WA_GENERIC = waLink(`Olá! Vim pelo site da ${COMPANY} e gostaria de mais informações sobre os reboques.`);

/* ============================================================
   2. GERADOR DE IMAGENS SVG
   — Substitua o campo `images` de cada produto por fotos reais.
   ============================================================ */
function defs(){
  return `<defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#26282c"/><stop offset="55%" stop-color="#161719"/><stop offset="100%" stop-color="#0b0b0c"/>
    </linearGradient>
    <radialGradient id="spot" cx="50%" cy="28%" r="68%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.13"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8a9099"/><stop offset="45%" stop-color="#4b5058"/><stop offset="100%" stop-color="#22252a"/>
    </linearGradient>
    <linearGradient id="steelDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3e44"/><stop offset="100%" stop-color="#141619"/>
    </linearGradient>
    <linearGradient id="redAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D90429"/><stop offset="100%" stop-color="#E63946"/>
    </linearGradient>
  </defs>`;
}


function gridLines(){
  let v = '';
  for(let x=80; x<800; x+=80) v += `<line x1="${x}" y1="0" x2="${x}" y2="600" />`;
  for(let y=80; y<600; y+=80) v += `<line x1="0" y1="${y}" x2="800" y2="${y}" />`;
  return `<g stroke="#ffffff" stroke-opacity="0.035" stroke-width="1">${v}</g>`;
}

function wheelSVG(cx, cy, r){
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4;
    return `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(a)*r*0.62).toFixed(1)}" y2="${(cy + Math.sin(a)*r*0.62).toFixed(1)}"
             stroke="#0b0c0d" stroke-width="${Math.max(2, r*0.1).toFixed(1)}" stroke-linecap="round"/>`;
  }).join('');
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0d0e10"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.94}" fill="none" stroke="#31353b" stroke-width="${(r*0.12).toFixed(1)}"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.7}" fill="none" stroke="#3d424a" stroke-width="${(r*0.06).toFixed(1)}"/>
    ${spokes}
    <circle cx="${cx}" cy="${cy}" r="${r*0.22}" fill="url(#steel)"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.09}" fill="#14161a"/>
  </g>`;
}

function motoSilhouette(gY){
  const r = 30, cy = gY - r, rx = 330, fx = 470;
  return `<g>
    ${wheelSVG(rx, cy, r)}
    ${wheelSVG(fx, cy, r)}
    <path d="M${rx} ${cy} L385 ${cy-58} L455 ${cy-64} L${fx} ${cy}"
          fill="none" stroke="#c9ced6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M385 ${cy-58} L345 ${cy-52}" stroke="#c9ced6" stroke-width="7" stroke-linecap="round"/>
    <rect x="406" y="${cy-84}" width="58" height="16" rx="8" fill="#E63946"/>
    <path d="M455 ${cy-64} L472 ${cy-92}" stroke="#c9ced6" stroke-width="6" stroke-linecap="round"/>
    <path d="M452 ${cy-92} L496 ${cy-92}" stroke="#c9ced6" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function bodyFor(kind){
  switch(kind){
    case 'moto':
      return `<rect x="140" y="312" width="520" height="16" rx="5" fill="url(#steel)"/>
              <rect x="140" y="312" width="520" height="4" fill="url(#redAccent)" opacity="0.9"/>
              ${motoSilhouette(312)}`;

    case 'animais': {
      let bars = '';
      for(let x=164; x<=636; x+=32){
        bars += `<line x1="${x}" y1="196" x2="${x}" y2="316" stroke="#5b6169" stroke-width="4"/>`;
      }
      return `<rect x="140" y="180" width="520" height="146" rx="6" fill="#191b1e" stroke="#4a5058" stroke-width="3"/>
              <rect x="140" y="180" width="520" height="11" rx="5" fill="url(#redAccent)"/>
              ${bars}
              <line x1="140" y1="256" x2="660" y2="256" stroke="#4a5058" stroke-width="5"/>
              <rect x="140" y="316" width="520" height="10" fill="#2b2f34"/>`;
    }

    case 'nautico':
      return `<rect x="140" y="304" width="520" height="20" rx="6" fill="url(#steel)"/>
              <path d="M170 306 L630 306 L588 250 L212 250 Z" fill="url(#steelDark)" stroke="#4c525a" stroke-width="2"/>
              <path d="M212 250 L588 250 L566 230 L234 230 Z" fill="#2c3138"/>
              <path d="M186 292 L614 292" stroke="#E63946" stroke-width="6" opacity="0.9"/>
              <rect x="392" y="172" width="76" height="58" rx="8" fill="#31363d" stroke="#4c525a" stroke-width="2"/>
              <path d="M300 230 L376 230 L376 200 L316 200 Z" fill="#1c1f23" opacity="0.75"/>`;

    case 'jet':
      return `<rect x="180" y="300" width="440" height="20" rx="6" fill="url(#steel)"/>
              <path d="M222 302 L598 302 L568 256 L252 256 Z" fill="url(#steelDark)" stroke="#4c525a" stroke-width="2"/>
              <path d="M252 256 L568 256 L552 242 L268 242 Z" fill="#2c3138"/>
              <path d="M212 288 L608 288" stroke="#E63946" stroke-width="5" opacity="0.9"/>
              <rect x="332" y="216" width="90" height="30" rx="12" fill="#31363d"/>`;

    case 'carga':
    default: {
      let ribs = '';
      for(let i=0; i<9; i++){
        ribs += `<line x1="${180+i*54}" y1="204" x2="${180+i*54}" y2="316" stroke="#33383e" stroke-width="4"/>`;
      }
      return `<rect x="140" y="186" width="520" height="138" rx="8" fill="url(#steelDark)" stroke="#454a52" stroke-width="2"/>
              <rect x="140" y="186" width="520" height="12" rx="6" fill="url(#redAccent)"/>
              ${ribs}
              <rect x="596" y="228" width="50" height="42" rx="4" fill="#E63946" opacity="0.85"/>`;
    }
  }
}

function trailerGroup(kind){
  return `<g>
    <rect x="120" y="324" width="560" height="18" rx="4" fill="url(#steel)"/>
    <polygon points="120,324 120,342 44,424 44,406" fill="url(#steelDark)"/>
    <circle cx="44" cy="415" r="11" fill="none" stroke="#767c85" stroke-width="6"/>
    ${bodyFor(kind)}
    <path d="M252 428 A48 48 0 0 1 348 428" fill="none" stroke="#2c3035" stroke-width="11" stroke-linecap="round"/>
    <path d="M472 428 A48 48 0 0 1 568 428" fill="none" stroke="#2c3035" stroke-width="11" stroke-linecap="round"/>
    ${wheelSVG(300, 428, 48)}
    ${wheelSVG(520, 428, 48)}
  </g>`;
}

function rearView(kind){
  let ribs = '';
  for(let i=0; i<5; i++){
    ribs += `<line x1="${286+i*56}" y1="192" x2="${286+i*56}" y2="356" stroke="#33383e" stroke-width="4"/>`;
  }
  return `<g>
    <rect x="120" y="352" width="560" height="16" rx="4" fill="url(#steel)"/>
    <rect x="252" y="168" width="296" height="200" rx="12" fill="url(#steelDark)" stroke="#4c525a" stroke-width="3"/>
    <rect x="252" y="168" width="296" height="14" rx="7" fill="url(#redAccent)"/>
    ${ribs}
    <rect x="278" y="328" width="66" height="26" rx="5" fill="#E63946"/>
    <rect x="456" y="328" width="66" height="26" rx="5" fill="#E63946"/>
    <rect x="356" y="298" width="88" height="56" rx="5" fill="#1a1d21" stroke="#4c525a" stroke-width="2"/>
    ${wheelSVG(238, 424, 46)}
    ${wheelSVG(562, 424, 46)}
  </g>`;
}

function detailView(){
  return `<g>
    <path d="M150 468 Q400 372 660 468" fill="none" stroke="#24272b" stroke-width="26" stroke-linecap="round"/>
    <path d="M180 330 A220 220 0 0 1 620 330" fill="none" stroke="#33383e" stroke-width="30" stroke-linecap="round"/>
    ${wheelSVG(400, 330, 140)}
    <rect x="586" y="118" width="22" height="150" rx="10" fill="url(#steel)" transform="rotate(14 597 193)"/>
    <rect x="176" y="286" width="120" height="20" rx="9" fill="url(#steelDark)" stroke="#4c525a" stroke-width="2"/>
  </g>`;
}

function trailerScene(kind, view){
  let content = '';
  if (view === 'traseira') content = rearView(kind);
  else if (view === 'detalhe') content = detailView();
  else content = trailerGroup(kind);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    ${defs()}
    <rect width="800" height="600" fill="url(#bgGrad)"/>
    <rect width="800" height="600" fill="url(#spot)"/>
    ${gridLines()}
    <rect y="478" width="800" height="122" fill="#0a0a0b"/>
    <line x1="0" y1="478" x2="800" y2="478" stroke="#2b2e33" stroke-width="2"/>
    <ellipse cx="400" cy="492" rx="320" ry="24" fill="#000" opacity="0.55"/>
    ${content}
    <text x="400" y="566" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="14"
          font-weight="700" letter-spacing="4" fill="#4a4f57">IMAGEM ILUSTRATIVA</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function heroImage(){
  const g = (kind, x, y, s, op) =>
    `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}">${trailerGroup(kind)}</g>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    ${defs()}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e2024"/><stop offset="58%" stop-color="#101113"/><stop offset="100%" stop-color="#09090a"/>
    </linearGradient>
    <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E63946" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="#E63946" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#E63946" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vign" cx="50%" cy="45%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.78"/>
    </radialGradient>

    <rect width="1600" height="900" fill="url(#sky)"/>
    <ellipse cx="800" cy="640" rx="820" ry="360" fill="url(#heroGlow)"/>
    ${gridLines()}
    <rect y="820" width="1600" height="80" fill="#08080a"/>
    <line x1="0" y1="820" x2="1600" y2="820" stroke="#2a2d31" stroke-width="2"/>

    ${g('carga',   30, 522, 0.62, 0.85)}
    ${g('moto',   540, 364, 0.95, 1)}
    ${g('nautico',1120,484, 0.70, 0.80)}

    <rect width="1600" height="900" fill="url(#vign)"/>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ============================================================
   3. DADOS DOS PRODUTOS
   ------------------------------------------------------------
   Para adicionar um novo reboque, basta inserir um novo objeto
   neste array. A vitrine, os filtros e a página de detalhes se
   atualizam automaticamente.
   ============================================================ */
const CATEGORIES = [
  { id: 'todos',   label: 'Todos' },
  { id: 'moto',    label: 'Moto' },
  /*{ id: 'nautico', label: 'Náutico' },p*/
  { id: 'carga',   label: 'Carga' },
  { id: 'animais', label: 'Animais' }
];
const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || id;

const PRODUCTS = [
  {
    id: 'moto-pro-1',
    name: 'Reboque Moto',
    category: 'moto',
    kind: 'moto',
    desc: 'Plataforma mista com berços frontais e assoalho amplo em madeira.',
    tagline: 'Ideal para quem precisa transportar motos sem abrir mão de espaço livre para carga geral. Chassi em aço reforçado, pontos de amarração laterais e faixa refletiva de segurança. *Imagens ilustrativas do modelo.',
    price: 5500,
    images: [

        'img/Reboque_Moto/RBM01.jpg',
        'img/Reboque_Moto/RBM02.jpg',
        'img/Reboque_Moto/RBM03.jpg',
        'img/Reboque_Moto/RBM04.jpg',
        'img/Reboque_Moto/RBM05.jpg',
        'img/Reboque_Moto/RBM06.jpg',
        'img/Reboque_Moto/RBM07.jpg',
        'img/Reboque_Moto/RBM08.jpg',
        'img/Reboque_Moto/RBM09.jpg',
    ],

    specs: [
      ['Dimensões (C x L x A)', '2,00 m x 1,40 m x 0,45 m'],
      ['Capacidade de carga', '600 kg'],
      ['Tara (peso próprio)', '250 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (4 lâminas) + amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']
    ]
  },


  {
    id: 'bau-tamanho-grande',
    name: 'Reboque Modelo Baú',
    category: 'carga',
    kind: 'carga',
    desc: 'Baú fechado alto com portas traseiras duplas e piso em madeira.',
    tagline: 'Ideal para entregas, comércios e cargas sensíveis ao clima. Baú metálico reforçado, abertura traseira dupla, bequilha frontal e sinalização refletiva. *Imagens ilustrativas do modelo.',
    price: 15000,
    images:[

        'img/Reboque_Bau_Grande/1.jpg',
        'img/Reboque_Bau_Grande/2.jpg',
        'img/Reboque_Bau_Grande/3.jpg',
        'img/Reboque_Bau_Grande/4.jpg',
        'img/Reboque_Bau_Grande/7.jpg',
        'img/Reboque_Bau_Grande/8.jpg',

    ],

    specs: [

      ['Dimensões (C x L x A)', '2,50 m x 1,40 m x 1,80 m'],
      ['Capacidade de carga', '1.200 kg'],
      ['Tara (peso próprio)', '300 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (6 lâminas) + amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']
    ]
  },

  {
    id: 'bau-tamanho-medio',
    name: 'Reboque Modelo Baú',
    category: 'carga',
    kind: 'carga',
    desc: 'Baú preto fechado com porta traseira e bagageiro superior.',
    tagline: 'Feito para quem precisa de compartimento fechado com cadeado e área útil no teto. Bagageiro com réguas de madeira, estepe frontal e sinalização completa. *Imagens ilustrativas do modelo.',
    price: 5890,
    images:[

        'img/Reboque_Bau_Pequeno/1.jpg',
        'img/Reboque_Bau_Pequeno/3.jpg',
        'img/Reboque_Bau_Pequeno/4.jpg',
        'img/Reboque_Bau_Pequeno/7.jpg',
        'img/Reboque_Bau_Pequeno/8.jpg',
        'img/Reboque_Bau_Pequeno/9.jpg',

    ],
    specs: [

      ['Dimensões (C x L x A)', '2,00 m x 1,10 m x 0,70 m'],
      ['Capacidade de carga', '600 kg'],
      ['Tara (peso próprio)', '150 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (4 lâminas) + 2 amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']

    ]
  },



  {
    id: 'carga-animal',
    name: 'Reboque Carga (Animais)',
    category: 'animais',
    kind: 'animais',
    desc: 'Eixo duplo com laterais em madeira, divisória interna e rampa de embarque.',
    tagline: 'Pensado para quem busca mais estabilidade e divisão interna no transporte. Rampa ripada, travas reforçadas, suspensão com feixe de molas e acabamento em madeira. *Imagens ilustrativas do modelo.',
    price: 15500,
    images: [
      'img/Reboque_Carga_Animal/0.jpg',
      'img/Reboque_Carga_Animal/1.jpg',
      'img/Reboque_Carga_Animal/2.jpg',
      'img/Reboque_Carga_Animal/3.jpg',
      'img/Reboque_Carga_Animal/4.jpg',
      'img/Reboque_Carga_Animal/5.jpg',
      'img/Reboque_Carga_Animal/6.jpg',
      'img/Reboque_Carga_Animal/7.jpg',
      'img/Reboque_Carga_Animal/8.1.jpg',
      'img/Reboque_Carga_Animal/9.jpg',
      'img/Reboque_Carga_Animal/10.jpg',
      'img/Reboque_Carga_Animal/11.jpg',
      'img/Reboque_Carga_Animal/12.jpg',
    ],
    specs: [
      ['Dimensões (C x L x A)', '2,30 m x 1,60 m x 1,80 m'],
      ['Capacidade de carga', '2.000 kg'],
      ['Tara (peso próprio)', '450 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (6 lâminas) + 4 amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']
    ]
  },




  {
    id: 'fz-a',
    name: 'Reboque Modelo Fazendinha (Aço)',
    category: 'carga',
    kind: 'carga',
    desc: 'Caçamba aberta com piso de madeira, grade frontal e rampa traseira.',
    tagline: 'Ótima para quem precisa de carregamento ágil no dia a dia. Estrutura metálica reforçada, assoalho em madeira, travas de pino e rampa traseira. *Imagens ilustrativas do modelo.',
    price: 5500,
    images: [

      'img/Reboque_Fazendinha_Aço/1.jpg',
      'img/Reboque_Fazendinha_Aço/2.jpg',
      'img/Reboque_Fazendinha_Aço/3.jpg',
      'img/Reboque_Fazendinha_Aço/4.jpg',
      'img/Reboque_Fazendinha_Aço/5.jpg',
      'img/Reboque_Fazendinha_Aço/6.jpg',
      'img/Reboque_Fazendinha_Aço/7.jpg',

    ],

    specs: [
      ['Dimensões (C x L x A)', '2,00 m x 1,20 m x 0,45 m'],
      ['Capacidade de carga', '600 kg'],
      ['Tara (peso próprio)', '200 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (4 lâminas) + 2 amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']
    ]
  },




  {
    id: 'fz-m',
    name: 'Reboque Modelo Fazendinha (Madeira)',
    category: 'carga',
    kind: 'carga',
    desc: 'Laterais ripadas em madeira, grade frontal e tampa traseira basculante.',
    tagline: 'Ideal para quem busca praticidade no carregamento com acabamento reforçado. Suspensão com feixe de molas e amortecedor, grade frontal e travas laterais. *Imagens ilustrativas do modelo.',
    price: 4000,
    images: [

      'img/Reboque_Fazendinha_Madeira/1.jpg',
      'img/Reboque_Fazendinha_Madeira/2.jpg',
      'img/Reboque_Fazendinha_Madeira/3.jpg',
      'img/Reboque_Fazendinha_Madeira/4.jpg',
      'img/Reboque_Fazendinha_Madeira/5.jpg',
      'img/Reboque_Fazendinha_Madeira/7.jpg',
      'img/Reboque_Fazendinha_Madeira/8.jpg',
      'img/Reboque_Fazendinha_Madeira/9.jpg',

    ],

    specs: [
      ['Dimensões (C x L x A)', '2 m x 1,20 m x 0,45 m'],
      ['Capacidade de carga', '600 kg'],
      ['Tara (peso próprio)', '150 kg'],
      ['Material do chassi', 'Aço carbono (perfil 75x40)'],
      ['Suspensão', 'Feixe de molas parabólico (4 lâminas) + 2 amortecedores'],
      ['Elétrica', 'Sistema 12V com lanternas LED, seta, freio, lanterna e luz de placa'],
      ['Rodas e pneus', '2 x aro 13" com pneus 175/60 R13'],
      ['Acabamento', 'Pintura automotiva'],
      ['Documentação', 'CRV e emplacamento']
    ]
  },

];

/* função que gera o efeito para as divs fazias; */



/* ============================================================
   4. ÍCONES
   ============================================================ */
const ICONS = {
  wa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.1 8.3z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
  beam: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/><path d="M7 7v10M17 7v10"/></svg>`,
  card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M6.5 15h3"/></svg>`,
  headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="2.5" y="13" width="4" height="7" rx="2"/><rect x="17.5" y="13" width="4" height="7" rx="2"/><path d="M20 20a3 3 0 0 1-3 3h-3"/></svg>`,
  pix: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8l4.4 4.4a2 2 0 0 1 0 2.8L12 14.4 7.6 10a2 2 0 0 1 0-2.8L12 2.8z"/><path d="M12 21.2l-4.4-4.4a2 2 0 0 1 0-2.8L12 9.6l4.4 4.4a2 2 0 0 1 0 2.8L12 21.2z"/></svg>`,
  installments: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 14h4M7.5 17.5h8"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`
};

/* ============================================================
   5. ESTADO / ROTEAMENTO
   ============================================================ */
const app = document.getElementById('app');
let activeFilter = 'todos';
let renderedRoute = '';
let catalogScroll = 0;
let suppressScrollCapture = false;

function parseRoute(){
  const hash = location.hash || '#/';
  const m = hash.match(/^#\/produto\/([\w-]+)$/);
  return m ? { name: 'produto', id: m[1] } : { name: 'catalogo' };
}

function filteredProducts(){
  return PRODUCTS.filter(p => activeFilter === 'todos' || p.category === activeFilter);
}

/* ============================================================
   6. TEMPLATES
   ============================================================ */
function cardHTML(p){
  return `
  <article class="card">
    <a class="card-media" href="#/produto/${p.id}" aria-label="Ver detalhes de ${p.name}">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
      <span class="card-cat">${catLabel(p.category)}</span>
    </a>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-foot">
        <div class="price">
          <small>a partir de</small>
          <strong>${brl(p.price)}</strong>
        </div>
      </div>
      <a class="btn btn-primary btn-block" href="#/produto/${p.id}">Ver Detalhes</a>
    </div>
  </article>`;
}








function catalogHTML(){
  const products = filteredProducts();
  return `
  <section class="hero">
    <img class="hero-img" src="img/Hero.jpg" alt="Linha de reboques Ferro Forte" />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="eyebrow">Reboques homologados DENATRAN</span>
      <h1>Leve o que importa com <span>estrutura de verdade</span>.</h1>
      <p class="lead">Reboques para moto, carga geral e transporte de animais. Fabricação própria, estrutura reforçada e atendimento direto para você cotar no WhatsApp.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#catalogo" data-scroll="catalogo">Ver catálogo completo</a>
        <a class="btn btn-ghost btn-lg" href="${WA_GENERIC}" target="_blank" rel="noopener">${ICONS.wa} Falar com especialista</a>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <div class="features-grid">
        <div class="feature">
          <span class="feature-icon">${ICONS.shield}</span>
          <div><h3>Homologação DENATRAN</h3><p>Documentação em dia, com CRV e emplacamento.</p></div>
        </div>
        <div class="feature">
          <span class="feature-icon">${ICONS.beam}</span>
          <div><h3>Estrutura Reforçada</h3><p>Chassi em aço com treliça e solda de qualidade.</p></div>
        </div>
        <div class="feature">
          <span class="feature-icon">${ICONS.card}</span>
          <div><h3>Pagamento Facilitado</h3><p>Pix, cartão de crédito e parcelamento.</p></div>
        </div>
        <div class="feature">
          <span class="feature-icon">${ICONS.headset}</span>
          <div><h3>Atendimento Direto</h3><p>Fale com um especialista no WhatsApp.</p></div>
        </div>
      </div>
    </div>
  </section>



  <section class="catalog" id="catalogo">
    <div class="container">
      <div class="section-head">
        <div>
          <h2>Nossa <em>linha</em> de reboques</h2>
          <p>Modelos prontos para entrega, com fabricação própria e personalização sob demanda.</p>
        </div>
        <!--<span class="count-pill">${products.length} ${products.length === 1 ? 'modelo' : 'modelos'}</span>-->
      </div>
      <div class="filters" role="tablist" aria-label="Filtrar por categoria">
        ${CATEGORIES.map(c => `<button class="chip ${activeFilter === c.id ? 'active' : ''}" data-filter="${c.id}" role="tab" aria-selected="${activeFilter === c.id}">${c.label}</button>`).join('')}
      </div>
      <div class="grid">
        ${products.length ? products.map(cardHTML).join('') : '<p class="empty">Nenhum modelo nesta categoria no momento.</p>'}
      </div>
    </div>
  </section>`;




}

function detailHTML(p){
  const waMsg = waLink(`Olá! Tenho interesse no ${p.name} (${brl(p.price)}). Poderia me enviar mais informações?`);
  return `
  <section class="detail">
    <div class="container">
      <a class="back" href="#/">${ICONS.arrowLeft} Voltar para o catálogo</a>
      <div class="detail-grid">
        <div class="gallery">
          <div class="gallery-main">
            <img id="galleryMain" src="${p.images[0]}" alt="${p.name}" />
          </div>
          <div class="thumbs" role="tablist" aria-label="Galeria de imagens">
            ${p.images.map((src, i) => `
              <button class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ver imagem ${i + 1}">
                <img src="${src}" alt="${p.name} — imagem ${i + 1}" />
              </button>`).join('')}
          </div>
        </div>

        <div class="info">
          <span class="badge">${catLabel(p.category)}</span>
          <h1>${p.name}</h1>
          <p class="tagline">${p.tagline}</p>

          <div class="price-box">
            <small>a partir de</small>
            <strong>${brl(p.price)}</strong>
            <span>ou em até 12x no cartão · Pix com desconto</span>
          </div>

          <div class="pay">
            <span class="pay-item">${ICONS.pix} Pix</span>
            <span class="pay-item">${ICONS.card} Cartão de crédito</span>
            <span class="pay-item">${ICONS.installments} Parcelamento</span>
          </div>

          <a class="btn btn-primary btn-lg btn-block" href="${waMsg}" target="_blank" rel="noopener">
            ${ICONS.wa} Comprar / Cotar no WhatsApp
          </a>

          <ul class="mini-specs">
            <li>${ICONS.check} Documentação (CRV e emplacamento);</li>
            <li>${ICONS.check} Estrutura em aço com pintura automotiva;</li>
            <li>${ICONS.check} Atendimento direto com especialista;</li>
          </ul>
        </div>
      </div>

      <div class="specs">
        <h2>Especificações técnicas</h2>
        <p class="sub">Dados de referência do modelo ${p.name}. Consulte o time para personalizações.</p>
        <table class="spec-table">
          <tbody>
            ${p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   7. RENDER + FILTROS
   ============================================================ */
function refreshCatalog(){
  const grid = app.querySelector('.grid');
  if (!grid) return;
  const products = filteredProducts();
  grid.innerHTML = products.length
    ? products.map(cardHTML).join('')
    : '<p class="empty">Nenhum modelo nesta categoria no momento.</p>';

  const pill = app.querySelector('.count-pill');
  if (pill) pill.textContent = `${products.length} ${products.length === 1 ? 'modelo' : 'modelos'}`;

  app.querySelectorAll('.chip').forEach(c => {
    const on = c.dataset.filter === activeFilter;
    c.classList.toggle('active', on);
    c.setAttribute('aria-selected', on);
  });
}

function render(){
  const route = parseRoute();
  const routeKey = route.name === 'produto' ? `produto:${route.id}` : 'catalogo';
  if (routeKey === renderedRoute) return;

  const wasProduct = renderedRoute.startsWith('produto:');
  const returningToCatalog = route.name === 'catalogo' && wasProduct;

  if (route.name === 'produto'){
    const p = PRODUCTS.find(x => x.id === route.id);
    if (!p){ location.hash = '#/'; return; }
    app.innerHTML = detailHTML(p);
    renderedRoute = routeKey;
    window.scrollTo(0, 0);
  } else {
    suppressScrollCapture = true;
    app.innerHTML = catalogHTML();
    renderedRoute = routeKey;

    if (returningToCatalog){
      const target = catalogScroll;
      requestAnimationFrame(() => {
        window.scrollTo(0, target);
        requestAnimationFrame(() => { suppressScrollCapture = false; });
      });
    } else {
      suppressScrollCapture = false;
    }
  }
}

/* ============================================================
   8. EVENTOS
   ============================================================ */
window.addEventListener('scroll', () => {
  if (suppressScrollCapture) return;
  if (renderedRoute === 'catalogo') catalogScroll = window.scrollY;
}, { passive: true });

window.addEventListener('hashchange', render);

app.addEventListener('click', (e) => {
  // Logo: se já está no catálogo, rola suavemente para o topo
  const brand = e.target.closest('a.brand');
  if (brand && renderedRoute === 'catalogo'){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // "Ver catálogo completo"
  const scrollLink = e.target.closest('[data-scroll]');
  if (scrollLink){
    e.preventDefault();
    const target = document.getElementById(scrollLink.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Filtros de categoria
  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn){
    activeFilter = filterBtn.dataset.filter;
    refreshCatalog();
    return;
  }

  // Miniaturas da galeria
  const thumb = e.target.closest('.thumb');
  if (thumb){
    const route = parseRoute();
    if (route.name !== 'produto') return;
    const product = PRODUCTS.find(p => p.id === route.id);
    if (!product) return;
    const idx = parseInt(thumb.dataset.index, 10);
    const mainImg = document.getElementById('galleryMain');
    if (mainImg) mainImg.src = product.images[idx];
    app.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  }
});

/* ============================================================
   9. INICIALIZAÇÃO
   ============================================================ */
(function init(){
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const headerWa = document.getElementById('headerWa');
  const footerWa = document.getElementById('footerWa');
  const fabWa = document.getElementById('fabWa');
  if (headerWa) headerWa.href = WA_GENERIC;
  if (footerWa) footerWa.href = WA_GENERIC;
  if (fabWa) fabWa.href = WA_GENERIC;

  if (!location.hash) location.replace('#/');
  render();
})();