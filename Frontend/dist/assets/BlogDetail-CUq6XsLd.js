import{az as p,aA as b,r as l,j as e,L as d,aB as h,ax as f,av as u,aw as j,aC as N,aD as y}from"./vendor-react-D4-kURkq.js";import{a as w}from"./index-B2YVxGV1.js";import{S as v}from"./SEO-CQEUWYh6.js";import{m as z}from"./vendor-motion-eCeaUSE6.js";import"./vendor-DrappZtk.js";import"./vendor-ui-osudY1Q5.js";const D=()=>{var c,m;const{slug:o}=p(),n=b(),[t,x]=l.useState(null),[g,i]=l.useState(!0);return l.useEffect(()=>{(async()=>{var s;try{i(!0);const r=await w.get(`/blogs/${o}`);x(r.data)}catch(r){console.error("Error fetching blog:",r),((s=r.response)==null?void 0:s.status)===404&&n("/not-found")}finally{i(!1)}})(),window.scrollTo(0,0)},[o,n]),g?e.jsx("div",{className:"min-h-screen bg-gray-950 flex items-center justify-center",children:e.jsx("div",{className:"w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"})}):t?e.jsxs(e.Fragment,{children:[e.jsx(v,{page:"blog-detail",title:`${t.seoTitle||t.title} | Blog`,description:t.seoDescription||t.title,keywords:t.seoKeywords}),e.jsx("main",{className:"min-h-screen bg-gray-950 text-white font-['Outfit'] pt-32 pb-20",children:e.jsxs("div",{className:"max-w-4xl mx-auto px-6",children:[e.jsxs(d,{to:"/blogs",className:"inline-flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors mb-12 group",children:[e.jsx(h,{size:20,className:"group-hover:-translate-x-1 transition-transform"})," Back to Articles"]}),e.jsxs("header",{className:"mb-12",children:[e.jsx("div",{className:"flex flex-wrap gap-2 mb-6",children:(c=t.categories)==null?void 0:c.map((a,s)=>e.jsx("span",{className:"px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold rounded-full uppercase tracking-wider",children:a},s))}),e.jsx("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight",children:t.title}),e.jsxs("div",{className:"flex flex-wrap items-center gap-6 text-gray-400 text-sm border-b border-white/10 pb-8",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(f,{size:16,className:"text-purple-500"})," ",t.author]}),e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(u,{size:16,className:"text-teal-500"})," ",new Date(t.createdAt).toLocaleDateString()]}),e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(j,{size:16,className:"text-purple-500"})," ",t.views," views"]}),e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(N,{size:16,className:"text-teal-500"})," 5 min read"]})]})]}),t.coverImage&&e.jsx(z.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"mb-12 rounded-[2.5rem] overflow-hidden border border-white/10",children:e.jsx("img",{src:t.coverImage,alt:t.title,className:"w-full h-auto"})}),e.jsx("article",{className:"prose prose-invert prose-teal max-w-none mb-16 blog-content",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:t.content},className:"text-gray-300 text-lg leading-relaxed space-y-6"})}),e.jsxs("footer",{className:"pt-12 border-t border-white/10",children:[e.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[e.jsx(y,{size:18,className:"text-gray-500"}),(m=t.tags)==null?void 0:m.map((a,s)=>e.jsxs("span",{className:"px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400",children:["#",a]},s))]}),e.jsxs("div",{className:"mt-16 p-8 bg-gradient-to-br from-teal-500/10 to-purple-600/10 rounded-3xl border border-white/10 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold mb-2",children:"Enjoyed this article?"}),e.jsx("p",{className:"text-gray-400",children:"Feel free to share or reach out if you have any questions."})]}),e.jsx(d,{to:"/contact",className:"px-6 py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors",children:"Let's Chat"})]})]})]})}),e.jsx("style",{children:`
        .blog-content h1, .blog-content h2, .blog-content h3 {
          font-weight: 900;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 { font-size: 2.5rem; }
        .blog-content h2 { font-size: 2rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content ul, .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style: disc;
        }
        .blog-content img { border-radius: 1.5rem; margin: 2rem 0; }
        .blog-content a { color: #14b8a6; text-decoration: underline; }
        .blog-content blockquote {
          border-left: 4px solid #14b8a6;
          padding-left: 1.5rem;
          font-style: italic;
          color: #94a3b8;
          margin: 2rem 0;
        }
      `})]}):null};export{D as default};
