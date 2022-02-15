(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{587:function(t,e,n){"use strict";n.r(e);var r={props:{makeLogin:{type:Boolean,default:!1},title:{type:String,default:""}},data:function(){return{value:String,step:1,valid:!1,email:"",password:"",emailRules:[function(t){return!!t||"E-Mail ist erforderlich"},function(t){return/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(t)||"E-Mail muss gültig sein"}],loading:!1,showConfirmation:!1,requestPassword:!1,showRegister:!1,buttonText:"Registrieren",error:{status:!1,message:""}}},mounted:function(){var t=window.localStorage.getItem("emailForSignIn");t&&(this.email=t,this.showConfirmation=!0)},methods:{next:function(){var t=this;this.$refs.form.validate()&&(this.showConfirmation=!1,this.$nuxt.$fire.auth.fetchSignInMethodsForEmail(this.email).then((function(e){e.length>1?t.requestPassword=!0:t.requestPassword=!1,t.step=2})))},login:function(){var t=this;this.loading=!0,this.$store.dispatch("modules/user/login",{email:this.email,password:this.password}).then((function(e){t.loading=!1})).catch((function(e){t.loading=!1,t.error.status=!0,t.error.message=e.message}))},register:function(){var t=this;this.step=3,this.loading=!0,this.$fire.auth.sendSignInLinkToEmail(this.email,{url:this.$config.baseUrl+"/registration/confirm-register-link",handleCodeInApp:!0}).then((function(){t.buttonText="Gesendet",t.valid=!1,t.loading=!1,t.showConfirmation=!0,window.localStorage.setItem("emailForSignIn",t.email)}))}}},o=n(73),l=n(74),c=n.n(l),d=n(529),v=n(208),m=n(508),h=n(521),_=n(537),f=n(194),w=n(198),C=n(131),x=n(103),E=n(112),k=n(510),y=n(59),S=n(533),I=n(534),R=n(516),V=n(564),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"ma-0"},[n("v-col",{staticClass:"pa-0",attrs:{cols:"12",md:"6",height:"100%"}},[n("v-sheet",{attrs:{color:"secondary",dark:"",height:"100%"}},[n("v-container",{staticClass:"ma-auto py-16",staticStyle:{"max-width":"450px"}},[n("h3",{staticClass:"h2--text white--text text-uppercase pb-8"},[t._v("\n          NACH DER REGISTRIERUNG WERDEN"),n("br"),t._v("ALLE ANGEBOTE VON SICHERE"),n("br"),t._v("ZUFLUCHT\n          FREIGESCHALTET.\n        ")]),t._v(" "),n("v-list",{attrs:{dense:"",color:"transparent"}},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",{staticClass:"pt-2"},[t._v("mdi-face-woman")])],1),t._v(" "),n("v-list-item-content",[n("p",{staticClass:"font-weight-bold"},[t._v("ANGEBOTE FÜR FRAUEN")]),t._v(" "),n("p",[t._v("Online-Beratungen buchen")]),t._v(" "),n("p",{staticClass:"pt-8 font-weight-bold"},[t._v("oder")])])],1),t._v(" "),n("v-list-item",[n("v-list-item-icon",[n("v-icon",{staticClass:"pt-2",attrs:{color:"white"}},[t._v("mdi-forum")])],1),t._v(" "),n("v-list-item-content",[n("p",{staticClass:"font-weight-bold"},[t._v("ANGEBOTE FÜR BERATER*INNEN")]),t._v(" "),n("p",[t._v("\n                die eigene Beratungsleistung anbieten, um Frauen zu helfen\n              ")])])],1)],1)],1)],1)],1),n("v-col",{staticClass:"pa-0",attrs:{cols:"12",md:"6"}},[n("v-container",{staticClass:"ma-auto py-16",staticStyle:{"max-width":"450px"}},[n("h1",{staticClass:"text-h1 my-4 primary--text"},[t._v(t._s(t.title))]),t._v(" "),n("v-form",{ref:"form",staticClass:"mb-4",staticStyle:{width:"100%"},on:{submit:function(t){t.preventDefault()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-stepper",{staticStyle:{"box-shadow":"none"},attrs:{flat:!0},model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[n("v-stepper-items",[n("v-stepper-content",{staticClass:"pa-0",attrs:{step:"1"}},[n("v-text-field",{attrs:{type:"email",rules:t.emailRules,label:"Deine E-mail-Adresse",required:"","persistent-hint":"",hint:t.makeLogin?"":"Per E-Mail senden wir eine Benachrichtigung, sobald eine Anfrage vorliegt. Zudem kann per E-Mail das Passwort zurückgesetzt werden."},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),n("div",{staticClass:"d-flex justify-end pt-6"},[n("v-btn",{attrs:{color:"primary",loading:t.loading,disabled:!t.valid},on:{click:t.next}},[t._v("Weiter >")])],1),t._v(" "),t.makeLogin?t._e():n("p",{staticClass:"caption mt-4"},[t._v("\n                Wir senden im nächsten Schritt eine E-Mail an die o.g.\n                Adresse, um sie zu bestätigen."),n("br"),n("b",[t._v("Bitte auch im Spam-Ordner nachsehen.")])])],1),t._v(" "),n("v-stepper-content",{staticClass:"pa-0",attrs:{step:"2"}},[t.requestPassword?n("div",[t.makeLogin?t._e():n("v-alert",{staticClass:"my-4",attrs:{type:"info",color:"secondary"}},[t._v("\n                  Es existiert bereits ein Konto mit der E-Mail-Adresse\n                  "),n("b",[t._v(t._s(t.email))]),t._v('. Logge dich ein oder klicke "Passwort vergessen", solltest\n                  du dein Passwort vergessen haben.\n                ')]),t._v(" "),n("v-text-field",{attrs:{label:"Passwort",type:t.value?"password":"text","append-icon":t.value?"mdi-eye":"mdi-eye-off",required:""},on:{"click:append":function(){return t.value=!t.value}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("div",{staticClass:"d-flex justify-end"},[n("v-btn",{attrs:{text:"",to:"/registration/reset-password",color:"grey"}},[t._v("Passwort vergessen")]),n("v-btn",{staticClass:"inline",attrs:{color:"success",loading:t.loading,disabled:!t.valid,nuxt:""},on:{click:t.login}},[t._v("Einloggen")])],1)],1):n("div",[t.makeLogin?n("div",[n("v-alert",{staticClass:"my-4",attrs:{type:"info",color:"secondary"}},[t._v("\n                    Es existiert kein Konto mit der E-Mail-Adresse\n                    "+t._s(t.email)+". Willst du dich mit der E-Mail\n                    "),n("b",[t._v(t._s(t.email))]),t._v(" bei Sichere Zuflucht registrieren?\n                  ")]),t._v(" "),n("div",{staticClass:"d-flex justify-end"},[n("v-btn",{staticClass:"inline",attrs:{text:""},on:{click:function(e){t.step=1}}},[t._v("\n                      Zurück\n                    ")]),t._v(" "),n("v-btn",{attrs:{color:"success",loading:t.loading,disabled:!t.valid},on:{click:t.register}},[t._v(t._s(t.buttonText))])],1)],1):t._e(),t._v("\n                "+t._s(t.makeLogin||2!==t.step?null:t.register())+"\n              ")])]),t._v(" "),n("v-stepper-content",{staticClass:"pa-0",attrs:{step:"3"}},[n("h2",{staticClass:"text-h1 primary--text mb-4"},[t._v("\n                Danke für deine Anmeldung!\n              ")]),t._v(" "),n("h3",{staticClass:"text-h2 secondary--text mb-8"},[t._v("\n                Wir haben dir eine Bestätigungsmail gesendet.\n              ")]),t._v(" "),n("p",[n("b",[t._v(t._s(t.email))])]),t._v(" "),n("p",{staticClass:"caption"},[t._v("\n                Bitte schau in dein Mail-Postfach. Kontrolliere ggf. auch den\n                Spam Ordner.\n              ")]),t._v(" "),n("p",{staticClass:"caption"},[t._v("\n                Sollte nichts angekommen sein, kannst du dir die E-mail noch\n                einmal zusenden lassen.\n              ")]),t._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{color:"primary",loading:t.loading},on:{click:t.register}},[t._v("Erneut senden")])],1)],1)],1),t._v(" "),t.error.status?n("v-alert",{staticClass:"white--text mt-4",attrs:{color:"error"}},[t._v(t._s(t.error.message))]):t._e()],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VAlert:d.a,VBtn:v.a,VCol:m.a,VContainer:h.a,VForm:_.a,VIcon:f.a,VList:w.a,VListItem:C.a,VListItemContent:x.a,VListItemIcon:E.a,VRow:k.a,VSheet:y.a,VStepper:S.a,VStepperContent:I.a,VStepperItems:R.b,VTextField:V.a})}}]);
//# sourceMappingURL=67ab652.js.map