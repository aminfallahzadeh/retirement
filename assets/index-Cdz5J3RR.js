import{c as Me,j as e,T as L,I as F,r as t,n as O,y as De,h as w,k as B,l as we,ae as Ee,D as pe,o as Oe,f as Le,B as de,C as Fe,ah as W,p as Re,ag as _e,A as G}from"./index-DXLU_PyE.js";import{T as Ye}from"./Title-CbSrYmGb.js";import{u as ze}from"./index.esm-BbqTopL3.js";import{G as ke}from"./Grid-D4u5Jkje.js";import{E as me}from"./VisibilityOutlined-DFmMH2Oe.js";import{E as Be}from"./EditOutlined-BL_7hCyu.js";import{s as V,c as Ue}from"./numberConverter-DcI1FAjY.js";import{c as Ke}from"./dateConverter-CxDHzNZk.js";import{R as qe,F as Ge,b as Ve,a8 as Qe,a9 as We,aa as Xe,ab as $e,ac as He,ad as Je,x as Ze,ae as es,af as ss,ag as as,ah as ts,ai as ns,aj as os,O as rs,ak as is,al as ls,am as cs,an as ps,ao as ds}from"./const-XmctE7J8.js";import{a as ms,b as us,c as hs,S as xs,d as ys,e as fs,f as gs,g as Is,h as js,i as vs}from"./SlipFormTemplate-DMZVNFKu.js";import{u as Cs,P as Ss,C as Ts,a as bs,L as As,F as Ps,M as Ns}from"./index.esm-C4cCMZs-.js";import{M as ae}from"./Modal-DP9lNDeG.js";import{i as Ms,S as Ds}from"./react-select-animated.esm-DpIcM5qF.js";import{f as ws}from"./useFetchLookUpData-C51w7ezg.js";import{o as Es,s as te}from"./reactSelect-BGq5yAQc.js";import{S as Os}from"./index-BEKQ4JXP.js";import{d as Ls}from"./table-options-CzF4bt5B.js";import{D as ue}from"./DeleteOutline-DxuTOm2Q.js";import{A as Fs}from"./Add-WyPxsGLi.js";import{S as k}from"./SelectInput-C8DT0J5s.js";import{U as Rs}from"./UploadOutlined-D4QbgEWb.js";import{i as Q,p as ne,L as _s,c as Ys,a as zs,F as ks,C as Bs}from"./CompareSalaryReport-Da7RvmZP.js";import{r as Us,u as Ks}from"./xlsx-uoQkVabA.js";import{r as oe}from"./rules-DZzP7WC9.js";import{A as re,a as ie,b as le,c as ce}from"./ArrowDropDown-CYnaQZUF.js";import"./module-BQPyyoq0.js";import"./excel-icon-Dq0N6FeV.js";import"./sharedApi-Y0CbGCvQ.js";import"./requestApi-CRha_uBp.js";import"./messages-C1aWCoMO.js";import"./GlobalSearch-CNLmGyL_.js";import"./personApi-CgWrLM2b.js";import"./Input-CGe5v-_f.js";import"./InfoOutlined-C0x8mg_6.js";import"./reportApi-t9zk6e76.js";const qs=Me(e.jsx("path",{d:"M9 3 5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99z"}),"ImportExportOutlined"),Gs=(u,y)=>[{accessorKey:"slipRowNum",header:qe,enableSorting:!1,enableColumnActions:!1,size:20},{accessorKey:"slipFirstName",header:Ge,size:20},{accessorKey:"slipLastName",header:Ve,size:20},{accessorKey:"slipAccountNo",header:Qe,size:20},{accessorKey:"slipPayDebitAmount",header:We,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:V(n)})},{accessorKey:"slipPayCreditAmount",header:Xe,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:V(n)})},{accessorKey:"slipPayAmount",header:$e,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:V(n)})},{accessorKey:"slipPayDate",header:He,size:20,Cell:({renderedCellValue:n})=>e.jsx("div",{children:Ke(n)})},{accessorKey:"observeSlip",header:Je,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:n})=>e.jsx(L,{title:"دانلود و مشاهده فیش",children:e.jsx(F,{color:"primary",sx:{padding:"0"},onClick:()=>{u(n.original.id)},children:e.jsx(me,{})})})},{accessorKey:"updateSlip",header:Ze,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:n})=>e.jsx(L,{title:"ویرایش فیش",children:e.jsx(F,{color:"success",sx:{padding:"0"},onClick:()=>y(n.original.id),children:e.jsx(Be,{})})})}];function Vs({payID:u,setIsInsertItemModalOpen:y,refetch:n}){const[a,p]=t.useState({}),v=Ms(),[C,{isLoading:g}]=ms(),{payItemTypes:I,payItemTypesIsLoading:f,payItemTypesIsFetching:S}=ws(),T=Es(I,"payItemTypeID","payItemTypeName"),j=async()=>{var s;try{const o=await C({...a,payItemDate:new Date,payID:u}).unwrap();B.success(o.message,{autoClose:2e3}),y(!1),n()}catch(o){console.log(o),B.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||o.error,{autoClose:2e3})}},b=s=>{const{name:o,value:m}=s.target;p({...a,[o]:we(Ee(m))})},A=(s,o)=>{const{name:m}=o;if(s){const{value:P}=s;p({...a,[m]:P})}else p({...a,[m]:null})};return t.useEffect(()=>{if(a.instalementCount&&a.financialItemAmount){const s=parseInt(a.instalementCount),o=parseFloat(a.financialItemAmount);if(s>0){const m=o/s;p(P=>({...P,instalementAmount:m.toFixed()}))}}else(a.instalementCount===""||a.financialItemAmount==="")&&p(s=>({...s,instalementAmount:""}))},[a.instalementCount,a.financialItemAmount]),e.jsx("section",{className:"formContainer-transparent formContainer--width-lg flex-col",children:e.jsxs("form",{method:"POST",className:"flex-col",noValidate:!0,children:[e.jsxs("div",{className:"grid grid--col-3",children:[e.jsxs("div",{className:"inputBox__form",children:[e.jsx(Ds,{closeMenuOnSelect:!0,components:v,options:T,onChange:A,value:T.find(s=>s.value===(a==null?void 0:a.payItemTypeID)),name:"payItemTypeID",isClearable:!0,placeholder:e.jsxs("div",{className:"react-select-placeholder",children:[e.jsx("span",{children:"*"})," شرح آیتم"]}),noOptionsMessage:te.noOptionsMessage,loadingMessage:te.loadingMessage,styles:{container:s=>({...s,position:"relative",height:"100%"}),control:s=>({...s,fontFamily:"IranYekan",cursor:"pointer",fontSize:"12px",height:"100%",maxWidth:"100%",maxHeight:"100%",overflow:"auto",textOverflow:"ellipsis",position:"relative"}),menu:s=>({...s,fontFamily:"IranYekan",zIndex:"5",height:"200px"}),option:s=>({...s,cursor:"pointer"}),menuList:s=>({...s,fontFamily:"IranYekan",zIndex:"5",height:"200px"})},isLoading:f||S}),e.jsxs("label",{className:a!=null&&a.payItemTypeID?"inputBox__form--readOnly-label":"inputBox__form--readOnly-label-hidden",children:[e.jsx("span",{children:"*"})," شرح آیتم"]})]}),e.jsxs("div",{className:"inputBox__form",children:[e.jsx("input",{type:"text",className:"inputBox__form--input",value:O(a.payItemTypeID)||"",name:"payItemTypeName",id:"payItemTypeName",disabled:!0,onChange:b,required:!0}),e.jsxs("label",{className:"inputBox__form--label",htmlFor:"payItemTypeName",children:[e.jsx("span",{children:"*"})," شناسه آیتم"]})]}),e.jsxs("div",{className:"inputBox__form",children:[e.jsx("input",{type:"text",className:"inputBox__form--input",onChange:b,value:O(De(a.payItemAmount))||"",name:"payItemAmount",id:"payItemAmount",required:!0}),e.jsxs("label",{className:"inputBox__form--label",htmlFor:"payItemAmount",children:[e.jsx("span",{children:"*"})," مبلغ کل"]})]}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{}),e.jsx("div",{})]}),e.jsx("div",{style:{marginRight:"auto"},children:e.jsx(w,{dir:"ltr",endIcon:e.jsx(Os,{}),variant:"contained",onClick:j,type:"submit",loading:g,color:"success",children:e.jsx("span",{children:"ذخیره"})})})]})})}function Qs({payID:u,setIsEditModalOpen:y}){const[n,a]=t.useState([]),[p,v]=t.useState({}),[C,g]=t.useState(!1),[I,f]=t.useState(!1),[S,T]=t.useState(null),{data:j,isSuccess:b,isLoading:A,isFetching:E,error:s,refetch:o}=us({payID:u});t.useEffect(()=>{if(b){const r=j.payItemList.map((d,q)=>({id:d.payItemID,financialItemRowNum:O(q+1),payItemTypeID:O(d.payItemTypeID),payItemTypeName:d.payItemTypeName}));a(r)}return()=>{a([])}},[b,j]),t.useEffect(()=>{o()},[o]),t.useEffect(()=>{s&&console.log(s)},[s]);const[m,{isLoading:P}]=hs(),i=()=>{g(!0)},R=r=>{T(r),f(!0)},_=async()=>{var r;try{const d=await m({payItemID:S}).unwrap();console.log(d),f(!1),B.success(d.message,{autoClose:2e3}),y(!1)}catch(d){console.log(d),B.error(((r=d==null?void 0:d.data)==null?void 0:r.message)||d.error,{autoClose:2e3})}},Y=t.useMemo(()=>[{accessorKey:"financialItemRowNum",header:"ردیف",size:20,enableSorting:!1,enableColumnActions:!1},{accessorKey:"payItemTypeID",header:"شناسه آیتم",size:20},{accessorKey:"payItemTypeName",header:"نام آیتم",size:20},{accessorKey:"removePayItem",header:"حذف",enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:r})=>e.jsx(L,{title:`حذف "${r.original.payItemTypeName}"`,children:e.jsx(F,{color:"error",sx:{padding:"0"},onClick:()=>R(r.original.id),children:e.jsx(ue,{})})})}],[]),U=Cs({...Ls,columns:Y,data:n,muiPaginationProps:{size:"small",shape:"rounded",showRowsPerPage:!1,renderItem:r=>e.jsx(Ss,{...r,page:O(r.page),slots:{previous:Ts,next:bs,first:As,last:Ps}})},renderTopToolbarCustomActions:()=>e.jsx(L,{title:"افزودن آیتم",children:e.jsx("span",{children:e.jsx(F,{"aria-label":"refresh",color:"success",onClick:i,children:e.jsx(Fs,{fontSize:"small"})})})}),muiTableBodyRowProps:({row:r})=>({onClick:()=>v(()=>({[r.id]:!0})),selected:p[r.id],sx:{cursor:"pointer"}}),getRowId:r=>r.id,onRowSelectionChange:v,state:{rowSelection:p}});return e.jsxs(e.Fragment,{children:[C&&e.jsx(ae,{title:"افزودن آیتم",closeModal:()=>g(!1),children:e.jsx(Vs,{setIsInsertItemModalOpen:g,payID:u,refetch:o})}),I&&e.jsxs(ae,{title:"حذف آیتم",closeModal:()=>f(!1),children:[e.jsx("p",{className:"paragraph-primary",children:"آیا از حذف این آیتم اطمینان دارید؟"}),e.jsxs("div",{className:"flex-row flex-center",children:[e.jsx(w,{dir:"ltr",endIcon:e.jsx(pe,{}),onClick:_,loading:P,variant:"contained",color:"success",children:e.jsx("span",{children:"بله"})}),e.jsx(Oe,{dir:"ltr",endIcon:e.jsx(Le,{}),onClick:()=>f(!1),variant:"contained",color:"error",children:e.jsx("span",{children:"خیر"})})]})]}),A||E?e.jsx(de,{sx:{display:"flex",justifyContent:"center",padding:"2rem 10rem"},children:e.jsx(Fe,{color:"primary"})}):e.jsx("div",{className:"formContainer-transparent formContainer--width-lg flex-col",children:e.jsx(Ns,{table:U})})]})}const Ws=({data:u,isLoading:y,isFetching:n})=>{const[a,p]=t.useState(!1),[v,C]=t.useState(!1),[g,I]=t.useState(""),T=Gs(j=>{C(!0),I(j)},j=>{p(!0),I(j)});return e.jsxs(e.Fragment,{children:[e.jsx(W,{open:a,onClose:()=>p(!1),title:"ویرایش پرسنل",children:e.jsx(Qs,{payID:g,setIsEditModalOpen:p})}),v&&e.jsx(W,{open:v,onClose:()=>C(!1),title:"ویرایش پرسنل",children:e.jsx(xs,{payID:g})}),e.jsx(ke,{columns:T,scroll:!1,data:u,isLoading:y,isFetching:n})]})},Xs=()=>{const u=t.useRef(null),[y,n]=t.useState(0),[a,p]=t.useState(null),[v,C]=t.useState(0),[g,I]=t.useState(!1),[f,S]=t.useState(!1),[T,j]=t.useState([]),[b]=Re(),A=b.get("personID"),E=b.get("requestID"),{control:s,handleSubmit:o,formState:{errors:m},watch:P}=ze({defaultValues:{issueType:A?Q[1]:Q[0],payType:ne[0]}}),i=P(),[R,{isLoading:_,isFetching:Y}]=ys(),[U,{isLoading:K,isFetching:r}]=fs(),[d,{isLoading:q}]=gs(),[he,{isLoading:X}]=Is(),[xe,{isLoading:ye}]=js(),fe=l=>{var x;const h=(x=l.target.files)==null?void 0:x[0];if(h){const c=new FileReader;p(h),c.onprogress=N=>{const M=Math.round(N.loaded/N.total*100);n(M)},c.onload=N=>{var H;const M=(H=N.target)==null?void 0:H.result;if(M&&typeof M!="string"&&M instanceof ArrayBuffer){const Se=new Uint8Array(M),J=Us(Se,{type:"array"}),Te=J.SheetNames[0],be=J.Sheets[Te],Z=Ks.sheet_to_json(be,{header:1}),Ae=Z[0],ee=Z.slice(1).map(z=>{if(z.every(D=>D==null||D===""))return null;const se={};return z.forEach((D,Ne)=>{se[Ae[Ne]]=Ue(D?D.toString():"")}),se}).filter(z=>z!==null),Pe=i==null?void 0:i.payType;C(ee.length),ve(ee,Pe)}else console.error("FileReader result is not a valid ArrayBuffer.")},c.onloadend=()=>{setTimeout(()=>{n(0)},2e3)},c.readAsArrayBuffer(h)}},ge=()=>{var l;(l=u.current)==null||l.click()},Ie=()=>{p(null),n(0)},je=()=>{I(!1),p(null),n(0)},ve=async(l,h)=>{console.log(h);const x=await xe({data:l,type:h}).unwrap();I(!0),G.success(x.message)},Ce=async l=>{if(f){const x=(await U({currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),payType:l.payType.value,personID:A}).unwrap()).itemList.map((c,N)=>({id:c.payID,slipRowNum:N+1,personID:c.personID,slipFirstName:c.payFirstName,slipLastName:c.payLastName,slipAccountNo:c.accountNo,slipPayDebitAmount:c.payDebitAmount,slipPayCreditAmount:c.payCreditAmount,slipPayAmount:c.payAmount,slipPayDate:c.payDate}));j(x)}else if(l.issueType.value==="2"){const x=await he({payDate:new Date().toISOString(),currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),requestID:E,personID:A}).unwrap();S(!0),G.success(x.message)}else if(l.issueType.value==="1"){const h=new Date,x=await d({currentYear:parseInt(l.currentYear.value),currentMonth:parseInt(l.currentMonth.value),requestID:E,payDate:h.toISOString()}).unwrap();S(!0),G.success(x.message)}},$=t.useCallback(async({payType:l,currentYear:h,currentMonth:x})=>{try{const c=await R({payType:l,currentYear:parseInt(h),currentMonth:parseInt(x)}).unwrap();S(c)}catch(c){console.log(c)}},[R]);return t.useEffect(()=>{i.payType&&i.currentYear&&i.currentMonth&&$({payType:i.payType.value,currentYear:i.currentYear.value,currentMonth:i.currentMonth.value})},[$,i.payType,i.currentYear,i.currentMonth]),t.useEffect(()=>{console.log(i)},[i]),e.jsxs(e.Fragment,{children:[e.jsx(_s,{open:K||X}),e.jsxs(W,{open:g,onClose:()=>I(!1),title:es,children:[e.jsxs("p",{className:"paragraph-primary",children:["تعداد ",v," رکورد ثبت شد"]}),e.jsx("div",{className:"flex-row flex-center",children:e.jsx(w,{dir:"ltr",endIcon:e.jsx(pe,{}),onClick:je,variant:"contained",color:"success",children:e.jsx("span",{children:ss})})})]}),e.jsxs("section",{className:"flex-col formContainer",children:[e.jsxs("form",{method:"POST",className:"flex-col",onSubmit:o(Ce),noValidate:!0,children:[e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx(k,{name:"issueType",control:s,label:as,options:Q,required:!1,isClearable:!1,isDisabled:!0,errors:m}),e.jsx(k,{name:"payType",control:s,label:ts,options:ne,required:!0,isClearable:!1,errors:m}),e.jsx(k,{name:"currentYear",control:s,label:ns,options:Ys,required:!0,rules:oe,isClearable:!0,errors:m}),e.jsx(k,{name:"currentMonth",control:s,label:os,options:zs,required:!0,rules:oe,isClearable:!0,errors:m}),e.jsx("input",{type:"file",ref:u,style:{display:"none"},onChange:fe,accept:".xlsx, .xls"})]}),e.jsxs("div",{className:"flex-row mr-auto flex-center",children:[f===!0&&e.jsx(w,{dir:"ltr",endIcon:e.jsx(me,{}),loading:_||Y,type:"submit",variant:"contained",color:"primary",children:e.jsx("span",{children:rs})}),i.payType.value==="C"||i.payType.value==="E"?e.jsxs("div",{style:{position:"relative"},children:[e.jsx(w,{dir:"ltr",variant:"contained",color:"warning",endIcon:e.jsx(Rs,{}),loading:ye,onClick:ge,children:e.jsx("span",{children:is})}),a&&e.jsxs("div",{className:"excel",style:{position:"absolute",bottom:"-100%",left:"50%",transform:"translateX(-50%)",width:"100%"},children:[e.jsx(F,{color:"error",size:"small",onClick:Ie,sx:{padding:0},children:e.jsx(ue,{})}),e.jsx(L,{title:a.name,children:e.jsx("span",{className:"excel__name",children:a.name})}),e.jsx("img",{src:vs.excelImage,className:"excel__image",style:{width:"13px"}})]}),e.jsxs(de,{sx:{position:"absolute",left:"50%",bottom:"-35px",zIndex:2,width:"90%",transform:"translateX(-50%)",visibility:y>0?"visible":"hidden"},children:[e.jsx(_e,{variant:"determinate",value:y,color:"warning",sx:{borderRadius:"40px"}}),e.jsxs("span",{style:{fontFamily:"IranYekan",fontSize:"8px"},children:[y,"%"]})]})]}):null,e.jsx(w,{dir:"ltr",endIcon:e.jsx(qs,{}),type:"submit",loading:_||Y||X||q,disabled:f,variant:"contained",color:"primary",children:e.jsx("span",{children:ls})})]})]}),e.jsx(Ws,{data:T,isLoading:K,isFetching:r})]})]})},Oa=()=>e.jsxs("section",{className:"flex-col mb-5",children:[e.jsx(Ye,{title:cs,back:!0}),e.jsx(Xs,{}),e.jsxs("div",{children:[e.jsxs(re,{children:[e.jsx(ie,{id:"panel-header","aria-controls":"panel-content",expandIcon:e.jsx(le,{}),children:ps}),e.jsx(ce,{children:e.jsx(ks,{})})]}),e.jsxs(re,{children:[e.jsx(ie,{id:"panel-header","aria-controls":"panel-content",expandIcon:e.jsx(le,{}),children:ds}),e.jsx(ce,{children:e.jsx(Bs,{})})]})]})]});export{Oa as Slips};