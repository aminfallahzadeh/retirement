import{c as Me,j as e,R as De,a3 as we,a5 as Ee,b2 as Oe,bZ as Le,b_ as G,b$ as Fe,c0 as Re,c1 as _e,a as Ye,c2 as ze,T as L,I as F,E as de,aK as ke,r as t,x as O,Y as Be,n as w,S as Ue,q as B,t as Ke,bU as qe,z as Ge,P as Ve,A as We,D as Xe,F as $e,J as Qe,W as pe,X as He,m as Ze,B as ue,C as Je,M as es,c3 as X,G as ss,v as as,d as ts,c4 as ns,c5 as os,c6 as rs,c7 as is,c8 as ls,a4 as ae,c9 as cs,O as ds,ca as ps,bY as us,cb as ms,aZ as hs,aL as V,cc as xs,cd as ys,ce as fs}from"./index-BPjZc6sq.js";import{T as gs}from"./Title-BCvpNL7-.js";import{E as Is}from"./EditOutlined-QcU8-hib.js";import{a as js,b as vs,c as Ss,S as Cs,d as bs,e as Ts,f as As,g as Ps,h as Ns,i as Ms}from"./SlipFormTemplate-zn6Tn39S.js";import{M as te}from"./Modal-BtasbOHR.js";import{i as Ds,S as ws}from"./react-select-animated.esm-Bbuff8x3.js";import{f as Es}from"./useFetchLookUpData-BKVdRAfl.js";import{o as Os,s as ne}from"./reactSelect-BGq5yAQc.js";import{d as Ls}from"./table-options-sEZ_KBnu.js";import{D as me}from"./DeleteOutline-BPvGJLtX.js";import{A as Fs}from"./Add-DvwZAUjH.js";import{S as k}from"./SelectInput-fETFsUyg.js";import{U as Rs}from"./UploadOutlined-dx8OTncq.js";import{i as W,p as oe,L as _s,c as Ys,a as zs,F as ks,C as Bs}from"./CompareSalaryReport-OigMMFU-.js";import{r as Us,u as Ks}from"./xlsx-uoQkVabA.js";import{A as re,a as ie,b as le,c as ce}from"./ArrowDropDown-BxotRDOt.js";import"./module-CndzTMl3.js";import"./excel-icon-Dq0N6FeV.js";import"./sharedApi-_iv2uOEQ.js";import"./requestApi-BpK3YUW1.js";import"./reportApi-zj4KnBrq.js";const qs=Me(e.jsx("path",{d:"M9 3 5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99z"}),"ImportExportOutlined"),Gs=(m,y)=>[{accessorKey:"slipRowNum",header:De,enableSorting:!1,enableColumnActions:!1,size:20},{accessorKey:"slipFirstName",header:we,size:20},{accessorKey:"slipLastName",header:Ee,size:20},{accessorKey:"slipAccountNo",header:Oe,size:20},{accessorKey:"slipPayDebitAmount",header:Le,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:G(n)})},{accessorKey:"slipPayCreditAmount",header:Fe,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:G(n)})},{accessorKey:"slipPayAmount",header:Re,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:G(n)})},{accessorKey:"slipPayDate",header:_e,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:Ye(n)})},{accessorKey:"observeSlip",header:ze,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:n})=>e.jsx(L,{title:"دانلود و مشاهده فیش",children:e.jsx(F,{color:"primary",sx:{padding:"0"},onClick:()=>{m(n.original.id)},children:e.jsx(de,{})})})},{accessorKey:"updateSlip",header:ke,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:n})=>e.jsx(L,{title:"ویرایش فیش",children:e.jsx(F,{color:"success",sx:{padding:"0"},onClick:()=>y(n.original.id),children:e.jsx(Is,{})})})}];function Vs({payID:m,setIsInsertItemModalOpen:y,refetch:n}){const[a,d]=t.useState({}),v=Ds(),[S,{isLoading:g}]=js(),{payItemTypes:I,payItemTypesIsLoading:f,payItemTypesIsFetching:C}=Es(),b=Os(I,"payItemTypeID","payItemTypeName"),j=async()=>{var s;try{const o=await S({...a,payItemDate:new Date,payID:m}).unwrap();B.success(o.message,{autoClose:2e3}),y(!1),n()}catch(o){console.log(o),B.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||o.error,{autoClose:2e3})}},T=s=>{const{name:o,value:u}=s.target;d({...a,[o]:Ke(qe(u))})},A=(s,o)=>{const{name:u}=o;if(s){const{value:P}=s;d({...a,[u]:P})}else d({...a,[u]:null})};return t.useEffect(()=>{if(a.instalementCount&&a.financialItemAmount){const s=parseInt(a.instalementCount),o=parseFloat(a.financialItemAmount);if(s>0){const u=o/s;d(P=>({...P,instalementAmount:u.toFixed()}))}}else(a.instalementCount===""||a.financialItemAmount==="")&&d(s=>({...s,instalementAmount:""}))},[a.instalementCount,a.financialItemAmount]),e.jsx("section",{className:"formContainer-transparent formContainer--width-lg flex-col",children:e.jsxs("form",{method:"POST",className:"flex-col",noValidate:!0,children:[e.jsxs("div",{className:"grid grid--col-3",children:[e.jsxs("div",{className:"inputBox__form",children:[e.jsx(ws,{closeMenuOnSelect:!0,components:v,options:b,onChange:A,value:b.find(s=>s.value===(a==null?void 0:a.payItemTypeID)),name:"payItemTypeID",isClearable:!0,placeholder:e.jsxs("div",{className:"react-select-placeholder",children:[e.jsx("span",{children:"*"})," شرح آیتم"]}),noOptionsMessage:ne.noOptionsMessage,loadingMessage:ne.loadingMessage,styles:{container:s=>({...s,position:"relative",height:"100%"}),control:s=>({...s,fontFamily:"IranYekan",cursor:"pointer",fontSize:"12px",height:"100%",maxWidth:"100%",maxHeight:"100%",overflow:"auto",textOverflow:"ellipsis",position:"relative"}),menu:s=>({...s,fontFamily:"IranYekan",zIndex:"5",height:"200px"}),option:s=>({...s,cursor:"pointer"}),menuList:s=>({...s,fontFamily:"IranYekan",zIndex:"5",height:"200px"})},isLoading:f||C}),e.jsxs("label",{className:a!=null&&a.payItemTypeID?"inputBox__form--readOnly-label":"inputBox__form--readOnly-label-hidden",children:[e.jsx("span",{children:"*"})," شرح آیتم"]})]}),e.jsxs("div",{className:"inputBox__form",children:[e.jsx("input",{type:"text",className:"inputBox__form--input",value:O(a.payItemTypeID)||"",name:"payItemTypeName",id:"payItemTypeName",disabled:!0,onChange:T,required:!0}),e.jsxs("label",{className:"inputBox__form--label",htmlFor:"payItemTypeName",children:[e.jsx("span",{children:"*"})," شناسه آیتم"]})]}),e.jsxs("div",{className:"inputBox__form",children:[e.jsx("input",{type:"text",className:"inputBox__form--input",onChange:T,value:O(Be(a.payItemAmount))||"",name:"payItemAmount",id:"payItemAmount",required:!0}),e.jsxs("label",{className:"inputBox__form--label",htmlFor:"payItemAmount",children:[e.jsx("span",{children:"*"})," مبلغ کل"]})]}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{})]}),e.jsx("div",{style:{marginRight:"auto"},children:e.jsx(w,{dir:"ltr",endIcon:e.jsx(Ue,{}),variant:"contained",onClick:j,type:"submit",loading:g,color:"success",children:e.jsx("span",{children:"ذخیره"})})})]})})}function Ws({payID:m,setIsEditModalOpen:y}){const[n,a]=t.useState([]),[d,v]=t.useState({}),[S,g]=t.useState(!1),[I,f]=t.useState(!1),[C,b]=t.useState(null),{data:j,isSuccess:T,isLoading:A,isFetching:E,error:s,refetch:o}=vs({payID:m});t.useEffect(()=>{if(T){const r=j.payItemList.map((p,q)=>({id:p.payItemID,financialItemRowNum:O(q+1),payItemTypeID:O(p.payItemTypeID),payItemTypeName:p.payItemTypeName}));a(r)}return()=>{a([])}},[T,j]),t.useEffect(()=>{o()},[o]),t.useEffect(()=>{s&&console.log(s)},[s]);const[u,{isLoading:P}]=Ss(),i=()=>{g(!0)},R=r=>{b(r),f(!0)},_=async()=>{var r;try{const p=await u({payItemID:C}).unwrap();console.log(p),f(!1),B.success(p.message,{autoClose:2e3}),y(!1)}catch(p){console.log(p),B.error(((r=p==null?void 0:p.data)==null?void 0:r.message)||p.error,{autoClose:2e3})}},Y=t.useMemo(()=>[{accessorKey:"financialItemRowNum",header:"ردیف",size:20,enableSorting:!1,enableColumnActions:!1},{accessorKey:"payItemTypeID",header:"شناسه آیتم",size:20},{accessorKey:"payItemTypeName",header:"نام آیتم",size:20},{accessorKey:"removePayItem",header:"حذف",enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:r})=>e.jsx(L,{title:`حذف "${r.original.payItemTypeName}"`,children:e.jsx(F,{color:"error",sx:{padding:"0"},onClick:()=>R(r.original.id),children:e.jsx(me,{})})})}],[]),U=Ge({...Ls,columns:Y,data:n,muiPaginationProps:{size:"small",shape:"rounded",showRowsPerPage:!1,renderItem:r=>e.jsx(Ve,{...r,page:O(r.page),slots:{previous:We,next:Xe,first:$e,last:Qe}})},renderTopToolbarCustomActions:()=>e.jsx(L,{title:"افزودن آیتم",children:e.jsx("span",{children:e.jsx(F,{"aria-label":"refresh",color:"success",onClick:i,children:e.jsx(Fs,{fontSize:"small"})})})}),muiTableBodyRowProps:({row:r})=>({onClick:()=>v(()=>({[r.id]:!0})),selected:d[r.id],sx:{cursor:"pointer"}}),getRowId:r=>r.id,onRowSelectionChange:v,state:{rowSelection:d}});return e.jsxs(e.Fragment,{children:[S&&e.jsx(te,{title:"افزودن آیتم",closeModal:()=>g(!1),children:e.jsx(Vs,{setIsInsertItemModalOpen:g,payID:m,refetch:o})}),I&&e.jsxs(te,{title:"حذف آیتم",closeModal:()=>f(!1),children:[e.jsx("p",{className:"paragraph-primary",children:"آیا از حذف این آیتم اطمینان دارید؟"}),e.jsxs("div",{className:"flex-row flex-center",children:[e.jsx(w,{dir:"ltr",endIcon:e.jsx(pe,{}),onClick:_,loading:P,variant:"contained",color:"success",children:e.jsx("span",{children:"بله"})}),e.jsx(He,{dir:"ltr",endIcon:e.jsx(Ze,{}),onClick:()=>f(!1),variant:"contained",color:"error",children:e.jsx("span",{children:"خیر"})})]})]}),A||E?e.jsx(ue,{sx:{display:"flex",justifyContent:"center",padding:"2rem 10rem"},children:e.jsx(Je,{color:"primary"})}):e.jsx("div",{className:"formContainer-transparent formContainer--width-lg flex-col",children:e.jsx(es,{table:U})})]})}const Xs=({data:m,isLoading:y,isFetching:n})=>{const[a,d]=t.useState(!1),[v,S]=t.useState(!1),[g,I]=t.useState(""),b=Gs(j=>{S(!0),I(j)},j=>{d(!0),I(j)});return e.jsxs(e.Fragment,{children:[e.jsx(X,{open:a,onClose:()=>d(!1),title:"ویرایش پرسنل",children:e.jsx(Ws,{payID:g,setIsEditModalOpen:d})}),v&&e.jsx(X,{open:v,onClose:()=>S(!1),title:"ویرایش پرسنل",children:e.jsx(Cs,{payID:g})}),e.jsx(ss,{columns:b,scroll:!1,data:m,isLoading:y,isFetching:n})]})},$s=()=>{const m=t.useRef(null),[y,n]=t.useState(0),[a,d]=t.useState(null),[v,S]=t.useState(0),[g,I]=t.useState(!1),[f,C]=t.useState(!1),[b,j]=t.useState([]),[T]=as(),A=T.get("personID"),E=T.get("requestID"),{control:s,handleSubmit:o,formState:{errors:u},watch:P}=ts({defaultValues:{issueType:A?W[1]:W[0],payType:oe[0]}}),i=P(),[R,{isLoading:_,isFetching:Y}]=bs(),[U,{isLoading:K,isFetching:r}]=Ts(),[p,{isLoading:q}]=As(),[he,{isLoading:$}]=Ps(),[xe,{isLoading:ye}]=Ns(),fe=l=>{var x;const h=(x=l.target.files)==null?void 0:x[0];if(h){const c=new FileReader;d(h),c.onprogress=N=>{const M=Math.round(N.loaded/N.total*100);n(M)},c.onload=N=>{var H;const M=(H=N.target)==null?void 0:H.result;if(M&&typeof M!="string"&&M instanceof ArrayBuffer){const Ce=new Uint8Array(M),Z=Us(Ce,{type:"array"}),be=Z.SheetNames[0],Te=Z.Sheets[be],J=Ks.sheet_to_json(Te,{header:1}),Ae=J[0],ee=J.slice(1).map(z=>{if(z.every(D=>D==null||D===""))return null;const se={};return z.forEach((D,Ne)=>{se[Ae[Ne]]=hs(D?D.toString():"")}),se}).filter(z=>z!==null),Pe=i==null?void 0:i.payType;S(ee.length),ve(ee,Pe)}else console.error("FileReader result is not a valid ArrayBuffer.")},c.onloadend=()=>{setTimeout(()=>{n(0)},2e3)},c.readAsArrayBuffer(h)}},ge=()=>{var l;(l=m.current)==null||l.click()},Ie=()=>{d(null),n(0)},je=()=>{I(!1),d(null),n(0)},ve=async(l,h)=>{console.log(h);const x=await xe({data:l,type:h}).unwrap();I(!0),V.success(x.message)},Se=async l=>{if(f){const x=(await U({currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),payType:l.payType.value,personID:A}).unwrap()).itemList.map((c,N)=>({id:c.payID,slipRowNum:N+1,personID:c.personID,slipFirstName:c.payFirstName,slipLastName:c.payLastName,slipAccountNo:c.accountNo,slipPayDebitAmount:c.payDebitAmount,slipPayCreditAmount:c.payCreditAmount,slipPayAmount:c.payAmount,slipPayDate:c.payDate}));j(x)}else if(l.issueType.value==="2"){const x=await he({payDate:new Date().toISOString(),currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),requestID:E,personID:A}).unwrap();C(!0),V.success(x.message)}else if(l.issueType.value==="1"){const h=new Date,x=await p({currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),requestID:E,payDate:h.toISOString()}).unwrap();C(!0),V.success(x.message)}},Q=t.useCallback(async({payType:l,currentYear:h,currentMonth:x})=>{try{const c=await R({payType:l,currentYear:parseInt(h),currentMonth:parseInt(x)}).unwrap();C(c)}catch(c){console.log(c)}},[R]);return t.useEffect(()=>{i.payType&&i.currentYear&&i.currentMonth&&Q({payType:i.payType.value,currentYear:i.currentYear.value,currentMonth:i.currentMonth.value})},[Q,i.payType,i.currentYear,i.currentMonth]),t.useEffect(()=>{console.log(i)},[i]),e.jsxs(e.Fragment,{children:[e.jsx(_s,{open:K||$}),e.jsxs(X,{open:g,onClose:()=>I(!1),title:ns,children:[e.jsxs("p",{className:"paragraph-primary",children:["تعداد ",v," رکورد ثبت شد"]}),e.jsx("div",{className:"flex-row flex-center",children:e.jsx(w,{dir:"ltr",endIcon:e.jsx(pe,{}),onClick:je,variant:"contained",color:"success",children:e.jsx("span",{children:os})})})]}),e.jsxs("section",{className:"flex-col formContainer",children:[e.jsxs("form",{method:"POST",className:"flex-col",onSubmit:o(Se),noValidate:!0,children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx(k,{name:"issueType",control:s,label:rs,options:W,required:!1,isClearable:!1,isDisabled:!0,errors:u}),e.jsx(k,{name:"payType",control:s,label:is,options:oe,required:!0,isClearable:!1,errors:u}),e.jsx(k,{name:"currentYear",control:s,label:ls,options:Ys,required:!0,rules:ae,isClearable:!0,errors:u}),e.jsx(k,{name:"currentMonth",control:s,label:cs,options:zs,required:!0,rules:ae,isClearable:!0,errors:u}),e.jsx("input",{type:"file",ref:m,style:{display:"none"},onChange:fe,accept:".xlsx, .xls"})]}),e.jsxs("div",{className:"flex-row mr-auto flex-center",children:[f===!0&&e.jsx(w,{dir:"ltr",endIcon:e.jsx(de,{}),loading:_||Y,type:"submit",variant:"contained",color:"primary",children:e.jsx("span",{children:ds})}),i.payType.value==="C"||i.payType.value==="E"?e.jsxs("div",{style:{position:"relative"},children:[e.jsx(w,{dir:"ltr",variant:"contained",color:"warning",endIcon:e.jsx(Rs,{}),loading:ye,onClick:ge,children:e.jsx("span",{children:ps})}),a&&e.jsxs("div",{className:"excel",style:{position:"absolute",bottom:"-100%",left:"50%",transform:"translateX(-50%)",width:"100%"},children:[e.jsx(F,{color:"error",size:"small",onClick:Ie,sx:{padding:0},children:e.jsx(me,{})}),e.jsx(L,{title:a.name,children:e.jsx("span",{className:"excel__name",children:a.name})}),e.jsx("img",{src:Ms.excelImage,className:"excel__image",style:{width:"13px"}})]}),e.jsxs(ue,{sx:{position:"absolute",left:"50%",bottom:"-35px",zIndex:2,width:"90%",transform:"translateX(-50%)",visibility:y>0?"visible":"hidden"},children:[e.jsx(us,{variant:"determinate",value:y,color:"warning",sx:{borderRadius:"40px"}}),e.jsxs("span",{style:{fontFamily:"IranYekan",fontSize:"8px"},children:[y,"%"]})]})]}):null,e.jsx(w,{dir:"ltr",endIcon:e.jsx(qs,{}),type:"submit",loading:_||Y||$||q,disabled:f,variant:"contained",color:"primary",children:e.jsx("span",{children:ms})})]})]}),e.jsx(Xs,{data:b,isLoading:K,isFetching:r})]})]})},Ia=()=>e.jsxs("section",{className:"flex-col mb-5",children:[e.jsx(gs,{title:xs,back:!0}),e.jsx($s,{}),e.jsxs("div",{children:[e.jsxs(re,{children:[e.jsx(ie,{id:"panel-header","aria-controls":"panel-content",expandIcon:e.jsx(le,{}),children:ys}),e.jsx(ce,{children:e.jsx(ks,{})})]}),e.jsxs(re,{children:[e.jsx(ie,{id:"panel-header","aria-controls":"panel-content",expandIcon:e.jsx(le,{}),children:fs}),e.jsx(ce,{children:e.jsx(Bs,{})})]})]})]});export{Ia as Slips};