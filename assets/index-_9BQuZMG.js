const a={components:{MuiBreadcrumbs:{defaultProps:{expandText:"نمایش مسیر"}},MuiTablePagination:{defaultProps:{getItemAriaLabel:e=>e==="first"?"رفتن به اولین صفحه":e==="last"?"رفتن به آخرین صفحه":e==="next"?"رفتن به صفحه‌ی بعدی":"رفتن به صفحه‌ی قبلی",labelRowsPerPage:"تعداد سطرهای هر صفحه:",labelDisplayedRows:({from:e,to:t,count:r})=>`${e}–${t} از ${r!==-1?r:`بیشتر از ${t}`}`}},MuiRating:{defaultProps:{getLabelText:e=>`${e} ستاره`,emptyLabelText:"خالی"}},MuiAutocomplete:{defaultProps:{clearText:"پاک‌کردن",closeText:"بستن",loadingText:"در حال بارگذاری…",noOptionsText:"بی‌نتیجه",openText:"بازکردن"}},MuiAlert:{defaultProps:{closeText:"بستن"}},MuiPagination:{defaultProps:{"aria-label":"ناوبری صفحه",getItemAriaLabel:(e,t,r)=>e==="page"?`${r?"":"رفتن به "}صفحهٔ ${t}`:e==="first"?"رفتن به اولین صفحه":e==="last"?"رفتن به آخرین صفحه":e==="next"?"رفتن به صفحه‌ی بعدی":"رفتن به صفحه‌ی قبلی"}}}};export{a as f};