require.config({
    baseUrl:"/",
    paths:{
        jquery:"lib/jquery/jquery-1.12.4.min",
        arttemplate:"/lib/artTemplate/template-web",
        load:"/js/loadHeaderAndFooter",
        fly:"/js/fly",
        cookie:"/lib/jquery-plugins/jquery.cookie"
    },
    shim:{
        fly : {
			deps : ["jquery"]
		},
        cookie : {
            deps : ["jquery"]
        }
    }
});
