(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),o=t(16),u=t.n(o),i=(t(21),t(3)),a=t(0),s=function(e){var n=e.newFilter,t=e.handleNewFilter;return Object(a.jsxs)("div",{children:["filter shown with: ",Object(a.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addPhonebook,t=e.newName,c=e.newNumber,r=e.handleNewName,o=e.handleNewNumber;return Object(a.jsxs)("form",{onSubmit:n,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:t,onChange:r})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:c,onChange:o})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.person,t=e.removePerson;return Object(a.jsxs)("p",{children:[n.name," : ",n.number,Object(a.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},j=function(e){var n=e.persons,t=e.removePerson;return Object(a.jsx)("div",{children:n.map((function(e){return Object(a.jsx)(b,{person:e,removePerson:t},e.name)}))})},l=t(4),f=t.n(l),m="/api/persons",h=function(){return f.a.get(m).then((function(e){return e.data}))},O=function(e){return f.a.post(m,e).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(m,"/").concat(e))},v=function(e,n){return f.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){var n=e.notification;return null===n?null:Object(a.jsx)("div",{className:"notification "+n.type,children:n.message})},x=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),u=Object(i.a)(o,2),b=u[0],l=u[1],f=Object(c.useState)(""),m=Object(i.a)(f,2),x=m[0],g=m[1],N=Object(c.useState)(""),k=Object(i.a)(N,2),y=k[0],C=k[1],P=Object(c.useState)({message:"",type:""}),S=Object(i.a)(P,2),F=S[0],T=S[1];Object(c.useEffect)((function(){h().then((function(e){r(e)}))}),[]);var E=function(e){v(e,{name:b,number:x}).then((function(n){r(t.map((function(t){return t.id===e?n:t}))),l(""),g(""),T({message:"Change ".concat(b," number"),type:"success"}),setTimeout((function(){T(null)}),2e3)}))},J=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(w,{notification:F}),Object(a.jsx)(s,{newFilter:y,handleNewFilter:function(e){return C(e.target.value)}}),Object(a.jsx)("h2",{children:"add a new"}),Object(a.jsx)(d,{addPhonebook:function(e){if(e.preventDefault(),t.some((function(e){return e.name===b}))){if(!window.confirm("".concat(b," is already add to phonebook, replace the old number with a new one?")))return;var n=t.find((function(e){return e.name===b})).id;E(n)}else{O({name:b,number:x}).then((function(e){r(t.concat(e)),l(""),g(""),T({message:"Added ".concat(b),type:"success"}),setTimeout((function(){T(null)}),2e3)}))}},newName:b,newNumber:x,handleNewName:function(e){return l(e.target.value)},handleNewNumber:function(e){return g(e.target.value)}}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(j,{persons:J,removePerson:function(e){window.confirm("delete ".concat(e.name," ?"))&&p(e.id).then((function(n){r(t.filter((function(n){return n.id!==e.id}))),T({message:"delete ".concat(e.name," number"),type:"success"}),setTimeout((function(){T(null)}),2e3)})).catch((function(e){T({message:"".concat(e.message),type:"error"}),setTimeout((function(){T(null)}),2e3)}))}})]})};u.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(x,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.ecce48df.chunk.js.map