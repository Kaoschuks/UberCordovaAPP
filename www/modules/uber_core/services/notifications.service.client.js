/**
 *
 * Created by Matthias on 2/10/16.
 * Provides access to clients socket id and handles socket messages
 */

angular.module('uber_core').factory('Notifications',[
    'socketFactory',
    '$window',
    '$cordovaGeolocation',
    'SERVER',
    '$q',
    '$ionicPush',
    function(socketFactory, $window, $cordovaGeolocation, SERVER, $q, $ionicPush){

        //TODO add server without v1 postfix
        var myIoSocket = $window.io('http://localhost:3000');

        function appNotifications(cb){
            window.push_data_cb.push(function(data){
                cb(data);
            });
        }


        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        var socketDef = $q.defer();

        socket.on('socket_id', function(res){
            socketDef.resolve(res);
        });

        function socketInit(type){
            return function(cb){
                socket.on(type, cb);
            }
        }

        return {
            chatMessage: socketInit('chat_message'),
            rideStatus: socketInit('ride_status'),
            newConnectionInfo: socketDef.promise,
            appNotifications:appNotifications
        }

}]);
