import{r as n,A as L,cv as g,j as s,B as _,C as $,cw as t,Q as F,cx as C,M as O,P as M,U as k,W as y,f,_ as U,$ as d,Y as B,aq as G,ah as H,cy as Q,ar as Y,cs as a,cz as m,cA as p,aY as q,aZ as N,cB as w,L as j,cC as z,cD as V,b3 as W,k as Z,cE as J}from"./index-N58BBWKb.js";import{a as I}from"./sharedApi-BlfukM_H.js";import{u as K}from"./useRouteMatch-D4lKS5sR.js";const X=()=>{const[e,l]=n.useState(null),[T,E]=n.useState(null),[o,S]=n.useState(null),[r]=L(),h=r.get("personID"),b=r.get("personDeathDate"),{data:x,isSuccess:A,isLoading:v,isFetching:P}=g({personID:h}),{data:c,isSuccess:D}=I({lookUpType:"Gender",lookUpID:e==null?void 0:e.genderID}),{data:i,isSuccess:R}=I({lookUpType:"MaritialStatus",lookUpID:e==null?void 0:e.maritalStatusID});return n.useEffect(()=>{A&&l(x==null?void 0:x.itemList[0])},[A,x]),n.useEffect(()=>{var u;if(D){if(((u=c==null?void 0:c.itemList)==null?void 0:u.length)>1)return;E(c.itemList[0].lookUpName)}},[D,c]),n.useEffect(()=>{var u;if(R){if(((u=i==null?void 0:i.itemList)==null?void 0:u.length)>1)return;S(i.itemList[0].lookUpName)}},[R,i]),s.jsx(s.Fragment,{children:v||P?s.jsx(_,{sx:{display:"flex",justifyContent:"center",padding:"2rem 10rem"},children:s.jsx($,{color:"primary"})}):s.jsx("section",{className:"flex-col formContainer",children:s.jsxs("div",{className:"grid grid-cols-4",children:[s.jsx(t.Text,{value:(e==null?void 0:e.personNationalCode)||"-",label:F}),s.jsx(t.Text,{value:(e==null?void 0:e.personnelID)||"-",label:C}),s.jsx(t.Text,{value:(e==null?void 0:e.personFirstName)||"-",label:O}),s.jsx(t.Text,{value:(e==null?void 0:e.personLastName)||"-",label:M}),s.jsx(t.Text,{value:(e==null?void 0:e.personCertificateNo)||"-",label:k}),s.jsx(t.Text,{value:(e==null?void 0:e.personFatherName)||"-",label:y}),s.jsx(t.Text,{value:f(e==null?void 0:e.personBirthDate)||"-",label:U}),s.jsx(t.Text,{value:(e==null?void 0:e.personBirthPlace)||"-",label:d}),s.jsx(t.Text,{value:T||"-",label:B}),s.jsx(t.Text,{value:o||"-",label:G}),s.jsx(t.Text,{value:(e==null?void 0:e.educationTypeCaption)||"-",label:H}),s.jsx(t.Text,{value:(e==null?void 0:e.employmentDate)||"-",label:Q}),b!=="null"&&s.jsx(t.Text,{value:f(b)||"-",label:Y})]})})})},ee=()=>{const[e]=L(),l=K([`${a}/${m}`,`${a}/${p}`,a]),T=e.toString(),E=l==null?void 0:l.pattern.path,o=r=>T?`${r}?${T}`:r;return s.jsxs("div",{children:[s.jsx(_,{sx:{bgcolor:"background.paper",borderRadius:1},children:s.jsxs(q,{value:E,children:[s.jsx(N,{label:w,value:a,to:o(a),component:j}),s.jsx(N,{label:z,value:`${a}/${p}`,to:o(`${a}/${p}`),component:j}),s.jsx(N,{label:V,value:`${a}/${m}`,to:o(`${a}/${m}`),component:j})]})}),s.jsx(W,{})]})};function le(){return s.jsxs("section",{className:"flex-col u-margin-bottom-md",children:[s.jsx(Z,{title:J,back:!0}),s.jsx(X,{}),s.jsx(ee,{})]})}export{le as default};