import{dc as n,g2 as a}from"./index-Celh3WKK.js";const i=n.injectEndpoints({endpoints:u=>({getLookupData:u.query({query:({lookUpType:t,lookUpID:e,lookUpParentID:y})=>{let r=`${a}/GetLookupData?lookUpType=${t}`;return e&&(r+=`&lookUpID=${e}`),y&&(r+=`&lookUpParentID=${y}`),{url:r}}}),getRelationship:u.query({query:()=>({url:`${a}/GetRelationship`})}),getPensionaryStatus:u.query({query:({pensionaryStatusCategory:t,pensionaryStatusIsDead:e})=>{let y=`${a}/GetPensionaryStatus`;const r=[];return t&&r.push(`pensionaryStatusCategory=${t}`),e!=null&&r.push(`pensionaryStatusIsDead=${e}`),r.length>0&&(y+=`?${r.join("&")}`),{url:y}}}),getRetirementStatementType:u.query({query:({RetirementStatementTypeID:t})=>{let e=`${a}/GetRetirementStatementType`;return t&&(e+=`?RetirementStatementTypeID=${t}`),{url:e}}}),getRetiredOrganization:u.query({query:({organizationID:t})=>{let e=`${a}/GetRetiredOrganization`;return t&&(e+=`?organizationID=${t}`),{url:e}}}),getPayItemType:u.query({query:t=>{let e=`${a}/GetPayItemType`;return t&&(e+=`?payItemtypeID=${t}`),{url:e}}})})}),{useGetLookupDataQuery:o,useLazyGetLookupDataQuery:p,useGetRelationshipQuery:l,useGetPensionaryStatusQuery:m,useGetRetirementStatementTypeQuery:G,useLazyGetRetirementStatementTypeQuery:$,useGetRetiredOrganizationQuery:q,useGetPayItemTypeQuery:g,useLazyGetPayItemTypeQuery:R}=i;export{o as a,R as b,G as c,m as d,l as e,q as f,g,p as u};