(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(3),r=a.n(c);a(2),a(13),a(14);var o=function(){const[e,t]=Object(n.useState)([]),[a,c]=Object(n.useState)(""),[r,o]=Object(n.useState)(""),[s,m]=Object(n.useState)(""),[i,u]=Object(n.useState)([]),[d,E]=Object(n.useState)(0),[p,b]=Object(n.useState)(0),[v,h]=Object(n.useState)(!1),[N,g]=Object(n.useState)([]),[y,f]=Object(n.useState)(!1),[w,S]=Object(n.useState)(""),[j,k]=Object(n.useState)(!1),[O,C]=Object(n.useState)(0),[T,q]=Object(n.useState)(0),[A,x]=Object(n.useState)(!1);function z(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}return Object(n.useEffect)(()=>{fetch("https://opentdb.com/api_category.php").then(e=>e.json()).then(e=>t(e.trivia_categories))},[]),l.a.createElement("div",{className:"App container"},l.a.createElement("header",{className:"my-4"},l.a.createElement("h1",null,"Quiz App"),A&&l.a.createElement("button",{onClick:()=>{k(!0)},className:"btn btn-info mr-2"},"View Total Score"),v&&l.a.createElement("button",{onClick:()=>{c(""),o(""),m(""),u([]),E(0),b(0),h(!1),g([]),S(""),k(!1)},className:"btn btn-secondary"},"Restart Quiz")),y?l.a.createElement("div",{className:"spinner-border text-primary",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")):v?l.a.createElement("div",{className:"score-section"},l.a.createElement("h2",null,"You scored ",p," out of ",i.length),l.a.createElement("h3",null,"Review Your Answers:"),l.a.createElement("ul",{className:"list-group"},N.map((e,t)=>l.a.createElement("li",{key:t,className:"list-group-item"},l.a.createElement("p",null,l.a.createElement("strong",null,"Question:")," ",z(e.question)),l.a.createElement("p",null,l.a.createElement("strong",null,"Your Answer:")," ",z(e.answer)),l.a.createElement("p",null,l.a.createElement("strong",null,"Correct Answer:")," ",z(e.correct)))))):l.a.createElement(l.a.Fragment,null,0===i.length?l.a.createElement("div",{className:"mb-4"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Select Category: "),l.a.createElement("select",{value:a,onChange:e=>{c(e.target.value)},className:"form-control"},l.a.createElement("option",{value:""},"Select"),e.map(e=>l.a.createElement("option",{key:e.id,value:e.id},e.name)))),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Select Type: "),l.a.createElement("select",{value:r,onChange:e=>{o(e.target.value)},className:"form-control"},l.a.createElement("option",{value:""},"Select"),l.a.createElement("option",{value:"multiple"},"Multiple Choice"),l.a.createElement("option",{value:"boolean"},"True / False"))),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Select Difficulty: "),l.a.createElement("select",{value:s,onChange:e=>{m(e.target.value)},className:"form-control"},l.a.createElement("option",{value:""},"Select"),l.a.createElement("option",{value:"easy"},"Easy"),l.a.createElement("option",{value:"medium"},"Medium"),l.a.createElement("option",{value:"hard"},"Hard"))),l.a.createElement("button",{onClick:()=>{f(!0),fetch("https://opentdb.com/api.php?amount=5&category=".concat(a,"&type=").concat(r,"&difficulty=").concat(s)).then(e=>e.json()).then(e=>{u(e.results),f(!1)})},disabled:!a||!r||!s,className:"btn btn-primary"},"Start Quiz")):l.a.createElement("div",{className:"card my-4"},l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"question-section"},l.a.createElement("div",{className:"question-count"},l.a.createElement("span",null,"Question ",d+1),"/",i.length),l.a.createElement("div",{className:"question-text"},z(i[d].question))),l.a.createElement("div",{className:"answer-section"},i[d].incorrect_answers.concat(i[d].correct_answer).sort(()=>Math.random()-.5).map((e,t)=>l.a.createElement("button",{key:t,onClick:()=>((e,t)=>{t&&b(p+1),g([...N,{question:i[d].question,answer:e,correct:i[d].correct_answer}]);const a=d+1;a<i.length?E(a):(h(!0),C(O+1),q(T+p+1),x(!0),p+1===i.length?S("fireworks"):p+1<i.length/2&&S("frownies"))})(e,e===i[d].correct_answer),className:"btn btn-outline-primary btn-block my-2"},z(e))))))),l.a.createElement("footer",{className:"mt-4"},l.a.createElement("p",null,"\xa9 2024 Quiz App. All rights reserved. But not Really")),l.a.createElement("div",{className:"modal fade ".concat(j?"show":""),style:{display:j?"block":"none"},tabIndex:"-1",role:"dialog"},l.a.createElement("div",{className:"modal-dialog modal-dialog-centered",role:"document"},l.a.createElement("div",{className:"modal-content"},l.a.createElement("div",{className:"modal-header"},l.a.createElement("h5",{className:"modal-title"},"Your Total Score"),l.a.createElement("button",{type:"button",className:"close",onClick:()=>k(!1),"aria-label":"Close"},l.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),l.a.createElement("div",{className:"modal-body"},l.a.createElement("p",null,"Total Tests Taken: ",O),l.a.createElement("p",null,"Total Score: ",T),"fireworks"===w&&l.a.createElement("div",{className:"animation-container"},l.a.createElement("video",{className:"animation",autoPlay:!0,loop:!0,muted:!0},l.a.createElement("source",{src:"".concat("/quiz","/fireworks.mp4"),type:"video/mp4"}))),"frownies"===w&&l.a.createElement("div",{className:"animation-container"},l.a.createElement("div",{style:{width:"100%",height:"0",paddingBottom:"83%",position:"relative"}},l.a.createElement("iframe",{src:"https://giphy.com/embed/OPU6wzx8JrHna",width:"100%",height:"100%",style:{position:"absolute"},frameBorder:"0",className:"giphy-embed",allowFullScreen:!0})))),l.a.createElement("div",{className:"modal-footer"},l.a.createElement("button",{type:"button",className:"btn btn-secondary",onClick:()=>k(!1)},"Close"))))))};r.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(o,null)))},4:function(e,t,a){e.exports=a(15)}},[[4,1,2]]]);
//# sourceMappingURL=main.9eaea9e6.chunk.js.map