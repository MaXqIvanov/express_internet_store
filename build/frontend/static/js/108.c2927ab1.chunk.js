"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[108],{6108:function(e,n,a){a.r(n),a.d(n,{AdminPage:function(){return Z}});var s=a(1413),r=a(885),l=a(2791),o=a(6871),i=a(7411),t=a(5290),c=a(9950),d=a(3360),m=a(4849),u=a(4461),h=a(6030),p=a(184),x=l.lazy((function(){return a.e(474).then(a.bind(a,474))})),Z=function(){var e,n,a,Z=(0,h.I0)(),g=(0,l.useState)(0),j=(0,r.Z)(g,2),_=j[0],v=j[1],f=(0,t.cI)({mode:"onBlur"}),N=f.register,P=f.formState.errors,I=f.handleSubmit,b=(0,o.s0)(),C=(0,l.useState)({message:"\u0412\u044b \u043d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"}),S=(0,r.Z)(C,2),k=S[0],y=S[1];(0,l.useEffect)((function(){var e=null!=localStorage.getItem("auth")?JSON.parse(String(localStorage.getItem("auth"))):"";(0,u.QP)(e,y,Z)}),[]);var F=function(e){(_<5||"-1"==e)&&(_>0||"1"==e)&&v(_+e)};return(0,p.jsx)(p.Fragment,{children:k.message?(0,p.jsx)("div",{className:i.Z.main,children:(0,p.jsx)("h3",{title:"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u043d\u0430 \u0441\u0430\u0439\u0442\u0435",onClick:function(){return b("/auth")},children:k.message})}):(0,p.jsxs)("div",{className:i.Z.main,children:[0==_?(0,p.jsxs)("div",{className:i.Z.crap,children:[(0,p.jsx)("h4",{children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u0442\u043e\u0432\u0430\u0440"}),(0,p.jsxs)(c.Z,{className:i.Z.Form,onSubmit:I((function(e){var n=null!=localStorage.getItem("auth")?JSON.parse(String(localStorage.getItem("auth"))):"",a=prompt("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043f\u0430\u0440\u043e\u043b\u044c","");console.log(a),(0,u.nZ)(e,n,a)})),children:[(0,p.jsxs)(c.Z.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",children:[(0,p.jsx)(c.Z.Label,{children:"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u044f \u0442\u043e\u0432\u0430\u0440\u0430: "}),(0,p.jsx)(c.Z.Control,(0,s.Z)((0,s.Z)({},N("nameProods",{required:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u044f \u0442\u043e\u0432\u0430\u0440\u0430"})),{},{type:"text"}))]}),(0,p.jsxs)(c.Z.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",children:[(0,p.jsx)(c.Z.Label,{children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430: "}),(0,p.jsx)(c.Z.Control,(0,s.Z)((0,s.Z)({},N("descriptionType",{required:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430"})),{},{type:"text"}))]}),(0,p.jsxs)(c.Z.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",children:[(0,p.jsx)(c.Z.Label,{children:"\u0426\u0435\u043d\u0430 \u0442\u043e\u0432\u0430\u0440\u0430: "}),(0,p.jsx)(c.Z.Control,(0,s.Z)((0,s.Z)({},N("priceProods",{required:"\u043f\u043e\u043b\u0435 \u0441 \u0446\u0435\u043d\u043e\u0439 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f"})),{},{type:"text"}))]}),(0,p.jsxs)(c.Z.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",children:[(0,p.jsx)(c.Z.Label,{children:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435: "}),(0,p.jsx)(c.Z.Control,(0,s.Z)((0,s.Z)({},N("linkOnImage",{required:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 url \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"})),{},{type:"text"}))]}),(0,p.jsxs)(c.Z.Select,(0,s.Z)((0,s.Z)({},N("typeProods",{required:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0442\u0438\u043f \u0442\u043e\u0432\u0430\u0440\u0430"})),{},{"aria-label":"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u0442\u043e\u0432\u0430\u0440\u0430",children:[(0,p.jsx)("option",{disabled:!0,children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u0442\u043e\u0432\u0430\u0440\u0430"}),(0,p.jsx)("option",{value:"phone",children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"}),(0,p.jsx)("option",{value:"laptope",children:"\u041d\u043e\u0443\u0442\u0431\u0443\u043a"})]})),(0,p.jsxs)("div",{style:{color:"red"},children:[P.priceProods?(0,p.jsx)("span",{className:i.Z.span,children:(null===P||void 0===P||null===(e=P.priceProods)||void 0===e?void 0:e.message)&&P.priceProods.message}):P.linkOnImage?(0,p.jsx)("span",{className:i.Z.span,children:(null===P||void 0===P||null===(n=P.linkOnImage)||void 0===n?void 0:n.message)&&P.linkOnImage.message}):P.nameProods?(0,p.jsx)("span",{className:i.Z.span,children:(null===P||void 0===P||null===(a=P.nameProods)||void 0===a?void 0:a.message)&&P.nameProods.message}):""," "]}),(0,p.jsx)(d.Z,{className:"mt-1",type:"submit",children:"\u041f\u0440\u0438\u043d\u044f\u0442\u044c"})]})]}):1==_?(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(l.Suspense,{fallback:(0,p.jsx)(m.Z,{animation:"grow"}),children:(0,p.jsx)("div",{className:i.Z.crap,children:(0,p.jsx)(x,{})})})}):(0,p.jsx)(p.Fragment,{children:"\u0440\u0430\u0437\u0434\u0435\u043b \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435"}),(0,p.jsxs)("div",{className:i.Z.navButtons,children:[(0,p.jsx)(d.Z,{className:i.Z.navLeft,variant:"outline-light",onClick:function(){return F(-1)},children:"<"}),(0,p.jsx)(d.Z,{className:i.Z.navRight,variant:"outline-light",onClick:function(){return F(1)},children:">"})]}),(0,p.jsx)("div",{onClick:function(){return b("/")},className:i.Z.NavHome})]})})};n.default=Z},7411:function(e,n){n.Z={main:"admin_main__RWe3J",crap:"admin_crap__X+HA3",Form:"admin_Form__ggGLu",span:"admin_span__q1D+s",navButtons:"admin_navButtons__C4V7J",navLeft:"admin_navLeft__97ABj",navRight:"admin_navRight__XKknJ",deleteArray:"admin_deleteArray__lhyPn",allArray:"admin_allArray__nliAm",formPage2:"admin_formPage2__P+ORX",nameProodPage2:"admin_nameProodPage2__InsQc",closeButton:"admin_closeButton__VfePc",NavHome:"admin_NavHome__7113l"}}}]);
//# sourceMappingURL=108.c2927ab1.chunk.js.map