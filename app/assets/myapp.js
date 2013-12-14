var app = angular.module("myapp", ["firebase"]);
function MyController($scope, angularFireCollection, angularFireAuth) {
  var ref = new Firebase('https://cyoap.firebaseio.com/');
  angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  var messagesRef = ref.child('messages');

  $scope.messages = angularFireCollection(messagesRef);
  // $scope.messages = [];
  // angularFire(ref.child('messages'), $scope, "messages");
  $scope.addMessage = function(e) {
    if (e.keyCode != 13) return;
    $scope.messages.add({name: $scope.user.name, user_id: $scope.user.id, provider: $scope.user.provider, text: $scope.text});
    $scope.text = "";
  };

  $scope.login = function(provider) {
    angularFireAuth.login(provider);
  };
  $scope.logout = function() {
    angularFireAuth.logout();
  };
}
