import{O as n,j as e,T as t,L as a,I as r,E as o,ch as i}from"./index-BPjZc6sq.js";const l=[{accessorKey:"observePersonnel",header:n,enableSorting:!1,enableColumnActions:!1,size:20,Cell:({row:s})=>e.jsx(t,{title:`${s.original.personFirstName} ${s.original.personLastName}`,children:e.jsx(a,{to:`/retirement/personnel-statements/info?personID=${s.id}&personDeathDate=${s.original.personDeathDate}`,children:e.jsx(r,{color:"primary",sx:{padding:"0"},children:e.jsx(o,{})})})})}],m=()=>e.jsxs("section",{className:"flex-col u-margin-bottom-md",children:[e.jsx("div",{className:"title-primary--container flex-row flex-center",children:e.jsxs("h4",{className:"title-primary",children:[e.jsx("span",{className:"title-primary--underline"}),"احکام و تعرفه"]})}),e.jsx(i,{actions:l})]});export{m as PersonnelStatements};