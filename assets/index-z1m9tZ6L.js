import{_ as O,o as h,c as $,d as z,r as _,h as N,i as T,w as s,b as l,u as t,f as R,j as G,E as B,k as J,g as K,t as L,e as Q,l as y,m as W}from"./index-gIN7r15f.js";import{E as X,u as U,a as Y,b as Z,c as ee,d as te}from"./role-t4SVgVVe.js";import{E as le,a as ae}from"./el-form-item-DJ4YyFsw.js";const ne={};function oe(r,i){return h(),$("div",null,"111")}const se=O(ne,[["render",oe]]),ue=z({__name:"editorRole",props:{data:{type:Object,default:()=>({})},type:{type:Number,required:!0}},emits:["submit"],setup(r,{emit:i}){const e=_({name:"",description:"",isDefault:0}),d={name:"",description:"",isDefault:0},u=()=>{e.value={...d,...r.data}};N(()=>{r.data&&u()});const f=i,v=()=>{f("submit",e.value)},b=()=>{u()};return(g,n)=>{const C=G,c=le,E=X,V=B,a=ae;return h(),T(a,{model:t(e),"label-width":"auto",style:{"max-width":"600px"}},{default:s(()=>[l(c,{label:"角色名称"},{default:s(()=>[l(C,{modelValue:t(e).name,"onUpdate:modelValue":n[0]||(n[0]=m=>t(e).name=m)},null,8,["modelValue"])]),_:1}),l(c,{label:"描述"},{default:s(()=>[l(C,{modelValue:t(e).description,"onUpdate:modelValue":n[1]||(n[1]=m=>t(e).description=m)},null,8,["modelValue"])]),_:1}),l(c,{label:"是否是默认角色 "},{default:s(()=>[l(E,{modelValue:t(e).isDefault,"onUpdate:modelValue":n[2]||(n[2]=m=>t(e).isDefault=m),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1}),l(c,null,{default:s(()=>[l(V,{type:"primary",onClick:v},{default:s(()=>n[3]||(n[3]=[R("提交")])),_:1}),l(V,{onClick:b},{default:s(()=>n[4]||(n[4]=[R("重置")])),_:1})]),_:1})]),_:1},8,["model"])}}}),ie=({pageSize:r,pageNum:i})=>{const{proxy:e}=K(),d=_(-1),u=_(!1),f=_(void 0),v=U(),b=J(()=>d.value==1?"增加角色":"修改角色"),g=a=>{d.value=0,f.value={...a},u.value=!0},n=()=>{d.value=1,f.value={},u.value=!0},C=async a=>{await v.addRole({...a,pageNum:i.value,pageSize:r.value}),e==null||e.$message.success("角色添加成功"),u.value=!1},c=async a=>{await v.updateRole({...a,pageNum:i.value,pageSize:r.value}),e==null||e.$message.success("角色编辑成功"),u.value=!1};return{handleSubmit:async a=>{d.value===1?await C(a):await c(a)},handleRemove:async a=>{try{await(e==null?void 0:e.$confirm("你确定删除"+a.name+"角色吗?",{type:"warning"})),await v.removeRole({...a,pageNum:i.value,pageSize:r.value}),e==null||e.$message.success("角色删除成功")}catch{e==null||e.$message.info("取消删除")}},handleEditRole:g,hanleAddRole:n,panelTitle:b,editType:d,visible:u,editData:f}},de={"p-30px":""},pe=z({__name:"index",setup(r){const i=_(null),e=_(!1),d=p=>{e.value=!0,i.value=p},u=U(),{total:f,roles:v}=L(u.state),b=_(1),g=_(10),{handleSubmit:n,handleRemove:C,handleEditRole:c,hanleAddRole:E,panelTitle:V,editType:a,visible:m,editData:x}=ie({pageNum:b,pageSize:g});N(()=>{u.getRoles({pageNum:b.value,pageSize:g.value})});const F=p=>{g.value=p},I=p=>{b.value=p-1},j=p=>p.isDefault?"是":"否";return(p,o)=>{const S=B,k=te,A=Y,M=Z,P=ue,q=ee,H=se;return h(),$("div",de,[o[6]||(o[6]=Q("h2",null,"角色管理",-1)),l(S,{onClick:t(E)},{default:s(()=>o[2]||(o[2]=[R("角色添加")])),_:1},8,["onClick"]),l(A,{data:t(v),style:{width:"100%"}},{default:s(()=>[l(k,{prop:"id",label:"角色id",width:"180"}),l(k,{prop:"name",label:"角色名称",width:"180"}),l(k,{prop:"description",label:"描述"}),l(k,{prop:"isDefault",label:" 默认角色",formatter:j}),l(k,{label:"操作",fixed:"right"},{default:s(w=>[l(S,{link:"",onClick:D=>d(w.row)},{default:s(()=>o[3]||(o[3]=[R("菜单权限")])),_:2},1032,["onClick"]),l(S,{link:"",onClick:D=>t(c)(w.row)},{default:s(()=>o[4]||(o[4]=[R("编辑")])),_:2},1032,["onClick"]),l(S,{link:"",onClick:D=>t(C)(w.row)},{default:s(()=>o[5]||(o[5]=[R("删除")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(M,{"page-sizes":[1,5,10,20],layout:"prev, pager, next, sizes, total",total:t(f),"page-size":t(g),onSizeChange:F,onCurrentChange:I},null,8,["total","page-size"]),l(q,{modelValue:t(m),"onUpdate:modelValue":o[0]||(o[0]=w=>y(m)?m.value=w:null),title:t(V)},{default:s(()=>[l(P,{type:t(a),data:t(x),onSubmit:t(n)},null,8,["type","data","onSubmit"])]),_:1},8,["modelValue","title"]),t(e)&&t(i)?(h(),T(H,{key:0,role:t(i),modelValue:t(e),"onUpdate:modelValue":o[1]||(o[1]=w=>y(e)?e.value=w:null)},null,8,["role","modelValue"])):W("",!0)])}}});export{pe as default};