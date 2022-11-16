function Router(rotas) {
    try {
        if (!rotas) {
            throw 'erro: rota invalida';
        }
        this.constructor(rotas);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    rotas: undefined,
    rootElem: undefined,
    constructor: function (rotas) {
        this.rotas = rotas;
        this.rootElem = document.body;
    },
    init: function () {
        var r = this.rotas;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var rota = r[i];
                if(rota.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(rota.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var rota = r[i];
                if(rota.default) {
                    scope.goToRoute(rota.htmlName);
                }
            }
        }
    },
    goToRoute: function (caminho) {
        (function(scope) { 
            var url = 'views/' + caminho,xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};