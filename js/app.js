
(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true), 
            new Route('catalogo', 'catalogo.html'),
            new Route('about', 'about.html')
        ]);
    }
    init();
}());
