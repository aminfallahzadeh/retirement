import{R as z,Q as A,M as S,P as E,aH as $,_ as K,j as e,f as v,ep as F,aw as j,T as l,L as R,fR as B,dP as D,I as t,B as G,C as N,fS as H,eC as M,r as d,D as U,A as _,dQ as k,G as O,ax as W,fT as Z,fU as Q,i as ee}from"./index-N58BBWKb.js";import{c as se,d as ae}from"./relatedApi-B9eHtjJv.js";import{D as w}from"./DeleteOutline-Zdzo4dhy.js";import{E as q}from"./EditOutlined-3NjP8W9U.js";import{A as J}from"./Add-DI5jx8dx.js";import{R as V}from"./Refresh-BicSNvdm.js";import{c as re,d as oe}from"./heirApi-7f-xjiDi.js";const ne=(r,o)=>[{accessorKey:"relatedRowNo",header:z,size:20,enableSorting:!1,enableColumnActions:!1},{accessorKey:"personNationalCode",header:A,size:20},{accessorKey:"personFirstName",header:S,size:20},{accessorKey:"personLastName",header:E,size:20},{accessorKey:"pensionaryIsUnderGauranteeText",header:$,size:20},{accessorKey:"personBirthDate",header:K,size:20,Cell:({renderedCellValue:s})=>e.jsx("div",{children:v(s)})},{accessorKey:"relationshipWithParentName",header:F,size:20},{accessorKey:"updateRelated",header:j,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:s})=>e.jsx(l,{title:`${j} "${s.original.personFirstName} ${s.original.personLastName}"`,children:e.jsx(R,{to:`${B}?mode=update&id=${r}&personID=${s.original.id}`,children:e.jsx(q,{color:"success"})})})},{accessorKey:"deleteRelated",header:D,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:s})=>e.jsx(l,{title:`${D} "${s.original.personFirstName} ${s.original.personLastName}"`,children:e.jsx(t,{color:"error",onClick:()=>o(s.original.pensionaryID),sx:{padding:"0"},children:e.jsx(w,{})})})}],te=(r,o,s,i)=>e.jsxs(G,{children:[o||r?e.jsx(t,{"aria-label":"refresh",color:"info",disabled:!0,children:e.jsx(N,{size:20,value:100})}):e.jsx(l,{title:H,children:e.jsx("span",{children:e.jsx(t,{"aria-label":"refresh",color:"info",onClick:s,children:e.jsx(V,{fontSize:"small"})})})}),o||r?e.jsx(t,{"aria-label":"refresh",color:"info",disabled:!0,children:e.jsx(N,{size:20,value:100})}):e.jsx(l,{title:M,children:e.jsx(R,{to:`${B}?mode=create&id=${i}`,children:e.jsx(t,{"aria-label":"refresh",color:"success",children:e.jsx(J,{fontSize:"small"})})})})]}),ie=()=>{const[r,o]=d.useState([]),[s,i]=U(!1),[g,h]=d.useState(""),[C]=_(),c=C.get("personID"),{data:p,isSuccess:m,isLoading:u,isFetching:x,refetch:f}=se(c),[y,{isLoading:I}]=ae();d.useEffect(()=>{if(m){const n=p.itemList.map((a,P)=>({id:a.personID,relatedRowNo:P+1,pensionaryID:a.pensionaryID,personBirthDate:a.personBirthDate,personNationalCode:a.personNationalCode,personFirstName:a.personFirstName,personLastName:a.personLastName,pensionaryIsUnderGauranteeText:a.pensionaryIsUnderGauranteeText,relationshipWithParentName:a.relationshipWithParentName}));o(n)}},[m,p]);const b=async()=>{const n=await y({pensionaryID:g}).unwrap();i(),f(),W.success(n.message)},T=ne(c,n=>{h(n),i()}),L=te(u,x,f,c);return e.jsxs(e.Fragment,{children:[e.jsx(k,{open:s,onClose:i,isLoading:I,handleRemove:b}),e.jsx(O,{data:r,columns:T,scroll:!1,topBarActions:L,isLoading:u,isFetching:x})]})},le=(r,o)=>[{accessorKey:"heirRowNo",header:z,size:20,enableSorting:!1,enableColumnActions:!1},{accessorKey:"heirNationalCode",header:A,size:20},{accessorKey:"heirFirstName",header:S,size:20},{accessorKey:"heirLastName",header:E,size:20},{accessorKey:"heirPensionaryIsUnderGauranteeText",header:$,size:20},{accessorKey:"heirBirthDate",header:K,size:20,Cell:({renderedCellValue:s})=>e.jsx("div",{children:v(s)})},{accessorKey:"heirRelationshipWithParentName",header:F,size:20},{accessorKey:"heirParentPersonNationalCode",header:Z,size:20},{accessorKey:"updateHeir",header:j,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:s})=>e.jsx(l,{title:`${j} "${s.original.personFirstName} ${s.original.personLastName}"`,children:e.jsx(R,{to:`${Q}?mode=update&id=${r}&personID=${s.original.id}`,children:e.jsx(q,{color:"success"})})})},{accessorKey:"deleteRelated",header:D,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:s})=>e.jsx(l,{title:`${D} "${s.original.personFirstName} ${s.original.personLastName}"`,children:e.jsx(t,{color:"error",onClick:()=>o(s.original.pensionaryID),sx:{padding:"0"},children:e.jsx(w,{})})})}],ce=(r,o,s,i)=>e.jsxs(G,{children:[o||r?e.jsx(t,{"aria-label":"refresh",color:"info",disabled:!0,children:e.jsx(N,{size:20,value:100})}):e.jsx(l,{title:H,children:e.jsx("span",{children:e.jsx(t,{"aria-label":"refresh",color:"info",onClick:s,children:e.jsx(V,{fontSize:"small"})})})}),o||r?e.jsx(t,{"aria-label":"refresh",color:"info",disabled:!0,children:e.jsx(N,{size:20,value:100})}):e.jsx(l,{title:M,children:e.jsx(R,{to:`${Q}?mode=create&id=${i}`,children:e.jsx(t,{"aria-label":"refresh",color:"success",children:e.jsx(J,{fontSize:"small"})})})})]}),de=()=>{const[r,o]=d.useState(""),[s,i]=d.useState([]),[g,h]=U(!1),[C]=_(),c=C.get("personID"),{data:p,isLoading:m,isSuccess:u,isFetching:x,refetch:f}=re(c),[y,{isLoading:I}]=oe();d.useEffect(()=>{if(u){const n=p.itemList.map((a,P)=>({id:a.personID,heirRowNo:P+1,pensionaryID:a.pensionaryID,heirNationalCode:a.personNationalCode,heirFirstName:a.personFirstName,heirLastName:a.personLastName,heirPensionaryIsUnderGauranteeText:a.pensionaryIsUnderGauranteeText,heirBirthDate:a.personBirthDate,heirRelationshipWithParentName:a.relationshipWithParentName,heirParentPersonNationalCode:a.parentPersonNationalCode}));i(n)}},[u,p]);const b=async()=>{const n=await y({pensionaryID:r}).unwrap();f(),h(),W.success(n.message)},T=le(c,n=>{o(n),h()}),L=ce(m,x,f,c);return e.jsxs(e.Fragment,{children:[e.jsx(k,{open:g,onClose:h,isLoading:I,handleRemove:b}),e.jsx(O,{data:s,columns:T,scroll:!1,topBarActions:L,isLoading:m,isFetching:x})]})},De=()=>{const{personDeathDate:r}=ee(o=>o.person);return r?e.jsx(de,{}):e.jsx(ie,{})};export{De as default};