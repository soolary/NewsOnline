(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f28185b0"],{"01ac":function(t,e,n){"use strict";var o=n("fed2"),a=n.n(o);a.a},"0c12":function(t,e,n){"use strict";var o=n("2b0e");e["a"]=new o["default"]},"162e":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",{staticClass:"layout-container"},[n("el-aside",{staticClass:"aside",attrs:{width:t.isCollapse?"64px":"200px"}},[n("div",{staticClass:"logo",class:{minLogo:t.isCollapse}}),n("el-menu",{staticClass:"nav-menu",attrs:{router:"","default-active":t.$route.path,"background-color":"#002033","text-color":"#fff","active-text-color":"#ffd04b",collapse:t.isCollapse,"collapse-transition":!1}},t._l(t.routes,(function(e,o){return n("el-menu-item",{directives:[{name:"show",rawName:"v-show",value:"编辑文章"!==e.meta.title,expression:"item.meta.title !== '编辑文章'"}],key:o,attrs:{index:e.path}},[n("i",{class:e.meta.icon}),n("span",[t._v(t._s(e.meta.title))])])})),1)],1),n("el-container",[n("el-header",{staticClass:"header"},[n("div",[n("i",{class:t.isCollapse?"el-icon-s-unfold":"el-icon-s-fold",on:{click:function(e){t.isCollapse=!t.isCollapse}}}),n("span",[t._v("深圳葫芦娃救爷爷发展有限公司")])]),n("el-dropdown",[n("div",{staticClass:"avatar-wrap"},[n("img",{staticClass:"avatar",attrs:{src:t.user.photo,alt:""}}),n("span",[t._v(t._s(t.user.name))]),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(e){return t.$router.push("/settings")}}},[t._v("设置")]),n("el-dropdown-item",{nativeOn:{click:function(e){return t.hQuit(e)}}},[t._v("退出")])],1)],1)],1),n("el-main",{staticClass:"main"},[n("router-view")],1)],1)],1)},a=[],s=(n("b0c0"),n("c24f")),i=n("5d2d"),r=n("0c12"),c={name:"Layout",data:function(){return{user:{},isCollapse:!1}},created:function(){var t=this;this.setUserProfile();var e=Object(i["b"])(),n=e.name,o=e.photo;this.user={name:n,photo:o},r["a"].$on("updateUserName",(function(e){t.user.name=e})),r["a"].$on("updateUserPhoto",(function(e){t.user.photo=e}))},computed:{routes:function(){return this.$router.options.routes[1].children}},methods:{setUserProfile:function(){var t=this;Object(s["a"])().then((function(e){console.log(e),t.user=e.data.data})).catch((function(t){console.dir(t)}))},hQuit:function(){var t=this;this.$confirm("就走啦?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["a"])(),t.$router.push("/login")})).catch((function(){}))}}},l=c,u=(n("01ac"),n("2877")),d=Object(u["a"])(l,o,a,!1,null,"7558d231",null);e["default"]=d.exports},c24f:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return s}));var o=n("b775"),a=function(t,e){var n=Object(o["a"])({method:"POST",url:"/mp/v1_0/authorizations",data:{mobile:t,code:e}});return n},s=function(){return Object(o["a"])({method:"GET",url:"/mp/v1_0/user/profile"})}},fed2:function(t,e,n){}}]);
//# sourceMappingURL=chunk-f28185b0.1d476398.js.map