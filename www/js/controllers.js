'use strict';

var controllers = angular.module('firenodejs.controllers', []);

controllers.controller('firenodejs-ctrl', ['$scope', 'AlertService', 'BackgroundThread', 'firenodejs-service',
    function(scope, alerts, bg, firenodejs) {
        scope.view = {
            mainTab: "view-main"
        };
        scope.alerts = alerts;
        firenodejs.bind(scope);
        scope.viewTabClass = function(tab) {
            return tab === scope.view.mainTab ? "active" : "";
        }
        scope.viewTabContentClass = function(tab) {
            return tab === scope.view.mainTab ? "fr-navbar-active" : "";
        }
        console.log("firenodejs-ctrl loaded");
    }
]);

controllers.controller('HomeCtrl', ['$scope', 'firenodejs-service',
    function(scope, firenodejs) {
        scope.view.mainTab = "view-home";
        scope.flags = {};
        firenodejs.bind(scope);
        scope.onMore = function(key) {
            scope.flags[key] = !scope.flags[key];
        }
    }
]);
