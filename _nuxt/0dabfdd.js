(window.webpackJsonp=window.webpackJsonp||[]).push([[56,19],{521:function(t,e,r){"use strict";r(9),r(8),r(67),r(38),r(304),r(209),r(85),r(102);var n=r(1);var l,c=r(82);e.a=(l="container",n.a.extend({name:"v-".concat(l),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,e){var r=e.props,data=e.data,n=e.children;data.staticClass="".concat(l," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var o=Object.keys(c).filter((function(t){if("slot"===t)return!1;var e=c[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}));o.length&&(data.staticClass+=" ".concat(o.join(" ")))}return r.id&&(data.domProps=data.domProps||{},data.domProps.id=r.id),t(r.tag,data,n)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,n=e.props,data=e.data,l=e.children,o=data.attrs;return o&&(data.attrs={},r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,Object(c.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(r||[])}),l)}})},538:function(t,e,r){"use strict";r.r(e);var n={props:{magazineData:{type:Object,default:null},appendUrl:{type:Boolean,default:!1},changeUrl:{type:Boolean,default:!1}}},l=r(73),c=r(74),o=r.n(c),d=r(197),v=r(208),f=r(195),m=r(100),h=r(194),_=r(164),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.magazineData?r("v-card",{staticClass:"d-flex flex-column",attrs:{width:"300",height:"93%"}},[r("v-img",{staticClass:"flex-grow-0 flex-shrink-1",attrs:{height:"200",src:t.magazineData.cover.url}}),t._v(" "),r("v-card-actions",[r("v-avatar",{staticStyle:{"margin-top":"-30px"},attrs:{color:"white"}},[r("v-icon",[t._v(t._s(t.magazineData.tag.icon))])],1)],1),t._v(" "),r("v-card-text",{staticClass:"flex-column align-start pt-0 flex-grow-1 flex-shrink-0"},[r("h2",{staticClass:"text-h2 secondary--text pt-0"},[t._v(t._s(t.magazineData.title))]),t._v(" "),r("p",{staticClass:"font-weight-bold"},[t._v("\n      "+t._s(t.magazineData.subtitle)+"\n    ")]),t._v(" "),r("p",{staticClass:"caption mb-2",staticStyle:{"line-height":"1em"}},[t._v("\n      von "+t._s(t.magazineData.author)+"\n    ")])]),t._v(" "),r("v-card-actions",{staticClass:"pt-4"},[r("v-btn",{attrs:{to:(t.changeUrl?"magazine/":"")+t.magazineData.slug,append:t.appendUrl,outlined:"",color:"primary"}},[t._v("zum Eintrag")])],1)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;o()(component,{VAvatar:d.a,VBtn:v.a,VCard:f.a,VCardActions:m.a,VCardText:m.c,VIcon:h.a,VImg:_.a})},609:function(t,e,r){var content=r(669);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(22).default)("f14d6220",content,!0,{sourceMap:!1})},668:function(t,e,r){"use strict";r(609)},669:function(t,e,r){var n=r(21)(!1);n.push([t.i,".singleArticleText h1,.singleArticleText h3{color:var(--primary);text-transform:uppercase}.singleArticleText h2,.singleArticleText h4{color:var(--secondary);text-transform:uppercase}.singleArticleText h1{font-size:1.4rem}.singleArticleText h2{font-size:1.2rem}.singleArticleText h3,.singleArticleText h4,.singleArticleText h5,.singleArticleText h6{font-size:1rem}",""]),t.exports=n},699:function(t,e,r){"use strict";r.r(e);var n=r(5),l=(r(46),r(114),r(50),r(9),{data:function(){return{article:null,error:null,relatedArticles:null,slugpath:this.$route.params.slug}},computed:{cssVars:function(){return{"--primary":this.$vuetify.theme.themes.light.primary,"--secondary":this.$vuetify.theme.themes.light.secondary}}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$strapi.find("magazines",{slug:t.$route.params.slug});case 2:return r=e.sent,t.article=r[0],e.next=6,t.$strapi.find("magazines",{_limit:3});case 6:n=e.sent,t.relatedArticles=n.filter((function(e){return e.slug!==t.$route.params.slug})).slice(0,2);case 8:case"end":return e.stop()}}),e)})))()}}),c=(r(668),r(73)),o=r(74),d=r.n(o),v=r(197),f=r(508),m=r(521),h=r(497),_=r(194),y=r(164),x=r(510),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.article?r("div",[t.article.cover?r("v-img",{attrs:{src:t.article.cover.url?t.article.cover.url:null,width:"100%","max-height":"300"}}):t._e(),t._v(" "),r("v-container",{staticStyle:{"margin-top":"-45px"}},[r("v-avatar",{attrs:{color:"white"}},[r("v-icon",[t._v(t._s(t.article.tag.icon))])],1),t._v(" "),r("h1",{staticClass:"text-h1 primary--text pt-2"},[t._v(t._s(t.article.title))]),t._v(" "),r("p",{staticClass:"font-weight-bold pb-6"},[t._v(t._s(t.article.subtitle))]),t._v(" "),r("p",{staticClass:"caption"},[t._v("von "+t._s(t.article.author))]),t._v(" "),t.article.spotifylink?r("iframe",{staticClass:"pt-2",attrs:{src:"https://open.spotify.com/embed/"+t.article.spotifylink.replace("https://open.spotify.com/",""),width:"100%",frameBorder:"0",allowtransparency:"true",allow:"encrypted-media"}}):t._e(),t._v(" "),t.article.youtubelink?r("iframe",{staticClass:"pt-2",attrs:{width:"100%",src:"https://www.youtube.com/embed/"+t.article.youtubelink.replace("https://youtu.be/",""),title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}):t._e(),t._v(" "),t.article.youtubelink?r("a",{staticClass:"caption",attrs:{href:t.article.youtubelink,target:"_blank"}},[t._v("\n      "+t._s(t.article.youtubelink.slice(0,50))+t._s(t.article.youtubelink.length>50?"...":"")+"\n    ")]):t._e(),t._v(" "),t.article.soundcloudlink?r("iframe",{staticClass:"pt-2",attrs:{width:"100%",height:"300",scrolling:"no",frameborder:"no",allow:"autoplay",src:"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+t.article.soundcloudlink+"&color=%23f9a825&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}}):t._e(),t._v(" "),r("div",{staticClass:"singleArticleText mt-8",style:t.cssVars,domProps:{innerHTML:t._s(t.$md.render(t.article.text))}})],1),t._v(" "),r("v-divider"),t._v(" "),r("v-container",[r("h2",{staticClass:"text-h2 secondary--text mb-4 mt-12"},[t._v("Verwandte Einträge")]),t._v(" "),t.relatedArticles?r("v-row",{staticClass:"pt-8",staticStyle:{"z-index":"1"}},t._l(t.relatedArticles.filter((function(e){return e.tag.name!=t.slugpath})),(function(t){return r("v-col",{key:t.id,staticClass:"pb-4",attrs:{cols:"12",sm:"6",md:"4"}},[r("MagazineTeaserBox",{attrs:{"magazine-data":t}})],1)})),1):t._e()],1)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;d()(component,{MagazineTeaserBox:r(538).default}),d()(component,{VAvatar:v.a,VCol:f.a,VContainer:m.a,VDivider:h.a,VIcon:_.a,VImg:y.a,VRow:x.a})}}]);
//# sourceMappingURL=0dabfdd.js.map