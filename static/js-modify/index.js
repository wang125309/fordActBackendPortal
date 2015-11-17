require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/angular/angular.js");
require("../../bower_components/angular-sanitize/angular-sanitize.min.js");
require("../js/share.min.js");

indexCtrl = angular.module('app',['ngSanitize']).controller('indexCtrl',['$scope','$sce',function($scope,$sce){
    $scope.detailsShow = false;
    firstLevel = function() {
        $scope.detailsShow = true;
        $scope.blur = 'blur';
        $scope.backShow = false;
        $scope.copyShow = false;
        $scope.upShow = false;
    };
    secondLevel = function() {
        $scope.detailsShow = true;
        $scope.blur = 'blur';
        $scope.backShow = true;
        $scope.copyShow = false;
        $scope.upShow = false;
    };
    thirdLevel = function() {
        $scope.detailsShow = true;
        $scope.blur = 'blur';
        $scope.eleShow = true;
        $scope.backShow = false;
        $scope.copyShow = true;
        $scope.upShow = true;
    };
    
    $scope.goNews = function() {
        thirdLevel();
        $scope.eleTitle = '新闻稿件';
        $scope.upShow = false;
        $.get("/backend/getNewsById/?id=1",function(data){
            $scope.eleDesc = function() {
                return $sce.trustAsHtml(data.data.desc);  
            }();
            $scope.$apply();
        });
    };

    $scope.goProduct = function() {
        firstLevel();
        $scope.productShow = true;
        $scope.type = 'product';
    };
    $scope.goProductAnnc = function() {
        $scope.productListShow = true;
        $scope.productShow = false;
        secondLevel();
        $.get("/backend/getProductList/",function(data){
            $scope.products = data.data;
            $scope.$apply();
        });
    };
    $scope.back = function() {
        $scope.backShow = false;
        firstLevel();
        if($scope.type == 'product') {
            $scope.productListShow = false;
            $scope.productShow = true;
            
        }
        else if($scope.type == 'com') {
            $scope.comListShow = false;
            $scope.comShow = true;
        }
        else if($scope.type == 'leader') {
            $scope.leaderListShow = false;
            $scope.comShow = true;
        }
    };
    $scope.goProductSettings = function() {
        location.href = "";
    };

    $scope.goProductDetail = function(id) {
        $.get("/backend/getProductById/?id="+id,function(data){
            $scope.productShow = false;
            $scope.productListShow = false;
            thirdLevel();
            $scope.type = 'product';
            $scope.eleTitle = data.data.title;
            $scope.eleDesc = function() {
                return $sce.trustAsHtml(data.data.desc);  
            }();
            $scope.$apply();
        });
    };
    $scope.goCul = function() {
        thirdLevel();
        $scope.eleShow = true;
        $scope.upShow = false;
        $.get("/backend/getCulById/?id=1",function(data){
            $scope.eleTitle = data.data.title; 
            $scope.eleDesc = function() {
                return $sce.trustAsHtml(data.data.desc);  
            }();
            $scope.$apply();
        });
    };
    $scope.goCom = function() {
        firstLevel();
        $scope.comShow = true ;
    };
    $scope.goCopy = function() {
        $scope.copy = true;
    };
    $scope.closeCopy = function() {
        $scope.copy = false;
    };
    $scope.goLeader = function() {
        secondLevel();
        $scope.leaderListShow = true;
        $scope.type = 'leader';
        $scope.comShow = false; 
    };
    $scope.goLeaderDetail = function(id) {
        $scope.comShow = false;
        thirdLevel();
        $scope.type = 'leader';
        $scope.leaderListShow = false;
        if(id == 1) {
            id = 6;
        }
        else if(id == 2) {
            id = 7;
        }
        else if(id == 3) {
            id = 8;
        }
        else if(id == 4) {
            id = 9;
        }
        $scope.leaderImgShow = true;
        $scope.leaderImg = "/static/image/" + id + ".jpg";
        $.get("/backend/getCulById/?id="+id,function(data){
            $scope.eleTitle = data.data.title; 
            $scope.eleDesc = function() {
                return $sce.trustAsHtml(data.data.desc);  
            }();
            $scope.$apply();
        });
        
    };
    $scope.goComDesc = function(id) {
        if (!id) {
            $scope.comListShow = true;
            $scope.comShow = false;
            secondLevel();
            $scope.type = 'com';
        }
        else if(id == 1) {
            $scope.comListShow = false;
            thirdLevel();
            $.get("/backend/getCulById/?id=4",function(data){
                $scope.eleTitle = data.data.title;
                $scope.eleDesc = function() {
                    return $sce.trustAsHtml(data.data.desc);  
                }();
                $scope.$apply();
            });
        }
        else if(id == 2) {
            $scope.comListShow = false;
            thirdLevel();
            $.get("/backend/getCulById/?id=5",function(data){
                $scope.eleTitle = data.data.title;
                $scope.eleDesc = function() {
                    return $sce.trustAsHtml(data.data.desc);  
                }();
                $scope.$apply();
            });
        }
    };
    $scope.goPos = function() {
        thirdLevel();
        $scope.upShow = false;
        $scope.backShow = false;
        $scope.copyShow = false;
        $scope.eleTitle = '位置信息';
        $scope.eleDesc = function() {
            return $sce.trustAsHtml('<img class="pos" src="/static/image/posimg.jpg"/>');  
        }();
    };
    $scope.goImg = function() {
        location.href = '';
    };
    $scope.up = function() {
        secondLevel();
        $scope.eleShow = false;
        if($scope.type == 'product') {
            $scope.productListShow = true;
        }
        else if($scope.type == 'com') {
            $scope.comListShow = true;
        }
        else if($scope.type == 'leader') {
            $scope.leaderListShow = true;
        }
    };
    $scope.close = function() {
        $scope.detailsShow = false;
        $scope.productShow = false;
        $scope.eleShow = false;
        $scope.productShow = false;
        $scope.productListShow = false;
        $scope.blur = '';
        $scope.copyShow = true;
        $scope.comShow = false ;
        $scope.comListShow = false;
        $scope.leaderListShow = false;
        $scope.leaderShow = false;
        $scope.leaderImgShow = false;
    };

}])
.directive('init',function(){
    return {
        link : function(scope, element, attr) {
            window.onload = function(){
                w = $(window).width();
                h = $(window).height();
                $(".finger").on('longTap',function(){
                    $(".page1").hide();
                    $(".page2").velocity("fadeIn");
                });
            }

        }
    }
});

indexCtrl.$inject = ['$scope','indexCtrl']; 
