import{w as n,e0 as s}from"./index-BPjZc6sq.js";const y=n.injectEndpoints({endpoints:p=>({dashboardReport:p.query({query:({startDate:t,finishDate:a,applicantTypeIsRetired:e,organizationID:r})=>{let o=`${s}/DashboardReport?startDate=${t}&finishDate=${a}`;return e&&(o+=`&applicantTypeIsRetired=${e}`),r&&(o+=`&organizationID=${r}`),{url:o}}}),getPayCompareReport:p.query({query:({CurrentYear:t,CurrentMonth:a,PayItemTypeID:e,pensionaryIsRetired:r})=>({url:`${s}/GetPayCompareReport?CurrentYear=${t}&CurrentMonth=${a}&PayItemTypeID=${e}&pensionaryIsRetired=${r}`})})})}),{useLazyDashboardReportQuery:u,useLazyGetPayCompareReportQuery:$}=y;export{$ as a,u};