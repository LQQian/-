
// 模块实例
var Yike = angular.module('Yike', ['ngRoute']);

// 配置路由
Yike.config(['$routeProvider', function ($routeProvider) {
    // 今日一刻
    $routeProvider.when('/today', {
        templateUrl: './views/today.html',
        controller: 'TodayCtrl'
    // 往期内容
    }).when('/older', {
        templateUrl: './views/older.html',
        controller: 'OlderCtrl'
    // 热门作者
    }).when('/author', {
        templateUrl: './views/author.html'
    // 栏目浏览
    }).when('/category', {
        templateUrl: './views/category.html'
    // 我的喜欢
    }).when('/favourite', {
        templateUrl: './views/favourite.html'
    // 设置
    }).when('/settings', {
        templateUrl: './views/settings.html'
    // 默认路由
    }).otherwise({
        redirectTo: '/today'
    });
}])

// 运行模块
Yike.run(['$rootScope', function ($rootScope) {

    // 收起
    $rootScope.collapsed = false;

    // 加载未完成
    $rootScope.loaded = false;

    // 标题
    $rootScope.title = '今日一刻';

    // 导航索引
    $rootScope.key = 0;

    $rootScope.toggle = function () {
        $rootScope.collapsed = !$rootScope.collapsed;

        // 所有导航
        var navs = document.querySelectorAll('.navs dd');

        if($rootScope.collapsed) {
            console.log(1);
            // -100%  ->   0

            for(var i=0; i<navs.length; i++) {
                navs[i].style.transform = 'translate(0)';
                navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
                navs[i].style.transitionDelay = '0.2s';
            }
        } else {
            console.log(2);
            // 0  ->  -100%

            for(var i=navs.length - 1; i>=0; i--) {
                // i   navs.length - i
                // 5       1 
                // 4       2
                // 3       3
                // 2       4
                // 1       5
                // 0       6
                navs[i].style.transform = 'translate(-100%)';
                navs[i].style.transitionDuration = (navs.length - i) * 0.15 + 's';
                navs[i].style.transitionDelay = '';
            }
        }
    }
}]);

// 导航控制器
Yike.controller('NavsCtrl', ['$scope', function ($scope) {
    // 导航数据
    $scope.navs = [
        {text: '今日一刻', link: '#!/today', icon: 'icon-home'},
        {text: '往期内容', link: '#!/older', icon: 'icon-file-empty'},
        {text: '热门作者', link: '#!/author', icon: 'icon-pencil'},
        {text: '栏目浏览', link: '#!/category', icon: 'icon-menu'},
        {text: '我的喜欢', link: '#!/favourite', icon: 'icon-heart'},
        {text: '设置', link: '#!/settings', icon: 'icon-cog'}
    ];
}]);

// 今日一刻
Yike.controller('TodayCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    // 加载状态
    $rootScope.loaded = false;
    // 标题
    $rootScope.title = '今日一刻';
    // 导航索引
    $rootScope.key = 0;

    $http({
        // 访问同域接口，由同域接口代理访问数据
        url: './api/today.php',
        method: 'get'
    }).then(function (res) {
        // console.log(res.data);
        // 将请求得来的数据赋值给$scope
        $scope.posts = res.data.posts;
        $scope.date = res.data.date;

        // 加载完成
        $rootScope.loaded = true;
    });
}]);

// 往期内容
Yike.controller('OlderCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    // 加载状态
    $rootScope.loaded = false;
    // 标题
    $rootScope.title = '往期内容';
    // 导航索引
    $rootScope.key = 1;

    $http({
        url: './api/older.php',
        method: 'get',
        params: {day: -2}
    }).then(function (res) {
        // console.log(res.data);
        // 将请求得来的数据赋值给$scope
        $scope.posts = res.data.posts;
        $scope.date = res.data.date;

        // 加载完成
        $rootScope.loaded = true;
    })
}])