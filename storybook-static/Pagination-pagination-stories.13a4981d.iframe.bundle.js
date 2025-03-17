/*! For license information please see Pagination-pagination-stories.13a4981d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkgridular=self.webpackChunkgridular||[]).push([[788],{"./components/data-grid/pagination.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>Pagination});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_lib_utils__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./lib/utils.ts"));const Pagination=({pageIndex,pageCount,pageSize,setPageIndex,setPageSize,pageSizeOptions,processedDataLength,className,showFirstLastButtons=!0,showPageSizeSelector=!0,showPageInfo=!0,renderPageSizeSelector,renderPageInfo,renderFirstPageButton,renderPrevPageButton,renderNextPageButton,renderLastPageButton,pageSizeClassName,pageInfoClassName,buttonsClassName,buttonClassName})=>{const start=0===processedDataLength?0:pageIndex*pageSize+1,end=Math.min((pageIndex+1)*pageSize,processedDataLength),isFirstPage=0===pageIndex,isLastPage=pageIndex>=pageCount-1,handlePageSizeChange=size=>{setPageSize(size),setPageIndex(0)},goToFirstPage=()=>setPageIndex(0),goToPrevPage=()=>setPageIndex(Math.max(0,pageIndex-1)),goToNextPage=()=>setPageIndex(Math.min(pageCount-1,pageIndex+1)),goToLastPage=()=>setPageIndex(pageCount-1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-2 flex items-center justify-between",className),children:[showPageSizeSelector&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center gap-2",pageSizeClassName),children:renderPageSizeSelector?renderPageSizeSelector({pageSize,options:pageSizeOptions,onChange:handlePageSizeChange}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:"text-sm text-muted-foreground",children:"Rows per page:"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select",{value:pageSize,onChange:e=>handlePageSizeChange(Number(e.target.value)),className:"border rounded px-2 py-1 text-sm bg-background",children:pageSizeOptions.map((option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option",{value:option,children:option},option)))})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center",buttonsClassName),children:[showPageInfo&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("mr-2",pageInfoClassName),children:renderPageInfo?renderPageInfo({start,end,total:processedDataLength}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span",{className:"text-sm text-muted-foreground",children:[start,"-",end," of ",processedDataLength]})}),showFirstLastButtons&&(renderFirstPageButton?renderFirstPageButton({onClick:goToFirstPage,disabled:isFirstPage}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button",{onClick:goToFirstPage,disabled:isFirstPage,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",buttonClassName),children:"<<"})),renderPrevPageButton?renderPrevPageButton({onClick:goToPrevPage,disabled:isFirstPage}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button",{onClick:goToPrevPage,disabled:isFirstPage,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",buttonClassName),children:"<"}),renderNextPageButton?renderNextPageButton({onClick:goToNextPage,disabled:isLastPage}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button",{onClick:goToNextPage,disabled:isLastPage,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",buttonClassName),children:">"}),showFirstLastButtons&&(renderLastPageButton?renderLastPageButton({onClick:goToLastPage,disabled:isLastPage}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button",{onClick:goToLastPage,disabled:isLastPage,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",buttonClassName),children:">>"}))]})]})};try{Pagination.displayName="Pagination",Pagination.__docgenInfo={description:"",displayName:"Pagination",props:{pageIndex:{defaultValue:null,description:"",name:"pageIndex",required:!0,type:{name:"number"}},pageCount:{defaultValue:null,description:"",name:"pageCount",required:!0,type:{name:"number"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!0,type:{name:"number"}},setPageIndex:{defaultValue:null,description:"",name:"setPageIndex",required:!0,type:{name:"(index: number) => void"}},setPageSize:{defaultValue:null,description:"",name:"setPageSize",required:!0,type:{name:"(size: number) => void"}},pageSizeOptions:{defaultValue:null,description:"",name:"pageSizeOptions",required:!0,type:{name:"number[]"}},processedDataLength:{defaultValue:null,description:"",name:"processedDataLength",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},showFirstLastButtons:{defaultValue:{value:"true"},description:"",name:"showFirstLastButtons",required:!1,type:{name:"boolean"}},showPageSizeSelector:{defaultValue:{value:"true"},description:"",name:"showPageSizeSelector",required:!1,type:{name:"boolean"}},showPageInfo:{defaultValue:{value:"true"},description:"",name:"showPageInfo",required:!1,type:{name:"boolean"}},renderPageSizeSelector:{defaultValue:null,description:"",name:"renderPageSizeSelector",required:!1,type:{name:"((props: { pageSize: number; options: number[]; onChange: (size: number) => void; }) => ReactNode)"}},renderPageInfo:{defaultValue:null,description:"",name:"renderPageInfo",required:!1,type:{name:"((props: { start: number; end: number; total: number; }) => ReactNode)"}},renderFirstPageButton:{defaultValue:null,description:"",name:"renderFirstPageButton",required:!1,type:{name:"((props: { onClick: () => void; disabled: boolean; }) => ReactNode)"}},renderPrevPageButton:{defaultValue:null,description:"",name:"renderPrevPageButton",required:!1,type:{name:"((props: { onClick: () => void; disabled: boolean; }) => ReactNode)"}},renderNextPageButton:{defaultValue:null,description:"",name:"renderNextPageButton",required:!1,type:{name:"((props: { onClick: () => void; disabled: boolean; }) => ReactNode)"}},renderLastPageButton:{defaultValue:null,description:"",name:"renderLastPageButton",required:!1,type:{name:"((props: { onClick: () => void; disabled: boolean; }) => ReactNode)"}},pageSizeClassName:{defaultValue:null,description:"",name:"pageSizeClassName",required:!1,type:{name:"string"}},pageInfoClassName:{defaultValue:null,description:"",name:"pageInfoClassName",required:!1,type:{name:"string"}},buttonsClassName:{defaultValue:null,description:"",name:"buttonsClassName",required:!1,type:{name:"string"}},buttonClassName:{defaultValue:null,description:"",name:"buttonClassName",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/data-grid/pagination.tsx#Pagination"]={docgenInfo:Pagination.__docgenInfo,name:"Pagination",path:"components/data-grid/pagination.tsx#Pagination"})}catch(__react_docgen_typescript_loader_error){}},"./components/ui/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>Button});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@radix-ui/react-slot/dist/index.mjs"),class_variance_authority__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/class-variance-authority/dist/index.mjs"),_lib_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./lib/utils.ts");const buttonVariants=(0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),Button=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,variant,size,asChild=!1,...props},ref)=>{const Comp=asChild?_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.DX:"button";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp,{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({variant,size,className})),ref,...props})}));Button.displayName="Button";try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{asChild:{defaultValue:{value:"false"},description:"",name:"asChild",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null'}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"default" | "sm" | "lg" | "icon" | null'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/ui/button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"components/ui/button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./lib/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}},"./node_modules/@radix-ui/react-compose-refs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>useComposedRefs,t:()=>composeRefs});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function setRef(ref,value){if("function"==typeof ref)return ref(value);null!=ref&&(ref.current=value)}function composeRefs(...refs){return node=>{let hasCleanup=!1;const cleanups=refs.map((ref=>{const cleanup=setRef(ref,node);return hasCleanup||"function"!=typeof cleanup||(hasCleanup=!0),cleanup}));if(hasCleanup)return()=>{for(let i=0;i<cleanups.length;i++){const cleanup=cleanups[i];"function"==typeof cleanup?cleanup():setRef(refs[i],null)}}}}function useComposedRefs(...refs){return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs),refs)}},"./node_modules/@radix-ui/react-slot/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DX:()=>Slot});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-compose-refs/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),Slot=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{children,...slotProps}=props,childrenArray=react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children),slottable=childrenArray.find(isSlottable);if(slottable){const newElement=slottable.props.children,newChildren=childrenArray.map((child=>child===slottable?react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement)>1?react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null):react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement)?newElement.props.children:null:child));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone,{...slotProps,ref:forwardedRef,children:react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement)?react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement,void 0,newChildren):null})}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone,{...slotProps,ref:forwardedRef,children})}));Slot.displayName="Slot";var SlotClone=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{children,...slotProps}=props;if(react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)){const childrenRef=function getElementRef(element){let getter=Object.getOwnPropertyDescriptor(element.props,"ref")?.get,mayWarn=getter&&"isReactWarning"in getter&&getter.isReactWarning;if(mayWarn)return element.ref;if(getter=Object.getOwnPropertyDescriptor(element,"ref")?.get,mayWarn=getter&&"isReactWarning"in getter&&getter.isReactWarning,mayWarn)return element.props.ref;return element.props.ref||element.ref}(children),props2=function mergeProps(slotProps,childProps){const overrideProps={...childProps};for(const propName in childProps){const slotPropValue=slotProps[propName],childPropValue=childProps[propName];/^on[A-Z]/.test(propName)?slotPropValue&&childPropValue?overrideProps[propName]=(...args)=>{childPropValue(...args),slotPropValue(...args)}:slotPropValue&&(overrideProps[propName]=slotPropValue):"style"===propName?overrideProps[propName]={...slotPropValue,...childPropValue}:"className"===propName&&(overrideProps[propName]=[slotPropValue,childPropValue].filter(Boolean).join(" "))}return{...slotProps,...overrideProps}}(slotProps,children.props);return children.type!==react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&(props2.ref=forwardedRef?(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.t)(forwardedRef,childrenRef):childrenRef),react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children,props2)}return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children)>1?react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null):null}));SlotClone.displayName="SlotClone";var Slottable=({children})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children});function isSlottable(child){return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child)&&child.type===Slottable}},"./node_modules/class-variance-authority/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>cva});var clsx__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs");const falsyToString=value=>"boolean"==typeof value?`${value}`:0===value?"0":value,cx=clsx__WEBPACK_IMPORTED_MODULE_0__.$,cva=(base,config)=>props=>{var _config_compoundVariants;if(null==(null==config?void 0:config.variants))return cx(base,null==props?void 0:props.class,null==props?void 0:props.className);const{variants,defaultVariants}=config,getVariantClassNames=Object.keys(variants).map((variant=>{const variantProp=null==props?void 0:props[variant],defaultVariantProp=null==defaultVariants?void 0:defaultVariants[variant];if(null===variantProp)return null;const variantKey=falsyToString(variantProp)||falsyToString(defaultVariantProp);return variants[variant][variantKey]})),propsWithoutUndefined=props&&Object.entries(props).reduce(((acc,param)=>{let[key,value]=param;return void 0===value||(acc[key]=value),acc}),{}),getCompoundVariantClassNames=null==config||null===(_config_compoundVariants=config.compoundVariants)||void 0===_config_compoundVariants?void 0:_config_compoundVariants.reduce(((acc,param)=>{let{class:cvClass,className:cvClassName,...compoundVariantOptions}=param;return Object.entries(compoundVariantOptions).every((param=>{let[key,value]=param;return Array.isArray(value)?value.includes({...defaultVariants,...propsWithoutUndefined}[key]):{...defaultVariants,...propsWithoutUndefined}[key]===value}))?[...acc,cvClass,cvClassName]:acc}),[]);return cx(base,getVariantClassNames,getCompoundVariantClassNames,null==props?void 0:props.class,null==props?void 0:props.className)}},"./node_modules/lucide-react/dist/esm/createLucideIcon.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>createLucideIcon});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const mergeClasses=(...classes)=>classes.filter(((className,index,array)=>Boolean(className)&&""!==className.trim()&&array.indexOf(className)===index)).join(" ").trim();var defaultAttributes={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Icon=(0,react.forwardRef)((({color="currentColor",size=24,strokeWidth=2,absoluteStrokeWidth,className="",children,iconNode,...rest},ref)=>(0,react.createElement)("svg",{ref,...defaultAttributes,width:size,height:size,stroke:color,strokeWidth:absoluteStrokeWidth?24*Number(strokeWidth)/Number(size):strokeWidth,className:mergeClasses("lucide",className),...rest},[...iconNode.map((([tag,attrs])=>(0,react.createElement)(tag,attrs))),...Array.isArray(children)?children:[children]]))),createLucideIcon=(iconName,iconNode)=>{const Component=(0,react.forwardRef)((({className,...props},ref)=>{return(0,react.createElement)(Icon,{ref,iconNode,className:mergeClasses(`lucide-${string=iconName,string.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,className),...props});var string}));return Component.displayName=`${iconName}`,Component}},"./node_modules/lucide-react/dist/esm/icons/chevron-right.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ChevronRight});const ChevronRight=(0,__webpack_require__("./node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},"./stories/Pagination/pagination.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ComprehensiveCustomization:()=>ComprehensiveCustomization,CustomNavigationButtons:()=>CustomNavigationButtons,CustomPageInfo:()=>CustomPageInfo,CustomPageSizeSelector:()=>CustomPageSizeSelector,CustomStyling:()=>CustomStyling,Default:()=>Default,LastPage:()=>LastPage,MiddlePage:()=>MiddlePage,NoFirstLastButtons:()=>NoFirstLastButtons,NoPageInfo:()=>NoPageInfo,NoPageSizeSelector:()=>NoPageSizeSelector,__namedExportsOrder:()=>__namedExportsOrder,default:()=>pagination_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),ui_button=__webpack_require__("./components/ui/button.tsx"),createLucideIcon=__webpack_require__("./node_modules/lucide-react/dist/esm/createLucideIcon.js");const ChevronsLeft=(0,createLucideIcon.A)("ChevronsLeft",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]),ChevronLeft=(0,createLucideIcon.A)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var chevron_right=__webpack_require__("./node_modules/lucide-react/dist/esm/icons/chevron-right.js");const ChevronsRight=(0,createLucideIcon.A)("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]);var pagination=__webpack_require__("./components/data-grid/pagination.tsx"),console=__webpack_require__("./node_modules/console-browserify/index.js");const pagination_stories={title:"Data Grid/Pagination",component:pagination.d,parameters:{layout:"centered"},tags:["autodocs"]},Default={args:{pageIndex:0,pageCount:10,pageSize:10,setPageIndex:index=>{console.log(`Set page index to ${index}`)},setPageSize:size=>{console.log(`Set page size to ${size}`)},pageSizeOptions:[5,10,20,50,100],processedDataLength:95}},MiddlePage={args:{...Default.args,pageIndex:4}},LastPage={args:{...Default.args,pageIndex:9}},NoFirstLastButtons={args:{...Default.args,showFirstLastButtons:!1}},CustomPageInfo={args:{...Default.args,renderPageInfo:({start,end,total})=>(0,jsx_runtime.jsxs)("div",{className:"bg-blue-50 text-blue-800 px-2 py-1 rounded-md text-sm",children:["Showing ",(0,jsx_runtime.jsx)("strong",{children:start})," to ",(0,jsx_runtime.jsx)("strong",{children:end})," of"," ",(0,jsx_runtime.jsx)("strong",{children:total})," entries"]})}},CustomPageSizeSelector={args:{...Default.args,renderPageSizeSelector:({pageSize,options,onChange})=>(0,jsx_runtime.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,jsx_runtime.jsx)("span",{className:"text-sm font-medium",children:"Show:"}),(0,jsx_runtime.jsx)("div",{className:"flex border rounded overflow-hidden",children:options.map((size=>(0,jsx_runtime.jsx)("button",{className:"px-2 py-1 text-sm "+(pageSize===size?"bg-primary text-white":"hover:bg-gray-100"),onClick:()=>onChange(size),children:size},size)))})]})}},CustomNavigationButtons={args:{...Default.args,renderFirstPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)(ui_button.$,{variant:"outline",size:"sm",onClick,disabled,className:"mr-1",children:(0,jsx_runtime.jsx)(ChevronsLeft,{className:"h-4 w-4"})}),renderPrevPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)(ui_button.$,{variant:"outline",size:"sm",onClick,disabled,children:(0,jsx_runtime.jsx)(ChevronLeft,{className:"h-4 w-4"})}),renderNextPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)(ui_button.$,{variant:"outline",size:"sm",onClick,disabled,children:(0,jsx_runtime.jsx)(chevron_right.A,{className:"h-4 w-4"})}),renderLastPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)(ui_button.$,{variant:"outline",size:"sm",onClick,disabled,className:"ml-1",children:(0,jsx_runtime.jsx)(ChevronsRight,{className:"h-4 w-4"})})}},NoPageSizeSelector={args:{...Default.args,showPageSizeSelector:!1}},NoPageInfo={args:{...Default.args,showPageInfo:!1}},CustomStyling={args:{...Default.args,className:"bg-gray-50 p-4 rounded-lg shadow",pageSizeClassName:"border-r pr-4",pageInfoClassName:"font-mono text-xs",buttonsClassName:"space-x-2",buttonClassName:"bg-white shadow-sm"}},ComprehensiveCustomization={args:{...Default.args,className:"bg-blue-50 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3",renderPageSizeSelector:({pageSize,options,onChange})=>(0,jsx_runtime.jsxs)("div",{className:"flex flex-col items-center sm:items-start",children:[(0,jsx_runtime.jsx)("span",{className:"text-xs text-blue-800 mb-1",children:"Rows per page"}),(0,jsx_runtime.jsx)("select",{value:pageSize,onChange:e=>onChange(Number(e.target.value)),className:"bg-white border border-blue-200 rounded px-2 py-1 text-sm",children:options.map((option=>(0,jsx_runtime.jsxs)("option",{value:option,children:[option," rows"]},option)))})]}),renderPageInfo:({start,end,total})=>(0,jsx_runtime.jsx)("div",{className:"px-3 py-1 bg-white shadow-sm rounded text-sm text-center",children:(0,jsx_runtime.jsxs)("span",{className:"text-blue-800",children:[start,"-",end," of ",total]})}),renderFirstPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)("button",{onClick,disabled,className:"p-2 rounded-l-md "+(disabled?"bg-gray-100 text-gray-400":"bg-white text-blue-800 hover:bg-blue-50"),children:(0,jsx_runtime.jsx)(ChevronsLeft,{className:"h-3 w-3"})}),renderPrevPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)("button",{onClick,disabled,className:"p-2 border-l "+(disabled?"bg-gray-100 text-gray-400":"bg-white text-blue-800 hover:bg-blue-50"),children:(0,jsx_runtime.jsx)(ChevronLeft,{className:"h-3 w-3"})}),renderNextPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)("button",{onClick,disabled,className:"p-2 border-l "+(disabled?"bg-gray-100 text-gray-400":"bg-white text-blue-800 hover:bg-blue-50"),children:(0,jsx_runtime.jsx)(chevron_right.A,{className:"h-3 w-3"})}),renderLastPageButton:({onClick,disabled})=>(0,jsx_runtime.jsx)("button",{onClick,disabled,className:"p-2 border-l rounded-r-md "+(disabled?"bg-gray-100 text-gray-400":"bg-white text-blue-800 hover:bg-blue-50"),children:(0,jsx_runtime.jsx)(ChevronsRight,{className:"h-3 w-3"})}),buttonsClassName:"flex overflow-hidden border rounded-md shadow-sm"}},__namedExportsOrder=["Default","MiddlePage","LastPage","NoFirstLastButtons","CustomPageInfo","CustomPageSizeSelector","CustomNavigationButtons","NoPageSizeSelector","NoPageInfo","CustomStyling","ComprehensiveCustomization"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    pageIndex: 0,\n    pageCount: 10,\n    pageSize: 10,\n    setPageIndex: index => {\n      console.log(`Set page index to ${index}`);\n    },\n    setPageSize: size => {\n      console.log(`Set page size to ${size}`);\n    },\n    pageSizeOptions: [5, 10, 20, 50, 100],\n    processedDataLength: 95\n  }\n}",...Default.parameters?.docs?.source}}},MiddlePage.parameters={...MiddlePage.parameters,docs:{...MiddlePage.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    pageIndex: 4\n  }\n}",...MiddlePage.parameters?.docs?.source}}},LastPage.parameters={...LastPage.parameters,docs:{...LastPage.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    pageIndex: 9\n  }\n}",...LastPage.parameters?.docs?.source}}},NoFirstLastButtons.parameters={...NoFirstLastButtons.parameters,docs:{...NoFirstLastButtons.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    showFirstLastButtons: false\n  }\n}",...NoFirstLastButtons.parameters?.docs?.source}}},CustomPageInfo.parameters={...CustomPageInfo.parameters,docs:{...CustomPageInfo.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    renderPageInfo: ({\n      start,\n      end,\n      total\n    }) => <div className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md text-sm">\n        Showing <strong>{start}</strong> to <strong>{end}</strong> of{" "}\n        <strong>{total}</strong> entries\n      </div>\n  }\n}',...CustomPageInfo.parameters?.docs?.source}}},CustomPageSizeSelector.parameters={...CustomPageSizeSelector.parameters,docs:{...CustomPageSizeSelector.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    renderPageSizeSelector: ({\n      pageSize,\n      options,\n      onChange\n    }) => <div className="flex items-center space-x-2">\n        <span className="text-sm font-medium">Show:</span>\n        <div className="flex border rounded overflow-hidden">\n          {options.map(size => <button key={size} className={`px-2 py-1 text-sm ${pageSize === size ? "bg-primary text-white" : "hover:bg-gray-100"}`} onClick={() => onChange(size)}>\n              {size}\n            </button>)}\n        </div>\n      </div>\n  }\n}',...CustomPageSizeSelector.parameters?.docs?.source}}},CustomNavigationButtons.parameters={...CustomNavigationButtons.parameters,docs:{...CustomNavigationButtons.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    renderFirstPageButton: ({\n      onClick,\n      disabled\n    }) => <Button variant="outline" size="sm" onClick={onClick} disabled={disabled} className="mr-1">\n        <ChevronsLeft className="h-4 w-4" />\n      </Button>,\n    renderPrevPageButton: ({\n      onClick,\n      disabled\n    }) => <Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>\n        <ChevronLeft className="h-4 w-4" />\n      </Button>,\n    renderNextPageButton: ({\n      onClick,\n      disabled\n    }) => <Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>\n        <ChevronRight className="h-4 w-4" />\n      </Button>,\n    renderLastPageButton: ({\n      onClick,\n      disabled\n    }) => <Button variant="outline" size="sm" onClick={onClick} disabled={disabled} className="ml-1">\n        <ChevronsRight className="h-4 w-4" />\n      </Button>\n  }\n}',...CustomNavigationButtons.parameters?.docs?.source}}},NoPageSizeSelector.parameters={...NoPageSizeSelector.parameters,docs:{...NoPageSizeSelector.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    showPageSizeSelector: false\n  }\n}",...NoPageSizeSelector.parameters?.docs?.source}}},NoPageInfo.parameters={...NoPageInfo.parameters,docs:{...NoPageInfo.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    showPageInfo: false\n  }\n}",...NoPageInfo.parameters?.docs?.source}}},CustomStyling.parameters={...CustomStyling.parameters,docs:{...CustomStyling.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    className: "bg-gray-50 p-4 rounded-lg shadow",\n    pageSizeClassName: "border-r pr-4",\n    pageInfoClassName: "font-mono text-xs",\n    buttonsClassName: "space-x-2",\n    buttonClassName: "bg-white shadow-sm"\n  }\n}',...CustomStyling.parameters?.docs?.source}}},ComprehensiveCustomization.parameters={...ComprehensiveCustomization.parameters,docs:{...ComprehensiveCustomization.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    className: "bg-blue-50 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3",\n    renderPageSizeSelector: ({\n      pageSize,\n      options,\n      onChange\n    }) => <div className="flex flex-col items-center sm:items-start">\n        <span className="text-xs text-blue-800 mb-1">Rows per page</span>\n        <select value={pageSize} onChange={e => onChange(Number(e.target.value))} className="bg-white border border-blue-200 rounded px-2 py-1 text-sm">\n          {options.map(option => <option key={option} value={option}>\n              {option} rows\n            </option>)}\n        </select>\n      </div>,\n    renderPageInfo: ({\n      start,\n      end,\n      total\n    }) => <div className="px-3 py-1 bg-white shadow-sm rounded text-sm text-center">\n        <span className="text-blue-800">\n          {start}-{end} of {total}\n        </span>\n      </div>,\n    renderFirstPageButton: ({\n      onClick,\n      disabled\n    }) => <button onClick={onClick} disabled={disabled} className={`p-2 rounded-l-md ${disabled ? "bg-gray-100 text-gray-400" : "bg-white text-blue-800 hover:bg-blue-50"}`}>\n        <ChevronsLeft className="h-3 w-3" />\n      </button>,\n    renderPrevPageButton: ({\n      onClick,\n      disabled\n    }) => <button onClick={onClick} disabled={disabled} className={`p-2 border-l ${disabled ? "bg-gray-100 text-gray-400" : "bg-white text-blue-800 hover:bg-blue-50"}`}>\n        <ChevronLeft className="h-3 w-3" />\n      </button>,\n    renderNextPageButton: ({\n      onClick,\n      disabled\n    }) => <button onClick={onClick} disabled={disabled} className={`p-2 border-l ${disabled ? "bg-gray-100 text-gray-400" : "bg-white text-blue-800 hover:bg-blue-50"}`}>\n        <ChevronRight className="h-3 w-3" />\n      </button>,\n    renderLastPageButton: ({\n      onClick,\n      disabled\n    }) => <button onClick={onClick} disabled={disabled} className={`p-2 border-l rounded-r-md ${disabled ? "bg-gray-100 text-gray-400" : "bg-white text-blue-800 hover:bg-blue-50"}`}>\n        <ChevronsRight className="h-3 w-3" />\n      </button>,\n    buttonsClassName: "flex overflow-hidden border rounded-md shadow-sm"\n  }\n}',...ComprehensiveCustomization.parameters?.docs?.source}}}}}]);