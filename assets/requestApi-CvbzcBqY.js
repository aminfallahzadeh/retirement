import{di as n,g0 as u}from"./index-N58BBWKb.js";const o=n.injectEndpoints({endpoints:t=>({getRole:t.query({query:()=>({url:`${u}/GetRole`})}),getExpert:t.query({query:({RequestID:e,conditionValue:q,Role:r})=>({url:`${u}/GetExpert?Requestid=${e}&conditionValue=${q}&Role=${r}`})}),getRequest:t.query({query:({Role:e,personID:q,requestID:r,RequestDateFrom:a,RequestDateTo:y})=>{let s=`${u}/GetRequest?Role=${e}`;return q&&(s+=`&personID=${q}`),r&&(s+=`&requestID=${r}`),a&&(s+=`&RequestDateFrom=${a}`),y&&(s+=`&RequestDateTo=${y}`),{url:s}}}),insertRequest:t.mutation({query:e=>({url:`${u}/InsertRequest`,method:"POST",body:e})}),insertRequestByNationalCode:t.mutation({query:e=>({url:`${u}/InsertRequestByNationalCode`,method:"POST",body:e})}),sendRequestToNextState:t.mutation({query:e=>({url:`${u}/SendRequestToNextState`,method:"POST",body:e})}),getRequestType:t.query({query:e=>({url:`${u}/GetRequestType?role=${e}`})}),getRequestHistory:t.query({query:e=>({url:`${u}/GetRequestHistory?requestID=${e}`})}),getRequestAttachment:t.query({query:e=>({url:`${u}/GetRequestAttachment?requestID=${e}`})}),insertRequestAttachment:t.mutation({query:e=>({url:`${u}/InsertRequestAttachment`,method:"POST",body:e})}),getRequestTypeAttachment:t.query({query:e=>({url:`${u}/GetRequestTypeAttachment?requestTypeID=${e}`})}),deleteRequestAttachment:t.mutation({query:e=>({url:`${u}/DeleteRequestAttachment?RequestAttachmentID=${e}`,method:"POST"})})})}),{useGetRoleQuery:m,useLazyGetRoleQuery:$,useGetExpertQuery:i,useGetRequestQuery:c,useLazyGetRequestQuery:h,useGetRequestTypeQuery:l,useInsertRequestMutation:p,useSendRequestToNextStateMutation:G,useGetRequestHistoryQuery:T,useGetRequestAttachmentQuery:A,useInsertRequestAttachmentMutation:S,useGetRequestTypeAttachmentQuery:d,useDeleteRequestAttachmentMutation:Q,useInsertRequestByNationalCodeMutation:I,useLazyGetRequestTypeQuery:g}=o;export{h as a,l as b,I as c,c as d,d as e,G as f,i as g,S as h,A as i,Q as j,T as k,$ as u};