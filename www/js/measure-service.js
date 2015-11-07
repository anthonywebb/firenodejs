'use strict';

var services = angular.module('firenodejs.services');

services.factory('measure-service', ['$http','firestep-service','images-service',
    function($http, firestep, images) {
        var available = null;
        var service = {
            processCount: 0,
            lpp: {z1:30, z2:-30},
            results: {},
            location: function() {
                var mpo = firestep.model.mpo || {};
                return "X" + mpo.x + "Y" + mpo.y + "Z" + mpo.z;
            },
            getResults: function() {
                return service.results[service.location()];
            },
            isAvailable: function() {
                return available;
            },
            jogPrecision: function(camera) {
                images.save(camera.selected, function(err) {
                    firestep.send([
                        {"movxr":firestep.getJog(1)},
                        {"movyr":firestep.getJog(1)},
                        {"movxr":firestep.getJog(-2)},
                        {"movyr":firestep.getJog(-2)},
                        {"movxr":firestep.getJog(2)},
                        {"movyr":firestep.getJog(1)},
                        {"movxr":firestep.getJog(-1)},
                        {"mpo":"","dpyds":12}
                    ]);
                });
            },
            calcOffset: function(camera) {
                $.ajax({
                    url: "/measure/" + camera + "/calc-offset",
                    success: function(outJson) {
                        console.log("calcOffset() ", outJson);
                        var loc = service.location();
                        service.results[loc] = service.results[loc] || {};
                        service.results[loc].calcOffset = outJson;
                        service.processCount++;
                    },
                    error: function(jqXHR, ex) {
                        console.warn("calcOffset() failed:", jqXHR, ex);
                    }
                });
            }
        };

        $.ajax({
            url: "/measure/model",
            success: function(data) {
                available = data && data.available;
                console.log("measure available:", available);
                service.model = data;
            },
            error: function(jqXHR, ex) {
                available = false;
                console.warn("measure unavailable :", jqXHR, ex);
            }
        });

        return service;
    }
]);
