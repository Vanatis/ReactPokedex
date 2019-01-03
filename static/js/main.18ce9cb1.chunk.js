(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},103:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(24),c=n.n(i),l=n(5),r=n(6),s=n(8),u=n(7),h=n(9),m=n(3),d=n(2),p=(n(62),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={bIsOpen:!1,childButtons:["Kanto","Johto","Hoenn","Sinnoh","Unova","Kalos"],active:0,mainButtonDiameter:64,childButtonDiameter:45,flyOutRadius:110,separationAngle:30,childButtonScaleMin:.5,childButtonScaleMax:1,springConfig:{stiffness:400,damping:28}},n.toggleMenu=n.toggleMenu.bind(Object(m.a)(Object(m.a)(n))),n.closeMenu=n.closeMenu.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return!0}},{key:"componentDidMount",value:function(){window.addEventListener("click",this.closeMenu)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("click",this.closeMenu)}},{key:"toggleMenu",value:function(e){e.stopPropagation(),this.setState({bIsOpen:!this.state.bIsOpen})}},{key:"closeMenu",value:function(){this.setState({bIsOpen:!1})}},{key:"onChildButtonClick",value:function(e,t){e.stopPropagation(),t!==this.state.active&&(this.setState({active:t}),this.props.onGenerationChange(this.state.childButtons[t]),window.scrollTo(0,0)),this.closeMenu()}},{key:"render",value:function(){var e=this,t=this.state.bIsOpen,n=t?{rotate:Object(d.spring)(0,{stiffness:500,damping:30})}:{rotate:Object(d.spring)(-360,{stiffness:500,damping:30})};return o.a.createElement("div",{className:"circular-button-border"},o.a.createElement("div",{className:"circular-button-container"},this.renderChildButtons(),o.a.createElement(d.Motion,{style:n},function(t){var n=t.rotate;return o.a.createElement("div",{className:"main-circular-button",style:{transform:"rotate(".concat(n,"deg)")},onClick:e.toggleMenu})}),t?o.a.createElement("div",{className:"fullscreen-overlay"}):null))}},{key:"renderChildButtons",value:function(){var e=this,t=this.state,n=t.childButtons,a=t.bIsOpen,i=t.active,c=t.childButtonScaleMin,l=t.childButtonScaleMax,r=n.map(function(t,n){return a?e.openChildButtonStylesInit(n):e.closedChildButtonStylesInit()}),s=Object.keys(r).map(function(e){return r[e]}),u=n.map(function(t,n){return a?e.openChildButtonStyles(n):e.closedChildButtonStyles()});return o.a.createElement(d.StaggeredMotion,{defaultStyles:s,styles:function(e){return e.map(function(t,n){if(0===n)return u[n];var o=e[n-1].scale;return(a?o>=c+.2:o<=l-.2)?u[n]:t})}},function(t){return o.a.createElement("div",null,t.map(function(t,a){var c=t.height,l=t.left,r=t.rotate,s=t.scale,u=t.top,h=t.width;return o.a.createElement("div",{className:"child-circular-button "+(i===a?"button-active":""),key:a,style:{left:l,height:c,top:u,transform:"rotate(".concat(r,"deg) scale(").concat(s,")"),width:h},onClick:function(t){e.onChildButtonClick(t,a)}},n[a])}))})}},{key:"closedChildButtonStylesInit",value:function(){var e=this.state,t=e.mainButtonDiameter,n=e.childButtonDiameter;return{width:n,height:n,top:t/2-n/2,left:-n/2,rotate:-180,scale:e.childButtonScaleMin}}},{key:"closedChildButtonStyles",value:function(){var e=this.state,t=e.mainButtonDiameter,n=e.childButtonDiameter,a=e.childButtonScaleMin,o=e.springConfig;return{width:n,height:n,top:Object(d.spring)(t/2-n/2,o),left:Object(d.spring)(-n/2,o),rotate:Object(d.spring)(-180,o),scale:Object(d.spring)(a,o)}}},{key:"openChildButtonStylesInit",value:function(e){var t=this.state,n=t.mainButtonDiameter,a=t.childButtonDiameter,o=t.childButtonScaleMax,i=this.calcOpenChildButtonOffset(e),c=i.deltaX;return{width:a,height:a,top:n/2-i.deltaY,left:c,rotate:0,scale:o}}},{key:"openChildButtonStyles",value:function(e){var t=this.state,n=t.mainButtonDiameter,a=t.childButtonDiameter,o=t.childButtonScaleMax,i=t.springConfig,c=this.calcOpenChildButtonOffset(e),l=c.deltaX,r=c.deltaY;return{width:a,height:a,top:Object(d.spring)(n/2-r,i),left:Object(d.spring)(l,i),rotate:Object(d.spring)(0,i),scale:Object(d.spring)(o,i)}}},{key:"calcOpenChildButtonOffset",value:function(e){var t=this.state,n=t.childButtons,a=t.childButtonDiameter,o=t.separationAngle,i=t.flyOutRadius,c=(180-(n.length-1)*o)/2+e*o;return{deltaX:i*Math.cos(this.toRadians(180-c))-a/2,deltaY:i*Math.sin(this.toRadians(180-c))+a/2}}},{key:"toRadians",value:function(e){return e*(Math.PI/180)}}]),t}(a.Component)),f=n(38),v=n(13),g=n.n(v),k=n(39),b=n(17),E=n.n(b),y=(n(93),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).processEvolutionChain=function(e,t){if(null!==t&&0!==t.length){e.push(t);for(var a=0;a<t.length;++a){var o=t[a];o.evolves_to&&n.processEvolutionChain(e,o.evolves_to)}}},n.fixNameException=function(e){return"magikarp"},n.state={bShowData:!1,pokemonData:null,pokemonSpecies:null,pokemonEvolutionChain:null,bPokemonDataPending:!1,bIsLoaded:!1},n.handleClick=n.handleClick.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"handleClick",value:function(){var e=this;if(!this.state.bPokemonDataPending&&null===this.state.pokemonData){this.setState({bPokemonDataPending:!0});var t=new E.a;t.getPokemonByName(this.props.pokemon).then(function(n){e.setState({pokemonData:n}),t.getPokemonSpeciesByName(e.props.pokemon).then(function(n){e.setState({pokemonSpecies:n}),t.resource(n.evolution_chain.url).then(function(t){var n=[];n.push([t.chain]);var a=t.chain.evolves_to;e.processEvolutionChain(n,a),e.setState({pokemonEvolutionChain:n}),e.setState({bPokemonDataPending:!1})}).catch(function(e){console.log("There was an ERROR:",e)})}).catch(function(e){console.log("There was an ERROR:",e)})}).catch(function(e){console.log("There was an ERROR:",e)})}this.setState(function(e){return{bShowData:!e.bShowData}})}},{key:"render",value:function(){var e=this,t=this.props.pokemon;t=this.fixNameException(t);var n,a=this.state,i=a.pokemonData,c=a.pokemonSpecies,l=a.pokemonEvolutionChain,r=a.bShowData,s=[];if(null!==c&&(s=c.flavor_text_entries.filter(function(e){return"en"===e.language.name})),this.state.bPokemonDataPending||null===i||null===c||null===l)n=o.a.createElement("div",{className:"pokemon-single-body"},o.a.createElement("p",{className:"flavor-text"},o.a.createElement(k.a,{icon:"spinner",pulse:!0})," Loading Data"));else{var u=Math.floor(100/l.length);n=o.a.createElement("div",{className:"pokemon-single-body"},o.a.createElement("div",{className:"w-100"},o.a.createElement("p",null,"#",i.id),o.a.createElement("p",null,"Height: ",i.height," ",o.a.createElement("br",null),"Weight: ",i.weight)),o.a.createElement("div",{className:"w-100"},o.a.createElement("p",null,s[0].flavor_text)),o.a.createElement("div",{className:"evolution-chain-container"},o.a.createElement("div",{className:"evolution-chain-title"},o.a.createElement("p",null,"Evolution Chain")),l.map(function(t,n){return o.a.createElement("div",{className:"w-".concat(u," evolution-stage-container"),key:"".concat(n,"-").concat(i.id)},o.a.createElement("div",{className:"evolution-stage-text w-100"},o.a.createElement("p",null,"Stage ",n+1)),t.map(function(t,a){var c=e.fixNameException(t.species.name);return o.a.createElement(g.a,{key:"".concat(n,"-").concat(a,"-").concat(i.id)},o.a.createElement("img",{className:"sprite evolution-stage-img",alt:"".concat(t.species.name),src:"http://pokestadium.com/sprites/xy/".concat(c,".gif")}))}))})),o.a.createElement("div",{className:"pokemon-front-back-container"},o.a.createElement("p",{className:"w-100"},"Front - Back"),o.a.createElement(g.a,{className:"pokemon-front-back-lazyload"},o.a.createElement("img",{alt:"".concat(t,"front"),src:"http://pokestadium.com/sprites/xy/".concat(t,".gif")})),o.a.createElement(g.a,{className:"pokemon-front-back-lazyload"},o.a.createElement("img",{alt:"".concat(t,"back"),src:"http://pokestadium.com/sprites/xy/back/".concat(t,".gif")}))))}var h="pokemon-single-container";return r&&(h+=" w-100"),o.a.createElement("div",{className:h,onClick:function(){return e.handleClick()}},o.a.createElement("div",{className:"pokemon-single-header"},o.a.createElement(g.a,{className:"pokemon-single-header-lazyload",debounce:!1},o.a.createElement("img",{className:"sprites",alt:this.props.pokemon,src:"http://pokestadium.com/sprites/xy/".concat(t,".gif")})),o.a.createElement("div",{className:"align-bottom"},t)),o.a.createElement(f.Collapse,{isOpened:this.state.bShowData,springConfig:d.presets.wobbly},n))}}]),t}(a.Component)),O=(n(95),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleGenChange=n.handleGenChange.bind(Object(m.a)(Object(m.a)(n))),n.state={pokemons:[],generation:"Kanto"},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"handleGenChange",value:function(e){this.setState({generation:e})}},{key:"componentDidMount",value:function(){var e=this;(new E.a).getPokemonsList().then(function(t){e.setState({pokemons:t.results})})}},{key:"shouldComponentUpdate",value:function(e,t){return!0}},{key:"render",value:function(){var e=this,t=this.state,n=t.pokemons,a=t.generation;"Kanto"===a?n=n.slice(0,151):"Johto"===a?n=n.slice(151,251):"Hoenn"===a?n=n.slice(251,386):"Sinnoh"===a?n=n.slice(386,493):"Unova"===a?n=n.slice(493,649):"Kalos"===a&&(n=n.slice(649,721));var i,c=n.filter(function(t){return t.name.toLowerCase().includes(e.props.searchfield.toLowerCase())});return i=o.a.createElement("div",null,o.a.createElement("div",{className:"pokemon-container"},c.map(function(e,t){return o.a.createElement(y,{key:e.name,id:t+1,pokemon:e.name})})),o.a.createElement(p,{onGenerationChange:this.handleGenChange})),o.a.createElement("div",null,i)}}]),t}(a.Component)),C=(n(97),function(e){e.searchfield;var t=e.searchChange;e.searchClick;return o.a.createElement("div",{className:"searchview"},o.a.createElement("div",{className:"layout-header"},o.a.createElement("h2",{className:" pa2 ma0"},"Search Pok\xe9mon"),o.a.createElement("div",{className:"pa2"},o.a.createElement("label",{htmlFor:"search",style:{display:"none"}},"Search"),o.a.createElement("input",{className:"search-input",type:"search",placeholder:"Search by name","aria-label":"Search",id:"search",onChange:t}))))}),w=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={hasError:!1},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?o.a.createElement("h1",null,"Something went wrong."):this.props.children}}]),t}(a.Component),S=(n(99),n(12)),j=n(14),B=n(40);S.b.add(j.d,j.c,j.a,j.b,B.a);var N=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).onSearchChange=function(t){e.setState({searchfield:t.target.value})},e.onSearchClick=function(e){},e.state={searchfield:""},e}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",{className:"f1 tc"},"Pok\xe9dex"),o.a.createElement(C,{searchChange:this.onSearchChange,searchClick:this.onSearchClick}),o.a.createElement(w,null,o.a.createElement(O,{searchfield:this.state.searchfield})))}}]),t}(a.Component),D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function M(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(101);c.a.render(o.a.createElement(N,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/ReactPokedex",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/ReactPokedex","/service-worker.js");D?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):M(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):M(e)})}}()},41:function(e,t,n){e.exports=n(103)},62:function(e,t,n){},71:function(e,t){},93:function(e,t,n){},95:function(e,t,n){},97:function(e,t,n){},99:function(e,t,n){}},[[41,2,1]]]);
//# sourceMappingURL=main.18ce9cb1.chunk.js.map