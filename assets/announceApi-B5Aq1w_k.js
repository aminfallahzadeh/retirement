import{dc as o,dM as t}from"./index-CyGviqj5.js";const u=o.injectEndpoints({endpoints:n=>({getAnnounce:n.query({query:()=>({url:`${t}/GetAnnounce`})}),insertAnnounce:n.mutation({query:e=>({url:`${t}/InsertAnnounce`,method:"POST",body:e})}),deleteAnnounce:n.mutation({query:e=>({url:`${t}/DeleteAnnounce`,method:"POST",body:e})})})}),{useGetAnnounceQuery:s,useInsertAnnounceMutation:a,useDeleteAnnounceMutation:r}=u;export{r as a,a as b,s as u};