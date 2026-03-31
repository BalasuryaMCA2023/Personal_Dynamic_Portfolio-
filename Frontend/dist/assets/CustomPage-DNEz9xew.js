import{az as l,aA as d,r as a,j as t}from"./vendor-react-D4-kURkq.js";import{a as g}from"./index-B2YVxGV1.js";import{S as p}from"./SEO-CQEUWYh6.js";import{m as x}from"./vendor-motion-eCeaUSE6.js";import"./vendor-DrappZtk.js";import"./vendor-ui-osudY1Q5.js";const v=()=>{const{slug:r}=l(),i=d(),[e,c]=a.useState(null),[m,o]=a.useState(!0);return a.useEffect(()=>{(async()=>{var s;try{o(!0);const n=await g.get(`/pages/${r}`);c(n.data)}catch(n){console.error("Error fetching dynamic page:",n),((s=n.response)==null?void 0:s.status)===404&&i("/error")}finally{o(!1)}})(),window.scrollTo(0,0)},[r,i]),m?t.jsx("div",{className:"min-h-screen bg-black flex items-center justify-center",children:t.jsx("div",{className:"w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"})}):e?t.jsxs(t.Fragment,{children:[t.jsx(p,{page:"custom-page",title:e.seoTitle||e.title,description:e.seoDescription||e.title,keywords:e.seoKeywords}),t.jsx("main",{className:"min-h-screen bg-gray-950 text-white font-['Outfit'] pt-32 pb-20",children:t.jsx("div",{className:"max-w-4xl mx-auto px-6",children:t.jsxs(x.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[t.jsx("h1",{className:"text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-teal-400 to-purple-600 bg-clip-text text-transparent leading-tight",children:e.title}),t.jsx("article",{className:"prose prose-invert prose-teal max-w-none dynamic-content",children:t.jsx("div",{dangerouslySetInnerHTML:{__html:e.content},className:"text-gray-300 text-lg leading-relaxed space-y-6"})})]})})}),t.jsx("style",{children:`
        .dynamic-content h1, .dynamic-content h2, .dynamic-content h3 {
          font-weight: 800;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .dynamic-content h1 { font-size: 2.5rem; }
        .dynamic-content h2 { font-size: 2rem; }
        .dynamic-content h3 { font-size: 1.5rem; }
        .dynamic-content p { margin-bottom: 1.5rem; }
        .dynamic-content img { border-radius: 1rem; max-width: 100%; height: auto; margin: 2rem 0; }
        .dynamic-content a { color: #14b8a6; text-decoration: underline; }
        .dynamic-content ul, .dynamic-content ol {
          margin-left: 2rem;
          margin-bottom: 1.5rem;
          list-style: initial;
        }
        .dynamic-content blockquote {
          border-left: 4px solid #8b5cf6;
          padding-left: 1.5rem;
          font-style: italic;
          color: #94a3b8;
          margin: 2rem 0;
          background: rgba(255,255,255,0.03);
          padding: 1.5rem;
          border-radius: 0 1rem 1rem 0;
        }
      `})]}):null};export{v as default};
